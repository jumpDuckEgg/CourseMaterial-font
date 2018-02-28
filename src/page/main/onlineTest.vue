<template>
    <div class="onlineTest">
        
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="online-title">
            <h3 class="headline mb-0">在线测试</h3>
        </div>
                    <div class="headline">测试：{{onlineTest.onlineTest_title}}</div>
                    <span class="grey--text">发布时间：{{onlineTest.createdTime|formatDate}}</span>
                </div>
            </v-card-title>
            <v-card-text>
                <template v-for="(item,index) in onlineTest.onlineTest_content">
                    <div :key="index" style="width:96%;margin:auto">
                        <div class="question">
                            <span>{{index+1}}.{{item.title}}</span>
                            <span>({{item.score}}分)</span>
                        </div>
                        <v-radio-group v-model="item.checkRadio" row>
                            <template v-for="(option,optionIndex) in item.optionsData">
                                <v-radio :label="`${option.id}.${option.options} `" :value="option.id" :key="optionIndex"></v-radio>
                            </template>
                        </v-radio-group>
                        
                    </div>
                </template>
                <v-divider></v-divider>
                <div class="result" :class="{resultHide:submitFlag}">
                    <div>答题卡：成绩({{achievement}}分)</div>
                    <v-layout>
                        <template v-for="(item,index) in onlineTest.onlineTest_content">
                            <v-flex xs6 :key="index">
                                第{{index+1}}题.你的答案：{{item.checkRadio}} || 正确答案：{{item.answer}}
                            </v-flex>
                        </template>
                    </v-layout>
                </div>
            </v-card-text>
            <v-card-actions :class="{resultHide:!submitFlag}">
                <v-spacer></v-spacer>
                <v-btn color="blue" @click="submitTest">提交</v-btn>
                <v-btn color="purple" @click="resetTest">重置</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
        <v-snackbar :timeout="timeout" top v-model="snackbar">
            {{ text }}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import api from "../../util/api.js";
export default {
    name: "onlineTest",
    data() {
        return {
            onlineTest: {},
            snackbar: false,
            text: "啦啦啦啦",
            timeout: 2000,
            submitFlag: true,
            achievement: 0
        };
    },
    created() {
        let data = {
            onlineTest_id: this.$route.params.id
        };
        api.getOnlineTesById(data).then(res => {
            this.onlineTest = res.data;
        });
    },
    methods: {
        submitTest() {
            let couter = 0;
            let allcouter = this.onlineTest.onlineTest_content.length;
            this.onlineTest.onlineTest_content.forEach((element, index) => {
                if (!element.checkRadio) {
                    this.snackbar = true;
                    this.text = `第${index + 1}题还没选择`;
                    return false;
                } else {
                    couter++;
                    if (element.checkRadio == element.answer) {
                        this.achievement += Number(element.score);
                    }
                }
            });
            if (couter == allcouter) {
                this.submitFlag = false;
            }
        },
        resetTest() {
            this.onlineTest.onlineTest_content.forEach((element, index) => {
                element.checkRadio = "";
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
.onlineTest {
    width: 80%;
    margin: 10px auto;
}
.question {
    font-size: 1.2rem;
}
.result {
    margin-top: 20px;
}
.resultHide {
    display: none;
}

.online-title {
    border-left: 4px solid #1976d2;
    padding-left: 10px;
    margin-bottom: 15px;
}
</style>