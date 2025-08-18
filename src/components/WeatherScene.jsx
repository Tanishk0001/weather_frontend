import React from "react";

function WeatherScene({ weather }) {
  const condition = weather?.weather?.[0]?.main?.toLowerCase() || "clear";

  const getWeatherEmoji = () => {
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("clear")) return "☀️";
    return "🌤️";
  };

  const getAnimationClass = () => {
    if (condition.includes("rain")) return "animate-bounce";
    if (condition.includes("snow")) return "animate-pulse";
    return "animate-spin";
  };

  return (
    <div className="w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {condition.includes("rain") && (
          <div className="rain-animation">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-8 bg-blue-300 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}
        
        {condition.includes("snow") && (
          <div className="snow-animation">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Weather Icon */}
      <div className="text-center z-10">
        <div className={`text-8xl mb-4 ${getAnimationClass()}`}>
          {getWeatherEmoji()}
        </div>
        <div className="text-white text-xl font-semibold capitalize">
          {weather?.weather?.[0]?.description || "Weather Visualization"}
        </div>
        <div className="text-white/80 text-sm mt-2">
          Interactive Weather Scene
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 left-4 text-white/60 text-sm">
        {weather?.name}
      </div>
      <div className="absolute bottom-4 right-4 text-white/60 text-sm">
        {weather?.main?.temp}°C
      </div>
    </div>
  );
}

export default WeatherScene;
