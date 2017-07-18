exports.config = {
    "routeName": "report",
    "moduleName": "reportModule",
    "proxy": "/proxy",
    "url":{
        "fetchList": "/trade/report/list",
        "fetchDetail": "/trade/report/detail",
        "add": "/trade/report/save",
        "update": "/trade/report/save",
        "del": "/trade/report/delete"
    },
    "listFields":[
        {
            "key": "name",
            "name": "名称",
            "type": "text"
        },
        {
            "key": "enterpriseName",
            "name": "企业名称",
            "type": "text"
        },
        {
            "key": "industry",
            "name": "行业",
            "type": "text"
        },
        {
            "key": "creatTime",
            "name": "创建时间",
            "type": "date"
        },
        {
            "key": "operation",
            "name": "操作",
            "type": "text"
        }
    ],
    "serchFormFields":[
        {
            "key": "name",
            "name": "名称",
            "type": "text"
        },
        {
            "key": "enterpriseName",
            "name": "企业名称",
            "type": "text"
        },
        {
            "key": "creatTime",
            "name": "创建时间",
            "type": "date"
        }
    ],
    "formFields":[
        {
            "key": "name",
            "name": "名称",
            "required": true,
            "type": "text"
        },
        {
            "key": "enterpriseName",
            "name": "企业名称",
            "required": true,
            "type": "text"
        },
        {
            "key": "industry",
            "name": "行业",
            "required": true,
            "type": "text"
        },
        {
            "key": "creatTime",
            "name": "创建时间",
            "required": true,
            "type": "date"
        },
        {
            "key": "operation",
            "name": "操作",
            "required": true,
            "type": "text"
        }
    ]
}