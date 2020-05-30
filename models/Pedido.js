const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    data: Date,
    data_saida: Date,
    data_prevista: Date,
    numero: Number,
    numero_loja: Number,
    loja: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    nat_operacao: String,
    vendedor: String,
    cliente: { type: 'ObjectId', ref: 'Cliente' },
    // Completely optional for the Pedido model
    // itens: { type: [Schema.Types.ObjectId], ref: "Item" },
    idFormaPagamento: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    // parcelas: { type: [Schema.Types.ObjectId], ref: "Parcela" },
    vlr_frete: { type: String, match: /\d{2}.\d{3}-\d{3}/ },
    vlr_desconto: { type: String, minlength: 2, maxlength: 2 },
    obs: String,
    obs_internas: { type: String, match: emailRegex },
    numeroOrdemCompra: String,
    outrasDespesas: String
}, {
    timestamps: true
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;
