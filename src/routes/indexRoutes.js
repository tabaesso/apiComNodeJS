'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try{
  res.status(200).send({
    title: 'Node Store API',
    version: '0.0.2',
  });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
