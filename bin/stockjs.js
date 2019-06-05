#!/usr/bin/env node

const { stock } = require('../');
const { sendmail } = require('../');

stock.getTodayPrice('3294', (data) => {
  const config = {
    fromEmail: process.env.FROM_EMAIL || 'stockjs@example.com',
    fromName: process.env.FROM_NAME || '股價小幫手',
    to: process.env.TO.split(',').map(mail => mail.trim()),
  };

  sendmail(data, config);
});
