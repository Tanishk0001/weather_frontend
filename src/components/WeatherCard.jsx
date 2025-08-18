import React from "react";

export default function WeatherCard({ weather }) {
  const { name, main, weather: weatherDetails } = weather;

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl w-80 text-center">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600">{weatherDetails[0].description}</p>
      <p className="text-4xl font-semibold mt-4">Temperature: {main.temp}°C</p>
      <p className="text-sm text-gray-500">Humidity: {main.humidity}%</p>
    </div>
  );
}
