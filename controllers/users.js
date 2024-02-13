const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db("project2")
    .collection("users")
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to find a user.");
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("project2")
    .collection("users")
    .find({ _id: userId })
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const postUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    date_of_birth: req.body.date_of_birth,
    country: req.body.country,
  };
  const response = await mongodb
    .getDb()
    .db("project2")
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error);
  }
};

const putUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to update a user.");
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    date_of_birth: req.body.date_of_birth,
    country: req.body.country,
  };
  const response = await mongodb
    .getDb()
    .db("project2")
    .collection("users")
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error);
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid user id to delete a user.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("project2")
    .collection("users")
    .deleteOne({ _id: userId }, true);
  if (result.deleteUser > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error);
  }
};

module.exports = {
  getAll,
  getSingle,
  postUser,
  putUser,
  deleteUser,
};
