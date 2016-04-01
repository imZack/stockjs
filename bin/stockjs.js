#!/usr/bin/env node

var stock = require('../').stock;
var sendmail = require('../').sendmail;

stock.getTodayPrice('3294', function (data) {
  console.log(data);
  var config = {
    fromEmail: process.env.FROM_EMAIL || 'stockjs@example.com',
    fromName: process.env.FROM_NAME || '股價小幫手',
    to: process.env.TO.split(',').map(function (mail) {
      return mail.trim();
    })
  };

  sendmail(data, config);
});
