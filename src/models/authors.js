'use strict'


const Authors=(sequelize,DataTypes)=> sequelize.define("authors",{
name:{
type:DataTypes.STRING,
allowNull:false

},



})

module.exports=Authors;