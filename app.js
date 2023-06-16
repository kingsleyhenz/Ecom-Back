import express  from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { mongoDB } from './config/db.js';
dotenv.config();
const app = express();
app.use(express.json())
mongoDB();

app.use(cors({
    origin: '*'
}
))
app.options('*', cors())
app.use(
    cors({
        credentials: true,
        origin: true,
        allowedHeaders: "*"
    })
)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

const PORT = process.env.PORT || 2000
app.listen(PORT,console.log(`Server is running at ${PORT}`))