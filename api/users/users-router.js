const router = require("express").Router()

const { find, findById } = require("./users-model.js")

const { restricted, checkRole } = require('../auth/auth-middleware')

router.get("/", 
  restricted, 
  checkRole('admin'), 
  (req, res, next) => {
  find()
    .then(users => {
      res.json(users)
    })
    .catch(next) // our custom err handling middleware in server.js will trap this
})

router.get("/:user_id", 
  restricted, 
  checkRole('admin'), 
  (req, res, next) => {
    findById(req.params.user_id)
    .then(user => {
      res.json(user);
    })
    .catch(next);
})


module.exports = router
