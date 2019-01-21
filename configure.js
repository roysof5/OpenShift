var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AR6zLYPS4xQ91FOr4VWn5OB43D32ffzJ5OJXCMbujYh0BBQwkPSJFeWa1_YyLIbhZHPHfSC2PjCj8w6b',
    'client_secret': 'EBvm-7upAB4Qj3QjVKhTXydbZtXAY5TGehkiqqoM6g7TN0eT-L-p73Vzp2EcuIQYiEWKwyOlnXFCpsMY',
    'headers' : {
		'custom': 'header'
    }
});