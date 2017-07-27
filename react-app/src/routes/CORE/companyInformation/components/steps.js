import React from 'react'

import { Steps } from 'antd'

const Step = Steps.Step;

const stepInfo = [ 
    {
        text : "完善信息"
    },
    {
        text : "企业认证"
    },
    {
        text : "审核通过"
    }
]

const AuthStep = (props)=>{

    return <Steps current={2}>
                {
                    stepInfo.map( (v,i) => {
                        return <Step key={i}>{v.text}</Step>
                    } )
                }
            </Steps>
}

export default AuthStep
