import express from "express";
import db from "../db";
import { readFileSync } from "fs";
import { join } from "path";
import { stationsService } from "../services/stations";
import { tagsService } from "../services/tags";

const router = express.Router();

router.get("/version", (req, res) => {
  res.send("1.0.0");
});

router.get("/seed", async (req, res) => {
  try {
    const createSQLPath = join(__dirname, "..", "..", "sql", "stations.sql");
    const dataSQLPath = join(__dirname, "..", "..", "sql", "data.sql");

    const createSQL = readFileSync(createSQLPath, "utf-8");
    const dataSQL = readFileSync(dataSQLPath, "utf-8");

    await db.query(createSQL);
    await db.query(dataSQL);

    res.send("Database structure and data seeded successfully");
  } catch (error) {
    res.status(500).send(`Failed to seed database ${JSON.stringify(error)}`);
  }
});

router.get("/stations", async (req, res) => {
  try {
    const stations = await stationsService.getAllStations();

    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: "internal-error-get-stations" });
  }
});
router.patch("/tags", async (req, res) => {
  try {
    const { body } = req;

    const isExistTag = await tagsService.findTag(body);

    if (!isExistTag) {
      res.status(404).json({ error: "tag-not-found" });
    }

    const tags = await tagsService.updateTag(body);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "internal-error-patch-tags" });
  }
});

export default router;
