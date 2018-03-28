import Mock from 'mockjs'

const purchaseList = []

for (let i = 0; i < 26; i++) {
  purchaseList.push(Mock.mock({
    po_id: Mock.Random.id(),
    arrival_id: Mock.Random.id(),
    vendor_id: Mock.Random.id(),
    vendor_name: Mock.Random.csentence(4, 12),
    total_price_tax: Mock.Random.float(100, 100000, 0, 3),
    po_contact: Mock.Random.cname(),
    create_time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    po_status: '已启用',
    opt: []
  }))
}

export { purchaseList }
