<template>
    <div class="videoPlay">
        <h1>{{ title }}</h1>

        <div id="dplayer" ref="dplayer"></div>

        <div class="comment">

            <div class="comment_title">评论</div>
            <div class="comment_box">
                <v-card>
                    <v-layout row style="position: relative">
                        <v-flex xs2 height="130px;">
                            <v-card-media :src="this.$store.state.userImage" height="130px" contain></v-card-media>
                        </v-flex>
                        <v-flex xs10 style="height:130px;padding:0 10px;position: relative">
                            <v-text-field label="说点什么吧..." v-model="description" multi-line rows="3" :rules="[(v) => v.length <= 100 || 'Max 100 characters']"></v-text-field>

                            <!-- <div class="faceBox">
                                <v-container fluid grid-list-xs>
                                    <v-layout row wrap>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                        <v-flex xs3 style="text-align:center;padding:4px;">
                                            <v-btn flat icon>😀</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </div> -->
                            <v-menu offset-y>
                                <v-btn dark small fab color="pink" slot="activator" absolute left bottom>
                                    <v-icon>face</v-icon>
                                </v-btn>
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-title>待定</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-flex>
                        <v-btn absolute dark fab bottom right color="pink" @click="submitComment">
                            <v-icon>send</v-icon>
                        </v-btn>

                    </v-layout>
                </v-card>
            </div>
            <div class="comment_content">
                <v-layout row>
                    <v-flex xs2 style="text-align:center;margin:10px 0;">
                        <v-avatar size="60px">
                            <img :src="this.$store.state.userImage" alt="John">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs10>
                        <v-divider></v-divider>
                        <div style="margin:10px 0;">
                            <span>用户名</span>😊●
                            <span class="red--text">两个月前</span>
                        </div>
                        <div style="margin:10px 0;">
                            这样就方便多了
                        </div>

                    </v-flex>
                </v-layout>
            </div>
            <v-snackbar :timeout="timeout" top v-model="snackbar">
                内容不能为空
                <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
        </div>
    </div>
</template>

<script>
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
            snackbar:false,
            timeout:2000
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
    },
    methods: {
        submitComment() {
            if (!this.description.trim()) {
                this.snackbar = true;
                return false;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.videoPlay {
    width: 60%;
    margin: 10px auto;
}
.comment_title {
    margin: 10px 0;
    font-size: 1.2rem;
}
.comment_box {
    margin: 40px 0;
}
.faceBox {
    width: 220px;
    background-color: white;
    border: 1px solid #eee;
    border-radius: 10px;
    position: absolute;
    left: 60px;
    top: 110px;
}
</style>