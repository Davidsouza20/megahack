const billetModel = require("../models/boletoModel");
const fs = require('fs')
const {bradesco} = require('boleto-pdf')

module.exports = {
    async index(req, res) {
        try {
            const billets = await billetModel.find();
            return res.json(billets);

        } catch(err) {
            return res.status(400).send({ error: 'Nothing to show'});
        }
    },
    
    async show(req, res) {
        try {
            const billet = await billetModel.findById(req.params.id);
            return res.json(billet);

        } catch(err) {
            return res.status(400).send({ error: 'Nothing to show'});
        }
    },

    async store(req, res) {
        
        const date = req.body.expiration_date.split('-');
        const amount = req.body.amount
        const boleto = {
            barcodeData: '23797726700000009997506091900000120800542910',
            digitableLine: '23797.50603 91900.000125 08005.429108 7 72670000000999',
            paymentPlace:
              'Pagável preferencialmente na rede Bradesco ou Bradesco Expresso.',
            beneficiary: 'SUC - CNPJ: 074.064.502/0001-12',
            beneficiaryAddress:
              'Rua Tenete Silveira, 315 - Centro - Florianópolis - SC  - CEP 88010-301',
            instructions:
              'Após o vencimento cobrar multa de 2,00% , mais juros ao mes de 1,00%.',
            agency: '7506',
            agencyDigit: '0',
            account: '54291',
            accountDigit: '1',
            expirationDay: new Date(date[0], date[1] -1, date[2]),
            documentDate: new Date(),
            processingDate: new Date(), 
            card: '09',
            documentNumber: '42493',
            formatedOurNumber: '09/19000001208-0',
            formatedValue: parseFloat(amount).toFixed(2),
            documentType: 'DS',
            accept: 'N',
            currencyType: 'Real (R$)',
            amount: req.body.amount,
            valueOf: ' ',
            descountValue: ' ',
            otherDiscounts: ' ',
            feeValue: ' ',
            outherFees: ' ',
            chargeValue: ' ',
            payer: {
              name: req.body.customer_person_name,
              registerNumber: '221.412.772-05',
              street: req.body.customer_address,
              number: '',
              complement: ' ',
              district: req.body.customer_neighborhood,
              city: req.body.customer_city,
              state: req.body.customer_state,
              postalCode: req.body.customer_zipcode
            },
            guarantor: {
              name: 'SUC Serviços Ltda',
              registerNumber: '074.064.502/0001-12',
              street: 'Servidão',
              number: '439',
              district: 'Estrada Nova',
              complement: ' ',
              city: 'Jaraguá do Sul',
              state: 'SC',
              postalCode: '89254-375'
            }
          }
          
        try {
            const billet = await billetModel.create(req.body);
            bradesco(boleto).then( data => {
                fs.writeFile('./public/billets/' + billet._id + '.pdf', data,'binary', err =>{
                  if(err){
                    console.log(err)
                    return
                  }
              
                  console.log('file saved')
                })
              }).catch(err =>{
                console.log(err)
              })
            return res.json(billet);
        } catch(err) {
            return res.status(400).send({ error: 'Billet creation faild'});
        }


        

    },

    async update(req, res) {
        try {
            const billet = await billetModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.json(billet);

        } catch(err) {
            return res.status(400).send({ error: 'Category update faild'});
        }
    },

    async destroy(req, res) {
        try {
            const billet = await billetModel.findByIdAndRemove(req.params.id);
            return res.send();

        } catch(err) {
            return res.status(400).send({ error: 'Category deletion faild'});
        }
    },

};