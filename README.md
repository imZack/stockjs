stockjs 上櫃公司股價通知小幫手
==============================

![_080614_123140_am](https://cloud.githubusercontent.com/assets/690703/3815208/4f92cb56-1cc2-11e4-9a24-e272c5e82b21.jpg)

查詢上櫃公司當日股價，並透過 [mandrillapp.com](http://mandrillapp.com) 送出郵件通知

Usage
-----
- Install `npm install stockjs`
- Get a mandrillapp api key [Link](https://mandrill.com/)
- Let's coding


Example
-------
```js
var stockjs = require('stockjs');
var config = {
  "sendmail": {
    "mandrillKey": "YOUR_API_KEY_HERE",
    "from": {
      "address": "fbi@123.gov",
      "name": "StockMonitor"
    },
    "users": [
      {
        "email": "OMG@OMG.com",
        "name": "OMG",
        "type": "bcc"
      }
    ]
  }
};

stockjs.stock.getTodayPrice(3294 /* <-- your stock no*/, function(stockObj) {
  /**
  data:[日期, 成交仟股, 成交仟元, 開盤, 最高, 最低, 收盤, 漲跌, 筆數]
  {
    "code": "3294",
    "name": "英濟",
    "data": [
      "103/08/05",
      "391",
      "5,241",
      "13.30",
      "13.60",
      "13.25",
      "13.35",
      "0.15",
      "118"
    ]
  }
  **/
  stockjs.sendmail(stockObj, config.sendmail /* , callback(err, result) */);
});

```

API
---
**.stock.getTodayPrice(stockCode[, callback(stackObj)])**

**.sendmail(stockObject, config[, callback(err, result)])**

Data Source
-----------
- http://www.gretai.org.tw/web/index.php?l=zh-tw

TODO
----
- Multiple stocks at once
- Customize mail theme
- Using more generic api to get price
- ...


License
-------
MIT
