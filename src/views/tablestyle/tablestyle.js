export default {
  data () {
    return {
      loading: false,
      show: '',
      rowNum: 4,
      lineNum: 5,
      size: [],
      orderInfoList: [],
      arraySpanMethod: []
    }
  },
  created () {
    this.getInfo()
    this.getList()
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
      for (let i = 0; i < this.rowNum; i++) {
        obj['line' + i] = ''
      }
      for (let i = 0; i < this.lineNum; i++) {
        arr.push({})
      }
      let carr = []
      this.arraySpanMethod.push(({row, column, rowIndex, columnIndex}, returnFlag) => {
        if (returnFlag) {
          return carr
        }
      })
      this.orderInfoList.push(arr)
    },
    deleteOrder (n) {
      this.size.splice(n, 1)
      this.orderInfoList.splice(n, 1)
      this.arraySpanMethod.splice(n, 1)
    },
    tableCheck (arg) {
      this.spanIndex = arg
    },
    spanMethod (listNum, rowNum, lineNum) {
      if (lineNum === 0) {
        return
      }
      let checkArr = this.arraySpanMethod[listNum]({}, true)
      // console.log(checkArr)
      // 合并单元格操作
      console.log(checkArr)
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
              console.log('iI')
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
      this.$set(this.arraySpanMethod, listNum, fn)
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
