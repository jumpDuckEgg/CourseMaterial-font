<template>
  <div class="pdfView">
    <v-btn @click="backPage">返回上一页</v-btn>
    <v-layout>

      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <div class="pdfView-title my-3">pdf查看</div>
        <v-card>

          <v-card-text>
            <div class="pdf-box">
              <div class="loading-box" :class="{hidebox:progressFlag}">
                <v-progress-circular indeterminate color="primary" class="progress-box"></v-progress-circular>
                <div class="progress-text  ">加载中.....请耐心等候</div>
              </div>
              <pdf style="border:5px solid black;padding:20px;" :src="pdfUrl" :page="page" @num-pages="numPages = $event" @loaded="loaded"></pdf>
              <v-toolbar dark color="primary">
                <v-toolbar-side-icon></v-toolbar-side-icon>
                <v-toolbar-title class="white--text">{{pdfName}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn icon slot="activator" @click="prePage">
                    <v-icon>chevron_left</v-icon>
                  </v-btn>
                  <span>上一页</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <v-btn icon slot="activator" @click="nextPage">
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
                  <span>下一页</span>
                </v-tooltip>

                <v-text-field v-model.number="pageInput" type="number"></v-text-field>
                <span style="font-size:16px;margin-top:-8px;">/{{numPages}}</span>
              </v-toolbar>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
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
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from "moment";
import api from "../../util/api.js";
import pdf from "vue-pdf";
export default {
    name: "pdfView",
    components: {
        pdf
    },
    watch: {
        pageInput: function(newQuestion, oldQuestion) {
            if (newQuestion < 0) {
                this.page = 1;
                this.pageInput = 1;
            }
            if (newQuestion > this.numPages) {
                this.page = this.numPages;
                this.pageInput = this.numPages;
            }
            if (newQuestion > 0 && newQuestion <= this.numPages) {
                this.page = newQuestion;
            }
        }
    },
    created() {
        if (this.$route.params.type == "experiment") {
            let data = {
                experiment_id: Number(this.$route.params.id)
            };
            api.getExperimentById(data).then(res => {
                if (res.code == 24) {
                    this.info = res.data;
                    this.pdfName = res.data.experiment_name;
                    this.pdfUrl = res.data.experiment_url;
                }
            });
        }
        if (this.$route.params.type == "test") {
            let data = {
                test_id: Number(this.$route.params.id)
            };
            api.getTestById(data).then(res => {
                if (res.code == 26) {
                    this.info = res.data;
                    this.pdfName = res.data.test_name;
                    this.pdfUrl = res.data.test_url;
                }
            });
        }
        if (this.$route.params.type == "homwork") {
            let data = {
                homework_id: Number(this.$route.params.id)
            };
            api.getHomeworkById(data).then(res => {
                if (res.code == 25) {
                    this.info = res.data;
                    this.pdfName = res.data.homework_name;
                    this.pdfUrl = res.data.homework_url;
                }
            });
        }

        let commentsData = {
            query: {
                comment_type: this.$route.params.type,
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
    data() {
        return {
            msg: "pdf查看",
            page: 1,
            pageInput: 1,
            numPages: 0,
            progressFlag: false,
            pdfUrl: "",
            pdfName: "",
            info: {},
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
    methods: {
        backPage() {
            this.$router.go(-1);
        },
        // 评价分页
        pageChange(value) {
            let commentsData = {
                query: {
                    comment_type: this.$route.params.type,
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
                            comment_type: this.$route.params.type,
                            type_id: this.$route.params.id,
                            isPublish: true
                        },
                        page: 1,
                        limit: this.limitNum
                    };
                    api.getCommentSpecial(commentsData).then(res => {
                        if (res.code == 21) {
                            this.dialog = false;
                            this.page = 1;
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
        prePage() {
            if (this.page > 1) {
                this.page--;
                this.pageInput--;
            }
        },
        nextPage() {
            if (this.page < this.numPages) {
                this.page++;
                this.pageInput++;
            }
        },
        loaded() {
            console.log("加载完成");
            this.progressFlag = true;
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
                comment_type: this.$route.params.type,
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
                            comment_type: this.$route.params.type,
                            type_id: this.$route.params.id,
                            isPublish: true
                        },
                        page: 1,
                        limit: this.limitNum
                    };
                    api.getCommentSpecial(commentsData).then(res => {
                        if (res.code == 21) {
                            this.page = 1;
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
.pdfView {
    margin: 10px auto;
    &-title {
        border-left: 5px solid #1976d2;
        padding-left: 10px;

        font-size: 20px;
    }
}
.pdf-box {
    position: relative;
}
.loading-box {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
}
.progress-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
}
.progress-text {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translateX(-50%);
}
.hidebox {
    display: none;
}
.no-content {
    text-align: center;
    margin-top: 50px;
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
</style>