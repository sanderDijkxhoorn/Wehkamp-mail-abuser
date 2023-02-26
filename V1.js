const https = require('https');

// generate random string 8 characters long
const randomString = () => {
    return Math.random().toString(36).substring(2, 15);
}

const times = 500;
const email = "@wireps.com";
const payload = { "operationName": "subscribe", "variables": { "email": "" }, "extensions": { "persistedQuery": { "version": 1, "sha256Hash": "662d9be1ff344cd97d6e3d58a7c41c100e3700627f5d725e8ad38af1fec11750" } } }

for (i = 1; i <= times; i++) {
    setTimeout(function timer() {
        payload.variables.email = randomString() + email;
        let jpayload = JSON.stringify(payload);

        var options = {
            hostname: 'www.wehkamp.nl',
            port: 443,
            path: '/klantenservice/graphql',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': jpayload.length,
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36'
            }
        };

        var req = https.request(options, function (res) {
            if (res.statusCode === 200) {
                console.log("Successfully subscribed");
            } else if (res.statusCode === 429) {
                console.log("Too many requests, please wait for " + res.headers['retry-after'] + " seconds");
            } else {
                console.log('Status: ' + res.statusCode);
            }

            res.on('data', function (body) {
                console.log('Body: ' + body);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(jpayload);

        req.end();
    }, i * 1000);
}