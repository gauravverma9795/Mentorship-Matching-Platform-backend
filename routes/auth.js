const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { users } = require('../db/schema');
const router = express.Router();
const { eq } = require('drizzle-orm');

// Register
router.post('/register', async (req, res) => {
  const { username, password, role, skills, interests, bio } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      id: require('crypto').randomUUID(),
      username,
      password: hashedPassword,
      role,
      skills,
      interests,
      bio,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.select().from(users).where(eq(users.username, username));
    if (user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;