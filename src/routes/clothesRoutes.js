const express = require("express");
const clothesRouter = express.Router();
const { Clothes } = require("../models/index");

clothesRouter.get("/clothes", getClothes);
clothesRouter.post("/clothes", addClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
  let clothesResult = await Clothes.findAll();
  res.status(200).json(clothesResult);
}

async function getOneClothes(req, res) {
  const foodId = parseInt(req.params.id);

  let clothes = await Clothes.findOne({
    where: {
      id: foodId,
    },
  });
  res.status(200).json(clothes);
}

async function addClothes(req, res) {
  let newClothes = req.body;
  let addedClothes = await Clothes.create(newClothes);
  res.status(201).json(addedClothes);
}

async function updateClothes(req,res){
let clothesId=parseInt(req.params.id)
let updateClothes=req.body;
let foundClothes= await Clothes.findOne({

    where:{
        id:clothesId
    }
})
let updatedClothes= await foundClothes.update(updateClothes)

res.status(201).json(updatedClothes)


}
async function deleteClothes(req,res){
let clothesId=parseInt(req.params.id)
let deleteClothes=await Clothes.destroy({
where:{

    id:clothesId
}

})
res.status(204).json(deleteClothes)

}

module.exports=clothesRouter