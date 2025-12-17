import express from "express"

/* Create Express server */
const app = express()

/* Start server */
app.get("/api/health", (req, res) => {
    res.status(200).json({message: "Success"})
});

app.listen(3000, () => console.log("Server is up and running"));