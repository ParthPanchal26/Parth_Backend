import express from "express";
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        Credential: true
    })
);

// Middlewares ...
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));


import healthcheckRouter from './routes/healthCheck.routes.js';
app.use("/api/v1/healthcheck", healthcheckRouter);

// export default app;
export { app };