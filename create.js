/* Copyright 2015-2016 PayPal, Inc. */
"use strict";
var paypal = require('./nodejs/node_modules/paypal-rest-sdk/');
require('./configure');
require('./server.js');

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "https://localhost",
        "cancel_url": "https://localhost"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment.id);
		console.log(payment.links);
		//var x = payment.id;
		exports.x = function(){
			Console.log(payment.id);
		}
		//return payment;///////////////////
    }
});