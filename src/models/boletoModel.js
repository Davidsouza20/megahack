const mongoose = require('../database');

const BoletoSchema = new mongoose.Schema({
    amount: { //valor do boleto
        type: String,
        required: true,
    },
    expiration_date: { //data do vencimento
        type: Date,
        default: Date.now,
    },
    description: { //descrição
        type: String,
        required: true,
    },
    customer_person_name: { //nome do cliente
        type: String,
        required: true,
    },
    customer_zipcode: { //cep do cliente
        type: Number,
        maxlength: 8,
        required: true,
    },
    customer_address: { //endereço
        type: String,
        required: true,
    },
    customer_city: { //cidade
        type: String,
        required: true,
    },
    customer_state: { //estado
        type: String,
        required: true,
    },
    customer_neighborhood: { //bairro
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Boleto = mongoose.model('Boleto', BoletoSchema);
module.exports = Boleto;