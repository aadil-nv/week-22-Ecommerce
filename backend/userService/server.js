const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 7000;
const userRoutes = require('./Routes/userRoute')

app.use(express.json())
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use("/api/user",userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `.bgBrightYellow.bold.underline);
});
