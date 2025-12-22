import express from "express";
import path from "path";
import {clerkMiddleware} from '@clerk/express';
import {serve} from 'inngest/express';
import {functions, inngest} from "./config/inngest.js";
import {ENV} from "./config/env.js";
import {connectDB} from "./config/db.js";

/* Create Express server */
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/inngest', serve({client: inngest, functions: functions}));

/* Start server */
app.get("/api/health", (req, res) => {
    res.status(200).json({message: "Success"})
});

/* Make app ready for deployment */
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")))

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../admin/", "dist", "index.html"));
    });
}

const startServer = async () => {
    await connectDB();
    app.listen(ENV.PORT || 3000, () => {
        console.log("✅ Server is up and running")
    });
};

startServer();