const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET all pedidos */
router.get('/getPedidos', (req, res, next) => {
    axios.get(`${process.env.BLING_API}/pedidos/json/?apikey=${process.env.BLING_KEY}`)
        .then(pedidos => {
            res.json(pedidos.data.retorno);
        })
        .catch(err => {
            console.log(err);
        })
});

/* GET all deals from Pipedrive */
router.get('/pipedrive/deals', (req, res, next) => {
    const { url } = req.body;
    axios.get(`${url}/api/v1/deals:(id,status)?api_token=${process.env.PIPEDRIVE_KEY}`)
        .then(response => {
            res.json(response.data.data);
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;