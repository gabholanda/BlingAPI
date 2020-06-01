const getXMLTemplate = require('../services/xml.service');
const axios = require('axios');
const Pedido = require('../models/Pedido');

module.exports = (params) => {
    if (typeof params == 'object') {
        const { id, weighted_value, title } = params;
        axios.post(`${process.env.BLING_API}/pedido/json/&apikey=${process.env.BLING_KEY}?xml=${getXMLTemplate({ id, weighted_value, title })}`)
            .then(resp => {
                const pedido = new Pedido({ tituloPipedrive: title, valorTotal: weighted_value });
                Pedido.save(err => {
                    if (err) return resp.status(400).json({ error: err });
                    res.status(200).json(pedido);
                })
            })
            .catch(err => {
                console.log('Bling:', err);
            })
    } else {
        const pedidoArr = [];
        for (pedido in params) {
            const { id, weighted_value, title } = params;
            // May god forgive me for the horribleness of this developer crime I am commiting
            axios.post(`${process.env.BLING_API}/pedido/json/&apikey=${process.env.BLING_KEY}?xml=${getXMLTemplate({ id, weighted_value, title })}`)
                .then(resp => {
                    pedidoArr.push(new Pedido({ tituloPipedrive: title, valorTotal: weighted_value }))
                })
                .catch(err => {
                    console.log('Bling:', err);
                })
        }

        Pedido.create(pedidoArr, (err) => {
            if (err) return resp.status(400).json({ error: err });
            res.status(200).json(pedidoArr);
        })

    }
}