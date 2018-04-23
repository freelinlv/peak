export default {
  data () {
    return {
      show: '',
      rowNum: 4,
      lineNum: 5,
      spanIndex: false,
      size: [],
      orderInfoList: [],
      arraySpanMethod: [],
      arraySpanMethodstr: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      // let res = {}
      // this.orderInfo = []
    },
    addOrderInfo () {
      this.size.push([ Number(this.rowNum), Number(this.lineNum) ])
      let arr = []
      let obj = {}
      // let checkArr = []
      for (let i = 1; i < this.rowNum + 1; i++) {
        obj['line' + i] = ''
      }
      for (let i = 0; i < this.lineNum; i++) {
        let lineObj = {}
        Object.assign(lineObj, obj)
        arr.push(lineObj)
      }
      let carr = []
      this.arraySpanMethod.push(({row, column, rowIndex, columnIndex}, returnFlag) => {
        if (returnFlag) {
          return carr || []
        }
      })
      this.orderInfoList.push(arr)
      this.arraySpanMethodstr.push(`({row, column, rowIndex, columnIndex}, returnFlag) => {
        if (returnFlag) {
          return carr || []
        }
      }`)
    },
    deleteOrder (n) {
      this.size.splice(n, 1)
      this.orderInfoList.splice(n, 1)
      this.arraySpanMethod.splice(n, 1)
      this.arraySpanMethodstr.splice(n, 1)
    },
    tableCheck (index, flag) {
      if (flag) {
        this.spanIndex = index
      } else {
        this.spanIndex = false
      }
    },
    // 还原已合并的单元格
    restore (n) {
      let carr = []
      let fn = (obj, returnFlag) => {
        if (returnFlag) {
          return carr
        }
      }
      this.$set(this.arraySpanMethod, n, fn)
    },
    spanMethod (listNum, rowNum, lineNum) {
      if (lineNum === 0 || this.spanIndex === false) {
        return
      }
      let checkArr = this.arraySpanMethod[listNum]({}, true)
      // 合并单元格操作
      if (checkArr.length === 0) {
        checkArr.push([rowNum, lineNum - 1, 2])
      } else {
        let spanflag = {}
        checkArr.forEach((item, index) => {
          if ((item[0] === rowNum)) {
            if ((item[1] + item[2]) === lineNum) {
              spanflag.after = true
              spanflag.afterIndex = index
              // 点击已被合并的单元格
            } else if (item[1] === lineNum) {
              spanflag.before = true
              spanflag.beforeIndex = index
            }
          }
        })
        if (!spanflag.after && !spanflag.before) {
          checkArr.push([rowNum, lineNum - 1, 2])
        } else if (spanflag.after && spanflag.before) {
          checkArr[spanflag.afterIndex][2] = checkArr[spanflag.afterIndex][2] + checkArr[spanflag.beforeIndex][2]
          checkArr.splice(spanflag.beforeIndex, 1)
        } else if (spanflag.after) {
          checkArr[spanflag.afterIndex][2] += 1
        } else if (spanflag.before) {
          checkArr[spanflag.beforeIndex][2] += 1
          checkArr[spanflag.beforeIndex][1] -= 1
        }
      }
      let fn = ({row, column, rowIndex, columnIndex}, returnFlag) => {
        if (returnFlag) {
          if (!checkArr) {
            checkArr = []
          }
          return checkArr
        }
        let returnArr = []
        checkArr.forEach((item) => {
          if (rowIndex === item[0]) {
            if (columnIndex === item[1]) {
              returnArr = [1, item[2]]
            } else if (columnIndex > item[1] && columnIndex < (item[1] + item[2])) {
              returnArr = [0, 0]
            }
          }
        })
        if (returnArr.length !== 0) {
          return returnArr
        }
      }
      let fnStr = `({row, column, rowIndex, columnIndex}, returnFlag) => {
        let returnArr = []
        let arr = ${JSON.stringify(checkArr)}
        arr.forEach((item) => {
          if (rowIndex === item[0]) {
            if (columnIndex === item[1]) {
              returnArr = [1, item[2]]
            } else if (columnIndex > item[1] && columnIndex < (item[1] + item[2])) {
              returnArr = [0, 0]
            }
          }
        })
        if (returnArr.length !== 0) {
          return returnArr
        }
      }`
      this.$set(this.arraySpanMethod, listNum, fn)
      this.arraySpanMethodstr[listNum] = fnStr
    },
    // 去掉表格鼠标划入的背景颜色，项目名增加背景色
    tableCellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex % 2 === 0) {
        return {background: '#f5f7fa', textIndent: '20px'}
      } else {
        return {background: '#fff'}
      }
    },
    output () {
      let orderInfoData = []
      let orderInfoFn = []
      this.orderInfoList.forEach((arr, index) => {
        orderInfoData[index] = []
        orderInfoFn[index] = []
        arr.forEach((obj, num) => {
          let strData = {}
          let strFn = {}
          // console.log(this.size[index][0])
          for (let i = 1; i < this.size[index][0] + 1; i++) {
            if (obj['line' + i] === '') {
              continue
            }
            if (i % 2 !== 0) {
              strData['line' + i] = obj['line' + i]
              strFn['line' + i] = obj['line' + i]
            } else {
              strData['line' + i] = ''
              strFn['line' + i] = 'res.' + obj['line' + i] + 'laststr'
            }
          }
          orderInfoData[index].push(strData)
          orderInfoFn[index].push(strFn)
        })
      })
      let orderInfoDataStr = JSON.stringify(orderInfoData).replace(/"/g, "'")
      let orderInfoFnStr = JSON.stringify(orderInfoFn).replace(/"/g, "'")
      orderInfoFnStr = orderInfoFnStr.replace(/'res/g, 'res').replace(/laststr'/g, '')
      let str = `<template>
        <section>
          <section v-for="(orderInfo,index) in orderInfoList"
            :key="index">
            <el-table
              :data="orderInfo"
              border
              style="width: 100%"
              :span-method="arraySpanMethod[index]"
              :cell-style="tableCellStyle"
              :show-header="false">
              <el-table-column v-for='num in size[index][0]' :key='num'>
                <template slot-scope="scope" class="w2390">
                  {{scope.row['line'+num]}}
                </template>
              </el-table-column>
            </el-table>
          </section>
      </section>
      </template>
      <script>
      export default {
        data () {
          return {
            show: '',
            size: ${JSON.stringify(this.size)},
            orderInfoList: ${orderInfoDataStr},
            arraySpanMethod: [${this.arraySpanMethodstr}]
          }
        },
        created () {
          this.getInfo()
        },
        methods: {
          getInfo () {
            let res = {}
            this.orderInfoList = ${orderInfoFnStr}
          },
          // 去掉表格鼠标划入的背景颜色，项目名增加背景色
          tableCellStyle ({row, column, rowIndex, columnIndex}) {
            if (columnIndex % 2 === 0) {
              return {background: '#f5f7fa', textIndent: '20px'}
            } else {
              return {background: '#fff'}
            }
          }
          }
        }
      </script>
      <style lang="scss" scoped>
        section{
          padding: 20px;
          padding-bottom: 0;
          background: #fff;
          .el-pagination{
            text-align: right;
          }
          .table-area{
            overflow: hidden;
            background-color: #fff;
          }
          .content-rowspan>div{
            padding: 5px 0;
            border-bottom: 1px solid #e6ebf5;
          }
          .line-row{
            width: 50px;
          }
        }
      </style>
      `
      console.log(str)
    }
  }
}
