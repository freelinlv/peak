<template>
  <el-row class="container">
    <el-col :span="24" class="header">
			<div class="logo-width p-dib">
				<a class="p-font-h1" href='/#/'>Peak<sup>1.0</sup></a>
			</div>
			<el-menu default-active="1" class="header-menu" mode="horizontal" >
				<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
					<el-submenu :index="index+''" v-if="!item.leaf" :key="index">
						<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
						<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" style="padding-left: 52px; font-size: 14px;">{{child.name}}</el-menu-item>
					</el-submenu>
					<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
				</template>
			</el-menu>
    </el-col>
    <el-col :span="24" class="main">
      <section :class="['content-container', 'content-expanded', {fold: isFold}]">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }" v-if="item.name !== ''">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import { logOut } from '@/api/api'
import Util from '@/common/js/util'
export default {
  data () {
    return {
      difflogo: Util.isSupplier(),
      sysUserName: 'user',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      isFold: false
    }
  },
  methods: {
    onSubmit () {
      // console.log('submit!')
    },
    handleopen () {
      // console.log('handleopen')
    },
    handleclose () {
      // console.log('handleclose')
    },
    handleselect: function (a, b) {},
    handleFold () {
      this.isFold = !this.isFold
    },
    jumptoIssue () {
      window.open('https://github.com/PeakPick/peak/issues/new')
    },
    // 退出登录
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        const postData = {
          platform: 'SCM_SUPPLIER',
          channel: 'pc',
          redirect_url: window.location.href
        }
        logOut(postData).then(response => {
          if (response.data.errno === 0) {
            localStorage.removeItem('userName')
            window.location.reload()
          }
        }).catch(error => {
          this.$message.error('服务器傲娇了，请刷新重试')
        })
      })
    }
  },
  created () {}
}
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
    }
  }
  .main {
    display: flex;
    bottom: 0px;
    overflow: hidden;
    aside {
      position: fixed;
      z-index: 9999;
      top: 0;
      bottom: 0;
      left: 0;
      flex: 0 0 200px;
      width: 200px;
      .logo {
        height: 60px;
        font-size: 22px;
        padding: 0 20px;
        img {
          margin-left: -10px;
          width: 140px;
          float: left;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 200px;
        height: 80px;
        line-height: 80px;
				display: inline-block;
        text-align: center;
        font-size: 24px;
        background: #263340;
        color: #fff;
        h1 {
          margin: 0;
					padding: 0;
					a{
						display:block;
						text-decoration: none;
						color: #fff;
						sup{
							font-size: 16px;
							font-weight: normal;
						}
					}
        }
      }
      .logo-collapse-width {
        width: 20px;
        background: #263340;
        color: #fff;
      }
      .tools {
        width: 14px;
        height: 60px;
        line-height: 70px;
        cursor: pointer;
        .el-icon-cloud-menu {
          display: inline-block;
          background: url('https://s.waimai.baidu.com/c/static/mis/pics/nscm-cloud-arrow.svg') no-repeat center center;
          width: 26px;
          height: 26px;
        }
        .el-icon-cloud-rotate-menu {
          display: inline-block;
          background: url('https://s.waimai.baidu.com/c/static/mis/pics/nscm-cloud-arrow.svg') no-repeat center center;
          width: 26px;
          height: 26px;
          transform: rotate(180deg)
        }
      }
      .el-menu {
        border: none;
        height: 100%;
        background: #263340;
        color: #fff;
      }
      .el-menu-vertical-demo {
        width: auto !important;
        .el-icon-clouds-home,
        .el-icon-clouds-basemsg,
        .el-icon-clouds-issue,
        .el-icon-clouds-setting {
          display: inline-block;
          margin: -4px 12px 0 0;
          vertical-align: middle;
          width: 20px;
          height: 20px;
        }
        .el-icon-clouds-home {
          background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/acc247eaa856d7e65ca5.svg') no-repeat center center;
        }
        .el-icon-clouds-basemsg {
          background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/e415cb3dee7ff9f2c7fb.svg') no-repeat center center;
        }
        .el-icon-clouds-issue {
          background: url('http://lc-a5zjlnxg.cn-n1.lcfile.com/969a3a94b86912a7da3a.svg') no-repeat center center;
        }
        .el-icon-clouds-setting {
          background: url('https://s.waimai.baidu.com/c/static/mis/pics/nscm-cloud-set.svg') no-repeat center center;
        }
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 9999;
          height: auto;
          display: none;
          li {
            color: #fff;
          }
          li.is-active {
            color: #409EFF;
          }
          li:hover {
            background: rgb(30, 41, 51);
          }
        }
      }
    }
    .fold-handle {
      border-radius: 0 100% 100% 0;
      background-color: #273340;
      margin-left: 200px;
      width: 20px;
      height: 108px;
      line-height: 108px;
      text-align: center;
      position: fixed;
      z-index: 100;
      top: 50%;
      margin-top: -54px;
      color: #fff;
      font-weight: 800;
      cursor: pointer;
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 200px;
      width: 200px;
    }
    .content-container {
      flex: 1;
      overflow-x: scroll;
      padding: 20px;
      margin-left: 200px;
      .breadcrumb-container {
        margin-bottom: 20px;
        .breadcrumb-inner {
          float: left;
        }
      }
      .print-words {
        display: none
      }
      .content-wrapper {
        box-sizing: border-box;
      }
    }
    .content-expanded {}
    .content-collapsed {
      margin-left: 60px;
    }
  }
}

.el-submenu__title:hover {
  background: rgb(30, 41, 51);
}

// 过渡效果相关代码

.menu-expanded,
.fold-handle,
.content-container {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.fold {
  &.menu-expanded {
    margin-left: -200px !important;
  }
  &.fold-handle {
    margin-left: 0px !important;
  }
  &.content-container {
    margin-left: 0px !important;
  }
}

</style>
