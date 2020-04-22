const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


//Rota de teste
router.get('/test', (req, res) => {
    res.send('Deu certo');
});


//Adicionando job via post

router.post('/add', (req, res) => {

    let { title, salary, company, description, email, new_job } = req.body;

    // insert
    Job.create({
            title,
            description,
            salary,
            company,
            email,
            new_job
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));

});


//Adicionando novas vagas
router.get('/add', (req, res) => {
    res.render('add');

});


//Detalhe das vagas -> view/1 view/2

router.get('/view/:id', (req, res) => Job.findOne({
        where: { id: req.params.id }
    }).then(job => {
        res.render('view', {
            job
        })
    }).catch(err => console.log(err))

)

module.exports = router;