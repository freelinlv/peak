import Editor from './editor'
import Preview from './preview'
import parser from '../utils/parser'
import compiler from '../utils/compiler'

export default {
  name: 'Vuep',

  props: {
    template: String,
    options: {},
    keepData: Boolean,
    value: String,
    imgUrl: String,
    scope: Object,
    showCode: Boolean
  },

  data () {
    return {
      isDrag: false,
      previewWidth: '50%',
      sourceWidth: '50%',
      hasRegisterMouseEvent: false,
      hideSourceArea: false,
      content: '',
      preview: '',
      styles: '',
      error: ''
    }
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
  render (h) {
    let win

    /* istanbul ignore next */
    if (this.error) {
      this.$emit('input-error', true)
      win = h('div', {
        class: 'vuep-preview',
        style: {width: this.previewWidth},
        ref: 'preview'
      }, [h('img', {
        style: {width: '100%'},
        attrs: { src: this.imgUrl, alt: this.error }
      })])
    } else {
      this.$emit('input-error', false)
      win = h(Preview, {
        class: 'vuep-preview',
        props: {
          value: this.preview,
          styles: this.styles,
          keepData: this.keepData
        },
        style: {width: this.previewWidth},
        ref: 'preview',
        on: {
          error: this.handleError
        }
      })
    }

    return h('div', { class: 'vuep container', ref: 'container' }, [
      h(Editor, {
        class: 'vuep-editor',
        props: {
          value: this.content,
          options: this.options
        },
        ref: 'source',
        style: {width: this.sourceWidth},
        on: {
          change: [this.executeCode, val => this.$emit('input', val)]
        }
      }),
      h('div', {
        class: 'editor-resizer',
        title: '拖拽调整，双击居中',
        on: {
          mousedown: this.handleMousedown,
          dblclick: this.handleDblclick
        }
      }),
      win
    ])
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        val && this.executeCode(val)
      }
    }
  },

  created () {
      /* istanbul ignore next */
    if (this.$isServer) return
    let content = this.template

    if (/^[.#]/.test(this.template)) {
      const html = document.querySelector(this.template)
      if (!html) throw Error(`${this.template} is not found`)

      /* istanbul ignore next */
      content = html.innerHTML
    }

    if (content) {
      this.executeCode(content)
      this.$emit('input', content)
    }
  },

  methods: {
    changeshowCode (isShow) {
      this.sourceWidth = isShow ? '50%' : '0%'
      this.previewWidth = isShow ? '50%' : '100%'
    },
    offsetLeft (el) {
      var l = 0
      while (el) {
        l = l + el.offsetLeft + el.clientLeft
        el = el.offsetParent
      }
      return l
    },
    handleMousedown (event) {
      this.isDrag = true
      // 计算鼠标与拖拽DOM的相对位置
      this.left = event.clientX - this.offsetLeft(event.target)
    },
    handleMousemove (event) {
      if (this.isDrag) {
        event.preventDefault()
        let noWorkLeft = this.offsetLeft(this.$refs.container) + this.left
        let noWorkRight = 20 + this.left
        if (event.clientX <= noWorkLeft) {
          let sourcePercent = 20 / this.containerWidth * 100
          this.sourceWidth = sourcePercent + '%'
          this.previewWidth = 100 - sourcePercent + '%'
        } else if (this.bodyWidth - event.clientX <= noWorkRight) {
          this.previewWidth = '0%'
          this.sourceWidth = '100%'
        } else {
          let distance = event.movementX
          let previewWidth = this.$refs.preview.$vnode ? this.$refs.preview.$vnode.elm.clientWidth : this.$refs.preview.clientWidth
          let sourceWidth = this.$refs.source.$vnode.elm.clientWidth
          // 容器宽度变化调整：当容器宽度发生变化时，及时调整宽度，避免出现计算百分比之和超出100%的情况
          let containerDifference = this.containerWidth - previewWidth - sourceWidth
          if (Math.abs(containerDifference) >= 10) {
            this.containerWidth = previewWidth + sourceWidth
          }

          let newPreviewWidth = (this.$refs.preview.$vnode ? this.$refs.preview.$vnode.elm.clientWidth : this.$refs.preview.clientWidth) - distance
          let newSourceWidth = this.$refs.source.$vnode.elm.clientWidth + distance

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
    handleError (err) {
      /* istanbul ignore next */
      this.error = err
    },

    executeCode (code) {
      this.error = ''
      const result = parser(code)

      /* istanbul ignore next */
      if (result.error) {
        this.error = result.error.message
        return
      }

      const compiledCode = compiler(result, this.scope)

      /* istanbul ignore next */
      if (compiledCode.error) {
        this.error = compiledCode.error.message
        return
      }

      this.content = result.content
      this.preview = compiledCode.result
      if (compiledCode.styles) this.styles = compiledCode.styles
    }
  }
}
