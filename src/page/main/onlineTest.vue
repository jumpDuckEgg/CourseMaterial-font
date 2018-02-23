<template>
  <div class="onlineTest">
    <div>{{ msg }}</div>
      
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{onlineTest.onlineTest_title}}</div>
                <span class="grey--text">{{onlineTest.createdTime}}</span>
              </div>
            </v-card-title>
            <v-card-text>
              <template v-for="(item,index) in onlineTest.onlineTest_content">
                <div :key="index">
                  <div class="my-3">{{index+1}}.{{item.title}}</div>
                  <v-radio-group v-model="item.checkRadio">
                    <v-layout row >
                    <!-- <v-flex xs12 sm6 offset-sm3> -->
                      <template v-for="(option,optionIndex) in item.optionsData">
                        <v-flex xs4 :key="optionIndex">
                             <v-radio  :label="`${option.id}.${option.options} `" :value="option.id" ></v-radio>
                        </v-flex>
                      </template>
                    </v-layout>
                  </v-radio-group>
                </div>
              </template>

              
            </v-card-text>
            <v-card-actions>
               <v-spacer></v-spacer>
              <v-btn  color="blue" >提交</v-btn>
              <v-btn  color="purple">重置</v-btn>
               <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        
  </div>
</template>

<script>
import api from "../../util/api.js";
export default {
  name: "onlineTest",
  data() {
    return {
      msg: "我是在线测试",
      onlineTest: {}
    };
  },
  created() {
    let data = {
      onlineTest_id: this.$route.params.id
    };
    api.getOnlineTesById(data).then(res => {
      this.onlineTest = res.data;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>
.onlineTest {
  width: 80%;
  margin: 10px auto;
}
</style>