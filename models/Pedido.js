const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    tituloPipedrive: { type: String, required: true, unique: true },
    data: { type: Date, default: new Date() },
    valorTotal: {
        type: Number,
        get: v => v.toFixed(2),
        set: v => v.toFixed(2),
        default: 0
    },
}, {
    timestamps: true
});

const Pedido = mongoose.model("Pedido", PedidoSchema);
module.exports = Pedido;
