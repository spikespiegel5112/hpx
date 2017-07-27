exports.config = {
  "routeName": "purchaseContract",
  "moduleName": "purchaseContractModule",
  "proxy": "/proxyHq",
  "url": {
    "fetchList": "/huaqian/api/v1/contract/listC",
    "fetchDetail": "/huaqian/api/v1/contract/get",
    "add": "/huaqian/api/v1/contract/add",
    "update": "/huaqian/api/v1/contract/update",
    "del": "/huaqian/api/v1/contract/delete",
  },
  "listFields": [
    {
      "key": "code",
      "name": "编号",
      "type": "text"
    },
    {
      "key": "name",
      "name": "名称",
      "type": "text"
    },
    {
      "key": "firstParty",
      "name": "甲方",
      "type": "text"
    },
    {
      "key": "secondParty",
      "name": "乙方",
      "type": "text"
    },
    {
      "key": "contractDate",
      "name": "签订日期",
      "type": "date"
    },
    {
      "key": "deliveryDate",
      "name": "送货日期",
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "deliveryAddress",
      "name": "送货地址",
      "type": "text"
    },
    {
      "key": "acceptanceLevel",
      "name": "验收标准",
      "type": "text"
    },
    {
      "key": "fUser",
      "name": "甲方联系人",
      "type": "text"
    },
    {
      "key": "fPhone",
      "name": "甲方联系电话",
      "type": "text"
    },
    {
      "key": "sUser",
      "name": "乙方联系人",
      "type": "text"
    },
    {
      "key": "sPhone",
      "name": "乙方联系电话",
      "type": "text"
    },
    {
      "key": "fSignature",
      "name": "甲方签章人",
      "type": "text"
    },
    {
      "key": "sSignature",
      "name": "乙方签章人",
      "type": "text"
    },
    {
      "key": "fLocation",
      "name": "甲方签章位置",
      "type": "text"
    },
    {
      "key": "sLocation",
      "name": "乙方签章位置",
      "type": "text"
    },
    {
      "key": "fDate",
      "name": "甲方签章时间",
      "type": "text"
    },
    {
      "key": "sDate",
      "name": "乙方签章时间",
      "type": "text"
    },
    {
      "key": "contractType",
      "name": "合同类型",
      "type": "select",
      "data": [
        {
          "value": "C",
          "name": "采购"
        },
        {
          "value": "S",
          "name": "销售"
        }
      ]
    },
    {
      "key": "receivingDate",
      "name": "收货日期",
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "fileId",
      "name": "文件ID",
      "type": "text"
    },
    {
      "key": "money",
      "name": "金额",
      "precision": 2,
      "type": "number"
    },
    {
      "key": "deliveryDeadline",
      "name": "提货期限",
      "type": "text"
    },
    {
      "key": "orderCode",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "fSignatureStatus",
      "name": "甲方签章状态",
      "type": "text"
    },
    {
      "key": "sSignatureStatus",
      "name": "乙方签章状态",
      "type": "text"
    },
    {
      "key": "financingStatus",
      "name": "融资状态",
      "type": "select",
      "data": [
        {
          "value": "0",
          "name": "正常"
        },
        {
          "value": "1",
          "name": "逾期"
        },
        {
          "value": "2",
          "name": "待处置"
        },
        {
          "value": "3",
          "name": "已处置"
        }
      ]
    },
    {
      "key": "receivingStatus",
      "name": "收货状态",
      "type": "select",
      "data": [
        {
          "value": "0",
          "name": "待收货"
        },
        {
          "value": "1",
          "name": "已收货"
        }
      ]
    }
  ],
  "serchFormFields": [
    {
      "key": "code",
      "name": "合同编号",
      "type": "text",
    },
    {
      "key": "firstParty",
      "name": "供应商",
      "type": "select"
    }
  ],
  "formFields": [
    {
      "key": "code",
      "name": "合同编号",
      "required": true,
      "type": "text"
    },
    {
      "key": "name",
      "name": "合同名称",
      "required": true,
      "type": "text"
    },
    {
      "key": "firstParty",
      "name": "供应商",
      "required": true,
      "type": "text"
    },
    {
      "key": "secondParty",
      "name": "乙方",
      "required": true,
      "type": "text"
    },
    {
      "key": "contractDate",
      "name": "签订日期",
      "required": true,
      "type": "date"
    },
    {
      "key": "deliveryDate",
      "name": "送货日期",
      "required": true,
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "deliveryAddress",
      "name": "送货地址",
      "required": true,
      "type": "text"
    },
    {
      "key": "acceptanceLevel",
      "name": "验收标准",
      "required": true,
      "type": "text"
    },
    {
      "key": "fUser",
      "name": "甲方联系人",
      "required": true,
      "type": "text"
    },
    {
      "key": "fPhone",
      "name": "甲方联系电话",
      "required": true,
      "type": "text"
    },
    {
      "key": "sUser",
      "name": "乙方联系人",
      "required": true,
      "type": "text"
    },
    {
      "key": "sPhone",
      "name": "乙方联系电话",
      "required": true,
      "type": "text"
    },
    {
      "key": "fSignature",
      "name": "甲方签章人",
      "required": true,
      "type": "text"
    },
    {
      "key": "sSignature",
      "name": "乙方签章人",
      "required": true,
      "type": "text"
    },
    {
      "key": "fLocation",
      "name": "甲方签章位置",
      "required": true,
      "type": "text"
    },
    {
      "key": "sLocation",
      "name": "乙方签章位置",
      "required": true,
      "type": "text"
    },
    {
      "key": "fDate",
      "name": "甲方签章时间",
      "required": true,
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "sDate",
      "name": "乙方签章时间",
      "required": true,
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "contractType",
      "name": "合同类型",
      "required": true,
      "type": "select",
      "data": [
        {
          "value": "C",
          "name": "采购"
        },
        {
          "value": "S",
          "name": "销售"
        }
      ]
    },
    {
      "key": "receivingDate",
      "name": "收货日期",
      "required": true,
      "type": "date",
      "render": "(text) => <span>{moment(text).format('YYYY-MM-DD')}</span>"
    },
    {
      "key": "fileId",
      "name": "文件ID",
      "required": true,
      "type": "text",
      "render": "(text, record) => (<span>{text == 0 ? null : <a target='_blank' href=''>查看文件</ a> }</span> )"
    },
    {
      "key": "money",
      "name": "金额",
      "precision": 2,//精度
      "required": true,
      "type": "number"
    },
    {
      "key": "deliveryDeadline",
      "name": "提货期限",
      "required": true,
      "type": "text"
    },
    {
      "key": "orderCode",
      "name": "订单编号",
      "required": true,
      "type": "text"
    },
    {
      "key": "fSignatureStatus",
      "name": "甲方签章状态",
      "required": true,
      "type": "text"
    },
    {
      "key": "sSignatureStatus",
      "name": "乙方签章状态",
      "required": true,
      "type": "text"
    },
    {
      "key": "financingStatus",
      "name": "融资状态",
      "required": true,
      "type": "select",
      "data": [
        {
          "value": "0",
          "name": "正常"
        },
        {
          "value": "1",
          "name": "逾期"
        },
        {
          "value": "2",
          "name": "待处置"
        },
        {
          "value": "3",
          "name": "已处置"
        }
      ]
    },
    {
      "key": "receivingStatus",
      "name": "收货状态",
      "required": true,
      "type": "select",
      "data": [
        {
          "value": "0",
          "name": "待收货"
        },
        {
          "value": "1",
          "name": "已收货"
        }
      ]
    }
  ]
}