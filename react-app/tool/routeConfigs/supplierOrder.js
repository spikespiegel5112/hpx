exports.config = {
  "routeName": "supplierOrder",
  "moduleName": "supplierOrderModule",
  "proxy": "/proxy",
  "url":{
    "fetchList": "/trade/testOb/list",
    "fetchDetail": "/trade/testOb/detail",
    "add": "/trade/testOb/save",
    "update": "/trade/testOb/save",
    "del": "/trade/testOb/delete"
  },
  "listFields":[
    {
      "key": "name",
      "name": "订单名称",
      "type": "text"
    },
    {
      "key": "roderNum",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "demander",
      "name": "需方",
      "type": "text"
    },
    {
      "key": " orderAmount",
      "name": "订单金额",
      "type": "text",
    },
    {
      "key": "orderStatus",
      "name": "订单状态",
      "type": "text"
    },
    {
      "key": "approvaStatus",
      "name": "审批状态",
      "type": "text"
    },
    {
      "key": "bulidDate",
      "name": "创建时间",
      "type": "date"
    },
  ],
  "serchFormFields":[
    {
      "key": "field1",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "field2",
      "name": "需方",
      "type": "select",
      "data":[
        {
        "value":"xf1",
        "name":"需方1"
      },
       {
        "value":"xf2",
        "name":"需方2"
        }    
      ]
    }
  ],
  "formFields":[
    {
      "key": "email",
      "name": "邮箱",
      "required": true,
      "type": "email"
    },
    {
      "key": "accuracy",
      "name": "数字",
      "precision": 2,//精度
      "required": true,
      "type": "number"
    },
    {
      "key": "phone",
      "name": "手机号",
      "required": true,
      "type": "phone"
    },
    {
      "key": "password",
      "name": "密码",
      "required": true,
      "type": "password"
    },
    {
      "key": "company",
      "name": "公司",
      "lengthRange": [6,16],
      "required": true,
      "type": "text"
    },
    {
      "key": "nickname",
      "name": "昵称",
      "lengthRange": [1,50],
      "required": true,
      "type": "textarea"
    },
    {
      "key": "datePicker",
      "name": "日期",
      "required": true,
      "type": "date"
    },
    {
      "key": "selectorcountry",
      "name": "国家",
      "type": "select",
      "data":[
        {
          "value": "china",
          "name": "中国"
        },
        {
          "value": "usa",
          "name": "美国"
        }
      ]
    },
    {
      "key": "uploadimg",
      "name": "图片",
      "required": true,
      "type": "image",
      "fileLength": 3,
    },
    {
      "key": "uploadview",
      "name": "文件",
      "required": true,
      "type": "file",
      "fileLength": 3
    },
    {
      "key": "agreement",
      "name": "我已经同意",
      "required": true,
      "type": "checkout",
      "data":[
        {
          key: "0",
          value: false,
        },
        {
          key: "1",
          value: true,
        }
      ]
    },
    {
      "key": "captcha",
      "name": "验证码",
      "phoneKey": "phone",
      "required": true,
      "type": "smsCode"
    }
  ]
}