// in controller all the function is defining 

const User = require("../models/user");

async function handleGetAllUsers(req,res) {
 const allDbUsers = await User.find({});
 return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
 const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    res.json(user);
}

async function handleUpdateUserById(req, res) {
 const user = await User.findByIdAndUpdate(req.params.id, {last_name : "changed"});
    return res.json({status : "Successfully update "});
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id, {last_name : "changed"});
   return res.json(({status : "Delete successfully"}))
}

async function handleCreateNewUser(req, res) {
const body = req.body;
if(
  !body || 
  !body.first_name ||
  !body.last_name ||
  !body.email || 
  !body.gender ||
  !body.job_title
) {
 return res.status(400).json({msg:"All fields are req..."});
}
const result = await User.create({
  first_name: body.first_name,
  last_name: body.last_name,
  email: body.email,
  gender: body.gender,
  job_title: body.job_title,
});

console.log("result", result);

return res.status(201).json({ msg: "success", user: result });

}

module.exports = {
 handleGetAllUsers, 
 handleGetUserById,
 handleUpdateUserById,
 handleDeleteUserById,
 handleCreateNewUser,

}