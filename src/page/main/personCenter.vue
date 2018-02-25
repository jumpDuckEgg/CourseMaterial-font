<template>
  <div class="personCenter">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'personCenter',
  data () {
    return {
      msg: '这是我的个人中心'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>

</style>