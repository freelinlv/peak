const urls = {
  // 获取用户列表
  GET_USER_LIST: '/authui/user/getuserlist',
  // 创建用户
  CREATE_USER: '/authui/user/createuser',
  // 更新用户状态
  UPDATE_USER: '/authui/user/updateuser',
  // 修改用户对应角色
  MODIFY_USER_ROLES: '/authui/user/modifyuserroles',
  // 获取用户角色列表
  GET_USER_ROLES: '/authui/user/getuserroles',
  // 获取所有角色列表
  GET_ROLE_LIST: '/authui/role/getrolelist',
  // 创建角色
  CREATE_ROLE: '/authui/role/createrole',
  // 更新角色状态
  UPDATE_ROLE: '/authui/role/updaterole',
  // 获取角色对应权限
  GET_ROLE_PERMISSIONS: '/authui/role/getrolepermissions',
  // 修改角色对应权限
  MODIFY_ROLE_PERMISSIONS: '/authui/role/modifyrolepermissions',
  // 获取所有分级权限
  GET_PERMISSION_PAGE: '/authui/permission/getpermissionpage'
}

export default urls
