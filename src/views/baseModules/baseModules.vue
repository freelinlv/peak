<template>
  <div>
    <el-row>
      <el-col :span="4" class="">
        <el-card class="box-card text item"  >
          <div @click="showConfig('input')">
            {{'新建输入框'}}
            <el-icon class="el-icon-plus"></el-icon>
          </div>
        </el-card>
        <el-card class="box-card text item"  >
          <div @click="showConfig('select')">
            {{'新建选择框'}}
            <el-icon class="el-icon-plus"></el-icon>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <vuep :value="code"></vuep>
      </el-col>
    </el-row>
    <el-dialog title="配置" :visible.sync="inputVisitibly">
      <el-form ref="inputForm" :model="inputForm" label-position="right" :inline='true' :rules="rules" label-width="100px">
        <el-row>
          <el-form-item label='label'>
            <el-input v-model='inputForm.label'></el-input>
          </el-form-item>
          <el-form-item label='placeholder'>
            <el-input v-model='inputForm.placeholder'></el-input>
          </el-form-item>
          <el-form-item label='model'>
            <el-input v-model='inputForm.model'></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideConfig('input')">取 消</el-button>
        <el-button type="primary" @click="addInput">添加</el-button>
      </span>
    </el-dialog>
    <el-dialog title="配置" :visible.sync="selectVisitibly">
      <el-form ref="selectForm" :model="selectForm" label-position="right" :inline='true' :rules="rules" label-width="100px">
        <el-row>
          <el-form-item label='默认选中'>
            <el-input v-model='selectForm.value'></el-input>
          </el-form-item>
          <el-form-item label='键值对'>
            <el-input v-model='selectForm.data'></el-input>
          </el-form-item>
          <el-form-item label='label'>
            <el-input v-model='selectForm.label'></el-input>
          </el-form-item>
          <el-form-item label='placeholder'>
            <el-input v-model='selectForm.placeholder'></el-input>
          </el-form-item>
          <el-form-item label='model'>
            <el-input v-model='selectForm.model'></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideConfig('select')">取 消</el-button>
        <el-button type="primary" @click="addSelect">添加</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>
<script>

import search from '@/components/search.js'
export default {
  data () {
    return {
      selectVisitibly: false,
      inputVisitibly: false,
      code: '',
      inputForm: {},
      selectForm: {},
      rules: {}
    }
  },
  created () {
    this.code = search
  },

  methods: {
    showConfig (type) {
      this[type + 'Visitibly'] = true
    },
    hideConfig (type) {
      this[type + 'Visitibly'] = false
    },
    addInput () {
      let tempStr = `<el-form-item label-width='100px' label='${this.inputForm.label}'>
        <el-input v-model='filter.${this.inputForm.model}' placeholder='${this.inputForm.placeholder}'></el-input>
      </el-form-item>${'\n'}`
      let dataStr = `${this.inputForm.model} : '',${'\n'}`
      let resetStr = `${this.inputForm.model} : '',${'\n'}`
      let code = this.code
      let tempNum = code.indexOf('<!-- form -->') - 1
      code = code.substring(0, tempNum) + tempStr + code.substring(tempNum)
      let dataNum = code.indexOf('//filter') - 1
      code = code.substring(0, dataNum) + dataStr + code.substring(dataNum)
      let resetNum = code.indexOf('//重置查询条件') - 1
      code = code.substring(0, resetNum) + resetStr + code.substring(resetNum)
      this.code = code
    },
    addSelect () {
      let tempStr = `<el-form-item label="${this.selectForm.label}">
          <el-select popper-class="searchZoom" v-model="filter.${this.selectForm.model}" clearable placeholder="${this.selectForm.placeholder}">
            <el-option
              v-for="(item,index) in ${this.selectForm.model}List"
              :key="${this.selectForm.valve}"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>${'\n'}`
      let dataStr = `${this.selectForm.model}List : ${this.selectForm.data},${'\n'}`
      let filterStr = `${this.selectForm.model} : ${this.selectForm.value},${'\n'}`
      let resetStr = `${this.selectForm.model} :  ${this.selectForm.value},${'\n'}`
      let code = this.code
      let tempNum = code.indexOf('<!-- form -->') - 1
      code = code.substring(0, tempNum) + tempStr + code.substring(tempNum)
      let filterNum = code.indexOf('//filter') - 1
      code = code.substring(0, filterNum) + filterStr + code.substring(filterNum)
      let dataNum = code.indexOf('//data') - 1
      code = code.substring(0, dataNum) + dataStr + code.substring(dataNum)
      let resetNum = code.indexOf('//重置查询条件') - 1
      code = code.substring(0, resetNum) + resetStr + code.substring(resetNum)
      this.code = code
    }
  }
}
</script>
