const router = require('express').Router()

const {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

router
     .route('/')
     .get(getAllUsers)
     .post(createUser);

// /api/users/:id
router
     .route('/:id')
     .get(getUserById)
     .put(updateUser)
     .delete(deleteUser);

     module.exports = router;
