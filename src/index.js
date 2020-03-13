'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// conecta ao banco
mongoose.connect(
  'mongodb+srv://tabata:tabata123@ndstr-k8dbv.azure.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
);

// carrega as rotas
const indexRoutes = require('./routes/indexRoutes'); //Carrega as rotas
const crudRoutes = require('./routes/productRoutes'); //Carrega as rotas

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', crudRoutes);

module.exports = app;
