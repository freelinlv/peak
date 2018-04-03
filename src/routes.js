import Module from './views/modules/module'
import Upload from './views/upload/upload'
import Home from './views/Home.vue'
import basicInput from './views/input/basicInput'
let routes = [{
  path: '/',
  component: Home,
  name: '首页',
  iconCls: 'el-icon-clouds-home',
  children: [
    {
      path: '/',
      name: '模块列表',
      component: Module
    },
    {
      path: '/detail/:id',
      name: '模块详情',
      // component: Detail,
      component: function (resolve) {
        require(['./views/modules/detail'], resolve)
      },
      hidden: true
    },
    {
      path: '/upload',
      name: '图片上传',
      component: Upload
    }
  ]
}, {
  path: '/',
  component: Home,
  name: 'Input',
  iconCls: 'el-icon-clouds-home',
  children: [{
    path: '/basicInput',
    name: '基础input',
    component: basicInput
  }]
},
{
  path: '*',
  hidden: true,
  redirect: { path: '/' }
}
]

export default routes
