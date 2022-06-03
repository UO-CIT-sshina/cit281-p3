const validDenomination = (coin) => [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1 ? true : false;

function valueFromCoinObject(obj) {
    const {denom = 0, count = 0} = obj;
    //validDenomination(denom) ? denom * count : 0; Idea for "error handling"
    return denom * count;
}

function valueFromArray(arr) {
    if (arr[0][0]) arr = arr[0];
    return arr.reduce((prev, current) => valueFromCoinObject(current) + prev, 0);
}

function coinCount(...coinage) {return valueFromArray(coinage);}

const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];

module.exports = {coinCount, coins};

/*console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins));*/