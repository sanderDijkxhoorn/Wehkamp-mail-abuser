// Require the https module to be sent the requests next version I will probably use fetch since it is now integrated with nodejs.
const https = require('https');

// generate random string 8 characters long :)
const randomString = () => {
    return Math.random().toString(36).substring(2, 15);
}

const times = 500;
const email = "@wireps.com";

// Subscribe 500 emails with the domain from email, with a delay of 1s between each.
for (i = 1; i <= times; i++) {
    setTimeout(function verynicedelaymethod() {
        let emailpayload = JSON.stringify({ "email_address": randomString() + email });

        var options = {
            hostname: 'www.wehkamp.nl',
            port: 443,
            path: '/service/newsletter',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Content-Length': emailpayload.length,
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15'
            }
        };

        var req = https.request(options, function (res) {
            if (res.statusCode === 200) {
                // Success!
                console.log("Successfully subscribed");
            } else if (res.statusCode === 429) {
                // They use 429 to display a page where it says you have to slowdown.
                console.log("Too many requests, please use a bigger delay :P");
            } else {
                // Unknown status, show it in the console so I could debug it.
                console.log('Status: ' + res.statusCode);
            }

            res.on('data', function (body) {
                // Debug log :P
                // console.log('Body: ' + body);
            });
        });

        req.on('error', function (e) {
            // Error handling :p
            console.log('problem with request: ' + e.message);
        });

        // Send the JSON data (email)
        req.write(emailpayload);

        req.end();
    }, i * 1000);
}