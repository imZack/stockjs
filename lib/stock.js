var http = require('http');
var stock = module.exports = {};

stock.getTodayPrice = function (code, callback) {
  var date = new Date();
  var today = (date.getFullYear() - 1911) + '/' +
              (date.getMonth() + 1) + '/' +
              (date.getDate() < 10 ? date.getDate() + 10 : date.getDate());

  var jsonUrl = 'http://www.tpex.org.tw/web/stock/aftertrading/' +
    'daily_trading_info/st43_result.php?d=' + today + '&stkno=' + code;

  var req = http.get(jsonUrl, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      try {
        var obj = JSON.parse(body);
      } catch (err) {
        console.log('JSON Parse error');
        console.log(body);
        return;
      }

      var stockObj = {
        code: obj.stkNo,
        name: obj.stkName,
        data: obj.aaData[obj.aaData.length - 1],
      };

      callback(stockObj); // already grab json data, fire callback
    });
  }).on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });
};
