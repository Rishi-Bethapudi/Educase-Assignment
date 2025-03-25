const express = require('express');
const schoolRoutes = express.Router();
const School = require('../models/School');

schoolRoutes.post('/addSchool', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });
    res
      .status(201)
      .json({ message: 'School added successfully', schoolId: newSchool.id });
  } catch (error) {
    console.error('Error inserting school:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
});

schoolRoutes.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude are required' });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    const schools = await School.findAll();
    const sortedSchools = schools
      .map((school) => ({
        ...school.toJSON(),
        distance: getDistance(
          userLat,
          userLng,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  } catch (error) {
    console.error('Error fetching schools:', error.message);
    res.status(500).json({ error: 'Database error' });
  }
});

function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

module.exports = schoolRoutes;
