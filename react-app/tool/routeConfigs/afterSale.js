exports.config = {
  "routeName": "afterSale",
  "moduleName": "afterSaleModule",
  "proxy": "/proxyHq",
  "url": {
    "fetchList": "/huaqian/api/v1/refund/list",
    "fetchDetail": "/huaqian/api/v1/refund/queryDetail",
  },
  "listFields": [
    {
      "key": "code",
      "name": "编号",
      "type": "text"
    },
    {
      "key": "contractCode",
      "name": "合同编号",
      "type": "text"
    },
    {
      "key": "code",
      "name": "供应商",
      "type": "text"
    },
    {
      "key": "money",
      "name": "退款金额",
      "precision": 2,
      "type": "number"
    },
    {
      "key": "applicationDate",
      "name": "申请日期",
      "type": "date"
    },
    {
      "key": "approvalStatus",
      "name": "审批状态",
      "type": "select",
      "data": [
        {
          "value": "待审批",
          "name": "0"
        },
        {
          "value": "已通过",
          "name": "1"
        },
        {
          "value": "已拒绝",
          "name": "2"
        }
      ]
    },
    {
      "key": "paymentStatus",
      "name": "退款状态",
      "type": "select",
      "data": [
        {
          "value": "待退款",
          "name": "0"
        },
        {
          "value": "已完成",
          "name": "1"
        }
      ]
    }
  ],
  "serchFormFields": [
  ],
  "formFields": [
    {
      "key": "code",
      "name": "编号",
      "type": "text"
    },
    {
      "key": "contractCode",
      "name": "合同编号",
      "type": "text"
    },
    {
      "key": "code",
      "name": "供应商",
      "type": "text"
    },
    {
      "key": "money",
      "name": "退款金额",
      "precision": 2,
      "type": "number"
    },
    {
      "key": "applicationDate",
      "name": "申请日期",
      "type": "date"
    },
    {
      "key": "approvalStatus",
      "name": "审批状态",
      "type": "select",
      "data": [
        {
          "value": "待审批",
          "name": "0"
        },
        {
          "value": "已通过",
          "name": "1"
        },
        {
          "value": "已拒绝",
          "name": "2"
        }
      ]
    },
    {
      "key": "paymentStatus",
      "name": "退款状态",
      "type": "select",
      "data": [
        {
          "value": "待退款",
          "name": "0"
        },
        {
          "value": "已完成",
          "name": "1"
        }
      ]
    }
  ]
}