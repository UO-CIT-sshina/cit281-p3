const fs = require('fs');
const fastify = require("fastify")();
const {coinCount, coins} = require("./p3-module.js");

fastify.get("/", (request, require) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            console.log(err);
            require
            .code(500)
            .header('Content-Type', 'text/html')
            .send("Error processing request");
        } else {
            require
            .code(200)
            .header('Content-Type', 'text/html')
            .send(data);
        }
    });
});
fastify.get("/coin", (request, require) => {
    const coinValue = coinCount(request.query);
    const {denom, count} = request.query;
    require
    .code(200)
    .header('Content-Type', 'text/html')
    .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});
fastify.get("/coins", (request, require) => {
    const {option} = request.query;
    let coinValue = 0;
    switch (parseInt(option)) {
        case 1:
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case 2:
            coinValue = coinCount(...coins);
            break;
        case 3:
            coinValue = coinCount(coins);
            break;
    }
    require
    .code(200)
    .header('Content-Type', 'text/html')
    .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
})

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});