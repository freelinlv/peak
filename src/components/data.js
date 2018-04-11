const str = `
<template>
      <div class='module-container'>
        <div class='filter'>
          <!-- 查询栏 -->
          <el-form :model='filter' ref='filter' :inline='true' :rules='filterRule' label-position='right'>
            <el-form-item label-width='100px' label='输入框' prop='simpleInput'>
              <el-input v-model.trim='filter.simpleInput' placeholder='请输入'></el-input>
            </el-form-item>
            <el-form-item label-width='100px' label='请选择' prop='simpleSelect'>
              <el-select v-model="filter.selectValue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-row :gutter="100" style="margin-left: 50px;">
              <el-col>   
                <el-button type="primary" @click="search">查询</el-button>
                <el-button  @click="resetFilter" style="margin-left: 15px;">重置</el-button>
              </el-col>  
            </el-row>
          </el-form>
        </div>
        <!-- 列表 -->
        <div class="list">
          <el-table :data='tableData' ref='multipleTable' tooltip-effect='dark' :fit='true'>
            <el-table-column prop="item0" label="列0"></el-table-column>
            <el-table-column prop="item1" label="列1"></el-table-column>
            <el-table-column prop="item2" label="列2"></el-table-column>   
          </el-table>
          <div class='page-box'>
            <el-pagination
              @size-change='handleSizeChange'
              @current-change='handleCurrentChange'
              :current-page='currentPage'
              :page-sizes='[20, 50, 100, 200]'
              :page-size='pageSize'
              layout="total, sizes, prev, pager, next, jumper"
              :total='total'>
            </el-pagination>
          </div>
        </div>
      </div>
    </template>

    <script>

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
              pattern: /^ASNd{13}$/,
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
    </script>

    <style>
      .a-btn {
        text-decoration: none;
      }
      
      .el-pagination {
        float: right;
        margin: 16px;
      }
  </style>
`
export default str
