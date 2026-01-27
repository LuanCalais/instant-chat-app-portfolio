import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://luancalais:jmaTS3NJO5EmTWaL@cluster0.rauyjrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ MongoDB can be connected");
  })
  .catch((ex) => {
    console.error("❌ MongoDB cannot be connected", ex);
    process.exit(1);
  });
