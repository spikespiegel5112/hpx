exports.config = {
  "routeName": "label-info",
  "moduleName": "labelInfoModule",
  "proxy": "/proxyWarn",
  "url":{
    "fetchList":"/huaqian/api/v1/xLabelInfo/search",
    "fetchDetail":"/huaqian/api/v1/xLabelInfo/get",
    "add":"/huaqian/api/v1/xLabelInfo/add",
    "update":"/huaqian/api/v1/xLabelInfo/update",
    "del":"/huaqian/api/v1/xLabelInfo/delete",
  },
  "listFields":[
    {
      "key": "scoreCardName",
      "name": "名称",
      "type": "text"
    },
    {
      "key": "opneWeight",
      "name": "是否权重",
      "type": "text"
    },
    {
      "key": "addUserId",
      "name": "创建人",
      "type": "text"
    },
    {
      "key": "addTime",
      "name": "添加时间",
      "type": "text",
    },
    {
      "key": "status",
      "name": "状态",
      "type": "text"
    },
  ],
  "serchFormFields":[
    {
      "key": "field1",
      "name": "文本",
      "type": "text"
    },
    {
      "key": "field2",
      "name": "创建人",
      "type": "date"
    },
    {
      "key": "field3",
      "name": "日期范围",
      "type": "dateRange",
      "startKey": "startKeyName",
      "endKey": "endKeyName"
    },
    {
      "key": "field4",
      "name": "启用状态",
      "type": "select",
      "data":[
        {
          "value": "enable",
          "name": "已启用"
        },
        {
          "value": "disable",
          "name": "已禁用"
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