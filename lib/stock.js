const https = require('https');
const debug = require('debug')('stock');

function getTodayPriceLegacy(code, callback) {
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

function getTodayPrice(code, callback) {
  const date = new Date();
  const today = `${date.getFullYear() - 1911}/${date.getMonth() + 1}/${date.getDate() < 10 ? date.getDate() + 10 : date.getDate()}`;
  const jsonUrl = `https://www.tpex.org.tw/openapi/v1/tpex_mainboard_quotes`;

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
        console.error('JSON Parse error');
        console.error(body);
        return;
      }

      // {"Date":"1121225","SecuritiesCompanyCode":"3293","CompanyName":"鈊象","Close":"711.00","Change":"-18.00","Open":"720.00","High":"728.00","Low":"708.00","TradingShares":"1202000","TransactionAmount":"861973000","TransactionNumber":"1042","LatestBidPrice":"711.00","LatesAskPrice":"712.00","Capitals":"140900780","NextLimitUp":"782.00","NextLimitDown":"640.00"},
      const stock = obj.find((item) => item.SecuritiesCompanyCode === code);
      const stockObj = {
        code: stock.SecuritiesCompanyCode,
        name: stock.CompanyName,
        data: stock,
      };

      callback(stockObj); // already grab json data, fire callback
    });
  }).on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    callback(null);
  });
}


module.exports = {
  getTodayPrice,
};
