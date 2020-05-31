const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    tituloPipedrive: { type: String, required: true },
    data: {type: Date, default: new Date()},
    valorTotal: {
        type: Number,
        get: v => v.toFixed(2),
        set: v => v.round(2)
    },
}, {
    timestamps: true
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;
