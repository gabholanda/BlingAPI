const getXMLTemplate = require('../services/xml.service');
const axios = require('axios');
const Pedido = require('../models/Pedido');

module.exports = (params, res) => {
    if (params.length >= 1 && Array.isArray(params)) {
        const pedidoArr = [];
        let finished = 0;

        params.forEach(pedido => {
            const { id, weighted_value, title } = pedido;
            // May god forgive me for the horribleness of this developer crime I am commiting
            axios.post(`${process.env.BLING_API}/pedido/json/&apikey=${process.env.BLING_KEY}?xml=${getXMLTemplate({ id, weighted_value, title })}`)
                .then(response => {
                    pedidoArr.push(new Pedido({ tituloPipedrive: title, valorTotal: weighted_value }))
                    finished++;
                    if (finished === params.length) {
                        Pedido.create(pedidoArr, (err) => {
                            if (err) return res.status(400).json({ error: err });
                            res.status(200).json(pedidoArr);
                        })
                    }
                })
                .catch(err => {
                    console.log('Bling:', err);
                    res.status(500).json({ error: err });
                })
        });

    } else if (params) {
        const { id, weighted_value, title } = params;
        axios.post(`${process.env.BLING_API}/pedido/json/&apikey=${process.env.BLING_KEY}?xml=${getXMLTemplate({ id, weighted_value, title })}`)
            .then(response => {
                const pedido = new Pedido({ tituloPipedrive: title, valorTotal: weighted_value });
                pedido.save(err => {
                    if (err) return res.status(400).json({ error: err });
                    res.status(200).json(pedido);
                })
            })
            .catch(err => {
                console.log('Bling:', err);
            })
    } else {
        res.status(500).json({ error: "You need to pass valid data" });
    }
}