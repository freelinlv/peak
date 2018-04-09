<template>
  <div class='rootArea'>
    <section class='opreateArea'>
      <h2>Operate Area</h2>
      <el-form :inline='true' :model='operate' label-position='left'>
        <el-form-item label-width='100px' label='Label内容'>
          <el-input v-model='operate.label' placeholder='' clearable class="simple-input"></el-input>
        </el-form-item>
        <el-form-item label-width='100px' label='P-holder内容'>
          <el-input v-model='operate.place' placeholder='' class="simple-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存设置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="preview">
      <h2>Preview Area</h2>
      <el-form :inline='true' :model='operate' label-position='left'>
        <el-form-item label-width='100px' :label='operate.label'>
          <el-input v-model='filter.input' :placeholder='operate.place' class="simple-input"></el-input>
        </el-form-item>
      </el-form>
    </section>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      filter: {
        input: ''
      },
      operate: {
        label: '',
        place: ''
      },
      text: '文本展示位'

    }
  },
  methods: {
    save () {
      let inputText = `<el-form-item label-width='100px' label='${this.operate.label}'>
          <el-input v-model='filter.input' placeholder='${this.operate.place}'></el-input>
        </el-form-item>`
      console.log(inputText)
    }
  }
}
</script>
<style lang="scss">
  .rootArea{
    display: flex;
  }
  .opreateArea{
    margin-right: 40px;
    border-right: 1px solid #ccc;
    // background: #cdedd8;
    padding: 0 20px;
  }
  section{
    flex: 1;
  }
  button{
    display: block;
  }
</style>
