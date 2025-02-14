const axios = require("axios");
require("dotenv").config()

const convertCurrency = async (req,res) => {
    const {fromCurrency, toCurrency, amount}=req.body
    try {
        const response = await axios.get(`${process.env.CURRENCY_BASE_URL}/${process.env.CURRENCY_API_KEY}/latest/${fromCurrency}`);
        const rates = response.data.conversion_rates;
        
        if (!rates[toCurrency]) {
            throw new Error("Invalid target currency");
        }

        const convertedAmount = amount * rates[toCurrency];
        res.send({ convertedAmount, rate: rates[toCurrency] })
    } catch (error) {
        throw new Error("Currency conversion failed");
    }
};

module.exports = convertCurrency ;
