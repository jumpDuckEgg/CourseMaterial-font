<template>
  <div class="register">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon>
        <img src="../../static/duck.png" alt="duck" style="width:30px;height:30px;">
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">网络应用技术资源库</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outline @click="login">
        登录
      </v-btn>
    </v-toolbar>
    <div class="register__title display-1 my-5">创建您的 网络应用技术资源库 帐号</div>
    <v-container>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex xs4 justify-center>
          <div class="register_center title my-1">您只需注册一个帐号即可</div>
          <div class="register_center body-1 my-3">只需一个免费帐号，即可畅享 网络应用技术资源库 的所有产品和服务.</div>
          <div class="register_logo-strip my-5"></div>
          <div class="register_center title mt-5">随时随地使用</div>
          <div class="register_center body-1 my-4">从一台设备换到另一台设备时，会紧接着上次中断处继续。</div>
          <div class="register_device my-5"></div>
        </v-flex>
        <v-spacer xs1></v-spacer>
        <v-flex xs4>
          <v-card class="pb-5 px-4 ">
            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-text-field label="用户名" v-model="username" :rules="usernameRules" required></v-text-field>
                <v-text-field label="密码" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
                <v-text-field label="确认密码" v-model="checkpassword" :rules="checkpasswordRules" type="password" required :error-messages="checkpasswordErrors"></v-text-field>
              </v-form>
              <v-btn color="info" :loading="loading" :disabled="loading" @click="sumbmitInfo">注册
                <span slot="loader">Loading...</span>
              </v-btn>
              <v-btn color="info" @click="reset">重置</v-btn>
            </v-card-text>
            <v-snackbar :timeout="snackbarTimeOut" :top="snackbarFlag" :right="snackbarFlag" :multi-line="snackbarFlag" v-model="snackbar">
              {{remainInfo}}
              <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
          </v-card>

        </v-flex>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import api from "../util/api.js";
export default {
    name: "register",
    data: () => ({
        valid: false,
        username: "",
        usernameRules: [
            v => !!v || "用户名不能为空",
            v => v.length <= 12 || "长度在6到12个字符",
            v => 6 <= v.length || "长度在6到12个字符"
        ],
        password: "",
        passwordRules: [
            v => !!v || "密码不能为空",
            v => v.length <= 12 || "长度在6到12个字符",
            v => 6 <= v.length || "长度在6到12个字符"
        ],
        checkpassword: "",
        checkpasswordRules: [v => !!v || "密码不能为空"],
        loading: false,
        snackbar: false,
        remainInfo: "",
        snackbarFlag: true,
        snackbarTimeOut: 5000
    }),
    computed: {
        checkpasswordErrors() {
            const errors = [];
            // if (!this.$v.checkpassword.$dirty) return errors
            !(this.password === this.checkpassword) &&
                errors.push("两次密码不一样");
            return errors;
        }
    },
    methods: {
        reset() {
            this.$refs.form.reset();
        },
        login() {
            this.$router.push({
                path: "/login"
            });
        },
        sumbmitInfo() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                let data = {
                    username: this.username,
                    password: this.password
                };
                let that = this;
                api.userRegister(data).then(data => {
                    that.loading = false;
                    let result = data;
                    if (result.code == 5) {
                        this.snackbar = true;
                        this.remainInfo = result.message;
                    } else {
                        this.snackbar = true;
                        this.remainInfo = result.message;
                        this.$router.push("/");
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.register {
    // background-image: url("../../static/material_backgroundV2.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    &__title {
        text-align: center;
    }
    &_center {
        text-align: center;
    }
    &_logo-strip {
        background-size: 325px 24px;
        width: 325px;
        height: 24px;
        background-repeat: no-repeat;
        background-image: url("../../static/production.png");
        margin: auto;
    }
    &_device {
        background-size: 300px 172px;
        background-repeat: no-repeat;
        width: 300px;
        height: 172px;
        background-repeat: no-repeat;
        background-image: url("../../static/device.png");
        margin: auto;
    }
}
</style>
