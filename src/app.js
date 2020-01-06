'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const indexRoutes = require('./routes/indexRoutes'); //Carrega as rotas
const crudRoutes = require('./routes/productRoutes'); //Carrega as rotas

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoutes);
app.use('/products', crudRoutes);

module.exports = app;