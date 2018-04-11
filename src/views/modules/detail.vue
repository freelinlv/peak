<template>
  <section class="demo-block">
    <div class="source">
      <div>
        <img :src=imgUrl alt="" width="100%"/>
      </div>
    </div>
    <div class="source-area">
      <div class="demo-control" >
        <el-button @click="toggleShow" :plain="true" type="info" size="small">{{this.show?'隐藏代码': '显示代码'}}</el-button>
        <el-button @click="copyCode" :plain="true" type="info" size="small">拷贝代码</el-button>
      </div>
      <div class="code" v-if='show'>      
        <MonacoEditor
            height="500"
            language="html"
            :code="code"
            :editorOptions="options"
            >
        </MonacoEditor>   
      </div>
    </div>
    
  </section>
</template>
<script>

import { getDetailData } from '@/api/api'
import MonacoEditor from 'vue-monaco-editor'

export default {
  data () {
    return {
      show: true,
      imgUrl: '',
      code: '',
      options: {
        selectOnLineNumbers: false
      }
    }
  },
  components: {
    MonacoEditor
    // 'preview': function(resolve){
    //   let code = ''
    //   let params = {
    //     id: 1
    //   }
    //   getDetailData(params).then((res) => {
    //     if (res.data.code === 200) {
    //       code = res.data.resultList[0].Code
    //       console.log(code)

    //     }
    //   })
    //   resolve({
    //     template: code
    //   })
    // }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let params = {
        id: this.$router.currentRoute.params.id
      }
      getDetailData(params).then((res) => {
        if (res.data.code === 200) {
          this.code = res.data.resultList[0].code.trim()
          this.imgUrl = res.data.resultList[0].imgUrl
        }
      })
    },
    toggleShow () {
      this.show = !this.show
    },
    copyCode (e) {
      let _ = this
      let msg = this.code
      this.$copyText(msg).then(function (e) {
        _.$message({message: '复制成功', type: 'success'})
      }, function (e) {
        _.$message.error('当前浏览器不支持拷贝功能')
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .demo-block{
    position: relative;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    height: 600px;
  }
  .demo-block > div {
    display: inline-block;
    width: 49%;
  }
 
  .source>div{
    text-align:center; 
    display:table-cell;
    vertical-align:middle;
    height: 600px;
  }
  .source>div img{
    vertical-align:middle;
     display:inline;
  }

  .source-area{
    border-left: 1px solid #ebebeb;
    float:right;
    height: 600px;
    overflow-y: scroll;
    .demo-control{
      position: absolute;
      top: 0;
      right: 0;
      width: 49%;
      opacity: 0.8;
    }
  }
  .code{
    margin-top: 50px;
    border-left: 1px solid #ebebeb;
    background: #fafafa;
  }
  .demo-control{
    padding: 10px 0;
    text-align: center;
    background: #fafafa;
    color: #409EFF;
    cursor: pointer;
  }
</style>

