<template>
  <section>
    <el-input v-model="rowNum" placeholder="列" class="line-row"></el-input> X
    <el-input v-model="lineNum" placeholder="行" class="line-row"></el-input> 
    <el-button type="primary" @click="addOrderInfo">新增</el-button>
    <el-button type="primary" @click="output">输出</el-button>
    <section v-for="(orderInfo,index) in orderInfoList"
      :key="index">
      <el-table
        :data="orderInfo"
        border
        style="width: 100%"
        :span-method="arraySpanMethod[index]"
        :cell-style="tableCellStyle"
        :show-header="false"
        class="td-no-padding">
        <el-table-column v-for='num in size[index][0]' :key='num'>
          <template slot-scope="scope" class="w2390">
            <div class="cell-container" @click="spanMethod(index,scope.$index,num-1)">
              <input class="inputText" v-model="scope.row['line'+num]" placeholder="str" v-if="num%2===0">
              <input class="inputLabel" v-model="scope.row['line'+num]" placeholder="laber" v-if="num%2!==0">
            </div>
          </template>
        </el-table-column>
      </el-table>
           <h2 class="tit">
        <el-button type="primary" @click="deleteOrder(index)">删除</el-button>
        <el-button type="primary" @click="tableCheck(index,true)" v-if="spanIndex !== index">合并单元格</el-button>
        <el-button type="primary" @click="tableCheck(index,false)" v-if="spanIndex === index">完成合并</el-button>
      </h2>
    </section>
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
    .cell-container{
      padding: 12px 0;
    }
  }
</style>
