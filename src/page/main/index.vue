<template>
    <v-container>
        <v-toolbar floating dense>
            <v-text-field prepend-icon="search" hide-details single-line placeholder="课程名称、作者名" v-model="searchWord"></v-text-field>
            <v-btn icon @click="searchCourse">
                <v-icon>done</v-icon>
            </v-btn>
        </v-toolbar>
        <div class="main-title">全部课程</div>
        <v-layout row wrap>
            <div v-if="courses.length==0" style="margin:10px auto;text-align:center;">
                <v-icon color="grey lighten-1">info</v-icon>暂无课程信息</div>
            <v-flex xs6 sm4 lg3 xl2 v-for="(item,index) in courses" :key="index" mt-2 px-3>
                <v-card hover :to='"/course/"+item.course_id' tile>
                    <v-card-media class="white--text" height="150px" :src="item.courseImage">
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline courseName">{{item.course_name}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <div class="grey--text">{{item.createdTime|formatDate}}</div>
                            <div>
                                <template v-for="starIndex in item.star">
                                    <i class="material-icons" :key='starIndex' style="color:red">grade</i>
                                </template>
                            </div>
                            <div>作者：{{item.author}}</div>
                            <div class="description">简介：{{item.description}}</div>
                            <!-- <span>我是总问阿大撒大啊实打实啊实打实打实打阿三大苏打阿三阿三</span> -->
                        </div>
                    </v-card-title>
                    <!-- <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-flex>
        </v-layout>
        <div class="text-xs-center my-5">
            <v-pagination :length="pageLength" @input='pageChange' v-model="page"></v-pagination>
        </div>
    </v-container>
</template>

<script>
import moment from "moment";
import api from "../../util/api.js";
export default {
    name: "mainCotent",
    data() {
        return {
            courses: [],
            page: 1,
            pageLength: 1,
            limitNum: 9,
            searchWord: ""
        };
    },
    created() {
        let courseData = {
            query: {
                isPublish: "pass"
            },
            page: 1,
            limit: this.limitNum
        };
        api.getCourseByPage(courseData).then(res => {
            if (res.code == 8) {
                this.courses = res.data.courses;
                this.pageLength = Math.ceil(res.data.countNum / this.limitNum);
            }
        });
    },
    methods: {
        searchCourse() {
            let keyword = this.searchWord.trim(); //从URL中传来的 keyword参数
            let courseData = {
                query: {
                    $or: [
                        //多条件，数组
                        { course_name: { $regex: keyword } },
                        { author: { $regex: keyword } }
                    ],
                    isPublish: "pass"
                },
                page: 1,
                limit: this.limitNum
            };
            api.getCourseByPage(courseData).then(res => {
                if (res.code == 8) {
                    this.courses = res.data.courses;
                    this.pageLength = Math.ceil(
                        res.data.countNum / this.limitNum
                    );
                    // console.log(res.data);
                }
            });
        },
        pageChange(value) {
            let courseData = {
                query: {
                    isPublish: "pass"
                },
                page: value,
                limit: this.limitNum
            };
            api.getCourseByPage(courseData).then(res => {
                if (res.code == 8) {
                    this.courses = res.data.courses;
                    this.pageLength = Math.ceil(
                        res.data.countNum / this.limitNum
                    );
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

<style lang="scss" scoped>
.headline {
    text-shadow: 5px 5px 5px black;
}
.main-title {
    border-left: 5px solid #1976d2;
    padding-left: 10px;
    margin: 10px 0;
    font-size: 20px;
}
.description {
    // height: 43px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.courseName {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>
