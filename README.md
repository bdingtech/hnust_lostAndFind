# 「科大失物招领」小程序使用说明书v1.0

## 简介

**“科大失物招领”是一款基于微信公众平台开发的小程序，主要用于提供校园内失物招领信息的发布与查询功能，力图打破信息的不对称性，让失主最短的时间内找回自己的物品。**

## 快速上手 --- 信息队端

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/TNTRmHGGJNYi3Uks-20200703163321734.png!thumbnail)

## 各模块介绍

### 首页

**因小程序目前处于起步阶段，所以目前只考虑校园卡、身份证、银行卡、学生证等有唯一对应值的物品，后期根据实际业务场景需要，可能会增加其他无唯一对应值的物品（钱包、手机等）的找回服务**

<img src="https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569572841967-20200703163352114.png!thumbnail" alt="img" style="zoom:30%;" />

### 2.搜索页-结果页

**搜索页以及结果页面设计为在同一页面页面显示，结果页分为普通用户提交和信息队提交两种，当用户在搜索页提交输入数据时，后台会自动判断是普通用户提交还是信息队提交，并渲染出不同的结果页。**

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/Screenshot_2019_09_27_16_59_55_037_com.edrawsoft.mindmaster-20200703163444239.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569573423333-20200703163452091.png!thumbnail)

![](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569574990305-20200703163459021.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569574996005-20200703163515372.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569575711658-20200703163527051.png!thumbnail)

### 3.失物招领信息提交页面

**提交页面也分为普通用户和信息队提交两种模式，区别是普通用户只能一次一次提交，而考虑到信息队有大量失物招领信息需要提交，所以特别为信息队方适配了批量提交功能，以及数据导出功能（方便在失物招领班长群内发布）**

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/Screenshot_2019_09_27_17_29_02_216_com.edrawsoft.mindmaster-20200703163548840.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569576676122-20200703163557356.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569576855013-20200703163605048.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569576862835-20200703163611074.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569577322565-20200703163614705.png!thumbnail)

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569577457510-20200703163622263.png!thumbnail)

## **其他页面**

### **1.登记卡页面**

**为了优化用户体验，以及增加用户的留存率，****当用户没有搜索到失物时，会提示用户是否先在此处先登记遗失物品信息，在“物品”内有校园卡、银行卡、身份证、学生证等，此外还预留了“其他”，方便后期业务的拓展，可作为未来失主发布的入口**

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569598870656-20200703163641056.png!thumbnail)

### 2.关于

**主要为此小程序的介绍以及查看日志和意见反馈功能，后期根据业务场景的拓展情况可能会将此页面替换为“个人中心”页面**

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569599419114-20200703163707081.png!thumbnail)

### 3.短信提醒

**当点击提交时，系统会根据学号以及身份证等已知信息向数据库中获取失主的联系方式，并向失主发送失物招领短信提醒（目前仅校园卡实现，其他物品正在开发中）**

![img](https://img-1251598303.cos.ap-guangzhou.myqcloud.com/1569599972000-20200703163723839.png!thumbnail)

## **后期计划以及一些idea**

- “失物广场”，提交的失物信息以及失主发布的丢失物品信息将实时展示出来，对于一些没有唯一特征的物品支持发布图片信息，并且实现规范化、格式化，打造成一个“失物广场”

- 将“时间”组件抽离出来，减少代码体积

- 对已找回的卡的标记

- 管理端小程序的开发，实现无纸化

- 取件码、二维码鉴权

  

## **已知bug（不影响正常使用）**

- 当有多张卡丢失时，展示页面只会显示最新的一张
- 错误处理机制（当服务器未返回数据时，会导致界面渲染错误，需要引入错误处理机制）
- 信息队提交页面批量提交时考虑到wx.navigator跳转api会导致页面加载异常，故采用了wx.redirect跳转api，带来的新问题是重定向之前的页面会被销毁掉，所以feedback页面接收到的是错误的计数值

## **反馈&建议&Feedback**

> QQ：1362061587
>
> WeChat：bdingtech
>
> Email：bdingtech@gmail.com

2019.9.28  00:17