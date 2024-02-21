import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { registermodel } from "./model/register.js";
const app = express();
app.use(cors());
app.use(express.json());

const mongo_url = "mongodb+srv://manu:manu_1234@cluster0.mmojlbu.mongodb.net/";

async function db() {
  try {
    await mongoose.connect(mongo_url);
    console.log("connected successfuly");
  } catch (error) {
    console.log(error);
  }
}

db();

app.get("/", (req, res) => {
res.send("welcome sir")
});

// registering route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = "";
  try {
    user = await registermodel.create({ name, email, password });
    console.log("user created " + user);
  } catch (error) {
    console.log(error);
  }
  res.json(user);
});

// get all registered users
app.get("/getregisters", async (req, res) => {
  res.json(await registermodel.find());
});

// delete the user 
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await registermodel.findByIdAndDelete(id);
  res.json("successfully deleted the user ");
});

// update the user 
app.put("/update/:id" , async(req,res)=>{
  const {id} = req.params;
  const {name, email, password} = req.body;
    await registermodel.findByIdAndUpdate(id ,{name, email, password} )
    res.json("updated")
})

app.listen(4000, () => {
  console.log("running");
});
