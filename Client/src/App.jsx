import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Moon, Sun, Sparkles } from 'lucide-react';

// Import all our new components
import WelcomeScreen from './components/WelcomeScreen';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';

// API Base URL (Make sure this port matches your server's port)
const API_URL = 'http://localhost:8001/api';

export default function CareerGuidanceApp() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading spinner
  const [userData, setUserData] = useState({
    name: '',
    education: '',
    interests: [],
    skills: []
  });
  const [recommendations, setRecommendations] = useState([]);

  // UPDATED useEffect
  // Check if user is logged in (via localStorage)
  useEffect(() => {
    const savedName = localStorage.getItem('careerGuidanceUser');
    if (savedName) {
      setIsLoading(true);
      
      // UPDATED: Use the new GET route and pass the name in the URL
      axios.get(`${API_URL}/profile/${savedName}`) 
        .then(res => {
          setUserData(res.data);
          // Get recommendations on load
          generateRecommendations(res.data, false); // 'false' = don't save profile again
          setCurrentStep('dashboard');
        })
        .catch(err => {
          // A 404 (Not Found) is okay here, it just means the user is new
          console.log("User profile not found in DB, showing welcome screen.");
          localStorage.removeItem('careerGuidanceUser'); // Clear the bad name
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []); // The empty array [] means this runs only once on component mount

  // Main function to save profile and get AI recommendations
  async function generateRecommendations(profile, saveProfile = true) {
    setIsLoading(true);
    let savedUser = profile;

    try {
      if (saveProfile) {
        // 1. Save profile to DB (using the POST route)
        const userRes = await axios.post(`${API_URL}/profile`, profile);
        savedUser = userRes.data;
        setUserData(savedUser);
        
        // 2. Save name to localStorage to "remember" them
        localStorage.setItem('careerGuidanceUser', savedUser.name);
      }

      // 3. Ask the AI for recommendations
      const res = await axios.post(`${API_URL}/recommend`, {
        skills: savedUser.skills,
        interests: savedUser.interests,
      });

      // 4. Set results and show dashboard
      setRecommendations(res.data);
      setCurrentStep('dashboard');

    } catch (err) {
      console.error("Error generating recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Log out / start over
  function handleReset() {
    localStorage.removeItem('careerGuidanceUser');
    setUserData({ name: '', education: '', interests: [], skills: [] });
    setRecommendations([]);
    setCurrentStep('welcome');
  }

  // --- Dynamic styles ---
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const subtextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  // --- Loading Spinner ---
  if (isLoading && currentStep !== 'welcome') {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <Sparkles className={`animate-spin text-indigo-500`} size={64} />
          <p className={`mt-4 text-xl font-semibold ${textClass}`}>
            Generating AI Recommendations...
          </p>
        </div>
      </div>
    )
  }

  // --- Main Render Logic ---
  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg backdrop-blur-lg bg-opacity-80 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${textClass} bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                CareerPath AI
              </h1>
              <p className={`text-xs ${subtextClass}`}>Your Future Starts Here</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300'} transition-all duration-300`}
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Conditional Rendering based on state */}
        {currentStep === 'welcome' && (
          <WelcomeScreen 
            onStart={() => setCurrentStep('profile')}
            darkMode={darkMode}
            cardBg={cardBg}
            textClass={textClass}
          />
        )}

        {currentStep === 'profile' && (
          <ProfileForm
            userData={userData}
            setUserData={setUserData}
            onSubmit={() => generateRecommendations(userData)}
            darkMode={darkMode}
            cardBg={cardBg}
            textClass={textClass}
            subtextClass={subtextClass}
          />
        )}

        {currentStep === 'dashboard' && (
          <Dashboard
            userData={userData}
            recommendations={recommendations}
            onReset={handleReset}
            onEditProfile={() => setCurrentStep('profile')}
            darkMode={darkMode}
            cardBg={cardBg}
            textClass={textClass}
            subtextClass={subtextClass}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-white'} mt-12 py-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={subtextClass}>© 2025 CareerPath AI - Empowering Your Career Journey</p>
        </div>
      </footer>
    </div>
  );
}