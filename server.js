const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, connectDB } = require('./config/dataBase');
const schoolRoutes = require('./routes/schoolRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api', schoolRoutes);
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

connectDB().then(async () => {
  await sequelize.sync();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
