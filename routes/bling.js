const express = require('express');
const router = express.Router();
const axios = require('axios');
const SaveService = require('../services/save.service');
const Pedido = require('../models/Pedido');

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

/* GET consolidated Data */
router.get('/getData', (req, res) => {
    Pedido.aggregate([{
        $group: {
            _id: { $dateToString: { format: "%d-%m-%Y", date: "$data" } },
            valorTotal: { $sum: '$valorTotal' },
        }
    }], (err, pedidos) => {
        if (err) res.status(500).json({ error: err });
        res.json(pedidos);
    })
});

module.exports = router;
