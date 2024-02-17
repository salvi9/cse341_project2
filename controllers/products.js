const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("products")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid product id to find a product.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("project2")
    .collection("products")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    console.log(lists);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const postProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error while posting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("products")
      .deleteOne({ _id: userId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postProduct,
  putProduct,
  deleteProduct,
};
