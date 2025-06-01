import express, { urlencoded } from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Request Handler
const app = express();

// Middleware
app.use(urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "*",
    allowedHeaders: ['POST', 'GET'],
    credentials: true,
    
}));

// Route
import api_index from './API/index.js'
app.use('/api', api_index);

// 404 Request
app.use((req, res)=>{
    res.status(404).send("<h1> 404 PAGE NOT FOUND </h1>");
});

// Error Handling
app.use((err, req, res, next)=>{
    console.error(err.stack);

    res.status(err.status || 500).json({
        payload:{
            error: {
                message: err.message || 'Internal Server Error',
            }
        }
    });
})

export default app;