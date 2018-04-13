<template>
  <el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <template v-for="item in MODULE_TYPE_LIST">
        <el-tab-pane :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
      </template> 
    </el-tabs>
    <el-col :span="8" v-for="(item, index) in dataArray" :key="index" class='card'>
      <el-card>
        <figure class="snip1584">
          <div class="img-container">
            <img :src=item.imgUrl class="image" width='100%'>
          </div>
          <div class="info">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.create_time}}</time>
              <span class="like-box">
                <i class="like"></i>
                <span class="like-mount">
                  {{item.favourite}}
                </span>
              </span>
            </div>
          </div>
          <figcaption @click="jump(item.id)">
            <h3>{{item.desc}}</h3>
            <h5 style="cursor: pointer;">详情</h5>
          </figcaption>
        </figure>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getDetail } from '@/api/api'
import { MODULE_TYPE_LIST } from '@/common/js/config'
import util from '../../common/js/util'
export default {
  data () {
    return {
      activeName: '',
      dataArray: [],
      MODULE_TYPE_LIST: MODULE_TYPE_LIST
    }
  },
  created () {
    this.getDetail('')
  },
  methods: {
    getDetail (defaultWord) {
      let params = {
        category: defaultWord
      }
      getDetail(params).then((res) => {
        if (res.data.code === 200) {
          this.dataArray = res.data.resultList
        }
      })
    },
    handleClick (tab, event) {
      console.log(tab.name)
      this.getDetail(tab.name)
    },
    jump (id) {
      let url = `/detail/${id}`
      this.$router.push(url)
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  width: 330px;
  margin: 5px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.button a {
  text-decoration: none;
  color: #409eff;
}

.img-container {
  width: 90%;
  height: 120px;
  margin: 0 auto;
}

.image {
  display: block;
  width: auto;
  height: 100%;
  margin: 0 auto;
}

.info {
  margin: 0 10px;
  color: #000;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.like-box{
  // background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/f58a89a22c0362d7acbf.svg') no-repeat center center;
  position: absolute;
  bottom: 2px;
  color: tomato;
  right: 20px;
  .like{
    background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/9762aadd51b56af0fc24.svg') no-repeat center center;
    background-size: 100% 100%;
    background-position: 5px 7px;
    display: inline-block;
    width: 24px;
    height: 24px;
  }
  .like-mount{
    font-size: 14px;
  }
}

</style>
