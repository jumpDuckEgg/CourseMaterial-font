<template>
    <div class="mainPage">
      <v-toolbar dark color="primary" >
      <v-toolbar-side-icon>
        <img src="../../static/duck.png" alt="duck" style="width:30px;height:30px;">
      </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">网络应用技术资源库</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar>
        <img src="../../static/mylogo.jpg" alt="logo">
      </v-avatar>
      <v-btn outline  @click="logout" small>注销</v-btn>
    </v-toolbar>
      <v-footer class="pa-3" :absolute='footerFlag'>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear() }}</div>
      </v-footer>
      <v-snackbar
      :timeout="snackbarTimeOut"
      :top="snackbarFlag"
      :right="snackbarFlag"
      :multi-line="snackbarFlag"
      v-model="snackbar">
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
    snackbarTimeOut: 5000,
 
  }),
  methods: {
    logout() {
      this.$store.dispatch("UserLogout");
      if (!this.$store.state.token) {
        this.$router.push("/login");
        this.remainInfo="登出成功";
        this.snackbar=false;

      } else {
        this.remainInfo="登出失败";
        this.snackbar=false;
      }
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
