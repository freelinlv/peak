<template>
  <input type="file" id="photoFileUpload"  @change="uploadFile"/>
</template>
<script>
// var AV = require('leancloud-storage')
// var APP_ID = 'a5zjlnxgv6vhjnstba351wh97s3tc40hsot0no9j2b9wa153'
// var APP_KEY = 'qhod8u5iijtvgm16g07gw1dm8f4mgmtqnthsloc7rqkyoxgb'

// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// })
export default {
  data () {
    return {
      fileList: []
    }
  },
  created () {
  },
  methods: {
    uploadFile (e) {
      var localFile = e.target.files[0]
      var name = e.target.files[0].name

      var file = new AV.File(name, localFile)
      file.save().then(function (file) {
        // 文件保存成功
      }, function (error) {
        // 异常处理
      })
    }
  }
}
</script>
<style>

</style>


