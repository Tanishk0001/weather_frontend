"use client";
import axios from "axios";
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherScene from "./components/WeatherScene";
import { Search } from "lucide-react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (retryCount = 0) => {
    if (!city) return;
    setLoading(true);
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://weather-backend-3-tlkd.onrender.com';
      
      // First, try to wake up the server with a health check
      if (retryCount === 0) {
        try {
          await axios.get(`${API_BASE_URL}/actuator/health`, { timeout: 5000 });
        } catch (healthError) {
          console.log('Health check failed, server might be sleeping');
        }
      }
      
      const res = await axios.get(
        `${API_BASE_URL}/api/weather?city=${city}`,
        { timeout: 30000 } // 30 second timeout for cold starts
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather", error);
      
      // Retry once if it's a timeout or 500 error
      if (retryCount === 0 && (error.code === 'ECONNABORTED' || error.response?.status === 500)) {
        console.log('Retrying request...');
        setTimeout(() => fetchWeather(1), 2000); // Retry after 2 seconds
        return;
      }
      
      if (error.code === 'ECONNABORTED') {
        alert('Request timeout. The server might be starting up (this can take 30-60 seconds on free tier). Please try again in a moment.');
      } else if (error.response?.status === 500) {
        alert('Server error. The backend service might be restarting. Please try again in a minute.');
      } else if (error.response?.status === 403) {
        alert('CORS error. Backend is being updated, please try again in a minute.');
      } else if (error.response?.status === 404) {
        alert('City not found. Please check the spelling and try again.');
      } else {
        alert(`Failed to fetch weather data: ${error.message}. Please try again.`);
      }
      setWeather(null);
    }
    setLoading(false);
  };

  const getBackgroundClass = () => {
    const condition =
      weather?.condition?.toLowerCase() ||
      weather?.weather?.[0]?.main?.toLowerCase() ||
      "";

    if (condition.includes("rain"))
      return "from-slate-800 via-blue-600 to-slate-900";
    if (condition.includes("cloud"))
      return "from-gray-400 via-slate-300 to-blue-100";
    if (condition.includes("snow"))
      return "from-blue-200 via-blue-50 to-white";
    if (condition.includes("clear") || condition.includes("sun"))
      return "from-yellow-300 via-orange-200 to-sky-200";

    return "from-blue-400 via-blue-200 to-blue-50"; // default
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${getBackgroundClass()} transition-all duration-700`}
    >
      {/* Card */}
      <div className="w-full max-w-2xl mx-auto bg-white/20 rounded-3xl shadow-2xl p-10 flex flex-col items-center mt-12 backdrop-blur-2xl border border-white/30 animate-fade-in">
        
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight text-center drop-shadow-md">
          🌤️ Live Weather
        </h1>
        <p className="text-gray-600 dark:text-gray-200 text-center mb-8 max-w-md">
          Get real-time weather updates for any city around the world. Just search for your city and see the current weather conditions, temperature, and more!
        </p>

        {/* Search Bar */}
        <div className="flex gap-3 w-full max-w-md mb-10">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-lg shadow-inner transition-all"
          />
          <button
            onClick={fetchWeather}
            disabled={loading || !city.trim()}
            className="px-5 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <Search size={20} /> <span>Search</span>
              </>
            )}
          </button>
        </div>

        {/* Weather Data */}
        {weather && (
          <div className="flex flex-col items-center gap-8 w-full">
            <WeatherCard weather={weather} />
            <div className="w-full flex justify-center mt-4">
              <WeatherScene weather={weather} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-600 text-sm text-center opacity-80">
        Made with ❤️ by{" "}
        <span className="text-blue-600 font-semibold">
          Tanishk Vardhan Srivastav
        </span>{" "}
        •{" "}
        <a
          href="https://github.com/Tanishk0001"
          target="_blank"
          className="underline hover:text-blue-500"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
