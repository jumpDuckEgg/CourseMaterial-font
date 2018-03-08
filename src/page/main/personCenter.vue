<template>
    <div class="personCenter">
        <v-btn @click="backPage">返回上一页</v-btn>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
                <v-card>
                    <v-card-title primary-title>
                        <div class="personCenter-title">
                            <h3 class="headline mb-0">个人中心</h3>
                        </div>
                    </v-card-title>
                    <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs4>
                                <v-card-media :src="userInfo.userImage" height="125px" contain @click="logoUpload()"></v-card-media>
                                <my-upload @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" field="file" v-model="show" :width="100" :height="100" :url="uploadUrl" :params="params"></my-upload>
                                <div class="avatar__edit" v-if="!newAvatarUrl">
                                    <v-chip>点击头像编辑</v-chip>
                                </div>
                                <div class="avatar__edit" v-if="newAvatarUrl">
                                    <v-btn @click="modifyLogo">确认修改</v-btn>
                                </div>
                            </v-flex>
                            <v-flex xs8>
                                <div>
                                    <div class="headline">用户名：{{userInfo.username}}</div>
                                    <div>创建时间：{{userInfo.createdTime|formatDate}}</div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-text>
                    </v-card-text>
                </v-card>

                <v-card style="margin-top:30px;">
                    <v-card-title primary-title>
                        <div class="personCenter-titleV2">
                            收藏课程
                        </div>
                    </v-card-title>
                    <v-container fluid grid-list-lg>
                        <template v-if="collections&&collections.length == 0">
                            <div class="no-content">
                                <v-icon color="grey lighten-1">info</v-icon>暂无收藏课程</div>
                        </template>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 lg4 xl3 v-for="(item,index) in collections" :key="index" mt-2 px-3>
                                <v-card hover tile>
                                    <v-card-media class="white--text" height="150px" :src="item.courseImage">
                                        <v-container fill-height fluid>
                                            <v-layout fill-height>
                                                <v-flex xs12 align-end flexbox>
                                                    <span class="headline courseName headlineV2">{{item.course_name}}</span>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card-media>

                                    <v-card-actions>
                                        <v-btn flat color="orange" :to='"/course/"+item.course_id'>进入课程</v-btn>
                                        <v-btn flat color="orange" @click="cancelCollect(item)">取消收藏</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <div class="text-xs-center my-3">
                            <v-pagination :length="pageLength" v-model="page" @input="pageChange"></v-pagination>
                        </div>
                    </v-container>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-snackbar :timeout="timeout" top v-model="snackbar">
            {{text}}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import moment from "moment";
import api from "../../util/api.js";
import myUpload from "vue-image-crop-upload";
export default {
    name: "personCenter",
    components: {
        "my-upload": myUpload
    },
    data() {
        return {
            msg: "这是我的个人中心",
            userInfo: {},
            show: false,
            params: {
                token: ""
            },
            uploadUrl: "",
            newAvatarUrl: "",
            snackbar: false,
            timeout: 2000,
            text: "",
            page: 1,
            pageLength: 1,
            limitNum: 4,
            collections: []
        };
    },
    created() {
        let data = {
            user_id: this.$store.state.user_id
        };
        api.getUserById(data).then(res => {
            if (res.code == 6) {
                this.userInfo = res.data;

                this.pageLength = Math.ceil(
                    this.userInfo.collections.length / this.limitNum
                );
                if (this.pageLength == 1) {
                    this.collections = this.userInfo.collections;
                } else {
                    this.collections = this.userInfo.collections.slice(0, 4);
                }
            }
        });
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format("MMMM Do YYYY");
        }
    },
    methods: {
        backPage() {
            this.$router.go(-1);
        },
        // 分页
        pageChange(value) {
            if (this.pageLength == value) {
                this.collections = this.userInfo.collections.slice(
                    (value - 1) * 4,
                    this.userInfo.collections.length
                );
            } else {
                this.collections = this.userInfo.collections.slice(
                    (value - 1) * 4,
                    value * 4
                );
            }
        },
        // 取消收藏
        cancelCollect(data) {
            let updateData = {
                user_id: this.$store.state.user_id,
                course_id: data.course_id,
                course_name: data.course_name,
                courseImage: data.courseImage
            };
            api.cancelCollectionCourse(updateData).then(res => {
                if (res.code == 6) {
                    this.text = "取消收藏成功";
                    this.snackbar = true;
                    let data = {
                        user_id: this.$store.state.user_id
                    };
                    api.getUserById(data).then(res => {
                        if (res.code == 6) {
                            this.userInfo = res.data;
                            this.page = 1;
                            this.pageLength = Math.ceil(
                                this.userInfo.collections.length / this.limitNum
                            );
                            if (this.pageLength == 1) {
                                this.collections = this.userInfo.collections;
                            } else {
                                this.collections = this.userInfo.collections.slice(
                                    0,
                                    4
                                );
                            }
                        }
                    });
                }
            });
        },
        // 修改提交头像
        modifyLogo() {
            let data = {
                query: {
                    user_id: this.$store.state.user_id
                },
                update: {
                    userImage: this.newAvatarUrl
                }
            };
            api.modifyUser(data).then(res => {
                if (res.code == 6) {
                    this.userInfo.userImage = this.newAvatarUrl;

                    let logoData = {
                        userImage: this.newAvatarUrl
                    };
                    this.$store.dispatch("UserUpdateLogo", logoData);
                    this.newAvatarUrl = "";
                }
            });
        },
        logoUpload() {
            this.show = true;
            // 获取文件后缀
            let params = {
                suffix: "jpg",
                type: "image/logo",
                time: new Date().getTime()
            };
            let that = this;
            return api.getUploadToken(params).then(res => {
                let result = res;
                that.params.token = result.data;
                that.uploadUrl = result.upload_url;
                return true;
            });
        },
        cropSuccess(imgDataUrl, field) {
            console.log("-------- crop success --------");
            this.imgDataUrl = imgDataUrl;
         

            //this.show = !this.show;
            // console.log(this.params);
        },
        cropUploadSuccess(jsonData, field) {
            console.log("-------- upload success --------");
      
            this.newAvatarUrl = jsonData.key;
            this.userInfo.userImage = jsonData.key;
            // console.log('field: ' + field);
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        cropUploadFail(status, field) {
            // console.log('-------- upload fail --------');
            // console.log(status);
            // console.log('field: ' + field);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.personCenter {
    margin: 20px 0;
    &-title {
        border-left: 4px solid #1976d2;
        padding-left: 10px;
    }
    &-titleV2 {
        border-left: 4px solid #1976d2;
        padding-left: 10px;
        font-size: 20px;
    }
}
.avatar__edit {
    text-align: center;
    margin-top: 2px;
}
.courseName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.no-content {
    text-align: center;
    margin-top: 50px;
}
.headlineV2 {
    text-shadow: 5px 5px 5px black;
}
</style>