<template>
    <v-container>
        <div class="main-title">全部课程</div>
        <v-layout row wrap>

            <v-flex xs6 sm4 lg3 xl2 v-for="(item,index) in courses" :key="index" mt-2 px-3>
                <v-card hover :to='"/course/"+item.course_id' tile >
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
    </v-container>
</template>

<script>
import moment from "moment";
import api from "../../util/api.js";
export default {
    name: "mainCotent",
    data() {
        return {
            courses: []
        };
    },
    created() {
        let data = {
            params: {
                isPublish: "pass"
            }
        };
        api.findAllCourse(data).then(res => {
            if (res.code == 8) {
                this.courses = res.data;
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
.courseName{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>
