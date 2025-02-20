import  express  from "express";
import  cors  from "cors";
import  mongoose  from "mongoose";
import dotenv from 'dotenv';

dotenv.config({
  path: "./.env"
});
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Mongodb connected")).catch( err => console.error(err))

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port: ${`http://127.0.0.1:${process.env.PORT}`} `)
})
