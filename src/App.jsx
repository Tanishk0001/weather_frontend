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

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://weather-backend-vd2p.onrender.com/api/weather?city=${city}`,
        { timeout: 10000 } // 10 second timeout
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Error fetching weather", error);
      if (error.code === 'ECONNABORTED') {
        alert('Request timeout. The server might be starting up. Please try again in a moment.');
      } else if (error.response?.status === 403) {
        alert('CORS error. Backend is being updated, please try again in a minute.');
      } else {
        alert('Failed to fetch weather data. Please check the city name and try again.');
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
