import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {});

const db = mongoose.connection;
db.on("error", (error) => console.log("DB Error", error)); //on : happen many times
db.once("open", () => console.log("Connected to DB!")); //once : happen only once
//CRUD : create read update delete
