const db = require("../data/dbConfig");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("steps as s")
    .join("schemes as sc", "sc.id", "s.scheme_id")
    .where("sc.id", id)
    .select("*");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([id]) => {
      return findById(id).first();
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(scheme => {
      return findById(id).first();
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del()
    .then(() => {
      return id;
    });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
