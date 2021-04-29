# shop_backend
```javascript
express
```

$ node  app.js  运行

## 客户信息
  post
  http://host:3000/api/v1/customer/add
  {
    cName,
    phoneNumber,
    moneySum
  }


  获取客户信息
  get
  http://host:3000/api/v1/customer/:phoneNumber

  获取全部客户信息
  get
  http://host:3000/api/v1/customer/all

  skip,跳过几条
  limit 查询几条

## 消费记录

 添加消费记录 post
 http://host:3000/api/v1/expenditure/add
 {
    phoneNumber,电话
    cName,客户姓名
    comsumeTime,消费时间
    comsumeMoney消费金额
 }
 
 获取消费记录 get
 http://host:3000/api/v1/expenditure/:phoneNumber
 {
    phoneNumber
 }
 