const str = `
<template>
  <div class="box">
    <p>欢迎使用 Playground</p>
    <el-button type="primary" @click="handleClick"> 点我 </el-button>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },
  methods: {
    handleClick () {
      this.$message({ message: 'Hello Peak', type: 'success' })
    }
  }
}
</script>

<style>
  .box{
    text-align: center;
  }
</style>


`
export default str
