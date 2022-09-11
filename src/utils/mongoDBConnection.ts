import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/node-ts")
.then(() => console.log("connected To node-ts DB!"))
.catch((err: any) => console.log(err.message))