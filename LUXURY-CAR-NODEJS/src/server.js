require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import apiRouter from './routes/api';
import morgan from 'morgan';
import connectDB from './config/connectDB'
import cookieParser from 'cookie-parser'
import cors from "cors"

let app = express();

// FIX CORS
app.use(
    cors({
        origin: process.env.REACT_URL,
        credentials: true,
    })
)

// view engine
viewEngine(app)

// body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser())

// check connect database
connectDB();

// init routes
initWebRoutes(app)

// api routes
apiRouter(app)

// HTTP logger 
app.use(morgan('combined'))

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
