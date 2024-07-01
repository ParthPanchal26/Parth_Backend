// import app from "./app.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3001;

connectDB()
.then((result) => {
    app.listen(PORT, (req, res) => {
        console.log(`Server listening on port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Database connection error ! ${err}`);
});