<template>
  <div class="wrapper">
    <div class="demo-control">
      <el-button class="like-box" @click='handleLike' :plain="true" type="info" size="small">
          <i :class="clickLike?'clickLike':''"></i>
          <i :class="isLike?'like':'unlike'"></i>
          <span class="like-mount">
            {{starText}}
          </span>
      </el-button>
      <el-button @click="toggleShow" :plain="true" type="info" size="small">{{this.show?'隐藏代码': '显示代码'}}</el-button>
      <el-button @click="copyCode" :plain="true" type="info" size="small" :key="5">拷贝代码</el-button>

      <el-button @click="preview" :plain="true" type="info" size="small" :key="3">预览效果</el-button>
    </div>

    <div class="container" ref="container">
      <div class="preview-area area" ref="preview" :style="{width: previewWidth}">
        <div>
          <img :src="imgUrl" alt="" width="100%" />
        </div>
      </div>
      <div :class="['source-area', 'area', { 'hide': hideSourceArea}]" ref="source" :style="{width: sourceWidth}">
        <div class="editor-resizer" @mousedown='handleMousedown' @dblclick='handleDblclick' title="拖拽调整，双击居中"></div>
        <highlight-code lang='vue' v-if='show'>
          {{ code }}
        </highlight-code>
      </div>
    </div>
  </div>
</template>
<script>

import { getDetailData, addfavourite } from '@/api/api'
import util from '@/common/js/util'

export default {
  data () {
    return {
      show: true,
      imgUrl: '',
      code: '',
      options: {
        selectOnLineNumbers: false
      },
      isLike: false,
      isDrag: false,
      previewWidth: '50%',
      sourceWidth: '50%',
      hasRegisterMouseEvent: false,
      hideSourceArea: false,
      favourite: 0,
      clickLike: false,
      starText: 'Star'
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
  mounted () {
    this.containerWidth = this.$refs.container.clientWidth
    this.bodyWidth = document.body.clientWidth
    if (!this.hasRegisterMouseEvent) {
      this.hasRegisterMouseEvent = true
      document.addEventListener('mouseup', this.handleMouseup, false)
      document.addEventListener('mousemove', this.handleMousemove, false)
    }
  },
  destroyed () {
    // 组件销毁时，手动移除原生js绑定的事件
    document.removeEventListener('mouseup', this.handleMouseup, false)
    document.removeEventListener('mousemove', this.handleMousemove, false)
  },
  methods: {
    handleLike () {
      this.isLike = !this.isLike
      if (this.starText === 'Star') {
        this.starText = 'Unstar'
      } else {
        this.starText = 'Star'
      }
      if (this.isLike === false) return
      this.clickLike = true
      window.setTimeout(() => {
        this.clickLike = false
      }, 1000)
      const params = {
        id: this.$router.currentRoute.params.id,
        favourite: this.favourite
      }
      addfavourite(params).then((res) => {
      })
    },
    handleMousedown (event) {
      this.isDrag = true
      // 计算鼠标与拖拽DOM的相对位置
      this.left = event.clientX - util.offsetLeft(event.target)
    },
    handleMousemove (event) {
      if (this.isDrag) {
        event.preventDefault()
        let noWorkLeft = util.offsetLeft(this.$refs.container) + this.left
        let noWorkRight = 20 + this.left
        if (event.clientX <= noWorkLeft) {
          this.previewWidth = '0%'
          this.sourceWidth = '100%'
        } else if (this.bodyWidth - event.clientX <= noWorkRight) {
          let sourcePercent = 20 / this.containerWidth * 100
          this.sourceWidth = sourcePercent + '%'
          this.previewWidth = 100 - sourcePercent + '%'
        } else {
          let distance = event.movementX
          let previewWidth = this.$refs.preview.clientWidth
          let sourceWidth = this.$refs.source.clientWidth

          // 容器宽度变化调整：当容器宽度发生变化时，及时调整宽度，避免出现计算百分比之和超出100%的情况
          let containerDifference = this.containerWidth - previewWidth - sourceWidth
          if (Math.abs(containerDifference) >= 10) {
            this.containerWidth = previewWidth + sourceWidth
          }

          let newPreviewWidth = this.$refs.preview.clientWidth + distance
          let newSourceWidth = this.$refs.source.clientWidth - distance

          if (newPreviewWidth <= 0) {
            newSourceWidth += newPreviewWidth
            newPreviewWidth = 0
          }

          // 临界值处理：因为布局问题，代码区内最低宽度需要保持20px(即拖动条的宽度)
          if (newSourceWidth >= 20) {
            this.previewWidth = newPreviewWidth / this.containerWidth * 100 + '%'
            this.sourceWidth = newSourceWidth / this.containerWidth * 100 + '%'
          }
        }
      }
    },
    handleMouseup (event) {
      this.isDrag = false
    },
    handleDblclick (event) {
      this.previewWidth = '50%'
      this.sourceWidth = '50%'
    },
    getList () {
      let params = {
        id: this.$router.currentRoute.params.id
      }
      getDetailData(params).then((res) => {
        if (res.data.code === 200) {
          this.code = res.data.resultList[0].code.trim()
          this.imgUrl = res.data.resultList[0].imgUrl
          this.favourite = res.data.resultList[0].favourite
        }
      })
    },
    toggleShow () {
      this.show = !this.show
      if (this.show) {
        this.hideSourceArea = false
        this.previewWidth = '50%'
        this.sourceWidth = '50%'
      } else {
        this.hideSourceArea = true
        let sourcePercent = 20 / this.containerWidth * 100
        this.sourceWidth = sourcePercent + '%'
        this.previewWidth = 100 - sourcePercent + '%'
      }
    },
    copyCode (e) {
      let _ = this
      let msg = this.code
      this.$copyText(msg).then(function (e) {
        _.$message({ message: '复制成功', type: 'success' })
      }, function (e) {
        _.$message.error('当前浏览器不支持拷贝功能')
      })
    },
    preview () {
      window.open('http://140.143.164.116:9998/')
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  position: relative;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
}

.container {
  width: 100%;
  display: flex;
  overflow: hidden;
  .area {
    overflow: hidden;
    &.hide {
      transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
    }
  }
}

.preview-area>div {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  height: 600px;
}

.preview-area>div img {
  display: inline;
  vertical-align: middle;
  user-select: none;
}

.source-area {
  border-left: 1px solid #ebebeb;
  height: 600px;
  display: flex;
  .editor-resizer {
    width: 18px;
    height: 100%;
    cursor: col-resize;
    // border-left: 1px solid rgba(255, 255, 255, 0.1);
    // border-right: 1px solid rgba(0, 0, 0, 0.4);
    background: #dedada;
    flex: none;
  }
  pre {
    width: 100%;
    overflow: scroll;
    margin: 0;
    &>hljs {
      overflow-x: scroll;
    }
  }
}


.demo-control {
  padding: 10px 20px;
  text-align: right;
  background: #fafafa;
  color: #409EFF;
  cursor: pointer;
}
.like-box{
  text-align: left;
  height: 32px;
  width: 80px;
  position: absolute;
  right: 302px;
  padding-left: 5px;
  .unlike{
    background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/f58a89a22c0362d7acbf.svg') no-repeat center center;
    background-size: 100% 100%;
    background-position: -5px -7px;
    display: inline-block;
    width: 28px;
    height: 28px;
  }
  .like{
    background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/9762aadd51b56af0fc24.svg') no-repeat center center;
    background-size: 100% 100%;
    background-position: -5px -7px;
    display: inline-block;
    width: 28px;
    height: 28px;
  }
  .like-mount{
    position: absolute;
    right: 10px;
    bottom: 7px;
    font-size: 14px;
  }
  .clickLike{
    background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/9762aadd51b56af0fc24.svg') no-repeat center center;
    width: 30px;
    height: 30px;
    animation: happy 1s ease;
    background-size: 100% 100%;
    background-position: -5px -7px;
    position: absolute;
    display: inline-block;
    opacity: 0;
    transform: translateY(-20px) rotateZ(5deg);
  }
  @keyframes happy{
    0%{
      opacity: 0;
      transform: translateY(-10px) rotateZ(15deg);
    }
    50%{
      opacity: 0.75;
      transform: scale(1) translateY(-15px) rotateZ(-15deg);
    }
    100%{
      opacity: 0;
      transform: scale(2) translateY(-20px) rotateZ(15deg);
    }
  }
}
</style>
