import Mock from 'mockjs'

const Products = []

for (let i = 0; i < 26; i++) {
  Products.push(Mock.mock({
    id: Mock.Random.id(),
    pic: Mock.Random.image('125x125'),
    name: Mock.Random.cname(),
    category: Mock.Random.cname(),
    barcode: Mock.Random.integer(),
    zip: 1,
    standard: '1X1',
    modify: '是',
    state: '已启用'
  }))
}

export { Products }
