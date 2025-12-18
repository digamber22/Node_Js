const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

// connection
mongoose
.connect('mongodb://127.0.0.1:27017/Youtube-app-1')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mong Error" , err));

// schema
const userSchema = new mongoose.Schema({
  first_name : {
    type : String ,
    required : true ,
  },
  last_name : {
   type : String,
  }, 
  email : {
   type : String,
   required : true,
   unique : true ,
  },
  gender : {
   type : String,
   required : true,
  },
  job_title: {
  type : String, 
  required : true, 
  }
},{timestamps : true})

// model
const User = mongoose.model("user", userSchema);



// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/* -------------------- GET ALL USERS (JSON) -------------------- */
app.get("/api/users", async (req, res) => {
  const allDbUsers =  await User.find({});

  res.json(allDbUsers);
});

/* -------------------- SSR : USER NAMES LIST -------------------- */
app.get("/users", async (req, res) => {
 const allDbUsers =  await User.find({});
  const html = `
    <ul>
      ${allDbUsers
        .map(u => `<li>${u.first_name} - ${u.email} </li>`)
        .join("")}
    </ul>
  `;
  res.send(html);
});

/* -------------------- GET | PATCH | DELETE USER -------------------- */
app.route("/api/users/:id")

  // GET single user
  .get(async(req, res) => {
  const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }
    res.json(user);
  })

  // UPDATE user (PATCH)
  .patch(async (req, res) => {
     const user = await User.findByIdAndUpdate(req.params.id, {last_name : "changed"});

    return res.json({status : "Successfully update "});
  })

  // DELETE user
  .delete(async (req, res) => {
      const user = await User.findByIdAndDelete(req.params.id, {last_name : "changed"});

   return res.json(({status : "Delete successfully"}))
  });

/* -------------------- CREATE USER -------------------- */
app.post("/api/users", async (req, res) => {
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

});

/* -------------------- SERVER -------------------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


/* package.json file content
{
  "name": "index.js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^9.0.2",
    "nodemon": "^3.1.11"
  }
}


*/