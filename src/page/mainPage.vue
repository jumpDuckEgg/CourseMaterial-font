<template>
  <div class="mainPage">
    <!-- 头部tab -->
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon to='/'>
        <img src="../../static/duck.png" alt="duck" style="width:30px;height:30px;">
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">网络应用技术资源库</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-avatar slot="activator" @click="toPersonCenter">
          <img :src="this.$store.state.userImage" alt="logo">
        </v-avatar>
        <span>{{this.$store.state.username}}</span>
      </v-tooltip>
      <v-btn outline @click="logout" small>注销</v-btn>
    </v-toolbar>
    <!-- 主题内容 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <v-footer class="pa-3" :absolute='footerFlag'>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

    <!-- 提示框 -->
    <v-snackbar :timeout="snackbarTimeOut" :top="snackbarFlag" :right="snackbarFlag" :multi-line="snackbarFlag" v-model="snackbar">
      {{remainInfo}}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data: () => ({
    footerFlag: true,
    snackbar: false,
    remainInfo: "",
    snackbarFlag: true,
    snackbarTimeOut: 5000
  }),
  methods: {
    logout() {
      this.$store.dispatch("UserLogout");
      if (!this.$store.state.token) {
        this.$router.push("/login");
        this.remainInfo = "登出成功";
        this.snackbar = false;
      } else {
        this.remainInfo = "登出失败";
        this.snackbar = false;
      }
    },
    toPersonCenter() {
      this.$router.push("/personCenter");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  margin: auto;
  border: 1px solid black;
  // width: 1200px;
  margin-bottom: 55px;
}
</style>
