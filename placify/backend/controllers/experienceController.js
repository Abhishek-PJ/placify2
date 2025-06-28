const db = require('../db');

// Create
exports.createExperience = async (req, res) => {
  const { userId, company, role, description, fileKey } = req.body;
  try {
    await db.execute(
      'INSERT INTO experiences (user_id, company, role, description, file_key) VALUES (?, ?, ?, ?, ?)',
      [userId, company, role, description, fileKey]
    );
    res.status(201).json({ message: 'Experience created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
exports.getAllExperiences = async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM experiences');
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

// Get by user
exports.getExperiencesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await db.execute(
      'SELECT * FROM experiences WHERE user_id = ?',
      [userId]
    );
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching user experiences:', err);
    res.status(500).json({ error: 'Failed to fetch user experiences' });
  }
};

// Update
exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, role, description } = req.body;
  try {
    await db.execute(
      'UPDATE experiences SET company = ?, role = ?, description = ? WHERE id = ?',
      [company, role, description, id]
    );
    res.json({ message: 'Experience updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM experiences WHERE id = ?', [id]);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
