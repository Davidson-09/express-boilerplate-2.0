import express from "express";
import logger from "./utils/logger";
import dotenv from 'dotenv'
import apiRoutes from "./modules";

dotenv.config();

const app = express();

// adding a limit is optional
app.use(express.json({ limit: '50mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (_req, res) => {
  res.json({ message: "Hi!" });
});

app.use('/api', apiRoutes)

const PORT = process.env.PORT

app.listen(PORT, async () => {
  logger.info(`App is running at port: ${PORT}`);

  // await setupConnections()
});