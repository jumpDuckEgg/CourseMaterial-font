<template>
    <div class="personCenter">
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
                        <v-layout row>
                            <v-flex xs4>

                            </v-flex>
                            <v-flex xs8>

                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
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
            newAvatarUrl: ""
        };
    },
    created() {
        let data = {
            user_id: this.$store.state.user_id
        };
        api.getUserById(data).then(res => {
            if (res.code == 6) {
                this.userInfo = res.data;
            }
        });
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format("MMMM Do YYYY");
        }
    },
    methods: {
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
            console.log(field);

            //this.show = !this.show;
            // console.log(this.params);
        },
        cropUploadSuccess(jsonData, field) {
            console.log("-------- upload success --------");
            console.log(jsonData);
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
</style>