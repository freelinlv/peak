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
        <highlight-code lang="Markdown">
            &lt;template&gt;
              &lt;div class='module-container'&gt;
                &lt;div class='filter'&gt;
                  &lt;!-- 查询栏 --&gt;
                  &lt;el-form :model='filter' ref='filter' :inline='true' :rules='filterRule' label-position='right'&gt;
                    &lt;el-form-item label-width='100px' label='输入框' prop='simpleInput'&gt;
                      &lt;el-input v-model.trim='filter.simpleInput' placeholder='请输入'&gt;&lt;/el-input&gt;
                    &lt;/el-form-item&gt;
                    &lt;el-form-item label-width='100px' label='请选择' prop='simpleSelect'&gt;
                      &lt;el-select v-model="filter.selectValue" placeholder="请选择"&gt;
                        &lt;el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"&gt;
                        &lt;/el-option&gt;
                      &lt;/el-select&gt;
                    &lt;/el-form-item&gt;
                    &lt;el-form-item label-width='100px' label='时间' class='category' prop='time'&gt;
                      &lt;el-date-picker
                        v-model='filter.time'
                        type='datetimerange'
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'&gt;
                      &lt;/el-date-picker&gt;
                    &lt;/el-form-item&gt;
                    &lt;el-row :gutter="100" style="margin-left: 50px;"&gt;
                      &lt;el-col&gt;   
                        &lt;el-button type="primary" @click="search"&gt;查询&lt;/el-button&gt;
                        &lt;el-button  @click="resetFilter" style="margin-left: 15px;"&gt;重置&lt;/el-button&gt;
                      &lt;/el-col&gt;  
                    &lt;/el-row&gt;
                  &lt;/el-form&gt;
                &lt;/div&gt;
                &lt;!-- 列表 --&gt;
                &lt;div class="list"&gt;
                  &lt;el-table :data='tableData' ref='multipleTable' tooltip-effect='dark' :fit='true'&gt;
                    &lt;el-table-column prop="item0" label="列0"&gt;&lt;/el-table-column&gt;
                    &lt;el-table-column prop="item1" label="列1"&gt;&lt;/el-table-column&gt;
                    &lt;el-table-column prop="item2" label="列2"&gt;&lt;/el-table-column&gt;
                    &lt;el-table-column prop="item3" label="列3"&gt;
                      &lt;template slot-scope='scope'&gt;
                          &lt;el-button @click="handleClick(scope.row)" type="text" size="small"&gt;查看&lt;/el-button&gt;
                      &lt;/template&gt;
                    &lt;/el-table-column&gt;
                    
                  &lt;/el-table&gt;
                  &lt;div class='page-box'&gt;
                    &lt;el-pagination
                      @size-change='handleSizeChange'
                      @current-change='handleCurrentChange'
                      :current-page='currentPage'
                      :page-sizes='[20, 50, 100, 200]'
                      :page-size='pageSize'
                      layout="total, sizes, prev, pager, next, jumper"
                      :total='total'&gt;
                    &lt;/el-pagination&gt;
                  &lt;/div&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/template&gt;

            &lt;script&gt;

            export default {
              data () {
                return {
                  filter: {
                    simpleInput: '',
                    time: [],
                    selectValue: ''
                  },
                  filterRule: {
                    simpleInput: {
                      required: false,
                      pattern: /^ASN\d{13}$/,
                      message: '请输入以ASN开头的有效单号',
                      trigger: 'blur'
                    },
                    time: {
                      required: true,
                      message: '时间为必选项',
                      trigger: 'blur'
                    }
                  },
                  tableData: [
                    {
                      item0: 'AAA',
                      item1: 'BBB',
                      item2: 'CCC',
                      item3: 'DDD'
                    },
                    {
                      item0: 'AAA',
                      item1: 'BBB',
                      item2: 'CCC',
                      item3: 'DDD'
                    }
                  ],
                  tableSelection: '',
                  multiTempArr: [],
                  currentPage: 1,
                  pageSize: 20,
                  total: 10,
                  params: {
                    query_type: 1
                  },
                  options: [{
                    value: '1',
                    label: '黄金糕'
                  }, {
                    value: '2',
                    label: '双皮奶'
                  }]
                }
              },
              created () {
                this.getList()
              },
              methods: {
                /**
                * @description 首屏数据
                * */
                search (val) {
                  console.log(this.filter)
                  this.getList()
                },
                /**
                * @description 获取数据
                */
                getList () {
                  let params = {}
                },
                /**
                * @description reset
                */
                resetFilter () {
                  this.filter = {
                    simpleInput: '',
                    selectValue: '',
                    time: []
                  }
                },
                /**
                * @description 查看操作
                */
                handleClick (val) {

                },
                /**
                * @description 翻页
                */
                handleSizeChange (val) {
                  this.pageSize = val
                },
                handleCurrentChange (val) {
                  this.currentPage = val
                }
              }
            }
            &lt;/script&gt;

            &lt;style lang='scss' scoped&gt;
            .module-container {
              .a-btn {
                text-decoration: none;
              }
              .filter {
                background-color: #fff;
                padding: 20px 30px 10px;
                .search-btn {
                  margin-left: 100px;
                }
              }
              .list {
                background-color: #fff;
                margin-top: 20px;
                padding: 30px;
                .button-row {
                  margin-bottom: 20px;
                }
                .warning {
                  color: #f00;
                }
                .page-box {
                  height: 32px;
                  margin-top: 20px;
                  .el-pagination {
                    float: right;
                  }
                }
              }
              .dot {
                position: absolute;
              }
            }
            &lt;/style&gt;


        </highlight-code>
        <textarea v-show='showCopyCode' ref="textarea">
          {{template}}
        </textarea>     
      </div>
    </div>
    
  </section>
</template>
<script>

import { getDetailData } from '@/api/api'


export default {
  data () {
    return {
      show: true,
      showCopyCode: false,
      imgUrl: '',
      template: ''
    }
  },
  components: {
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
          this.template = res.data.resultList[0].code
          this.imgUrl = res.data.resultList[0].imgUrl
        }
      })
    },
    toggleShow () {
      this.show = !this.show
    },
    copyCode (e) {
      let _ = this
      let msg = this.$refs.textarea.value
      this.$copyText(msg).then(function (e) {
        _.$message({ message: '复制成功', type: 'success'})
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

