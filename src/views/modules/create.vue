<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="模板名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="模板类型">
      <el-select v-model="form.category" placeholder="选择模板类型" clearable>
        <el-option label="table" value="table"></el-option>
        <el-option label="sug" value="sug"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图片上传">
      <input type="file" id="photoFileUpload"  @change="uploadFile"/>
      <a :href=form.imgUrl>{{form.imgUrl}}</a>
    </el-form-item>
    <el-form-item label="模板描述">
      <el-input v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="组件代码">
      <el-input type="textarea" class="code" v-model="form.code" :rows="20"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { createModule } from '@/api/api'
var AV = require('leancloud-storage')
var APP_ID = 'a5zjlnxgv6vhjnstba351wh97s3tc40hsot0no9j2b9wa153'
var APP_KEY = 'qhod8u5iijtvgm16g07gw1dm8f4mgmtqnthsloc7rqkyoxgb'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
export default {
  data () {
    return {
      form: {
        name: '',
        category: '',
        imgUrl: '',
        desc: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let params = this.form
      console.log(params)
      createModule(params).then((res) => {
        if (res.data.code === 200) {
          // this.dataArray = res.data.resultList
          // console.log(this.dataArray)
        }
      })
    },
    uploadFile (e) {
      var _this = this
      // console.log(e.target.files[0])
      var localFile = e.target.files[0]
      var name = e.target.files[0].name

      var file = new AV.File(name, localFile)
      file.save().then(function (file) {
        // 文件保存成功
        // console.log(file.url())
        _this.form.imgUrl = file.url()
      }, function (error) {
        // 异常处理
        console.error(error)
      })
    }
  }
}
</script>
<style>
  
</style>


