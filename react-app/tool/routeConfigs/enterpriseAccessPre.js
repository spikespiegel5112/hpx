exports.config = {
  "routeName": "enterpriseAccessPre",
  "moduleName": "enterpriseAccessPreModule",
  "proxy": "/core",
  "url":{
    "fetchList": "/core/api/v1/enterprises/veyiterpriseAccess",
    "fetchDetail": "/credit/api/v1/tp/report"
  },
  "listFields":[
    {
      "key": "enterpriseName",
      "name": "企业名称",
      "type": "text"
    }, 
    {
      "key": "projectName",
      "name": "项目名称",
      "type": "text"
    },
    {
      "key": "roleName",
      "name": "项目中角色",
      "type": "text"
    },
    {
      "key": "codeOrg",
      "name": "组织机构代码",
      "type": "text"
    },
    {
      "key": "city",
      "name": "城市",
      "type": "text"
    },
    {
      "key": "contacts",
      "name": "联系人",
      "type": "text"
    },
    {
      "key": "contactsPhone",
      "name": "电话",
      "type": "text"
    },
    {
      "key": "creditState",
      "name": "状态",
      "type": "select",
      "data":[
        {
          "value": "F",
          "name": "未申请"
        },
        {
          "value": "T",
          "name": "已申请"
        }
      ]
    }
  ],
  "serchFormFields":[
    {
      "key": "projectName",
      "name": "项目名称",
      "type": "text"
    },
    {
      "key": "creditState",
      "name": "状态",
      "type": "select",
      "data":[
        {
          "value": "F",
          "name": "未申请"
        },
        {
          "value": "T",
          "name": "已申请"
        }
      ]
    }
  ],
  "formFields":[
  
  ]
}