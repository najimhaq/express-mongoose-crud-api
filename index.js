//index.js
require('dotenv').config();

const express = require('express');

const useRouter = require('./routes/useRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

//mongoose server
connectDB();

//home routes
app.get('/', (req, res) => {
  res.send('Home page is running');
});

//router
app.use(useRouter);

//errorMiddleware
app.use(errorMiddleware);

app
  .listen(PORT, () => {
    console.log(`🚀 Server is running port ${PORT}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy. Trying ${PORT + 1}`);
      app.listen(PORT + 1);
    }
  });
