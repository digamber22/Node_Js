const express = require("express");
const {handleGetAllUsers,
      handleGetUserById ,
      handleUpdateUserById,
      handleDeleteUserById,
      handleCreateNewUser
} = require("../controllers/user");

const router = express.Router();

/* -------------------- GET ALL USERS (JSON) -------------------- */
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);


/* -------------------- GET | PATCH | DELETE USER -------------------- */
router.
route("/:id")

  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);


module.exports = router;