# 🌾 CropMarket

&gt; Smart farming decisions powered by real-time government data — now with voice support

CropMarket is a voice-enabled, multilingual web application built for Indian farmers. It integrates official government agricultural market data (Agmarknet/eNAM), real-time weather from OpenWeatherMap, curated government farming news, and full voice input/output support — so farmers can access critical information hands-free while working in the fields.

## 🚀 Live Demo

**[https://cropmarketapp.netlify.app/](https://cropmarketapp.netlify.app/)**

---

## ✨ Features

### 📡 Agmarknet / eNAM Market Data
- Real-time crop prices from government-regulated mandis
- Coverage for **all Indian states**
- Daily arrivals, price trends, and commodity-wise listings
- Direct integration with Government of India agricultural data APIs

### 🌦️ OpenWeatherMap Integration
- Live weather forecasts and hyper-local conditions
- Rainfall predictions, temperature trends, and humidity alerts
- Extreme weather warnings (heatwaves, storms, floods)
- 5-day forecast for farm planning

### 📰 Government Farming News
- Curated news from official government agriculture portals
- Updates on PM-KISAN, crop insurance, MSP announcements, and new schemes
- State-wise and national agricultural policy updates

### 🎙️ Voice Input (Speech Recognition)
- Farmers can **speak commands and queries** instead of typing
- Supports natural language queries like:
  - *"What is the price of wheat in Punjab today?"*
  - *"Show nearby markets"*
  - *"What's the weather tomorrow?"*
- Powered by Web Speech API

### 🔊 Voice Output (Text-to-Speech)
- All content can be **read aloud** — prices, weather, news, market details
- Farmers can **listen while working** in fields or driving
- Multilingual TTS support (Hindi, Telugu, Tamil, English)
- Adjustable speech rate and volume

### 💰 Fare Calculation
- Estimate transportation costs to carry produce to mandis
- Compare fares across multiple nearby markets
- Factor in distance, vehicle type, and fuel costs

### 📍 Nearby Markets
- GPS-based discovery of nearby Agmarknet-registered mandis
- Distance, directions, and live commodity prices for each market
- Filter by crop type and active trading hours

### 🌱 Crop Life Cycle
- Stage-by-stage guidance: sowing → growth → harvesting → post-harvest
- Timely alerts for irrigation, fertilization, and pest control
- Crop-specific best practices

### 🌍 Multilingual Interface
| Code | Language | Voice Support |
|------|----------|---------------|
| EN   | English  | ✅ TTS + Voice Input |
| HI   | Hindi    | ✅ TTS + Voice Input |
| TE   | Telugu   | ✅ TTS + Voice Input |
| TA   | Tamil    | ✅ TTS + Voice Input |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React / Modern JavaScript Framework |
| Styling | Tailwind CSS / CSS Modules |
| Market Data API | Agmarknet / eNAM (Government of India) |
| Weather API | OpenWeatherMap API |
| News Source | Government Agriculture Portals / RSS Feeds |
| Voice (Input) | Web Speech API - SpeechRecognition |
| Voice (Output) | Web Speech API - SpeechSynthesis |
| Maps / Location | Geolocation API + Map Integration |
| i18n | React-i18next with RTL support |
| Deployment | Netlify (CI/CD + Global CDN) |

---

## 📦 Installation
# Clone the repository
git clone https://github.com/yourusername/cropmarket.git
# Navigate to project directory
cd cropmarket
# Install dependencies
npm install
# Set up environment variables
cp .env.example .env
# Start development server
npm run
🔧 Environment Variables
# Agmarknet / eNAM Government API
REACT_APP_AGMARKNET_API_KEY=your_agmarknet_key
REACT_APP_ENAM_API_URL=https://enam.gov.in/web/
# OpenWeatherMap
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_OPENWEATHER_URL=https://api.openweathermap.org/data/2.5/
# Government News / RSS Feeds
REACT_APP_GOV_NEWS_RSS=https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&SectionId=1
# Maps / Geolocation (for Nearby Markets)
REACT_APP_MAPS_API_KEY=your_google_maps_or_mapbox_key
# Optional: Custom TTS Engine (if not using browser default)
REACT_APP_TTS_API_KEY=your_tts_service_key

## 🎙️ Voice Features Setup
The app uses the Web Speech API for voice capabilities:
Voice Input (SpeechRecognition)
// Example: Activating voice search
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN'; // Hindi
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Process farmer's spoken query
};
recognition.start();
## Voice Output (SpeechSynthesis)
// Example: Reading market prices aloud
const utterance = new SpeechSynthesisUtterance("Wheat price in Punjab is ₹2,150 per quintal");
utterance.lang = 'hi-IN';
utterance.rate = 0.9; // Slightly slower for clarity
speechSynthesis.speak(utterance);

🚢 Deployment
# Build for production
npm run build
# Deploy to Netlify
netlify deploy --prod

🤝 Contributing
We welcome contributions! Priority areas:
More Languages: Marathi, Kannada, Bengali, Gujarati, Punjabi
Offline Voice: Pre-recorded audio for low-connectivity areas
AI Crop Doctor: Voice-based crop disease identification
WhatsApp Integration: Share market prices via voice messages

📄 License
MIT License —

🙏 Acknowledgments
Market data powered by Agmarknet & eNAM, Government of India
Weather data by OpenWeatherMap
News sourced from official government agriculture portals
Built for Indian farmers who deserve technology that speaks their language.

<p align="center">
  🚜 Made with ❤️ for India's farming community 🌾<br>
  <em>Because every farmer deserves to hear the price of their crop.</em>
</p>
