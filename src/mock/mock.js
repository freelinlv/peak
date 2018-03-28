import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
// import { Products } from './data/list'
import { purchaseList } from './data/purchase'
// let _Products = Products
let _purchase = purchaseList

export default {
  /**
   * mock bootstrap
   */
  bootstrap () {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    // 获取列表
    mock.onGet('/vendor/sku/getskulists').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            productsList: _purchase
          }])
        }, 1000)
      })
    })

    // 获取用户列表（分页）
    // mock.onGet('/user/listpage').reply(config => {
    //   let {page, name} = config.params
    //   let mockUsers = _Users.filter(user => {
    //     if (name && user.name.indexOf(name) == -1) return false
    //     return true
    //   })
    //   let total = mockUsers.length
    //   mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve([200, {
    //         total: total,
    //         users: mockUsers
    //       }])
    //     }, 1000)
    //   })
    // })
  }
}
