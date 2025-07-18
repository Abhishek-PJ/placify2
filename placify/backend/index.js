const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const experienceRoutes = require('./routes/experiences');

// ✅ CORS setup for specific domains (HTTPS)
app.use(cors({
  origin: ['https://placify.fun', 'https://www.placify.fun','http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/experiences', experienceRoutes);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
