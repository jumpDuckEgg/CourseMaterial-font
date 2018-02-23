<template>
    <div class="login">
      <v-toolbar dark color="primary" >
        <v-toolbar-side-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="white--text">网络应用技术资源库</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outline  @click="register">注册</v-btn>
      </v-toolbar>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12 sm9 md7 lg5 xl3>
             <v-card class="pb-5 px-4 mt-5">
              <v-card-title primary-title>
                  <div>
                    <v-layout align-center justify-center>
                    <v-flex>
                      <v-avatar class="my-3">
                        <img src="../../static/duck.png" alt="duck">
                    </v-avatar>
                    </v-flex>
                    <v-flex class="headline blue--text" >
                      网络应用技术资源库
                    </v-flex>
                    </v-layout>              
                    <h3 class="headline mb-0">登录</h3>
                    <div>使用您的 JumpDuckEgg 帐号</div>
                  </div>
                </v-card-title>
                <v-card-text>
                     <v-form v-model="valid" ref="form" >
                      <v-text-field
                        label="用户名"
                        v-model="username"
                        :rules="usernameRules"
                      ></v-text-field>
                      <v-text-field
                        label="密码"
                        v-model="password"
                        :rules="passwordRules"
                        type="password" @keyup.enter='sumbmitInfo'
                      ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn  color="info" :loading="loading" :disabled="loading" @click="sumbmitInfo" >登录
                    <span slot="loader">Loading...</span>
                  </v-btn>
                  <v-btn  color="info" @click="reset">重置</v-btn>
                   <v-spacer></v-spacer>
                  
                </v-card-actions>
                <v-snackbar
                  :timeout="snackbarTimeOut"
                  :top="snackbarFlag"
                  :right="snackbarFlag"
                  :multi-line="snackbarFlag"
                  v-model="snackbar"
                >
                  {{remainInfo}}
                  <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
                </v-snackbar>
             </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
</template>
<script>
import api from "../util/api.js";
export default {
  name: "login",
  data: () => ({
    footerFlag: true,
    valid: false,
    username: "",
    usernameRules: [v => !!v || "用户名不能为空"],
    password: "",
    passwordRules: [v => !!v || "密码不能为空"],
    snackbar: false,
    remainInfo: "",
    snackbarFlag: true,
    snackbarTimeOut: 5000,
    loading: false
  }),
  methods: {
    register(){
      this.$router.push({
        path:'/register'
      })
    },
    reset() {
      this.$refs.form.reset();
    },
    sumbmitInfo() {
      if (this.$refs.form.validate()) {
        let data = {
          username: this.username.trim(),
          password: this.password.trim()
        };
        this.loading = true;
        let that = this;
        api.userLogin(data).then(data => {
          let result = data;
          that.loading = false;
          if (data.code == 2 || result.code == 3) {
            this.remainInfo = data.message;
            this.snackbar = true;
          } else {
            this.remainInfo = data.message;
            this.snackbar = true;
            let token = result.data.token;
            this.$store.dispatch("UserLogin", token);
            let redirectUrl = decodeURIComponent(
              this.$route.query.redirect || "/"
            );
            this.$router.push({ path: redirectUrl });
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-image: url("../../static/material_background.png");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
