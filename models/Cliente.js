const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Source https://emailregex.com/ Only god knows how to understand this regex
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const ClienteSchema = new Schema({
    id: { type: String, unique: true },
    nome: { type: String, required: true },
    // Bling seems to only accept F and J, thus the enum
    tipoPessoa: { type: String, uppercase: true, maxlength: 1, enum: ['F', 'J'] },
    // Might need length 18 because of extra strings
    cpf: { type: Number, minlength: 11, maxlength: 18 },
    cnpj: { type: Number, minlength: 14, maxlength: 18 },
    // According to Bling these two datas (ie and rg) becomes required on certain conditions.
    ie: { type: String, maxlength: 10, required: () => this.tipoPessoa === 'J' },
    rg: { type: String, maxlength: 10, required: () => this.tipoPessoa === 'F' },
    contribuinte: { type: String, enum: [1, 9] },
    endereco: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    // Bling have default 99.999-99 value but returns non-constrained String on GET
    // So I did a simple regex to enforce it  
    cep: { type: String, match: /\d{2}.\d{3}-\d{3}/ },
    uf: { type: String, minlength: 2, maxlength: 2 },
    fone: String,
    email: { type: String, match: emailRegex }
}, {
    timestamps: true
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;