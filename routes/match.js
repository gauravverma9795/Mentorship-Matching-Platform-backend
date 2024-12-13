// match.js
const express = require('express');
const router = express.Router();

// Assuming you're using a match service or model to interact with the database
const MatchService = require('../services/matchService');

// Create a match
router.post('/create', async (req, res) => {
  try {
    const matchData = req.body;
    // Validate data (can be done with a library like Joi or custom validation)
    if (!matchData.userId1 || !matchData.userId2) {
      return res.status(400).json({ error: 'Both users must be specified for a match.' });
    }

    const newMatch = await MatchService.createMatch(matchData);
    return res.status(201).json({ match: newMatch });
  } catch (error) {
    console.error('Error creating match:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get match details by ID
router.get('/:matchId', async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const match = await MatchService.getMatchById(matchId);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json({ match });
  } catch (error) {
    console.error('Error fetching match:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update match status (e.g., accepting or rejecting the match)
router.put('/:matchId/status', async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const { status } = req.body; // e.g., 'accepted' or 'rejected'

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updatedMatch = await MatchService.updateMatchStatus(matchId, status);
    if (!updatedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json({ match: updatedMatch });
  } catch (error) {
    console.error('Error updating match status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a match (e.g., if the match was canceled or needs to be removed)
router.delete('/:matchId', async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const deletedMatch = await MatchService.deleteMatch(matchId);

    if (!deletedMatch) {
      return res.status(404).json({ error: 'Match not found' });
    }

    return res.status(200).json({ message: 'Match deleted successfully' });
  } catch (error) {
    console.error('Error deleting match:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
