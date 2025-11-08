require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');

// Import Models
const User = require('./models/User');
const Career = require('./models/Career');

// OpenAI Config
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Middleware
app.use(cors()); // Allows your React app to make requests
app.use(express.json()); // Allows server to read JSON

// Simple request logger to help debug incoming client requests
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Connect to MongoDB (optional in local/dev)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGODB_URI not set; skipping MongoDB connection. DB-backed routes will be limited.");
}

// === API ROUTES ===

/**
 * [GET] /api/profile/:name
 * NEW: This route ONLY FETCHES a user by their name
 */
app.get('/api/profile/:name', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (!user) {
      // 404 is not an error, it just means the user is new
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Send back the found user
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * [POST] /api/profile
 * UPDATED: This route now intelligently creates or updates a user
 */
app.post('/api/profile', async (req, res) => {
  try {
    const { name, education, skills, interests } = req.body;

    // This command finds a user by name and updates them.
    // 'upsert: true' = if no user is found, create one.
    // 'new: true' = return the new, updated document.
    const updatedUser = await User.findOneAndUpdate(
      { name: name }, // Find by name
      { name, education, skills, interests }, // Set this new data
      { upsert: true, new: true } // Options
    );
    
    res.json(updatedUser); // Send back the saved/updated user
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving or fetching profile" });
  }
});

/**
 * [POST] /api/recommend
 * Generate AI-powered career recommendations.
 */
app.post('/api/recommend', async (req, res) => {
  const { skills, interests } = req.body;

  if (!skills || !interests) {
    return res.status(400).json({ message: "Skills and interests are required." });
  }

  try {
    // 1. Get all careers from *our* database to give the AI context
    const allCareers = await Career.find();
    // Create a simple list of just the names
    const careerList = allCareers.map(c => c.careerName).join(', ');

    // 2. Craft the AI Prompt
    const systemPrompt = `
      You are "CareerPath AI," an expert career counselor.
      You will be given a user's skills and interests, and a list of available career paths.
      Your job is to analyze the user's profile and recommend the top 3 careers *from the provided list*.
      You MUST respond *only* with a JSON object in the format:
      { "recommendations": ["Career Name 1", "Career Name 2", "Career Name 3"] }
    `;

    const userPrompt = `
      User Skills: ${skills.join(', ')}
      User Interests: ${interests.join(', ')}
      Available Careers: ${careerList}
    `;

    // 3. Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content);
    
    // 4. Get full career data for the AI's recommendations
    const detailedRecommendations = await Career.find({
      'careerName': { $in: aiResponse.recommendations }
    });
    
    // 5. Sort the results to match the AI's preferred order
    const sortedRecommendations = aiResponse.recommendations.map(name => 
        detailedRecommendations.find(c => c.careerName === name)
    ).filter(Boolean);

    // 6. Send the final, detailed list back to the React app
    res.json(sortedRecommendations);

  } catch (err) {
    console.error("OpenAI or DB error:", err);
    res.status(500).json({ message: "Error generating recommendations" });
  }
});

// Start the server
// (Remember to use the port you set, e.g., 8001)
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});