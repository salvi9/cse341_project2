const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .find({ _id: userId })
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const postProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const response = await mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error);
  }
};

const putProduct = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const response = await mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .replaceOne({ _id: userId }, product);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
};

const deleteProduct = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .deleteOne({ _id: userId }, true);
  if (result.deleteProduct > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error);
  }
};

module.exports = {
  getAll,
  getSingle,
  postProduct,
  putProduct,
  deleteProduct,
};
