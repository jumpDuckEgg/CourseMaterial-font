<template>
  <div class="courseInformation">
    <!-- <div>{{ msg }}</div> -->
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-media class="white--text" height="250px" :src="courseContent.courseImage">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <div class="course_title">{{courseContent.course_name}}</div>
                  <div class="course_author course_text-shadow">作者：{{courseContent.author}}</div>
                  <div class="course_createTime course_text-shadow">创建时间：{{courseContent.createdTime|formatDate}}</div>
                  <div class="course_description course_text-shadow">描述：{{courseContent.description}}</div>
                  <v-btn absolute dark fab right color="pink" @click="collect">
                    <v-icon>favorite</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>
            <div>
              <v-tabs v-model="active" color="blue" dark slider-color="yellow" grow>
                <v-tab v-for="item in tabs" :key="item.key" ripple>
                  {{item.name}}
                </v-tab>
                <v-tab-item v-for="item in tabs" :key="item.key">
                  <v-card flat>
                    <v-card-text>
                      <template v-if="item.key=='coursewares'">
                        <!-- {{coursewares}} -->
                        <template v-if="coursewares.length == 0">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <v-list two-line>
                          <template v-for="(item,index) in coursewares">
                            <v-list-tile avatar :key="item.courseware_id">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">description</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.courseware_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip bottom>
                                  <v-btn icon ripple slot="activator" @click="downLoad(item.courseware_url)">
                                    <v-icon color="indigo lighten-1">file_download</v-icon>
                                  </v-btn>
                                  <span>下载</span>
                                </v-tooltip>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < coursewares.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                      <template v-if="item.key=='experiments'">
                        <template v-if="experiments.length == 0">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <!-- {{experiments}} -->
                        <v-list two-line>
                          <template v-for="(item,index) in experiments">
                            <v-list-tile avatar :key="item.experiment_id">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">description</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.experiment_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip bottom>
                                  <v-btn icon ripple slot="activator" @click="downLoad(item.experiment_url)">
                                    <v-icon color="indigo lighten-1">file_download</v-icon>
                                  </v-btn>
                                  <span>下载</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="checkPDF(item.experiment_name)">
                                  <v-btn icon ripple slot="activator" :to='"/pdfView/"+"experiment/"+item.experiment_id'>
                                    <v-icon color="indigo lighten-1">pageview</v-icon>
                                  </v-btn>
                                  <span>在线查看</span>
                                </v-tooltip>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < experiments.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                      <template v-if="item.key=='tests'">
                        <template v-if="tests.length == 0">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <!-- {{tests}} -->
                        <v-list two-line>
                          <template v-for="(item,index) in tests">
                            <v-list-tile avatar :key="item.test_id">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">description</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.test_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip bottom>
                                  <v-btn icon ripple slot="activator" @click="downLoad(item.test_url)">
                                    <v-icon color="indigo lighten-1">file_download</v-icon>
                                  </v-btn>
                                  <span>下载</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="checkPDF(item.test_name)">
                                  <v-btn icon ripple slot="activator" :to='"/pdfView/"+"test/"+item.test_id'>
                                    <v-icon color="indigo lighten-1">pageview</v-icon>
                                  </v-btn>
                                  <span>在线查看</span>
                                </v-tooltip>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < tests.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                      <template v-if="item.key=='videos'">
                        <template v-if="videos.length == 0">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <!-- {{videos}} -->
                        <v-list two-line>
                          <template v-for="(item,index) in videos">
                            <v-list-tile avatar :key="item.video_id">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">ondemand_video</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.video_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip bottom>
                                  <v-btn icon ripple slot="activator" :to='"/videos/"+item.video_id'>
                                    <v-icon color="grey lighten-1">play_circle_outline</v-icon>
                                  </v-btn>
                                  <span>在线播放</span>
                                </v-tooltip>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < videos.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                      <template v-if="item.key=='homeworks'">
                        <template v-if="homeworks.length == 0">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <!-- {{homeworks}} -->
                        <v-list two-line>
                          <template v-for="(item,index) in homeworks">
                            <v-list-tile avatar :key="item.homework_id">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">school</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.homework_name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-tooltip bottom>
                                  <v-btn icon ripple slot="activator" @click="downLoad(item.homework_url)">
                                    <v-icon color="indigo lighten-1">file_download</v-icon>
                                  </v-btn>
                                  <span>下载</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="checkPDF(item.homework_name)">
                                  <v-btn icon ripple slot="activator" :to='"/pdfView/"+"homework/"+item.homework_id'>
                                    <v-icon color="indigo lighten-1">pageview</v-icon>
                                  </v-btn>
                                  <span>在线查看</span>
                                </v-tooltip>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < homeworks.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                      <template v-if="item.key=='onlineTests'">
                        <template v-if="checkFlag(onlineTests,'onlineTest')">
                          <div class="no-content">
                            <v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                        </template>
                        <!-- {{onlineTests}} -->
                        <v-list two-line>
                          <template v-for="(item,index) in onlineTests">
                            <v-list-tile avatar :key="item.onlineTest_id" :to='"/onlineTest/"+item.onlineTest_id' v-if="item.onlineTest_publish">
                              <v-list-tile-avatar>
                                <v-icon large color="blue  darken-2">assessment</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title>{{ item.onlineTest_title }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                              </v-list-tile-content>
                              <v-list-tile-action>
                                <v-btn ripple>
                                  <v-icon color="grey lighten-1">play_circle_filled</v-icon>点击进入测试
                                </v-btn>
                              </v-list-tile-action>
                            </v-list-tile>
                            <v-divider v-if="index + 1 < onlineTests.length" :key="`divider-${index}`"></v-divider>
                          </template>
                        </v-list>
                      </template>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-card-text>
          <!-- <v-card-title>
              <div>
                <span class="grey--text">Number 10</span><br>
                <span>Whitehaven Beach</span><br>
                <span>Whitsunday Island, Whitsunday Islands</span>
              </div>
            </v-card-title> -->
          <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
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
                  <span>提交评论</span>
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
                    <v-icon color="grey lighten-1">info</v-icon>暂无评论</div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="comments.length>0">
              <v-layout row v-for="(item,index) in comments" :key="index" v-if="item.isPublish">
                <v-flex xs2 style="text-align:center;margin:10px 0;">
                  <v-avatar size="60px">
                    <img :src="item.people_image" alt="John">
                  </v-avatar>
                </v-flex>
                <v-flex xs10>
                  <v-divider></v-divider>
                  <div style="margin:10px 0;">
                    <span>{{item.comment_people}}</span>😊●
                    <span class="red--text">{{item.createdTime|formatDate}}</span>
                  </div>
                  <div style="margin:10px 0;">
                    {{item.comment_content}}
                  </div>

                </v-flex>
              </v-layout>
            </template>

          </div>
          <v-snackbar :timeout="timeout" top v-model="snackbar">
            {{text}}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import api from "../../util/api.js";
export default {
  name: "courseInformation",
  data() {
    return {
      msg: "我是课程详情",
      courseContent: {},
      coursewares: [],
      experiments: [],
      tests: [],
      videos: [],
      homeworks: [],
      onlineTests: [],
      tabs: [
        { name: "课件资源", key: "coursewares" },
        { name: "实验资源", key: "experiments" },
        { name: "模拟试题", key: "tests" },
        { name: "视频资源", key: "videos" },
        { name: "习题作业", key: "homeworks" },
        { name: "在线测试", key: "onlineTests" }
      ],
      active: null,
      description: "",
      inset: true,
      snackbar: false,
      timeout: 2000,
      text: "",
      comments: []
    };
  },
  methods: {
    // 收藏课程
    collect() {
      let data = {
        user_id: this.$store.state.user_id,
        course_id: this.$route.params.id,
        course_name: this.courseContent.course_name,
        courseImage: this.courseContent.courseImage
      };
      api.collectionCourse(data).then(res => {
        if (res.code == 6) {
          this.text = "收藏课程成功";
          this.snackbar = true;
        }
        if(res.code == 61){
           this.text = res.message;
          this.snackbar = true;
        }
      });
    },
    // 获取文件最后的文件类型是否为pdf
    checkPDF(fileName) {
      let suffix = _.last(_.split(fileName, "."));
      if (suffix == "pdf") {
        return true;
      }
      return false;
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
    downLoad(url) {
      // window.open(url);
      window.location.href = url;
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
        comment_type: "course",
        type_id: this.$route.params.id,
        comment_people: this.$store.state.username,
        people_image: this.$store.state.userImage
      };
      api
        .addComment(data)
        .then(res => {
          if (res.code == 20) {
            this.description = "";
            this.text = res.message;
            this.snackbar = true;
            let CommentData = {
              comment_type: "course",
              type_id: this.$route.params.id
            };
            return api.findAllComment(CommentData);
          }
        })
        .then(res => {
          if (res.code == 21) {
            this.comments = res.data;
          }
        });
    }
  },
  created() {
    let data = {
      params: {
        course_id: this.$route.params.id
      }
    };
    api.getCourseById(data).then(res => {
      this.msg = res.data;
      this.courseContent = res.data[0];
    });
    let resourceData = {
      query: {
        course_id: this.$route.params.id
      }
    };
    api.findAllResources(resourceData).then(res => {
      if (res.code == 13) {
        let result = res.data;
        if (result.coursewares) {
          this.coursewares = result.coursewares;
        } else {
          this.coursewares = [];
        }
        if (result.experiments) {
          this.experiments = result.experiments;
        } else {
          this.experiments = [];
        }
        if (result.tests) {
          this.tests = result.tests;
        } else {
          this.tests = [];
        }
        if (result.videos) {
          this.videos = result.videos;
        } else {
          this.videos = [];
        }
        if (result.homeworks) {
          this.homeworks = result.homeworks;
        } else {
          this.homeworks = [];
        }
      }
    });

    api.findOnlineTest(resourceData).then(res => {
      if (res.code == 16) {
        this.onlineTests = res.data;
      }
    });
    let CommentData = {
      comment_type: "course",
      type_id: this.$route.params.id
    };
    api.findAllComment(CommentData).then(res => {
      if (res.code == 21) {
        this.comments = res.data;
      }
    });
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
.courseInformation {
  margin: 20px;
  // width: 70%;
}
.course_title {
  text-shadow: 5px 5px 5px black;
  font-size: 3rem;
}
.course_author {
  margin-top: 20px;
  font-size: 1.5rem;
}
.course_text-shadow {
  text-shadow: 2px 2px 2px rgb(153, 148, 148);
}
.course_createTime {
  font-size: 1.2rem;
  margin-top: 5px;
}
.course_description {
  font-size: 1.2rem;
  margin-top: 5px;
}
.no-content {
  text-align: center;
  margin-top: 50px;
}
.comment_title {
  margin: 10px 0;
  font-size: 1.3rem;
}
.comment_box {
  margin-bottom: 40px;
}
</style>