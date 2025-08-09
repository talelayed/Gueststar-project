const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Load env variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(morgan("dev")); // logs requests for debugging

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const productRoutes = require("./routes/productRoutes");
const designRoutes = require("./routes/designRoutes");
const orderRoutes = require("./routes/orderRoutes");
const clientRoutes = require("./routes/clientRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const recommendedProductRoutes = require("./routes/recommendedProductRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const workerRoutes = require("./routes/workerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const themeRoutes = require("./routes/themeRoutes");

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/recommendations", recommendedProductRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/themes", themeRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Mezyen API" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({ message: "Fallback 404: This route does not exist" });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
