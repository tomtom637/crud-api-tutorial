require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const app = express();

const port = process.env.PORT;

// CONNECTION TO MONGO
mongoose.connect(process.env.DB_PATH, {
  dbName: 'node-course',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if(!err) {
    console.log('successfuly connected to mongodb');
    return;
  }
  console.log(err);
});

// HIDES CERTAIN INFORMATIONS IN THE RESPONSE HEADERS
app.use(helmet());

// REPLACES BODY-PARSER
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// PUBLIC IMG PATH
app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTES
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.listen(port, () => console.log(`server started on port ${port}`));