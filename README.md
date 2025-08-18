# 🌤️ Live Weather App - Frontend

A beautiful, responsive React weather application with 3D visualizations and real-time weather data.

## ✨ Features

- 🌍 **Global Weather Data** - Get weather for any city worldwide
- 🎨 **Dynamic Backgrounds** - Background changes based on weather conditions
- 🎯 **3D Weather Scenes** - Interactive 3D visualizations using Three.js
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Live weather data from OpenWeatherMap API
- 🎭 **Beautiful UI** - Modern design with Tailwind CSS

## 🚀 Live Demo

- **Frontend**: [Deploy URL will be here]
- **Backend API**: https://weather-backend-vd2p.onrender.com

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics and animations
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd weather-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 API Integration

The app connects to the backend API at:
```
https://weather-backend-vd2p.onrender.com/api/weather?city={cityName}
```

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Deploy to Netlify
1. Run `npm run build`
2. Upload `build` folder to Netlify
3. Configure redirects if needed

### Deploy to Render
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🎯 Project Structure

```
src/
├── components/
│   ├── WeatherCard.jsx     # Weather data display
│   └── WeatherScene.jsx    # 3D weather visualization
├── App.jsx                 # Main application component
├── index.js               # React entry point
└── index.css              # Global styles with Tailwind
```

## 🌟 Weather Conditions Supported

- ☀️ **Clear/Sunny** - Bright sun with golden background
- ☁️ **Cloudy** - 3D cloud formations
- 🌧️ **Rainy** - Animated raindrops
- ❄️ **Snowy** - Falling snowflakes
- 🌫️ **Default** - Beautiful gradient background

## 🔧 Configuration

The app is pre-configured to work with the deployed backend. No additional configuration needed!

## 📱 Responsive Design

- **Mobile**: Optimized for touch interactions
- **Tablet**: Perfect layout for medium screens  
- **Desktop**: Full 3D experience with all features

## 🎨 Customization

You can easily customize:
- Colors in `tailwind.config.js`
- 3D scenes in `WeatherScene.jsx`
- Weather card layout in `WeatherCard.jsx`

## 🚀 Status: ✅ DEPLOYMENT READY

This frontend is fully configured and ready for deployment to any modern hosting platform!

---

Made with ❤️ by **Tanishk Vardhan Srivastav**