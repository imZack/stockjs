var mandrill = require('mandrill-api/mandrill');

var sendmail = module.exports = function sendmail(stock, config, callback) {
  var mandrill_client = new mandrill.Mandrill(config.mandrillKey);

	// just a simple html template
	var html = "日 期：" + stock.data[0] + 
		"<br>成交仟股：" + stock.data[1] + 
		"<br>成交仟元：" + stock.data[2] + 
		"<br>開盤：" + stock.data[3] + 
		"<br>最高：" + stock.data[4] + 
		"<br>最低：" + stock.data[5] + 
		"<br>收盤：" + stock.data[6] + 
		"<br>漲跌：" + stock.data[7] + 
		"<br>筆數：" + stock.data[8] + "<br>"

	var title = "[" + stock.code + stock.name + "] " + stock.data[0] +
    " 收盤價: " + stock.data[6] + " 漲跌: " + stock.data[7];

	var message = {
		"html": html,
		"subject": title,
		"from_email": config.from.address,
		"from_name": config.from.name,
		"to": config.users,
		"headers": {
		  "Reply-To": config.from.address
		}
	};
	
  if (typeof(callback) != "function") {
    callback = function cb(err, result) {
      if (err) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      } else {
        console.log("Success!");
      }
    };
  }

  // send mails via mandrill api
	mandrill_client.messages.send({"message": message, "async": true},
    function(result) {
      /*
        Response Format
        [{
          "email": "recipient.email@example.com",
          "status": "sent",
          "reject_reason": "hard-bounce",
          "_id": "abc123abc123abc123abc123abc123"
        }]
      */
      callback(null, result);
    }, function(e) {
      callback(e);
    });
}
