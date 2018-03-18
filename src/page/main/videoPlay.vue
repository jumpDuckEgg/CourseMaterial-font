<template>
    <div class="videoPlay">
        <v-btn @click="backPage">返回上一页</v-btn>
        <v-card>
            <v-card-title>
                <div>
                    <div class="videoPlay-title">在线视频</div>
                    <div class="videoPlay-videoName">{{ title }}</div>
                </div>

            </v-card-title>
            <v-card-text>
                <div id="dplayer" ref="dplayer"></div>
            </v-card-text>
        </v-card>

        <div class="comment">

            <div class="comment_title">评价</div>
            <div class="comment_box">
                <v-card>
                    <v-layout row style="position: relative">
                        <v-flex xs2 height="130px;">
                            <v-card-media :src="this.$store.state.userImage" height="130px" contain></v-card-media>
                        </v-flex>
                        <v-flex xs10 style="height:130px;padding:0 10px;position: relative">
                            <v-text-field label="说点什么吧..." v-model="description" multi-line rows="3" :rules="[(v) => v.length <= 100 || 'Max 100 characters']"></v-text-field>
                            <v-menu offset-y>
                                
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-title>待定</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-flex>
                        <v-tooltip bottom>
                            <v-btn absolute dark fab bottom right color="blue" @click="submitComment" slot="activator">
                                <v-icon>send</v-icon>
                            </v-btn>
                            <span>提交评价</span>
                        </v-tooltip>
                    </v-layout>
                </v-card>
            </div>
            <div class="comment_content">
                <template v-if="checkFlag(comments,'comment')">
                    <v-layout row>
                        <v-flex>
                            <v-divider></v-divider>
                            <div class="no-content">
                                <v-icon color="grey lighten-1">info</v-icon>暂无评价</div>
                        </v-flex>
                    </v-layout>
                </template>
                <template v-if="comments.length>0">
                    <v-layout row v-for="(item,index) in comments" :key="index">
                        <v-flex xs2 style="text-align:center;margin:10px 0;">
                            <v-avatar size="60px">
                                <img :src="item.people_image" alt="John">
                            </v-avatar>
                        </v-flex>
                        <v-flex xs10>
                            <v-divider></v-divider>
                            <div style="margin:10px 0;">
                                <span>{{item.comment_people}}</span>😊
                                <span v-if="item.comment_people == userself">(自己)</span>●
                                <span class="red--text">{{item.createdTime|formatDate}}</span>
                                <v-btn flat small class="blue--text" @click.native.stop="openDialog(item)" v-if="item.comment_people == userself">删除</v-btn>
                            </div>
                            <div style="margin:10px 0;">
                                {{item.comment_content}}
                            </div>

                        </v-flex>
                    </v-layout>
                    <div class="text-xs-center my-3">
                        <v-pagination :length="pageLength" v-model="page" @input="pageChange"></v-pagination>
                    </div>
                </template>

            </div>
            <v-snackbar :timeout="timeout" top v-model="snackbar">
                {{text}}
                <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">确认删除评价？</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="dialog = false">取消</v-btn>
                        <v-btn color="green darken-1" flat @click.native="deleteMyComment()">确认</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import DPlayer from "dplayer";
import api from "../../util/api.js";
export default {
    name: "videoPlay",
    data() {
        return {
            title: "视频播放页",
            videoContent: {},
            description: "",
            inset: true,
            snackbar: false,
            timeout: 2000,
            text: "",
            comments: [],
            dialog: false,
            tempComment: {},
            userself: this.$store.state.username,
            page: 1,
            pageLength: 1,
            limitNum: 6
        };
    },
    created() {
        let data = {
            video_id: this.$route.params.id
        };
        api.getVideoById(data).then(res => {
            if (res.code == 19) {
                this.title = res.data.video_name;
                this.videoContent = res.data;
                let dplayer = this.$refs.dplayer;
                let dp = new DPlayer({
                    container: dplayer,
                    screenshot: true,
                    video: {
                        url: this.videoContent.video_url
                    }
                    // 弹幕格式为数组嵌套，可以看控制台进行查看
                    // danmaku: {
                    //     id: "demo",
                    //     api: "https://api.prprpr.me/dplayer/"
                    // }
                });
            }
        });

        let commentsData = {
            query: {
                comment_type: "videos",
                type_id: this.$route.params.id,
                isPublish: true
            },
            page: 1,
            limit: this.limitNum
        };
        api.getCommentSpecial(commentsData).then(res => {
            if (res.code == 21) {
                this.comments = res.data.comments;
                this.pageLength = Math.ceil(res.data.countNum / this.limitNum);
            }
        });
    },
    methods: {
        backPage() {
            this.$router.go(-1);
        },
        // 评价分页
        pageChange(value) {
            let commentsData = {
                query: {
                    comment_type: "videos",
                    type_id: this.$route.params.id,
                    isPublish: true
                },
                page: value,
                limit: this.limitNum
            };
            api.getCommentSpecial(commentsData).then(res => {
                if (res.code == 21) {
                    this.comments = res.data.comments;
                    this.pageLength = Math.ceil(
                        res.data.countNum / this.limitNum
                    );
                }
            });
        },
        // 打开删除评价框
        openDialog(data) {
            this.dialog = true;
            this.tempComment = data;
        },
        // 删除自己评价
        deleteMyComment() {
            let updateData = {
                user_id: this.$store.state.user_id,
                comment_id: this.tempComment.comment_id
            };
            api.deleteComment(updateData).then(res => {
                if (res.code == 23) {
                    this.text = res.message;
                    this.snackbar = true;
                    let commentsData = {
                        query: {
                            comment_type: "videos",
                            type_id: this.$route.params.id,
                            isPublish: true
                        },
                        page: 1,
                        limit: this.limitNum
                    };
                    api.getCommentSpecial(commentsData).then(res => {
                        if (res.code == 21) {
                            this.page = 1;
                            this.dialog = false;
                            this.comments = res.data.comments;
                            this.pageLength = Math.ceil(
                                res.data.countNum / this.limitNum
                            );
                        }
                    });
                }
            });
        },
        checkFlag(data, type) {
            let flag = 0;
            if (data.length > 0) {
                data.forEach(element => {
                    if (type == "onlineTest") {
                        if (!element.onlineTest_publish) {
                            flag++;
                        }
                    }
                    if (type == "comment") {
                        if (!element.isPublish) {
                            flag++;
                        }
                    }
                });
                if (flag == data.length) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        submitComment() {
            if (!this.description.trim()) {
                this.text = "内容不能为空";
                this.snackbar = true;
                return false;
            }
            let data = {
                user_id: this.$store.state.user_id,
                comment_content: this.description,
                comment_type: "videos",
                type_id: this.$route.params.id,
                comment_people: this.$store.state.username,
                people_image: this.$store.state.userImage
            };
            api.addComment(data).then(res => {
                if (res.code == 20) {
                    this.description = "";
                    this.text = res.message;
                    this.snackbar = true;
                    let commentsData = {
                        query: {
                            comment_type: "videos",
                            type_id: this.$route.params.id,
                            isPublish: true
                        },
                        page: 1,
                        limit: this.limitNum
                    };
                    api.getCommentSpecial(commentsData).then(res => {
                        if (res.code == 21) {
                            this.page = 1;
                            this.dialog = false;
                            this.comments = res.data.comments;
                            this.pageLength = Math.ceil(
                                res.data.countNum / this.limitNum
                            );
                        }
                    });
                }
            });
        }
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format("MMMM Do YYYY");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.videoPlay {
    width: 60%;
    margin: 10px auto;
    &-title {
        border-left: 4px solid #1976d2;
        padding-left: 10px;
        font-size: 20px;
    }
    &-videoName {
        margin: 5px 0;
        font-size: 18px;
        font-weight: bold;
    }
}
.comment_title {
    margin: 10px 0;
    margin-top: 15px;
    font-size: 1.3rem;
    border-left: 4px solid #1976d2;
    padding-left: 10px;
}
.comment_box {
    margin-bottom: 40px;
}

.no-content {
    text-align: center;
    margin: 20px 0;
}
</style>