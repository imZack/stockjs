const debug = require('debug')('stock:sendmail');

module.exports = function sendmail(stock, config, callback) {
  if (typeof (callback) !== 'function') {
    callback = function cb(err, result) {
      if (err) {
        debug(`Sendmail error occurred: ${err}`);
        return;
      }

      debug('Success!');
    };
  }

  let sendgrid;
  try {
    // eslint-disable-next-line global-require
    sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);
  } catch (e) {
    return callback(e);
  }

  // just a simple html template
  const html = `日 期：${stock.data[0]}<br>成交仟股：${stock.data[1]}<br>成交仟元：${stock.data[2]}<br>開盤：${stock.data[3]}<br>最高：${stock.data[4]}<br>最低：${stock.data[5]}<br>收盤：${stock.data[6]}<br>漲跌：${stock.data[7]}<br>筆數：${stock.data[8]}<br>`;

  const title = `[${stock.code}${stock.name}] ${stock.data[0]} 收盤價: ${stock.data[6]} 漲跌: ${stock.data[7]}`;

  // send mails via sendgrid
  const sendByMail = (err) => {
    if (err) return callback(err);
    if (config.to.length === 0) return callback();

    const email = new sendgrid.Email();
    const to = config.to.pop();
    email.setHtml(html);
    email.setSubject(title);
    email.addTo(to);
    email.setFrom(config.fromEmail);
    email.setFromName(config.fromName);

    return sendgrid.send(email, sendByMail);
  };

  return sendByMail();
};
