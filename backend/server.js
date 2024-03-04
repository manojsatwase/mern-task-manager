const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); // to accept json data

 app.use('/api/users',userRoutes);
 app.use("/api/tasks",taskRoutes);



// signify current working directory to build are frontend build folder

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

 // error middlewares
 app.use(notFound);
 app.use(errorHandler);


 const PORT = process.env.PORT || 5000;

 app.listen(PORT,console.log(`server is running at ${PORT}`));