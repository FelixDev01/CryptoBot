const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 105248;
const SELL_PRICE = 105261;

const API_URL = "https://testnet.binance.vision"; //https://api.binance.com

let isOpened = false;

function calcSMA(data) {
    const closes = data.map(candle => parseFloat(candle[4]));
    const sum = closes.reduce((a,b) => a + b);
    return sum / data.length;
}

async function start() {
    
    const { data }  = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);

    console.clear();
    console.log("Price: " + price);

    const sma = calcSMA(data);
    console.log("SMA: " + sma);
    console.log("Is Opened? " + isOpened);

    if(price <= (sma * 0.9) && isOpened === false) {
        console.log("Comprar");
        isOpened = true;
    }

    else if (price >= (sma * 1.1) && isOpened === true) {
        console.log("Vender");
        isOpened = false;
    }
    else 
        console.log("Aguardar");
}

setInterval(start, 3000);

start();
