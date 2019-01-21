var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
// Add your credentials:
// Add your client ID and secret
//var app = express();

//app.set('view engine', 'ejs');


var CLIENT =
  'AR6zLYPS4xQ91FOr4VWn5OB43D32ffzJ5OJXCMbujYh0BBQwkPSJFeWa1_YyLIbhZHPHfSC2PjCj8w6b';
var SECRET =
  'EBvm-7upAB4Qj3QjVKhTXydbZtXAY5TGehkiqqoM6g7TN0eT-L-p73Vzp2EcuIQYiEWKwyOlnXFCpsMY';
var PAYPAL_API = 'https://api.sandbox.paypal.com';
express().set('view engine', 'ejs').use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }))
.
get('/', function (req, res) {
  res.render('index');
})
  // Set up the payment:
  // 1. Set up a URL to handle requests from the PayPal button
  .post('/my-api/create-payment/', function(req, res)
  {
    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: '5.99',
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'http://localhost:3000/my-api/execute-payment/',
          cancel_url: 'http://localhost:3000/'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
  })
  // Execute the payment:
  // 1. Set up a URL to handle requests from the PayPal button.
  .post('/my-api/execute-payment/', function(req, res)
  {
	  console.log(req.body.paymentID);
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '19.99',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
  }).listen(8080, function()
  {
    console.log('Server listening at http://localhost:8080/ddddddddddd');
  });
// Run `node ./server.js` in your terminal