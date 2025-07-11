const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const experienceRoutes = require('./routes/experiences');

app.use(cors());
app.use(express.json());

app.use('/api/experiences', experienceRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
