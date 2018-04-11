<template>
  <section>
    <el-input v-model="lineNum" placeholder="行" class="line-row"></el-input> X
    <el-input v-model="rowNum" placeholder="列" class="line-row"></el-input> 
    <el-button type="primary" @click="addOrderInfo">新增</el-button>
    <section v-for="(orderInfo,index) in orderInfoList"
      :key="index">
      <h2 class="tit">
        <input v-model="tit[index]" placeholder="标题">
        <el-button type="primary" @click="deleteOrder(index)">删除</el-button>
      </h2>
      <el-table
        :data="orderInfoList[index]"
        border
        style="width: 100%"
        :span-method="arraySpanMethod[index]"
        :cell-style="tableCellStyle"
        :show-header="false">
        <el-table-column v-for='(item,num) in orderInfoList[index]' :key='num'>
          <template slot-scope="scope">
            <input class="inputText" v-model="scope.row.twoLine" placeholder="str" v-if="num%2!==0">
            <input class="inputLabel" v-model="scope.row.oneLine" placeholder="label" v-if="num%2===0">
          </template>
        </el-table-column>
        <!-- <el-table-column>
          <template slot-scope="scope">
            <input class="inputText" v-model="scope.row.twoLine" placeholder="str">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <input class="inputLabel" v-model="scope.row.threeLine" placeholder="label">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <input class="inputText" v-model="scope.row.fourLine" placeholder="str">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <input class="inputLabel" v-model="scope.row.fiveLine" placeholder="label">
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <input class="inputText" v-model="scope.row.sixLine" placeholder="str">
          </template>
        </el-table-column> -->
      </el-table>
    </section>
    <!-- <h2 class="tit">调整商品</h2> -->
<!-- 调整商品显示 -->
    this.orderInfoList = 
    <ul v-for="(orderInfo,index) in orderInfoList"
      :key="index">
        <!-- {{orderInfo}}<br> -->
        [
        <div v-for="(obj,num) in orderInfo" :key="num"> 
          <li class="splace6">{</li>
            <li class="splace7">oneLine: "{{obj.oneLine}}",</li>
            <li class="splace7">twoLine: res.{{obj.twoLine}},</li>
            <li class="splace7" v-if="obj.threeLine">threeLine: "{{obj.threeLine}}",</li>
            <li class="splace7" v-if="obj.threeLine">fourLine: res.{{obj.fourLine}},</li>
            <li class="splace7" v-if="obj.fiveLine">fiveLine: "{{obj.fiveLine}}",</li>
            <li class="splace7" v-if="obj.fiveLine">sixLine: res.{{obj.sixLine}}</li>
          <span class="splace6">}</span>
          <span v-if="num !==orderInfo.length-1">,</span>
        </div>
        ]
        <span v-if="index !==orderInfoList.length-1">,</span>
        <li></li>
    </ul>
<!-- <ul>
   <li class="splace3">addOrderInfo () {</li>
      <li class="splace4">let mdc = 'mdc'</li>
      <li class="splace4">this.orderInfoList.push(</li>
        <li class="splace5">[</li>
          <li class="splace6">{</li>
            <li class="splace7">oneLine: '',</li>
            <li class="splace7">twoLine: mdc,</li>
            <li class="splace7">threeLine: '',</li>
            <li class="splace7">fourLine: '',</li>
            <li class="splace7">fiveLine: '',</li>
            <li class="splace7">sixLine: ''</li>
          <li class="splace6">},</li>
        <li class="splace5">]</li>
      <li class="splace4">)</li>
    <li class="splace3">},</li>
</ul> -->
    <!-- <h2 class="tit">调整单信息</h2>
    <el-table
      :data="orderInfo"
      border
      style="width: 100%"
      :span-method="arraySpanMethod"
      :cell-style="tableCellStyle"
      :show-header="false">
      <el-table-column
        prop="oneLine">
      </el-table-column>
      <el-table-column
        prop="twoLine">
      </el-table-column>
      <el-table-column
        prop="threeLine">
      </el-table-column>
      <el-table-column
        prop="fourLine">
      </el-table-column>
      <el-table-column
        prop="fiveLine">
      </el-table-column>
      <el-table-column
        prop="sixLine">
      </el-table-column>
    </el-table> -->
    <!-- <h2 class="tit">调整商品</h2> -->
    <template>
      <get-preview
      ref="dialog"
      >
      </get-preview>
    </template>
</section>

</template>
<script src="./tablestyle.js"></script>

<style lang="scss" scoped>
  section{
    padding: 20px;
    padding-bottom: 0;
    background: #fff;
    ul{
      li{
        list-style: none;
      }
      .splace3{
        padding-left: 10px; 
      }
      .splace4{
        padding-left: 20px; 
      }
      .splace5{
        padding-left: 30px; 
      }
      .splace6{
        padding-left: 40px; 
      }
      .splace7{
        padding-left: 50px; 
      }
      .splace8{
        padding-left: 60px; 
      }
      .splace9{}
    }
    .tit{
      color: #5a5e66;
      input{
        background-color: #fff;
        -webkit-appearance: none;
        border-radius: 4px;
        border: 1px solid transparent;
        box-sizing: border-box;
        display: inline-block;
        // font-size: inherit;
        // height: 40px;
        // line-height: 1;
        color: #5a5e66;
        font-size: 24px;
        outline: 0;
        font-weight: bold;
        padding: 0;
        width: 90%;
      }
    }
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
    .inputLabel{
      background-color: rgb(245, 247, 250);
      -webkit-appearance: none;
      border-radius: 4px;
      border: 1px solid transparent;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 1;
      outline: 0;
      padding: 0;
      width: 100%;
    }
    .inputText{
      background-color: #fff;
      -webkit-appearance: none;
      border-radius: 4px;
      border: 1px solid transparent;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 1;
      outline: 0;
      padding: 0;
      width: 100%;
    }
    .line-row{
      width: 50px;
    }
  }
</style>
