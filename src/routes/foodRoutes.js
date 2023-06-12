const express = require("express");
const foodRouter = express.Router();
const { Food } = require("../models/index");

foodRouter.get("/food", getFood);
foodRouter.post("/food", addFood);
foodRouter.get("/food/:id", getOneFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
  let foodResult = await Food.findAll();
  res.status(200).json(foodResult);
}

async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);

  let food = await Food.findOne({
    where: {
      id: foodId,
    },
  });
  res.status(200).json(food);
}

async function addFood(req, res) {
  let newFood = req.body;
  let addedFood = await Food.create(newFood);
  res.status(201).json(addedFood);
}

async function updateFood(req, res) {
  let foodId = parseInt(req.params.id);
  let updateFood = req.body;

  let foundFood = await Food.update(updateFood, {
    where: {
      id: foodId,
    },
  });

  res.status(201).json(foundFood);
}

async function deleteFood(req, res) {
  let foodId = parseInt(req.params.id);
  let deleteFood = await Food.destroy({
    where: {
      id: foodId,
    },
  });
  res.status(204).json(deleteFood);
}

module.exports = foodRouter;
