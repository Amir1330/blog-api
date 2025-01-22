const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogs');
const path = require('path');
require('dotenv').config();  // Load environment variables

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());
app.use('/api', blogRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
