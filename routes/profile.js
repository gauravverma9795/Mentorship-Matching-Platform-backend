const express = require('express');
const db = require('../db');
const { users } = require('../db/schema');
const router = express.Router();
const { eq } = require('drizzle-orm');

router.post('/profile', async (req, res) => {
  const { userId, skills, interests, bio } = req.body;
  try {
    await db
      .update(users)
      .set({ skills, interests, bio })
      .where(eq(users.id, userId));
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;