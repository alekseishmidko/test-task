import * as dotenv from "dotenv";
import express from "express";
import log from "./middleware/log";
import headers from "./middleware/headers";
import router from "./router/index";
import db from "./db";
dotenv.config();

const app = express();

db.query("SELECT 1")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error", err));

app.use(log);
app.use(headers);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT ?? 5500;

app.listen(PORT, () => {
  console.debug(`Listening at http://localhost:${PORT}`);
});
