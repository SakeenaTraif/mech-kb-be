const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const passport = require("passport");
const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const {localStrategy} = require("./middleware/passport");
const path = require("path");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Passport
app.use(passport.initialize());
passport.use(localStrategy);

console.log("directoryname", path.join(__dirname, "media"));

// Routes
app.use("/products", productRoutes);
app.use("/shops", shopRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Not Found
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Handling Error
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8000;
db.sequelize.sync({ alter: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
