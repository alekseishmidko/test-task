import express from "express";
import log from "./middleware/log.js";
import headers from "./middleware/headers.js";
import router from "./router/index.js";

const app = express();

app.use(log);
app.use(headers);
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.debug(`Listening at http://localhost:${PORT}`);
});
