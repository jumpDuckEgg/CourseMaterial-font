<template>
    <div class="pdfView">

        <v-layout>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
                <div class="pdfView-title">pdf查看</div>
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
    </div>
</template>

<script>
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
            info: {}
        };
    },
    methods: {
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
        margin: 10px 0;
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
</style>