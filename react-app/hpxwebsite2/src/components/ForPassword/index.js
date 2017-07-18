/**
 * haipingx
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ForgetPwd from './ForgetPwd';
import { Layout } from 'antd'
import fetch from '../../core/fetch';

let actionData = {
  title: '海平线-全球供应链生态服务商',
  description: '"海平线"是海航集团旗下专业供应链金融服务平台，围绕产业链"融资难、融资贵、周期长、渠道少"等核心痛点，为链属企业提供全方位的供应链管理、数据增信及供应链金融的服务.',
  keywords: '海平线, 海航物流, 邻客, 邻客网络, 尚融供应链, 供应链服务, 生态服务商, 海航金融服务, 供应链创新, 核心企业定制, 低成本物流',
};


export default (store)=>({
  path : 'missing_pwd',
  getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Component = require('./forgetPwdContainer').default
        cb(null, Component)
      }, 'missing_pwd')
    },
})
