/* Copyright 2015-2016 PayPal, Inc. */
//"use strict";

var paypal = require('./nodejs/node_modules/paypal-rest-sdk/');
require('./configure');
require('./create.js');

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
        console.log(error.response);
        throw error;
    } else {
        for (var index = 0; index < payment.links.length; index++) {
        //Redirect user to this endpoint for redirect url
            if (payment.links[index].rel === 'approval_url') {
                console.log("******TESTING******");
				console.log(payment.links[index].href);
            }
        }
		//callback(payment);
        console.log(payment);
		
    }
});

var execute_payment_json = {
    //"payer_id": "Appended to redirect url",
	//"payer_id": "payerID",
	"payer_id": "3BXXXXTQRF2XA",/////////////////////
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        }
    }]
};


var paymentID = "PAY-6BN64923PN170734JLMODJJQ";
//var paymentID = require('./create');
//console.log("paymentID:");
//paymentID.x();

//console.log(payment.links[index].href);

paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
    }
});