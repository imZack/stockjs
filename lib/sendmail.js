const debug = require('debug')('stock:sendmail');
const sgMail = require('@sendgrid/mail');

module.exports = function sendmail(stock, config, callback) {
  if (typeof (callback) !== 'function') {
    callback = function cb(err, result) {
      if (err) {
        console.error(`Sendmail error occurred: ${err}`);
        return;
      }

      console.info('Success!');
    };
  }
  
  // just a simple html template
  const html = `日 期：${stock.data.Date}<br>成交仟股：${stock.data.TradingShares/1000}<br>成交仟元：${stock.data.TransactionAmount/1000}<br>開盤：${stock.data.Open}<br>最高：${stock.data.High}<br>最低：${stock.data.Low}<br>收盤：${stock.data.Close}<br>漲跌：${stock.data.Change}<br>筆數：${stock.data.TradingShares}<br>`;
  const subject = `[${stock.code}${stock.name}] ${stock.data.Date} 收盤價: ${stock.data.Close} 漲跌: ${stock.data.Change}`;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: config.to,
    from: config.fromEmail,
    fromname: config.fromName,
    subject,
    html,
  };
  sgMail.sendMultiple(msg, callback);
};
