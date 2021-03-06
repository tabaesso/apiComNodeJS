'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');

router.get('/', controller.index);

router.get('/:slug', controller.getBySlug);

router.get('/admin/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag);

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router;
