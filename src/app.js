'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// conecta ao banco
mongoose.connect('seu_banco_aqui');

// carrega os models
const Product = require('./models/product');

// carrega as rotas
const indexRoutes = require('./routes/indexRoutes'); //Carrega as rotas
const crudRoutes = require('./routes/productRoutes'); //Carrega as rotas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoutes);
app.use('/products', crudRoutes);

module.exports = app;