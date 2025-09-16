import express from "express";
import restAPI from "../restAPI.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
  })
);
app.use("/api", restAPI);

app.get("/", (_, res) => {
  res.json({ message: "Todo ok" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
