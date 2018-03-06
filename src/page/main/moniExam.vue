<template>
    <div class="moniExam">
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="moniExam-title">
                        <h3 class="headline mb-0">模拟试卷</h3>
                    </div>
                    <div class="headline">测试：{{moniExamData.moniExam_title}}</div>
                    <span class="grey--text">发布时间：{{moniExamData.createdTime|formatDate}}</span>
                </div>
            </v-card-title>
            <v-card-text>
                <template v-if="radioMoniTest.length>0">
                    <div>选择题</div>
                    <div :key="index" style="width:96%;margin:auto" v-for="(item,index) in radioMoniTest">
                        <div class="question">
                            <span>{{index+1}}.{{item.moniTest_title}}</span>
                            <span>({{item.moniTest_score}}分)</span>
                        </div>
                        <v-radio-group v-model="item.checkRadio" row>
                            <template v-for="(option,optionIndex) in item.moniTest_optionsData">
                                <v-radio :label="`${option.id}.${option.options} `" :value="option.id" :key="optionIndex"></v-radio>
                            </template>
                        </v-radio-group>

                    </div>
                </template>
                <template v-if="checkMoniTest.length>0">
                    <div>多选题</div>
                    <div :key="'check'+index" style="width:96%;margin:auto" v-for="(item,index) in checkMoniTest">
                        <div class="question">
                            <span>{{index+1}}.{{item.moniTest_title}}</span>
                            <span>({{item.moniTest_score}}分)</span>
                        </div>
                        <template v-for="(option,optionIndex) in item.moniTest_optionsData">
                            <v-checkbox :label="`${option.id}.${option.options} `" v-model="item['selected'+optionIndex]" :value="option.id" :key="'check'+optionIndex"></v-checkbox>
                        </template>
                    </div>
                </template>
                <template v-if="radioMoniTest.length>0">
                    <div>判断题</div>
                    <div :key="'judge'+index" style="width:96%;margin:auto" v-for="(item,index) in judgeMoniTest">
                        <div class="question">
                            <span>{{index+1}}.{{item.moniTest_title}}</span>
                            <span>({{item.moniTest_score}}分)</span>
                        </div>
                        <v-radio-group v-model="item.checkRadio" row>
                            <v-radio label="正确" value="true"></v-radio>
                            <v-radio label="错误" value="false"></v-radio>
                        </v-radio-group>
                    </div>
                </template>
                <v-divider></v-divider>
                <div class="result" :class="{resultHide:submitFlag}">
                    <div>答题卡：</div>

                    <div class="answer-title">选择题答案：</div>
                    <template v-for="(item,index) in radioMoniTest">
                        <div :key="'radioAnswer'+index" class="answer-content">
                            <div>第{{index+1}}题.你的答案：{{item.checkRadio}} || 正确答案：{{item.moniTest_answer}}</div>
                            <div>解析：{{item.moniTest_analysis}}</div>
                        </div>
                    </template>
                    <div class="answer-title">多选题答案：</div>
                    <template v-for="(item,index) in checkMoniTest">
                        <div :key="'checkAnswer'+index" class="answer-content">
                            <div>第{{index+1}}题.你的答案：
                                <template v-for="(option,optionIndex) in item.moniTest_optionsData">
                                    {{item['selected'+optionIndex]}}
                                </template>
                                || 正确答案：{{item.moniTest_answer}}</div>
                            <div>解析：{{item.moniTest_analysis}}</div>
                        </div>
                    </template>
                    <div class="answer-title">选择题答案：</div>
                    <template v-for="(item,index) in judgeMoniTest">
                        <div :key="'judgeAnswer'+index" class="answer-content">
                            <div>第{{index+1}}题.你的答案：{{item.checkRadio |judgeChange}} || 正确答案：{{item.moniTest_answer |judgeChange}}</div>
                            <div>解析：{{item.moniTest_analysis}}</div>
                        </div>
                    </template>
                </div>
            </v-card-text>
            <v-card-actions :class="{resultHide:!submitFlag}">
                <v-spacer></v-spacer>
                <v-btn color="blue" @click="submitTest">提交</v-btn>
                <v-btn color="purple">重置</v-btn>
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
    name: "moniExam",
    data() {
        return {
            msg: "模拟试卷",
            moniExamData: {},
            radioMoniTest: [],
            checkMoniTest: [],
            judgeMoniTest: [],
            text: "",
            timeout: 2000,
            submitFlag: true,
            achievement: 0,
            snackbar: false
        };
    },
    created() {
        let data = {
            query: {
                moniExam_id: Number(this.$route.params.id)
            }
        };
        api.getAllMoniExamByOptions(data).then(res => {
            if (res.code == 32) {
                this.moniExamData = res.data[0];
                this.radioMoniTest = _.filter(
                    this.moniExamData.moniExam_content,
                    function(o) {
                        return o.moniTest_type == "radio";
                    }
                );
                this.checkMoniTest = _.filter(
                    this.moniExamData.moniExam_content,
                    function(o) {
                        return o.moniTest_type == "check";
                    }
                );
                _.map(this.checkMoniTest, (value, index) => {
                    this.checkMoniTest[index].checkbox = ["A", "B"];
                });
                this.judgeMoniTest = _.filter(
                    this.moniExamData.moniExam_content,
                    function(o) {
                        return o.moniTest_type == "judge";
                    }
                );
            }
        });
    },
    methods: {
        checkAnswer(data) {
            console.log("asdasd");
            let answerArr = [];
            for (let i = 0; i < data.moniTest_optionsData; i++) {
                console.log(data["selected" + i]);
                if (data["selected" + i]) {
                    answerArr.push(data["selected" + i]);
                }
            }
            return answerArr.join(",");
        },
        submitTest() {
            let radioCouter = 0;
            let checkCouter = 0;
            let judgeCouter = 0;

            _.map(this.radioMoniTest, (value, index) => {
                if (!value.checkRadio) {
                    radioCouter++;
                }
            });
            if (radioCouter > 0) {
                this.text = `选择题还有${radioCouter}道还没有选完`;
                this.snackbar = true;
                return false;
            }
            _.map(this.checkMoniTest, (value, index) => {
                let optionsCouter = 0;
                _.map(
                    value.moniTest_optionsData,
                    (optionsValue, optionsIndex) => {
                        if (!value["selected" + optionsIndex]) {
                            optionsCouter++;
                        }
                    }
                );
                if (optionsCouter == value.moniTest_optionsData.length) {
                    checkCouter++;
                }
            });
            if (checkCouter > 0) {
                this.text = `多选题还有${checkCouter}道还没有选完`;
                this.snackbar = true;
                return false;
            }
            _.map(this.judgeMoniTest, (value, index) => {
                if (!value.checkRadio) {
                    judgeCouter++;
                }
            });
            if (judgeCouter > 0) {
                this.text = `判断题还有${judgeCouter}道还没有选完`;
                this.snackbar = true;
                return false;
            }
            this.submitFlag = false;
        }
    },
    filters: {
        formatDate: function(value) {
            return moment(value).format("MMMM Do YYYY");
        },
        judgeChange: function(value) {
            console.log(value)
            let temp = "";
            switch (value) {
                case "true":
                    temp = "正确";
                    break;
                case "false":
                    temp = "错误";
                    break;
                default:
                    break;
            }
            return temp;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.moniExam {
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

.moniExam-title {
    border-left: 4px solid #1976d2;
    padding-left: 10px;
    margin-bottom: 15px;
}
.answer-title{
    margin: 10px 0;
}
.answer-content{
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
}
</style>