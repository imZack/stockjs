const https = require('https');
const debug = require('debug')('stock');

function getTodayPrice(code, callback) {
  const date = new Date();
  const today = `${date.getFullYear() - 1911}/${date.getMonth() + 1}/${date.getDate() < 10 ? date.getDate() + 10 : date.getDate()}`;
  const jsonUrl = `https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43_result.php?d=${today}&stkno=${code}`;

  https.get(jsonUrl, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      let obj;
      try {
        obj = JSON.parse(body);
      } catch (err) {
        debug('JSON Parse error');
        debug(body);
        return;
      }

      const stockObj = {
        code: obj.stkNo,
        name: obj.stkName,
        data: obj.aaData[obj.aaData.length - 1],
      };

      callback(stockObj); // already grab json data, fire callback
    });
  }).on('error', (e) => {
    debug(`problem with request: ${e.message}`);
  });
}

module.exports = {
  getTodayPrice,
};
