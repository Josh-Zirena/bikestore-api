const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const customerRouter = require("./routes/customerRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const repairRouter = require("./routes/repairRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const app = express();
const port = 8000;

console.log(process.env.ATLASPW);

mongoose.connect(
  `mongodb+srv://dbjosh:${process.env.ATLASPW}@cluster0.sfsbw.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use("/healthz", (req, res) => res.json({ ok: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(customerRouter);
app.use(inventoryRouter);
app.use(repairRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
