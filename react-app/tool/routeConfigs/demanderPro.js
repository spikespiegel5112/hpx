exports.config = {
  "routeName": "demanderPro",
  "moduleName": "demanderModule",
  "proxy": "/proxy",
  "url":{
    "fetchList": "/trade/demanderPro/list",
    "fetchDetail": "/trade/demanderPro/detail",
    "add": "/trade/demanderPro/save",
    "update": "/trade/demanderPro/save",
    "del": "/trade/demanderPro/delete"
  },
  "listFields":[
    {
      "key": "email",
      "name": "邮箱",
      "type": "text"
    },
    {
      "key": "accuracy",
      "name": "数字",
      "precision": 2,
      "type": "number"
    },
    {
      "key": "datePicker",
      "name": "日期",
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
      "type": "image"
    },
    {
      "key": "uploadview",
      "name": "文件",
      "type": "file"
    },
  ],
   "serchFormFields":[  ],
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