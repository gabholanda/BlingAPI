const express = require('express');
const router = express.Router();
const axios = require('axios');
const SaveService = require('../services/save.service');

/* GET all pedidos */
router.get('/getPedidos', (req, res) => {
    axios.get(`${process.env.BLING_API}/pedidos/json/?apikey=${process.env.BLING_KEY}`)
        .then(pedidos => {
            res.json(pedidos.data.retorno);
        })
        .catch(err => {
            console.log(err);
        })
});

/* GET all 'won' deals from Pipedrive and insert as pedido in Bling, then save on MongoDB Atlas. */
router.get('/pipedrive/deals', (req, res) => {
    const { url } = req.body;
    axios.get(`${url}/api/v1/deals:(id,weighted_value,title)?status=won&api_token=${process.env.PIPEDRIVE_KEY}`)
        .then(response => {
            SaveService(response.data.data, res);
        })
        .catch(err => {
            console.log('Pipedrive:', err);
        })
});

module.exports = router;
