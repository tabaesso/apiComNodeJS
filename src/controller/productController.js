'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');
const ValidationContract = require('../validators/fluent-validator');

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.find({ active: true }, 'title price slug');

      return res.status(200).json(products);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async getBySlug(req, res) {
    try {
      const { slug } = req.params;

      const product = await Product.findOne(
        { active: true, slug },
        'title description price slug tags',
      );

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async getById(req, res) {
    try {
      const { id: _id } = req.params;

      const product = await Product.findById({
        active: true,
        _id,
      });

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async getByTag(req, res) {
    try {
      const { tag } = req.params;

      const product = await Product.find({
        tags: tag,
      });

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async post(req, res) {
    const { title, slug, description, price, active, tags } = req.body;
    const contract = new ValidationContract();

    contract.hasMinLen(
      title,
      3,
      'O título deve conter pelo menos 3 caracteres',
    );

    contract.hasMinLen(slug, 3, 'O título deve conter pelo menos 3 caracteres');

    contract.hasMinLen(
      description,
      3,
      'O título deve conter pelo menos 3 caracteres',
    );

    // Se os dados forem inválidos
    if (!contract.isValid()) {
      return res
        .status(400)
        .json(contract.errors())
        .end();
    }

    try {
      const newProduct = await Product.create({
        title,
        slug,
        description,
        price,
        active,
        tags,
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async put(req, res) {
    Product.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        slug: req.body.slug,
      },
    })
      .then(() => {
        return res
          .status(201)
          .send({ message: 'Produto atualizado com sucesso!' });
      })
      .catch(e => {
        return res.status(400).send({
          message: 'Falha ao atualizar produto',
          data: e,
        });
      });
  },

  async delete(req, res) {
    Product.findOneAndRemove(req.body.id)
      .then(() => {
        return res
          .status(200)
          .send({ message: 'Produto removido com sucesso!' });
      })
      .catch(e => {
        return res.status(400).send({
          message: 'Falha ao remover produto',
          data: e,
        });
      });
  },
};
