<template>
    <div class="fillcontain">
        <!--<head-top></head-top>-->
        <!--<div class="Section0" style="layout-grid: 15.6000pt;width:800px;margin:0 auto;">
			<br/>
			<p class=MsoNormal align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-align: center; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 24.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">采购协议</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 24.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-align: center; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">协议签署月份：</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trusteeDate,dateFormat="yyyy年MM月"}</span><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<table class=MsoNormalTable
				style="border-collapse: collapse; width: 472.3500pt; mso-table-layout-alt: fixed; mso-padding-alt: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;">
				<tr style="height: 27.6500pt;">
					<td width=283 valign=top
						style="width: 212.6500pt; padding: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;"><p
							class=MsoNormal>
							<span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
						</p></td>
					<td width=346 valign=top
						style="width: 259.7000pt; padding: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;"><p
							class=MsoNormal
							style="margin-left: 0.0000pt; text-indent: 142.3000pt; mso-char-indent-count: 11.8600;">
							<b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p></td>
				</tr>
			</table>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 21.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b><span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
				<font face="宋体">甲方（供货方）：</font></span></b>
						<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trustee}</span>
			</p>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 21.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">公司地址：</font></span></b>
						<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.shipmentsAddress}</span>
			</p>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 21.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b>
				<span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
					<font face="宋体" >业务联系人：</font></span></b>
					<b>
					<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;</span>
					</b>
					<span style="mso-spacerun:'yes';font-family:宋体;font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" > ${info.trusteeUser}</span>
					<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;&nbsp;</span>
					<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;&nbsp;&nbsp;&nbsp;</span>
					<b>
					<span style="mso-spacerun:'yes';font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;" ><font face="宋体" >联系电话：</font></span></b>
					<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;</span>
					<span style="mso-spacerun:'yes';font-family:宋体;font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >${info.trusteeUserPhone}</span>
					
				<b><span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;" > </span></b>
				
				
				</p><p class=MsoNormal  align=justify  style="margin-top:0.0000pt;margin-right:0.0000pt;margin-bottom:0.0000pt;margin-left:0.0000pt;text-indent:21.0000pt;text-align:justify;text-justify:inter-ideograph;line-height:150%;" >
				
				<br>
				<b><span style="mso-spacerun:'yes';font-family:宋体;font-weight:bold;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >
					<font face="宋体"> &nbsp; 乙方（收货方）：</font></span></b>
						<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principal}</span>
			</p>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 21.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
					<font face="宋体">公司地址：</font></span></b>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: normal; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.receivingAddress}</span>
			</p>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 21.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b>
				<span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
					<font face="宋体">业务联系人：</font></span></b>
						<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalUser}</span>
						<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;&nbsp;</span>
						<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<b>
				<span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">	
					<font face="宋体">联系电话：</font></span>
					</b>
					<span style="mso-spacerun:'yes';font-family:宋体;mso-bidi-font-family:'Times New Roman';font-weight:normal;font-size:12.0000pt;mso-font-kerning:1.0000pt;" >&nbsp;</span>
						<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalUserPhone}</span>
			</p>
			<p class=MsoNormal align=justify
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-align: justify; text-justify: inter-ideograph; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=33 align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 45.0000pt; text-indent: -45.0000pt; mso-char-indent-count: 0.0000; text-align: center; line-height: 150%; mso-list: l2 level1 lfo1;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第一章<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">合作方式与合作范围</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第一条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">协议概述：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">本协议为甲乙双方，关于乙方向甲方进行货品采购的业务所签订的采购协议，本协议对甲乙双方商定的合作细节进行如下书面约定，甲乙双方应本着平等自愿，互利互惠的原则，认真履行本协议。</font></span><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第二条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">订单及折扣：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">乙方向甲方采购</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">品牌的货品，甲乙双方确认的货品明细以</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&#8220;附件一&#8221;体现的明细为准，双方确认的货品的吊牌额为：</span>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.tagAmount}</span>
					<font face="宋体">元人民币，采购折扣为：</font>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.discount}</span>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">,采购结算金额为：</span>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.sumPrice}</span>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
					<font face="宋体">元人民币。</font></span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				
			</p>
			<p class=33
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; mso-char-indent-count: 0.0000; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第三条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">货品定金：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲乙双方约定本次合作的定金为，人民币</font></span><b>
					<span style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-weight: normal; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.guarantee}</span></b>
					
					<font face="宋体">元，正常发货情况下，定金一次性冲抵货款，若因特殊情况，甲方的发货需分为多批进行的，则定金需按每批发货金额占订单金额的占比冲抵货款。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=33
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: 0.0000pt; mso-char-indent-count: 0.0000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第四条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">合作期限：</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 54.0000pt; mso-char-indent-count: 4.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">协议起始日期为签订协议的日期；</font></span><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 54.0000pt; mso-para-margin-left: 4.5000gd; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">协议终止日期为甲乙双方针对本次订单往来帐务核对无误，货品、货款以及发票全部结算完毕，且双方其他义务如质量保证、保密义务等履行完毕为止。</font></span><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第五条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">订单明细保证：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">发货单一旦经过双方确认，并且乙方根据发货单付款后</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">,则甲方有义务确保发货的匹配率，如甲方的实际发货明细与乙方所付款的发货单明细有差异时，超出付款发货明细范围的货品乙方有权不接受，乙方有权将超出范围的货品退还给甲方，退货产生的物流费用由甲方承担，甲方应在收到乙方退还货品后7个工作日内退还该部分产品的货款，或根据乙方要求提供新的货物；若付款发货明细与实际发货的配货率低于_</span><b><u><span
						style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">80%</span></u></b><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">_</span></u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">时，视为甲方违约，乙方有权取消本次合作，解除采购协议，甲方应在收到解除协议通知后</font></span><b><u><span
						style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">7</span></u></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">个工作日内返还乙方所支付的全部货款，并按照本次货款的</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">___%支付违约金。逾期返还货款的，每逾期一日，按逾期金额的千分之五支付违约金。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第六条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">货源保证：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方需确保出售给乙方的货品为原厂正品，且是通过品牌方或者品牌授权的经销商处采购的货品，若为假冒伪劣产品，给乙方造成的损失由甲方承担。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第七条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">货品品相保证：</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">（一）鞋类和配件的品相要求：</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 42.0000pt; mso-char-indent-count: 3.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">1</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">、</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">无发黄，无色差，鞋帮、鞋面、鞋底不脏且无配件缺损；</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 54.0000pt; mso-para-margin-left: 3.5000gd; text-indent: -12.0000pt; mso-char-indent-count: -1.0000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">2、&nbsp;有原厂鞋盒包装，鞋盒尺码与鞋盒内商品一致，鞋盒基本干净，无明显破损；鞋盒无快递单等明显人为迹象，条形码完整；</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 54.0000pt; mso-para-margin-left: 3.5000gd; text-indent: -12.0000pt; mso-char-indent-count: -1.0000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">3、&nbsp;无其他明显瑕疵。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">（二）服装和配件的品相要求：</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 42.0000pt; mso-char-indent-count: 3.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">1、&nbsp;无发黄、色差，无其他明显瑕疵。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-indent: 42.0000pt; mso-char-indent-count: 3.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">2、&nbsp;有原厂吊牌，吊牌与商品须一致，条形码完整。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第八条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">运费相关：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">双方确认完运输公司后，运费由</font></span><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;&nbsp;</span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">乙方</font></span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;&nbsp;</span></u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">承担。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第九条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">单据提供：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应保证一箱一单打包，且提供电子版装箱单，以便乙方验收货品。甲方应于发货前将所有单据提前以邮件形式发送给乙方业务对口人，由乙方确认无异议后方可发货，否则由此产生的损失由甲方自行承担。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">乙方验收货品方式：</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应保证箱体无破损，如有破损乙方有权拒收破损箱体货物，破损箱体货物数量或价格超过本协议项下货物</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">30%的，乙方有权拒收全部货物，因此产生的所有损失（包括运费、货损、违约金等）由甲方承担。如无破损，则乙方有权拆箱点货，按照一箱一单验收货品，如发现货品与单据不符或发现货品不符合本协议第六条约定要求的，乙方有权要求退货，涉及货款结算的，按本协议第十一条执行。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十一条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">甲乙双方货款结算依据</font></span></b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">：甲方将发货明细经乙方确认后按本协议第二条约定折扣计算结算额，甲方发货明细不符合本协议要求的，乙方有权拒绝支付货款，已支付的，按本协议第五条约定执行。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=33 align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 45.0000pt; text-indent: -45.0000pt; mso-char-indent-count: 0.0000; text-align: center; line-height: 150%; mso-list: l2 level1 lfo1;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第二章<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">双方的权利与义务</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十二条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">甲方权利与义务</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>1、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方有义务向乙方提供本次合作的货品来源方信息，包括但不限于商标注册证、业务合同、授权书、发票，以证明货品来源的可靠性；</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>2、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方有义务根据乙方提供的格式向乙方提供货品完整信息及相关资料（包括但不限于商品条形码、年份、季节、性别、吊牌价等）；</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>3、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应在乙方确认货品明细并支付货款后</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">2日内安排发货；</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>4、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应指派专人负责核对本协议项下的货品及账务明细；</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>5、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应在乙方验收完毕后对账款进行结算，双方确认无异议后，甲方应于七个工作日内安排余款退回。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>6、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方需在双方确认货品验收无误后一个月内向乙方开具符合税务要求的增值税发票；</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; text-indent: -18.0000pt; line-height: 150%; mso-list: l1 level1 lfo3;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>7、<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲方应保证销售给乙方的货品不存在任何权利（包括但不限于所有权、商标权、著作权等知识产权）纠纷或抵质押、被查封、冻结等权利限制情形。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十三条<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">乙方权利与义务</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.7000pt; mso-para-margin-left: 3.5600gd; text-indent: -18.0000pt; mso-char-indent-count: -1.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">1、乙方对甲方提供的货品明细核对无误后，根据甲乙双方的协商时间支付货款，甲方收到货款后第一时间通知乙方安排提货。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 60.0000pt; mso-para-margin-left: 3.5000gd; text-indent: -18.0000pt; mso-char-indent-count: -1.5000; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">2、乙方须在收到货品后</span><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;</span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">五</font></span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;</span></u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">个工作日内验收货品，并向甲方反馈到货差异，并在收到货品后</font></span><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;</span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">十</font></span></u><u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; text-decoration: underline; text-underline: single; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;&nbsp;</span></u><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">日内，将不符合货品品相要求的商品明细反馈给甲方，并与甲方协商退货事宜。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 26.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=33 align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 45.0000pt; text-indent: -45.0000pt; mso-char-indent-count: 0.0000; text-align: center; line-height: 150%; mso-list: l2 level1 lfo1;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第三章<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">保密协议</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Tahoma; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十四条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">甲乙双方所提供给对方的一切资料需严格保密</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">,并只能在合作的业务范围内使用。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十五条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">凡涉及由甲、乙双方提供与项目、资金有关的所有材料，包括但不限于库存资料、资本营运计划、财资情报、客户名单、经营决策、项目设计、资本融资、技术数据及项目商业计划书等均属保密内容。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十六条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">凡未经双方书面同意而直接或间接、口头或者书面的形式向第三方提供涉及保密内容的行为均属泄密。为实现本协议目的或应有权机关要求，双方将本协议披露给各自的顾问（如财务顾问、法律顾问、投资顾问等）或政府机关不属于泄密。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十七条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">本协议规定的保密条款在本协议终止、失效、解除后对双方仍有拘束力。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; text-align: center; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=33 align=center
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 45.0000pt; text-indent: -45.0000pt; mso-char-indent-count: 0.0000; text-align: center; line-height: 150%; mso-list: l2 level1 lfo1;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第四章<span>&nbsp;</span></span></span>
				<![endif]>
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
						face="宋体">其它约定事项</font></span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十八条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">一方违反本协议且在守约方书面通知后</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">3日内仍未有效纠正违约行为的，守约方有权解除本协议且不视为违约，违约方应赔偿守约方所遭受的所有损失（包括但不限于因违约方违约而导致对第三方的违约责任，为追究违约方违约责任而支出的所有费用损失，如交通差旅费、误工费、律师费等中介费用）。</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第十九条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">因本协议所发生的争议，甲乙双方应通过充分沟通解决。协商不成，任一方均有权将其提交至上海仲裁委员会仲裁解决，仲裁裁决对双方均有约束力。</font></span><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第二十条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">本协议</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">未尽事宜</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">,双方</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">另行拟定</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">补充协议</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">。经双方确认的附件作为本协议不可分割的一部分，与本协议书具有同等法律效力</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; text-indent: -42.7500pt; line-height: 150%; mso-list: l0 level1 lfo2;">
				<![if !supportLists]>
				<span
					style="font-family: 'Times New Roman'; mso-fareast-font-family: 宋体; color: rgb(0, 0, 0); font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><span
					style='mso-list: Ignore;'>第二十一条<span>&nbsp;</span></span></span>
				<![endif]>
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"><font
					face="宋体">本协议一式两份，双方各执一份，自双方授权代表签字并盖章之日起生效。</font></span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 42.8000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Verdana; color: rgb(0, 0, 0); font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
			</p>
			<table class=MsoNormalTable style="border-collapse: collapse; width: 800pt; mso-table-layout-alt: fixed; mso-padding-alt: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;">
				<tr style="height: 15.1500pt;">
					<td valign=top style="width: 200pt;">
						<p class=MsoNormal style="line-height: 120%;">
							<b>
							<span style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">甲方签字：</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: normal; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trusteeUser}</span>
								<b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 120%;">
							<span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
						</p>
						<p class=MsoNormal style="line-height: 120%;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">甲方公章：&nbsp;</span></b>
								<b></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 120%;">
							<span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span>
						</p></td>
					<td valign=top style="width: 200pt; padding: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;"><p
							class=MsoNormal style="line-height: 120%;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">乙方签字：</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalUser}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 120%;">
							<b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 120%;">
							<b><span style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">乙方公章：</span></b>
								<b><span
								style="font-family: 'Times New Roman'; mso-fareast-font-family: PMingLiU; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&#160;</span></b><b><span
								style="mso-spacerun: 'yes'; font-family: 'Times New Roman'; mso-fareast-font-family: PMingLiU; color: rgb(255, 255, 255); font-weight: bold; font-size: 9.0000pt; mso-font-kerning: 1.0000pt;"><font
									face="PMingLiU">(签章)</font><font face="Times New Roman">${info.principal}</font></span></b><b><span
								style="font-family: 'Times New Roman'; mso-fareast-font-family: PMingLiU; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&#160;</span></b><b><span
								style="font-family: 宋体; mso-bidi-font-family: Arial; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p></td>
				</tr>
				<tr style="height: 15.1500pt;width:800px;">
					<td  valign=top
						style="width:400pt; padding: 0.0000pt 5.4000pt 0.0000pt 5.4000pt;line-height: 35px;"><p
							class=MsoNormal>
							<b><span style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">签署日期：</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体;  font-weight: normal; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">
								${info.trusteeDate,dateFormat="yyyy年MM月dd日"}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">公司名称：</span></b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trustee}</span>
								<b><span style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">开户银行：&nbsp;&nbsp;</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trusteeDepositBank}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">银行账号：</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.trusteeBankAccount}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p></td>
					<td valign=top
						style="width: 400pt; padding: 0.0000pt 5.4000pt 0.0000pt 5.4000pt; "><p
							class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">签署日期：&nbsp;</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体;  font-weight: normal; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalDate,dateFormat="yyyy年MM月dd日"}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 9.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">公司名称：&nbsp;</span></b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principal}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">开户银行：&nbsp;</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalDepositBank}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="mso-spacerun: 'yes'; font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">银行账号：&nbsp;</span></b>
								<span style="mso-spacerun: 'yes'; font-family: 宋体; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">${info.principalBankAccount}</span><b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p>
						<p class=MsoNormal style="line-height: 35px;">
							<b><span
								style="font-family: 宋体; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
						</p></td>
				</tr>
			</table>
			<p class=MsoNormal
				style="margin-top: 0.0000pt; margin-right: 0.0000pt; margin-bottom: 0.0000pt; margin-left: 0.0000pt; line-height: 150%;">
				<b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;">&nbsp;</span></b><b><span
					style="mso-spacerun: 'yes'; font-family: 宋体; mso-bidi-font-family: 'Times New Roman'; font-weight: bold; font-size: 12.0000pt; mso-font-kerning: 1.0000pt;"> </span></b>
		</p>-->

			<p
			style="margin:0pt 0pt 0pt 20pt; line-height: 150%;">
				<span style="font-family: 宋体;font-size: 14pt;">附录:</span></p>
		
		<table style="font-family: 宋体;font-size: 14pt;margin:0pt 0pt 0pt 20pt;text-align: center;">
			<tr>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">品名</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">单位</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">数量</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">单价</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">总额</td>
			</tr>
			<tr>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">大米</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">Kg</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">100</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">100</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">10000</td>
			</tr>
			<tr>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">合计</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;"></td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">100</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">100</td>
				<td style="border:1px solid #000;width:200pt;line-height:30pt;">10000</td>
			</tr>
		</table>
		<div style="margin: 50px 0;">
			<el-form :inline="true" :model=" formData" class="demo-form-inline">
				<el-row>
					<el-col :span="5">
						<el-form-item>
							<el-select style="width: 80%" v-model="formData.signature" placeholder="选择签章">
								<el-option
									v-for="item in allSignatureList"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="strCode">
							<el-input style="width: 100px" v-model="formData.strCode" placeholder="图片验证码"></el-input>
							<div style="float: right; display: inline-block; width: 49%;">
								<img class='code-img' :src="strCode.src" />
								<span class='code-text' @click="refreshPic">看不清</span>
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item>
							<el-input style="width:120px" v-model=" formData.code" placeholder="短信验证码"></el-input>
							<el-button @click="smgCode" :disabled="smsButton.disabled">{{smsButton.msg}}</el-button>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-button type="primary" @click="onSubmit">确定签章</el-button>
					</el-col>
					<el-col :span="2">
						<el-button type="primary" @click="onSubmit">取消</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	<!--</div>-->
    </div>
</template>

 <script>
  import headTop from '../../../components/headTop'
	import { getPurchaseContractDetail, getAppendixList, getAllSignature, coSmgCode } from '@/api/orderApi'
	import { mapState } from 'vuex'
	export default {
	    data() {
	        return {
				detailInfo: [],
				appendixList: [],
				allSignatureList: [],
				smsButton: {
					disabled: false,
					msg: '发送短信验证码'
				},
				formData: {
					signature: '',
					code: '',
					strCode: '',
				},
				strCode: {
					src: '/core/core/api/v1/getKaptchaImage',
				},
			}
	    },
		created() {
			this.initData();
		},
		computed: {
			...mapState(["loginInfo"]),
		},
		methods: {
			async initData(){
			    this.getList();
			},
			async getList() {
				this.listLoading = true;
				const eid = this.loginInfo.enterpriseId;
				try {
					// const resp = await getPurchaseContractDetail(params);
					// const res = await resp.json();
					// const result = await getAppendixList(2);
					// const resu = await result.json();
					const allSig = await getAllSignature(eid);
					const allSignature = await allSig.json();
					allSignature.forEach((v) => {
						this.allSignatureList.push({value: v.id, label: v.name})
					})

					// console.log("供应商", resu)
					// console.log("列表数据", res)

					// this.detailInfo = [...res];
					// this.appendixList = [...resu];
					// this.listLoading = false;
				} catch (e) {
					this.listLoading = false;
				}
			},
			sendMessage() {

			},
			async smgCode() {
					try {
						const resp = await coSmgCode(this.loginInfo.phone, this.formData.strCode);
						console.log("哈哈哈", resp.status)
						let start = 59;
						this.smsButton = {
							...this.smsButton,
							disabled: true,
						}
						var stop = setInterval(
							() => {
								if (start === 0) {
									this.smsButton = {
										disabled: false,
										msg: "发送短信验证码"
									}
									clearInterval(stop);
									return;
								}
								this.smsButton = {
									disabled: true,
									msg: `发送成功(${start}s)`
								}
								start--;
							}, 1000)
					} catch (e) {
						this.$message.error(e);
					}
			},
			
			refreshPic() {
				this.strCode.src = `/core/core/api/v1/getKaptchaImage?v=${new Date().getTime()}`;
			},
			async onSubmit() {
				if(this.formData.signature === '' || this.formData.code === '') {
					this.$message.error('请完善信息！');
					return false;
				}
				console.log('submit单打独斗!');
				const resp = await subSinature();
			},
		}
	}
</script>
<style lang="less">
//@import '../../../style/mixin';
.code {
    width: 100px;
}
.code-img {
    cursor: pointer;
    margin-left: 16px;
    height: 29px;
    width: 82px;
    vertical-align: middle;
    border-radius: 4px;
    position: relative;
}

.code-text {
    font-size: 12px;
    color: #00c6ff !important;
    cursor: pointer;
    transform: scale(0.8);
    float: right;
    position: absolute;
    right: 16px;
    top: 25px;
}
</style>
