"use strict";
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Job = require('./models/Job');
const db = require('./db/connection')
const bodyParser = require('body-parser');
const port = 3001;
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Declarando uso do body-parser
app.use(bodyParser.urlencoded({ extended: false }));

//Configurando a pasta public
app.use(express.static(path.join(__dirname, 'public')));

//Configurando o handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    let search = req.query.job;
    let query = '%' + search + '%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress
    if (!search) {
        Job.findAll({
                order: [

                    ['createdAt', 'DESC']
                ]
            })
            .then(jobs => {
                res.render('index', {
                    jobs
                });
            })
            .catch(err => console.log(err));
    } else {
        Job.findAll({
                where: {
                    title: {
                        [Op.like]: query
                    }
                },
                order: [

                    ['createdAt', 'DESC']
                ]
            })
            .then(jobs => {
                res.render('index', {
                    jobs,
                    search
                });
            })
            .catch(err => console.log(err));
    }

});

//Conexão com o banco de dados

db
    .authenticate()
    .then(() => {
        console.log("Conectou no banco sqlite3 com sucesso.")
    })
    .catch(err => {
        console.log(`Algo deu errado durante a conexão ${err}`)
    })

// Rotas jobs
app.use('/jobs', require('./routes/jobs'))


app.listen(3001, () => {
    console.log(`Node is runing on port  ${port}`)
})