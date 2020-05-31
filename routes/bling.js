const express = require('express');
const router = express.Router();
const axios = require('axios');
const getXMLTemplate = require('../services/xml.service');
const Pedido = require('../models/Pedido');

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
            const { id, weighted_value, title } = response.data.data;
            axios.post(`https://bling.com.br/Api/v2/pedido/json/&apikey=${process.env.BLING_API}?xml=${getXMLTemplate({ id, weighted_value, title })}`)
                .then(blingRes => {
                    console.log(blingRes);
                    const pedido = new Pedido()
                })
                .catch(err => {
                    console.log('Bling:', err);
                })

        })
        .catch(err => {
            console.log('Pipedrive:', err);
        })
});

module.exports = router;
