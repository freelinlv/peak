import Module from './views/modules/module'
import Create from './views/modules/create'
import Upload from './views/upload/upload'
import Home from './views/Home.vue'
import basicInput from './views/input/basicInput'
let routes = [{
  path: '/',
  component: Home,
  name: '工作台',
  iconCls: 'el-icon-clouds-home',
  children: [
    {
      path: '/',
      name: '模板集市',
      component: Module
    },
    {
      path: '/detail/:id',
      name: '模板详情',
      // component: Detail,
      component: function (resolve) {
        require(['./views/modules/detail'], resolve)
      },
      hidden: true
    },
    {
      path: '/create',
      name: '新增模板',
      component: Create
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
