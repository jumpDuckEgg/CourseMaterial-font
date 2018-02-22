<template>
  <div class="courseInformation">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'courseInformation',
  data () {
    return {
      msg: '我是课程详情'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'scoped>

</style>