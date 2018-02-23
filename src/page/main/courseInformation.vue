<template>
  <div class="courseInformation">
    <!-- <div>{{ msg }}</div> -->
     <v-layout>
        <v-flex xs12 sm8 offset-sm2>
          <v-card>
            <v-card-media
              class="white--text"
              height="250px"
              :src="courseContent.courseImage"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <div class="course_title">{{courseContent.course_name}}</div>
                    <div class="course_author course_text-shadow">作者：{{courseContent.author}}</div>
                    <div class="course_createTime course_text-shadow" >创建时间：{{courseContent.createdTime|formatDate}}</div>
                    <div class="course_description course_text-shadow">描述：{{courseContent.description}}</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-text>
              <div>
                <v-tabs v-model="active" color="blue" dark slider-color="yellow" grow>
                  <v-tab  v-for="item in tabs"  :key="item.key"  ripple>
                      {{item.name}}
                  </v-tab>
                  <v-tab-item  v-for="item in tabs"  :key="item.key" >
                    <v-card flat>
                      <v-card-text>
                          <template v-if="item.key=='coursewares'">
                            <!-- {{coursewares}} -->
                            <template v-if="coursewares.length == 0">
                              <div class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in coursewares" :key="item.courseware_id" >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">folder</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.courseware_name }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn  icon ripple>
                                    <v-icon  color="indigo lighten-1">file_download</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </template>
                          <template v-if="item.key=='experiments'">
                            <template v-if="experiments.length == 0">
                              <div  class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <!-- {{experiments}} -->
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in experiments" :key="item.experiment_id" >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">folder</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.experiment_name }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon ripple @click="demo(item.experiment_url)">
                                    <v-icon color="grey lighten-1">info</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </template>
                          <template v-if="item.key=='tests'">
                            <template v-if="tests.length == 0">
                              <div  class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <!-- {{tests}} -->
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in tests" :key="item.test_id" >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">folder</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.test_name }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </template>
                          <template v-if="item.key=='videos'">
                            <template v-if="videos.length == 0">
                              <div  class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <!-- {{videos}} -->
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in videos" :key="item.video_id" >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">folder</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.video_name }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </template>
                          <template v-if="item.key=='homeworks'">
                            <template v-if="homeworks.length == 0">
                              <div  class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <!-- {{homeworks}} -->
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in homeworks" :key="item.homework_id" >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">folder</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.homework_name }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
                            </v-list>
                          </template>
                           <template v-if="item.key=='onlineTests'">
                            <template v-if="onlineTests.length == 0">
                              <div  class="no-content"><v-icon color="grey lighten-1">info</v-icon>暂无此资源</div>
                            </template>  
                            <!-- {{homeworks}} -->
                            <v-list two-line >
                              <v-list-tile avatar v-for="item in onlineTests" :key="item.onlineTest_id" :to='"/onlineTest/"+item.onlineTest_id' >
                                <v-list-tile-avatar>
                                   <v-icon large color="blue  darken-2">assessment</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                  <v-list-tile-title>{{ item.onlineTest_title }}</v-list-tile-title>
                                  <v-list-tile-sub-title>{{ item.createdTime |formatDate }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                  <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                  </v-btn>
                                </v-list-tile-action>
                              </v-list-tile>
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
  </div>
</template>

<script>
import moment from "moment";
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
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    demo(url) {
      window.open(url);
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
</style>