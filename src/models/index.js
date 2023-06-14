"use strict";
require("dotenv").config();
const Collection=require('./lib/collection')
const { Sequelize, DataTypes } = require("sequelize");
const Food = require("./food");
const Clothes = require("./clothes");
const BooksSchema = require("./books");
const AuthorsSchema = require("./authors");
const POSTGRESS_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRESS_URI, sequelizeOptions);
const booksTable = BooksSchema(sequelize, DataTypes);
const authoursTable = AuthorsSchema(sequelize, DataTypes);
const booksCollection=new Collection(booksTable);
const authorCollection=new Collection(authoursTable);
authoursTable.hasMany(booksTable, {
  foreignKey: "authorId",
  sourceKey: "id",
});
booksTable.belongsTo(authoursTable, {
  foreignKey: "authorId",
  targetKey: "id",
});

module.exports = {
  db: sequelize,
  Food: Food(sequelize, DataTypes),
  Clothes: Clothes(sequelize, DataTypes),
  BooksModel: booksCollection,
  AuthorsModel: authorCollection,
};
