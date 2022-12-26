//here it is also the same approach but we can assign these into a object namely db here so, that we don't have to export multiple object.
let db = {};
db.roles = require("./role"); //now we don't have to import them again and again instead we will import index.js
db.users = require("./user");
//belongsToMany and hasMany is same use which ever you like.

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.Roles = ["user", "admin"];
module.exports = db;
