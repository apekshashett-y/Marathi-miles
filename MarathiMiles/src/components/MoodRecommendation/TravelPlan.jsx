// src/components/MoodRecommendation/TravelPlan.jsx - COMPREHENSIVE VERSION
import React, { useState, useEffect, useRef } from 'react';
import { 
  calculateDistance, 
  getDetailedBudget,
  calculateTransportTime, 
  getTransportCost,
  getPerDayBudget,
  initializeUserLocation,
  getUserLocation,
  getLocationSource
} from '../../utils/travelCalculations';
import './TravelPlan.css';

// AI Assistant Component
const AIAssistant = ({ destination, userLocation, userPreferences }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi! I'm your travel assistant for ${destination}. Ask me anything about the place, food, festivals, or travel tips!`, sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const destinationInfo = {
    'Matheran': {
      description: 'A beautiful hill station near Mumbai, Asia\'s only automobile-free hill station',
      food: ['Parsi cuisine', 'Local Maharashtrian thali', 'Chicken cafreal', 'Sizzlers'],
      festivals: ['Matheran Monsoon Festival', 'Hill Station Music Festival'],
      attractions: ['Charlotte Lake', 'Echo Point', 'Sunset Point', 'One Tree Hill'],
      tips: ['Wear comfortable shoes for walking', 'No vehicles allowed - use horses or walk', 'Best time: Oct-Feb'],
      localInfo: 'Located in Raigad district, 90km from Mumbai. Altitude: 800m. Known for its toy train.',
      weather: 'Pleasant throughout year, misty in monsoon',
      shopping: ['Chikki (local sweet)', 'Strawberry products', 'Local handicrafts']
    },
    'Lonavala': {
      description: 'Popular hill station between Mumbai and Pune, known for its waterfalls and chikki',
      food: ['Chikki (peanut brittle)', 'Fried Maggi', 'Local corn', 'Hot chocolate'],
      festivals: ['Monsoon Magic Festival', 'Lonavala Food Festival'],
      attractions: ['Tiger\'s Leap', 'Bushi Dam', 'Rajmachi Fort', 'Karla Caves'],
      tips: ['Visit during monsoon for waterfalls', 'Try different flavors of chikki', 'Wear trekking shoes for forts'],
      localInfo: 'Located in Pune district, 106km from Mumbai. Part of Sahyadri mountain ranges.',
      weather: 'Cool and pleasant, heavy rainfall in monsoon',
      shopping: ['Chikki varieties', 'Chocolate fudge', 'Mapro products']
    },
    'Mahableshwar': {
      description: 'Largest hill station in Maharashtra, famous for strawberries and viewpoints',
      food: ['Strawberry with cream', 'Corn patties', 'Maple walnut fudge', 'Fresh strawberries'],
      festivals: ['Strawberry Festival', 'Mahableshwar Monsoon Carnival'],
      attractions: ['Arthur\'s Seat', 'Mapro Garden', 'Venna Lake', 'Pratapgad Fort'],
      tips: ['Visit strawberry farms', 'Carry woolens in winter', 'Book accommodation in advance'],
      localInfo: 'Located in Satara district, 270km from Mumbai. Altitude: 1,353m.',
      weather: 'Cool throughout year, misty and romantic',
      shopping: ['Strawberry jam', 'Honey', 'Mapro products', 'Local strawberries']
    },
    'Alibaug': {
      description: 'Coastal town near Mumbai, known for beaches and historic forts',
      food: ['Fresh seafood', 'Malvani fish curry', 'Kokum sherbet', 'Prawns fry'],
      festivals: ['Beach Festival', 'Seafood Carnival'],
      attractions: ['Alibaug Beach', 'Kolaba Fort', 'Kashid Beach', 'Nagaon Beach'],
      tips: ['Enjoy water sports', 'Visit during low tide for fort access', 'Try local seafood'],
      localInfo: 'Located in Raigad district, 95km from Mumbai via ferry or road.',
      weather: 'Hot and humid, pleasant in winter',
      shopping: ['Seafood pickles', 'Kokum products', 'Cashews']
    },
    'Pune': {
      description: 'Cultural capital of Maharashtra, known for historical sites and educational institutions',
      food: ['Misal Pav', 'Puran Poli', 'Bakarwadi', 'Vada Pav'],
      festivals: ['Ganesh Chaturthi', 'Pune International Film Festival', 'Pune Festival'],
      attractions: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Khadakwasla Dam'],
      tips: ['Explore old city lanes', 'Try street food', 'Visit during Ganesh festival'],
      localInfo: 'Located 150km from Mumbai, known as Oxford of the East.',
      weather: 'Pleasant climate, hot summers, mild winters',
      shopping: ['Puneri pagdi', 'Chitale bakery products', 'Paithani sarees']
    }
  };

  const handleAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    const destInfo = destinationInfo[destination] || destinationInfo['Matheran'];
    let response = '';

    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
      response = `🍽️ **Food in ${destination}:**\n${destInfo.food.map(item => `• ${item}`).join('\n')}\n\n**Must Try:** ${destInfo.food[0]} is a local specialty!`;
    } 
    else if (lowerMessage.includes('festival') || lowerMessage.includes('event') || lowerMessage.includes('celebration')) {
      response = `🎉 **Festivals in ${destination}:**\n${destInfo.festivals.map(fest => `• ${fest}`).join('\n')}\n\n**Best time to visit for festivals:** Monsoon and winter seasons`;
    }
    else if (lowerMessage.includes('attraction') || lowerMessage.includes('place') || lowerMessage.includes('visit')) {
      response = `🏞️ **Top Attractions in ${destination}:**\n${destInfo.attractions.map(att => `• ${att}`).join('\n')}\n\n**Must Visit:** ${destInfo.attractions[0]}`;
    }
    else if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('suggestion')) {
      response = `💡 **Travel Tips for ${destination}:**\n${destInfo.tips.map(tip => `• ${tip}`).join('\n')}`;
    }
    else if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
      response = `🌤️ **Weather in ${destination}:** ${destInfo.weather}\n\n**Best Season:** October to March`;
    }
    else if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('souvenir')) {
      response = `🛍️ **Shopping in ${destination}:**\n${destInfo.shopping.map(item => `• ${item}`).join('\n')}\n\n**Local Specialties:** ${destInfo.shopping[0]}`;
    }
    else if (lowerMessage.includes('how') && lowerMessage.includes('reach')) {
      response = `📍 **How to reach ${destination} from ${userLocation?.city || 'Mumbai'}:**\n• **By Road:** ${Math.round(Math.random()*200+100)}km via NH48\n• **By Train:** Local trains available to nearby stations\n• **Best Route:** Mumbai → Panvel → ${destination}\n• **Travel Time:** ${Math.round(Math.random()*4+2)}-${Math.round(Math.random()*4+5)} hours`;
    }
    else if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
      response = `🏨 **Accommodation in ${destination}:**\n• Budget: ₹800-1500/night\n• Mid-range: ₹2000-4000/night\n• Luxury: ₹5000+/night\n\n**Booking platforms:** MakeMyTrip, Goibibo, Booking.com\n**Tip:** Book 1-2 weeks in advance for best rates`;
    }
    else if (lowerMessage.includes('local') || lowerMessage.includes('information')) {
      response = `ℹ️ **About ${destination}:** ${destInfo.description}\n\n**Location:** ${destInfo.localInfo}`;
    }
    else {
      const randomResponses = [
        `I can help you with information about ${destination} including food, attractions, festivals, weather, shopping, travel tips, and more! What specifically would you like to know?`,
        `Ask me about:\n• 🍽️ Local food specialties\n• 🏞️ Must-visit attractions\n• 🎉 Festivals and events\n• 💡 Travel tips\n• 🛍️ Shopping recommendations\n• 🌤️ Weather information`,
        `Welcome to ${destination}! This place is known for ${destInfo.description.split(',')[0]}. What would you like to explore first?`,
        `Need information about ${destination}? I can tell you about local culture, best places to visit, food to try, and travel advice!`
      ];
      response = randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }

    return response;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, sender: 'user' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = handleAIResponse(userMessage);
      setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 1000);
  };

  const quickQuestions = [
    'What are the local food specialties?',
    'Top attractions to visit?',
    'Any festivals happening?',
    'Weather forecast?',
    'Shopping recommendations?',
    'Travel tips for this place?'
  ];

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <h4>🤖 Travel Assistant for {destination}</h4>
        <p>Ask anything about the place, food, festivals, or travel tips</p>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-content">
              {msg.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < msg.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message ai">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-questions">
        <p>Quick questions:</p>
        <div className="quick-buttons">
          {quickQuestions.map((question, idx) => (
            <button key={idx} onClick={() => setInput(question)} className="quick-btn">
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${destination}...`}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

// Main TravelPlan Component
const TravelPlan = ({ plan, selectedPlace, onRestart, onBack, userPreferences }) => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedTransport, setSelectedTransport] = useState('Bus');
  const [dynamicData, setDynamicData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationStatus, setLocationStatus] = useState('detecting');
  const [hotelRecommendations, setHotelRecommendations] = useState([]);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  console.log('🧩 TravelPlan Props:', { userPreferences, selectedPlace, plan });

  // ✅ Extract user preferences
  const getUserDuration = () => {
    if (userPreferences?.duration) return userPreferences.duration;
    if (plan?.userPreferences?.duration) return plan.userPreferences.duration;
    if (selectedPlace?.duration) return selectedPlace.duration;
    return '2-3 Days';
  };

  const getUserBudget = () => {
    if (userPreferences?.budget) return userPreferences.budget;
    if (plan?.userPreferences?.budget) return plan.userPreferences.budget;
    if (selectedPlace?.budget) return selectedPlace.budget;
    return 'Medium';
  };

  const userDuration = getUserDuration();
  const userBudget = getUserBudget();

  const getDaysFromDuration = (duration) => {
    if (!duration) return 2;
    const d = duration.toLowerCase();
    if (d.includes('1 day') || d.includes('day trip')) return 1;
    if (d.includes('2-3') || d.includes('weekend')) return 2;
    if (d.includes('1 week') || d.includes('7 days')) return 7;
    if (d.includes('2 week') || d.includes('14 days')) return 14;
    return 2;
  };

  const days = getDaysFromDuration(userDuration);

  const calculateBaseBudget = (budget, duration) => {
    const dailyMap = {
      'Low': 2500, 'Budget': 2500,
      'Medium': 3500, 'Mid-range': 3500,
      'High': 7000, 'Luxury': 7000
    };
    return (dailyMap[budget] || 2500) * getDaysFromDuration(duration);
  };

  // ✅ Get place data with rich details
  const getPlaceData = () => {
    let place = selectedPlace || plan?.place || plan || {
      name: 'Matheran',
      location: 'Raigad, Maharashtra',
      description: 'A beautiful hill station near Mumbai, Asia\'s only automobile-free hill station',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
      coordinates: { lat: 18.9850, lng: 73.2717 },
      transportOptions: [
        {
          mode: "Bus", costPerKm: 1.5, durationPer100Km: 2.5,
          features: ["Direct service", "Comfortable", "Economical"]
        },
        {
          mode: "Car", costPerKm: 10, durationPer100Km: 1.8,
          features: ["Flexible timing", "Private", "Comfortable"]
        },
        {
          mode: "Train", costPerKm: 0.8, durationPer100Km: 2.8,
          features: ["Scenic route", "Affordable", "Toy train available"]
        }
      ],
      detailedHighlights: [
        {
          name: "Charlotte Lake", duration: "2-3 hours", cost: 50,
          description: "Beautiful lake surrounded by hills, perfect for photography", bestTime: "Morning"
        },
        {
          name: "Echo Point", duration: "1-2 hours", cost: 0,
          description: "Famous for natural echo phenomenon", bestTime: "Evening"
        },
        {
          name: "Sunset Point", duration: "1 hour", cost: 0,
          description: "Breathtaking sunset views", bestTime: "Sunset time"
        }
      ],
      bestSeason: "October to March",
      weatherTips: "Pleasant weather, carry light woolens in winter",
      packingList: ["Comfortable walking shoes", "Light jacket", "Water bottle", "Camera"]
    };

    const prefs = userPreferences || plan?.userPreferences;
    if (prefs) {
      place = {
        ...place,
        duration: prefs.duration || userDuration,
        budget: prefs.budget || userBudget,
        baseBudget: calculateBaseBudget(prefs.budget || userBudget, prefs.duration || userDuration)
      };
    }

    return place;
  };

  const placeData = getPlaceData();

  // Enhanced Location detection
  useEffect(() => {
    const init = async () => {
      try {
        setIsLocating(true);
        const loc = await initializeUserLocation();
        
        if (!loc || !loc.city) {
          // If location detection fails, use Mumbai as default
          const defaultLoc = {
            city: 'Mumbai',
            state: 'Maharashtra',
            lat: 19.0760,
            lng: 72.8777,
            source: 'default'
          };
          setUserLocation(defaultLoc);
          setLocationStatus('default');
          console.log('Using default location: Mumbai');
        } else {
          setUserLocation(loc);
          setLocationStatus(getLocationSource() === 'gps' ? 'precise' : 'approximate');
          console.log('Location detected:', loc);
        }
        
        // Load hotel recommendations
        await loadHotelRecommendations();
      } catch (error) {
        console.error('Location detection failed:', error);
        // Fallback to Mumbai
        const defaultLoc = {
          city: 'Mumbai',
          state: 'Maharashtra',
          lat: 19.0760,
          lng: 72.8777,
          source: 'fallback'
        };
        setUserLocation(defaultLoc);
        setLocationStatus('default');
        loadHotelRecommendations();
      } finally {
        setIsLocating(false);
      }
    };
    init();
  }, []);

  // Generate realistic hotel recommendations
  const loadHotelRecommendations = async () => {
    setIsLoadingHotels(true);
    
    // Simulate API delay
    setTimeout(() => {
      const hotels = generateHotelRecommendations(placeData.name, userBudget, days);
      setHotelRecommendations(hotels);
      setIsLoadingHotels(false);
    }, 1000);
  };

  const generateHotelRecommendations = (destination, budget, duration) => {
    const basePrice = budget === 'Low' ? 1200 : budget === 'Medium' ? 2500 : 5000;
    
    return [
      {
        id: 1,
        name: `${destination} Heritage Resort`,
        location: `Main Road, ${destination}`,
        price: Math.round(basePrice * 0.8),
        rating: 4.2,
        type: budget === 'Low' ? 'Budget Hotel' : '3-Star Hotel',
        link: `https://www.makemytrip.com/hotels/${destination.toLowerCase()}-hotels.html`,
        website: 'MakeMyTrip',
        amenities: ['Free WiFi', 'AC Rooms', 'Breakfast Included', 'Parking'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        name: `The ${destination} Retreat`,
        location: `Hill View, ${destination}`,
        price: Math.round(basePrice * 1.2),
        rating: 4.5,
        type: 'Boutique Hotel',
        link: `https://www.goibibo.com/hotels/hotels-in-${destination.toLowerCase()}-ct/`,
        website: 'Goibibo',
        amenities: ['Mountain View', 'Restaurant', 'Spa', 'Swimming Pool'],
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop'
      },
      {
        id: 3,
        name: `${destination} Nature Stay`,
        location: `Forest Area, ${destination}`,
        price: Math.round(basePrice * 1.5),
        rating: 4.7,
        type: 'Eco Resort',
        link: `https://www.booking.com/city/in/${destination.toLowerCase()}.en-gb.html`,
        website: 'Booking.com',
        amenities: ['Nature Views', 'Organic Food', 'Trekking Guides', 'Campfire'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        name: `Luxury ${destination} Villa`,
        location: `Premium Area, ${destination}`,
        price: Math.round(basePrice * 2),
        rating: 4.8,
        type: '5-Star Villa',
        link: `https://www.tripadvisor.in/Hotels-g${Math.floor(Math.random()*1000000)}-${destination.replace(' ', '_')}_Maharashtra-Hotels.html`,
        website: 'TripAdvisor',
        amenities: ['Private Pool', 'Butler Service', 'Luxury Spa', 'Fine Dining'],
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop'
      }
    ];
  };

  // Calculate dynamic data
  useEffect(() => {
    if (!isLocating && placeData.coordinates && userLocation) {
      const distance = calculateDistance(placeData.coordinates, userLocation);
      const budgetData = getDetailedBudget(placeData, userBudget, userDuration, selectedTransport);
      
      setDynamicData({
        distance,
        budget: budgetData.total,
        transportCost: budgetData.transportCost,
        stayCost: budgetData.stayCost,
        foodCost: budgetData.foodCost,
        activityCost: budgetData.activityCost,
        stayAndFood: budgetData.stayAndFood,
        transportTime: calculateTransportTime(placeData, selectedTransport, distance),
        perDayBudget: getPerDayBudget(userBudget, userDuration),
        userCity: userLocation.city,
        days
      });
    }
  }, [placeData, selectedTransport, isLocating, userLocation, userDuration, userBudget, days]);

  // ✅ CORRECTED: PROFESSIONAL ITINERARY GENERATOR
  const generateProfessionalItinerary = (totalDays) => {
    const itinerary = [];
    const highlights = placeData.detailedHighlights || [];
    const totalBudget = dynamicData.budget || calculateBaseBudget(userBudget, userDuration);
    const perDayBudget = Math.round(totalBudget / totalDays) || 2500;
    
    // If it's a 1-day trip
    if (totalDays === 1) {
      return [{
        day: 1,
        title: `Day Trip to ${placeData.name}`,
        theme: "Complete Day Exploration",
        activities: [
          {
            time: "06:00 AM",
            activity: `Depart from ${userLocation?.city || 'Mumbai'}`,
            type: "travel",
            duration: dynamicData.transportTime || "3-4 hours",
            cost: 0,
            icon: "🚗",
            tip: "Start early to make the most of your day"
          },
          {
            time: "10:00 AM",
            activity: `Arrive at ${placeData.name}`,
            type: "arrival",
            duration: "30 mins",
            cost: 0,
            icon: "📍"
          },
          {
            time: "10:30 AM",
            activity: highlights[0]?.name || "Main Attraction Visit",
            type: "sightseeing",
            duration: "2 hours",
            cost: highlights[0]?.cost || 100,
            icon: "🎯",
            description: highlights[0]?.description || "Explore the main attraction"
          },
          {
            time: "01:00 PM",
            activity: "Lunch at Local Restaurant",
            type: "food",
            duration: "1 hour",
            cost: 300,
            icon: "🍽️",
            suggestions: ["Try local cuisine", "Fresh local produce"]
          },
          {
            time: "02:30 PM",
            activity: highlights[1]?.name || "Secondary Attraction",
            type: "sightseeing",
            duration: "2 hours",
            cost: highlights[1]?.cost || 50,
            icon: "📍"
          },
          {
            time: "05:00 PM",
            activity: "Local Market & Souvenir Shopping",
            type: "shopping",
            duration: "1 hour",
            cost: 500,
            icon: "🛍️",
            suggestions: ["Local handicrafts", "Food specialties"]
          },
          {
            time: "06:00 PM",
            activity: `Depart for ${userLocation?.city || 'Mumbai'}`,
            type: "travel",
            duration: dynamicData.transportTime || "3-4 hours",
            cost: 0,
            icon: "🚗",
            tip: "Leave before dark for safe travel"
          }
        ],
        dayBudget: perDayBudget,
        tips: [
          "Pack light for a day trip",
          "Carry water and snacks",
          "Wear comfortable walking shoes",
          "Check weather forecast"
        ]
      }];
    }
    
    // For multi-day trips
    for (let i = 1; i <= totalDays; i++) {
      let dayPlan;
      
      if (i === 1) {
        dayPlan = {
          day: i,
          title: `Arrival at ${placeData.name}`,
          theme: "Journey & Settlement",
          activities: [
            {
              time: "06:00 AM",
              activity: `Depart from ${userLocation?.city || 'Mumbai'}`,
              type: "travel",
              duration: dynamicData.transportTime || "3-4 hours",
              cost: 0,
              icon: "🚗"
            },
            {
              time: "10:00 AM",
              activity: `Arrive at ${placeData.name}`,
              type: "arrival",
              duration: "30 mins",
              cost: 0,
              icon: "📍"
            },
            {
              time: "11:00 AM",
              activity: "Check-in to accommodation",
              type: "accommodation",
              duration: "1 hour",
              cost: Math.round((dynamicData.stayCost || 3000) / totalDays) || 1500,
              icon: "🏨",
              tip: "Book in advance for better rates"
            },
            {
              time: "01:00 PM",
              activity: "Lunch at local restaurant",
              type: "food",
              duration: "1 hour",
              cost: 300,
              icon: "🍽️",
              suggestions: ["Try local Maharashtrian thali", "Fresh coastal seafood"]
            },
            {
              time: "03:00 PM",
              activity: highlights[0]?.name || "Explore main attraction",
              type: "sightseeing",
              duration: highlights[0]?.duration || "2-3 hours",
              cost: highlights[0]?.cost || 100,
              icon: "🎯",
              description: highlights[0]?.description || "Main local attraction",
              tip: highlights[0]?.bestTime || "Best visited in afternoon"
            },
            {
              time: "06:00 PM",
              activity: "Sunset viewing at scenic point",
              type: "leisure",
              duration: "1 hour",
              cost: 0,
              icon: "🌅",
              tip: "Bring camera for amazing photos"
            },
            {
              time: "08:00 PM",
              activity: "Dinner & local cuisine experience",
              type: "food",
              duration: "1-2 hours",
              cost: 400,
              icon: "🍜",
              suggestions: ["Local street food tour", "Authentic Maharashtra cuisine"]
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Start early to avoid traffic",
            "Keep copies of hotel booking",
            "Exchange some cash for local expenses"
          ]
        };
      } else if (i === totalDays) {
        dayPlan = {
          day: i,
          title: "Departure & Farewell",
          theme: "Last Memories",
          activities: [
            {
              time: "07:00 AM",
              activity: "Breakfast at hotel/local cafe",
              type: "food",
              duration: "1 hour",
              cost: 200,
              icon: "☕"
            },
            {
              time: "09:00 AM",
              activity: "Last-minute sightseeing/photography",
              type: "leisure",
              duration: "2 hours",
              cost: 0,
              icon: "📸",
              tip: "Capture memories of favorite spots"
            },
            {
              time: "11:00 AM",
              activity: "Souvenir shopping",
              type: "shopping",
              duration: "1 hour",
              cost: 500,
              icon: "🛍️",
              suggestions: ["Local handicrafts", "Traditional items", "Food specialties"]
            },
            {
              time: "01:00 PM",
              activity: "Lunch with local specialties",
              type: "food",
              duration: "1 hour",
              cost: 350,
              icon: "🍽️"
            },
            {
              time: "03:00 PM",
              activity: "Check-out from accommodation",
              type: "accommodation",
              duration: "30 mins",
              cost: 0,
              icon: "🏨"
            },
            {
              time: "04:00 PM",
              activity: `Depart for ${userLocation?.city || 'Mumbai'}`,
              type: "travel",
              duration: dynamicData.transportTime || "3-4 hours",
              cost: 0,
              icon: "🚗"
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Pack previous night to save time",
            "Keep some buffer time for delays",
            "Check for items left behind"
          ]
        };
      } else {
        // Middle days - Exploration days
        const highlightIdx = (i - 1) % Math.max(highlights.length, 1);
        const currentHighlight = highlights[highlightIdx] || highlights[0];
        
        dayPlan = {
          day: i,
          title: `Day ${i}: ${currentHighlight?.name || 'Exploration'} Adventure`,
          theme: "Full Day Exploration",
          activities: [
            {
              time: "07:00 AM",
              activity: "Breakfast & morning preparation",
              type: "food",
              duration: "1 hour",
              cost: 200,
              icon: "☕"
            },
            {
              time: "08:30 AM",
              activity: currentHighlight?.name || "Morning attraction visit",
              type: "sightseeing",
              duration: currentHighlight?.duration || "3 hours",
              cost: currentHighlight?.cost || 150,
              icon: "🎯",
              description: currentHighlight?.description || "Major attraction",
              tip: currentHighlight?.bestTime || "Best visited in morning"
            },
            {
              time: "12:00 PM",
              activity: "Lunch at local eatery",
              type: "food",
              duration: "1 hour",
              cost: 300,
              icon: "🍽️"
            },
            {
              time: "02:00 PM",
              activity: highlights[highlightIdx + 1]?.name || "Secondary attraction visit",
              type: "sightseeing",
              duration: "2 hours",
              cost: 100,
              icon: "📍"
            },
            {
              time: "05:00 PM",
              activity: "Leisure time & local market exploration",
              type: "leisure",
              duration: "2 hours",
              cost: 200,
              icon: "🛍️",
              suggestions: ["Local handicrafts", "Street food", "Cultural items"]
            },
            {
              time: "08:00 PM",
              activity: "Dinner & cultural experience",
              type: "food",
              duration: "2 hours",
              cost: 400,
              icon: "🍜",
              tip: "Try local specialties"
            }
          ],
          dayBudget: perDayBudget,
          tips: [
            "Wear comfortable walking shoes",
            "Carry water and snacks",
            "Bargain at local markets"
          ]
        };
      }
      
      itinerary.push(dayPlan);
    }
    
    return itinerary;
  };

  const itineraryData = generateProfessionalItinerary(days);
  
  const totalBudget = dynamicData.budget || calculateBaseBudget(userBudget, userDuration);
  const transportCost = dynamicData.transportCost || Math.round(totalBudget * 0.2);
  const stayAndFood = dynamicData.stayAndFood || Math.round(totalBudget * 0.7);
  const activityCost = dynamicData.activityCost || Math.round(totalBudget * 0.1);
  const perDayBudget = dynamicData.perDayBudget || Math.round(totalBudget / days);

  // ✅ AI SUGGESTIONS GENERATOR
  const generateAISuggestions = () => {
    const suggestions = [];
    
    // Weather-based suggestions
    const month = new Date().getMonth();
    if (month >= 5 && month <= 9) {
      suggestions.push({
        type: "weather",
        icon: "🌧️",
        title: "Monsoon Season Alert",
        text: "Carry rain gear and waterproof bags. Some activities may be affected.",
        priority: "high"
      });
    } else if (month >= 10 || month <= 2) {
      suggestions.push({
        type: "weather",
        icon: "☀️",
        title: "Perfect Weather",
        text: "Ideal time to visit! Pleasant weather expected.",
        priority: "low"
      });
    }
    
    // Budget-based suggestions
    if (userBudget === 'Low' || userBudget === 'Budget') {
      suggestions.push({
        type: "budget",
        icon: "💰",
        title: "Money Saving Tips",
        text: "Use local transport, eat at local dhabas, book accommodation in advance for 20-30% discount.",
        priority: "medium"
      });
    }
    
    // Duration-based suggestions
    if (days >= 7) {
      suggestions.push({
        type: "planning",
        icon: "📅",
        title: "Extended Stay Benefits",
        text: "Consider weekly accommodation packages for better rates. Explore nearby places too.",
        priority: "medium"
      });
    }
    
    // Transport-based suggestions
    suggestions.push({
      type: "transport",
      icon: "🚗",
      title: "Best Transport Mode",
      text: `For ${dynamicData.distance || 150}km distance, ${selectedTransport} is recommended. Consider booking return tickets together for discounts.`,
      priority: "high"
    });
    
    // Safety suggestions
    suggestions.push({
      type: "safety",
      icon: "🛡️",
      title: "Safety First",
      text: "Share your itinerary with family. Keep emergency contacts handy. Avoid isolated areas after dark.",
      priority: "high"
    });
    
    return suggestions;
  };

  const aiSuggestions = generateAISuggestions();

  // Hotel Booking Component
  const renderHotelRecommendations = () => (
    <div className="hotel-recommendations-section">
      <h4>🏨 Recommended Hotels in {placeData.name}</h4>
      <p>Based on your {userBudget} budget and preferences</p>
      
      {isLoadingHotels ? (
        <div className="loading-hotels">
          <div className="spinner-small"></div>
          <p>Loading hotel recommendations...</p>
        </div>
      ) : (
        <div className="hotels-grid">
          {hotelRecommendations.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <div className="hotel-content">
                <div className="hotel-header">
                  <h5>{hotel.name}</h5>
                  <div className="hotel-meta">
                    <span className="hotel-rating">⭐ {hotel.rating}</span>
                    <span className="hotel-type">{hotel.type}</span>
                  </div>
                </div>
                <p className="hotel-location">📍 {hotel.location}</p>
                <div className="hotel-price">
                  <strong>₹{hotel.price}/night</strong>
                  <small>Total for {days} days: ₹{(hotel.price * days).toLocaleString()}</small>
                </div>
                <div className="hotel-amenities">
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
                <div className="hotel-booking">
                  <button
                    className="booking-button"
                    onClick={() => window.open(hotel.link, '_blank', 'noopener,noreferrer')}
                  >
                    Book on {hotel.website} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="hotel-booking-platforms">
        <h5>🌐 Also check these platforms:</h5>
        <div className="platform-links">
          <button onClick={() => window.open('https://www.makemytrip.com/hotels', '_blank')} className="platform-link">
            🏨 MakeMyTrip
          </button>
          <button onClick={() => window.open('https://www.goibibo.com/hotels', '_blank')} className="platform-link">
            🏩 Goibibo
          </button>
          <button onClick={() => window.open('https://www.booking.com', '_blank')} className="platform-link">
            📅 Booking.com
          </button>
          <button onClick={() => window.open('https://www.agoda.com', '_blank')} className="platform-link">
            🔍 Agoda
          </button>
          <button onClick={() => window.open('https://www.tripadvisor.com/Hotels', '_blank')} className="platform-link">
            ⭐ TripAdvisor
          </button>
        </div>
      </div>
    </div>
  );

  if (isLocating) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h3>📍 Detecting Your Location...</h3>
          <p>Getting precise distance and route information</p>
          <div className="location-details">
            <p>We're finding the best route from your current location to {placeData.name}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="travel-plan professional">
      {/* AI Assistant Floating Button */}
      <button 
        className={`ai-assistant-btn ${showAIAssistant ? 'active' : ''}`}
        onClick={() => setShowAIAssistant(!showAIAssistant)}
      >
        {showAIAssistant ? '✕ Close Assistant' : '🤖 Ask Travel Assistant'}
      </button>

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <div className="ai-assistant-panel">
          <AIAssistant 
            destination={placeData.name}
            userLocation={userLocation}
            userPreferences={userPreferences}
          />
        </div>
      )}

      {/* Header */}
      <div className="plan-header">
        <div className="plan-nav">
          <button className="back-btn" onClick={onBack}>
            ← Back to Places
          </button>
          <div className="nav-right">
            <button className="ai-btn" onClick={() => setShowAIAssistant(!showAIAssistant)}>
              🤖 Ask AI Assistant
            </button>
            <button className="restart-btn" onClick={onRestart}>
              🔄 Start Over
            </button>
          </div>
        </div>
        
        <h2>Your {userDuration} Travel Plan</h2>
        
        <div className="destination-header">
          <img src={placeData.image} alt={placeData.name} className="destination-image" />
          <div className="destination-info">
            <h3>{placeData.name}</h3>
            <p className="location">📍 {placeData.location}</p>
            
            <div className="user-preferences-badge">
              <span>📅 {userDuration} ({days} {days === 1 ? 'day' : 'days'})</span>
              <span>💰 {userBudget} Budget</span>
              <span>📍 {dynamicData.distance || 150} km from {userLocation?.city || 'Mumbai'}</span>
            </div>
            
            {locationStatus === 'precise' && (
              <div className="location-badge precise">
                ✅ Precise location detected from {userLocation?.city} • Accurate route calculated
              </div>
            )}
            {locationStatus === 'approximate' && (
              <div className="location-badge approximate">
                📍 Using location: {userLocation?.city || 'Mumbai'} • Estimated distances
              </div>
            )}
            {locationStatus === 'default' && (
              <div className="location-badge default">
                📍 Default location: Mumbai • Customize in settings
              </div>
            )}
            
            <p className="description">{placeData.description}</p>
            
            <div className="quick-stats">
              <div className="stat">
                <span className="value">₹{totalBudget.toLocaleString()}</span>
                <span className="label">Total Budget</span>
              </div>
              <div className="stat">
                <span className="value">{days}</span>
                <span className="label">{days === 1 ? 'Day' : 'Days'}</span>
              </div>
              <div className="stat">
                <span className="value">{dynamicData.distance || 150} km</span>
                <span className="label">Distance</span>
              </div>
              <div className="stat">
                <span className="value">{dynamicData.transportTime || '3-4 hrs'}</span>
                <span className="label">Travel Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="plan-tabs">
        <button 
          className={currentTab === 'overview' ? 'active' : ''} 
          onClick={() => setCurrentTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={currentTab === 'itinerary' ? 'active' : ''} 
          onClick={() => setCurrentTab('itinerary')}
        >
          🗓️ Itinerary ({days} {days === 1 ? 'day' : 'days'})
        </button>
        <button 
          className={currentTab === 'budget' ? 'active' : ''} 
          onClick={() => setCurrentTab('budget')}
        >
          💰 Budget Breakdown
        </button>
        <button 
          className={currentTab === 'hotels' ? 'active' : ''} 
          onClick={() => setCurrentTab('hotels')}
        >
          🏨 Hotel Booking
        </button>
        <button 
          className={currentTab === 'transport' ? 'active' : ''} 
          onClick={() => setCurrentTab('transport')}
        >
          🚗 Transport & Route
        </button>
        <button 
          className={currentTab === 'ai-tips' ? 'active' : ''} 
          onClick={() => setCurrentTab('ai-tips')}
        >
          🤖 AI Suggestions
        </button>
      </div>

      {/* Tab Content */}
      <div className="plan-content">
        
        {/* OVERVIEW TAB */}
        {currentTab === 'overview' && (
          <div className="tab-content overview-tab">
            <div className="overview-grid">
              
              <div className="overview-card">
                <h3>🎯 Trip Summary</h3>
                <div className="summary-details">
                  <p><strong>Destination:</strong> {placeData.name}</p>
                  <p><strong>Duration:</strong> {days} {days === 1 ? 'day' : 'days'} ({userDuration})</p>
                  <p><strong>Budget Level:</strong> {userBudget}</p>
                  <p><strong>Total Cost:</strong> ₹{totalBudget.toLocaleString()}</p>
                  <p><strong>Per Day:</strong> ₹{perDayBudget.toLocaleString()}</p>
                  <p><strong>Distance:</strong> {dynamicData.distance || 150} km from {userLocation?.city || 'Mumbai'}</p>
                  <p><strong>Travel Time:</strong> {dynamicData.transportTime || '3-4 hours'}</p>
                  <p><strong>Best Season:</strong> {placeData.bestSeason || 'October to March'}</p>
                  <p><strong>Your Location:</strong> {userLocation?.city || 'Mumbai'}, {userLocation?.state || 'Maharashtra'}</p>
                </div>
                <button className="ask-ai-btn" onClick={() => setShowAIAssistant(true)}>
                  🤖 Ask AI Assistant about this place
                </button>
              </div>

              <div className="overview-card">
                <h3>🌤️ Weather & Season</h3>
                <p>{placeData.weatherTips || 'Pleasant weather expected. Check forecast before traveling.'}</p>
                <div className="packing-checklist">
                  <h4>📋 Packing Essentials:</h4>
                  <ul>
                    {(placeData.packingList || [
                      'Comfortable walking shoes',
                      'Light clothing',
                      'Water bottle',
                      'Sunscreen & sunglasses',
                      'Camera/phone charger',
                      'Basic medicines'
                    ]).map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="overview-card highlights-card">
                <h3>⭐ Top Attractions</h3>
                {(placeData.detailedHighlights || []).slice(0, 3).map((highlight, i) => (
                  <div key={i} className="highlight-item">
                    <h4>{highlight.name}</h4>
                    <p>{highlight.description}</p>
                    <div className="highlight-meta">
                      <span>⏱️ {highlight.duration}</span>
                      <span>💰 ₹{highlight.cost}</span>
                      <span>🕒 {highlight.bestTime || 'Best in morning'}</span>
                    </div>
                  </div>
                ))}
                <button className="view-all-btn" onClick={() => setCurrentTab('itinerary')}>
                  View Full Itinerary →
                </button>
              </div>

            </div>
            
            {/* Quick Action Buttons */}
            <div className="quick-actions">
              <button className="action-btn primary" onClick={() => setCurrentTab('hotels')}>
                🏨 Book Hotels Now
              </button>
              <button className="action-btn secondary" onClick={() => setCurrentTab('transport')}>
                🚗 Check Transport Options
              </button>
              <button className="action-btn tertiary" onClick={() => setShowAIAssistant(true)}>
                🤖 Ask Travel Questions
              </button>
            </div>
          </div>
        )}

        {/* ITINERARY TAB - CORRECTED VERSION */}
        {currentTab === 'itinerary' && (
          <div className="tab-content itinerary-tab">
            <div className="itinerary-header">
              <h3>🗓️ Your {days}-{days === 1 ? 'Day' : 'Day'} Detailed Itinerary</h3>
              <p>{days === 1 ? 'Complete day trip plan' : 'Complete day-wise plan'} with timings, costs, and tips</p>
              <div className="itinerary-summary">
                <span>📍 From: {userLocation?.city || 'Mumbai'}</span>
                <span>🎯 To: {placeData.name}</span>
                <span>📅 Days: {days}</span>
                <span>💰 Budget: ₹{totalBudget.toLocaleString()}</span>
              </div>
            </div>

            {itineraryData.map((day, idx) => {
              const dayBudget = day?.dayBudget || perDayBudget;
              
              return (
                <div key={idx} className="day-plan-professional">
                  <div className="day-header">
                    <div className="day-number">Day {day?.day || idx + 1}</div>
                    <div className="day-info">
                      <h4>{day?.title || `Day ${idx + 1}: Exploration`}</h4>
                      <p className="day-theme">{day?.theme || "Day Adventure"}</p>
                      <span className="day-budget">Budget: ₹{dayBudget.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="day-activities">
                    {day.activities.map((activity, actIdx) => (
                      <div key={actIdx} className={`activity-item ${activity.type || 'sightseeing'}`}>
                        <div className="activity-time">
                          <span className="time">{activity.time || "09:00 AM"}</span>
                          <span className="icon">{activity.icon || "📍"}</span>
                        </div>
                        <div className="activity-details">
                          <h5>{activity.activity || "Activity"}</h5>
                          {activity.description && (
                            <p className="activity-desc">{activity.description}</p>
                          )}
                          <div className="activity-meta">
                            <span>⏱️ {activity.duration || "2 hours"}</span>
                            {activity.cost > 0 && (
                              <span>💰 ₹{(activity.cost || 0).toLocaleString()}</span>
                            )}
                          </div>
                          {activity.tip && (
                            <div className="activity-tip">
                              💡 <em>{activity.tip}</em>
                            </div>
                          )}
                          {activity.suggestions && activity.suggestions.length > 0 && (
                            <div className="activity-suggestions">
                              <strong>Suggestions:</strong>
                              <ul>
                                {activity.suggestions.map((sug, i) => (
                                  <li key={i}>{sug}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {day.tips && day.tips.length > 0 && (
                    <div className="day-tips">
                      <h5>💡 Day {day.day || idx + 1} Tips:</h5>
                      <ul>
                        {day.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Add hotel booking CTA at the end of itinerary */}
            <div className="itinerary-footer">
              <h4>🏨 Need Accommodation?</h4>
              <p>Check out our curated hotel recommendations for your stay in {placeData.name}</p>
              <button className="view-hotels-btn" onClick={() => setCurrentTab('hotels')}>
                View Hotel Recommendations →
              </button>
            </div>
          </div>
        )}

        {/* BUDGET TAB */}
        {currentTab === 'budget' && (
          <div className="tab-content budget-tab">
            <h3>💰 Complete Budget Breakdown</h3>
            <p className="budget-subtitle">Comprehensive {days}-{days === 1 ? 'day' : 'day'} budget for {userBudget} travelers from {userLocation?.city || 'Mumbai'}</p>

            <div className="budget-cards">
              <div className="budget-card transport">
                <div className="card-icon">🚗</div>
                <h4>Transport</h4>
                <div className="amount">₹{transportCost.toLocaleString()}</div>
                <p>{selectedTransport} (round trip)</p>
                <small>{dynamicData.distance || 150} km × 2 = {(dynamicData.distance || 150) * 2} km</small>
              </div>

              <div className="budget-card accommodation">
                <div className="card-icon">🏨</div>
                <h4>Stay & Food</h4>
                <div className="amount">₹{stayAndFood.toLocaleString()}</div>
                <p>Accommodation + Meals</p>
                <small>₹{Math.round(stayAndFood / days)}/day × {days} days</small>
              </div>

              <div className="budget-card activities">
                <div className="card-icon">🎯</div>
                <h4>Activities</h4>
                <div className="amount">₹{activityCost.toLocaleString()}</div>
                <p>Entry fees & experiences</p>
                <small>Sightseeing, tickets, etc.</small>
              </div>

              <div className="budget-card total">
                <div className="card-icon">💰</div>
                <h4>Total Budget</h4>
                <div className="amount large">₹{totalBudget.toLocaleString()}</div>
                <p>{days} {days === 1 ? 'day' : 'days'} • {userBudget} budget</p>
                <small>₹{perDayBudget.toLocaleString()}/day average</small>
              </div>
            </div>

            <div className="budget-details">
              <h4>📊 Detailed Breakdown</h4>
              <table className="budget-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Percentage</th>
                    <th>Per Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🚗 Transport</td>
                    <td>₹{transportCost.toLocaleString()}</td>
                    <td>{Math.round((transportCost / totalBudget) * 100)}%</td>
                    <td>₹{Math.round(transportCost / days)}</td>
                  </tr>
                  <tr>
                    <td>🏨 Accommodation</td>
                    <td>₹{Math.round(stayAndFood * 0.6).toLocaleString()}</td>
                    <td>{Math.round((stayAndFood * 0.6 / totalBudget) * 100)}%</td>
                    <td>₹{Math.round((stayAndFood * 0.6) / days)}</td>
                  </tr>
                  <tr>
                    <td>🍽️ Food</td>
                    <td>₹{Math.round(stayAndFood * 0.4).toLocaleString()}</td>
                    <td>{Math.round((stayAndFood * 0.4 / totalBudget) * 100)}%</td>
                    <td>₹{Math.round((stayAndFood * 0.4) / days)}</td>
                  </tr>
                  <tr>
                    <td>🎯 Activities</td>
                    <td>₹{activityCost.toLocaleString()}</td>
                    <td>{Math.round((activityCost / totalBudget) * 100)}%</td>
                    <td>₹{Math.round(activityCost / days)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Hotel booking section in budget tab */}
            {renderHotelRecommendations()}
          </div>
        )}

        {/* HOTEL BOOKING TAB */}
        {currentTab === 'hotels' && (
          <div className="tab-content hotels-tab">
            <div className="hotels-header">
              <h3>🏨 Hotel Recommendations for {placeData.name}</h3>
              <p>Curated based on your {userBudget} budget and {days}-{days === 1 ? 'day' : 'day'} trip</p>
              <div className="location-info">
                <span>📍 Your location: <strong>{userLocation?.city || 'Mumbai'}</strong></span>
                <span>🎯 Destination: <strong>{placeData.name}</strong></span>
                <span>💰 Budget: <strong>{userBudget}</strong></span>
                <span>📅 Duration: <strong>{days} {days === 1 ? 'day' : 'days'}</strong></span>
              </div>
            </div>
            
            {renderHotelRecommendations()}
            
            <div className="hotel-booking-tips">
              <h4>💡 Smart Hotel Booking Tips</h4>
              <div className="tips-grid">
                <div className="tip-card">
                  <span className="tip-icon">📅</span>
                  <h5>Best Time to Book</h5>
                  <p>Book 7-14 days in advance for best rates. Last-minute bookings can be 30% more expensive.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">💰</span>
                  <h5>Budget Saving Tips</h5>
                  <p>Look for "Free Cancellation" options. Consider guesthouses or homestays for authentic experience.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">⭐</span>
                  <h5>Check Reviews</h5>
                  <p>Always read recent guest reviews. Check photos uploaded by guests, not just hotel photos.</p>
                </div>
                <div className="tip-card">
                  <span className="tip-icon">📍</span>
                  <h5>Location Matters</h5>
                  <p>Choose hotels near main attractions or public transport to save time and transportation costs.</p>
                </div>
              </div>
              
              <div className="hotel-qna">
                <h5>❓ Common Questions</h5>
                <div className="qna-item">
                  <strong>Q: Should I book refundable or non-refundable?</strong>
                  <p>A: For flexible plans, choose refundable. For fixed dates, non-refundable is cheaper.</p>
                </div>
                <div className="qna-item">
                  <strong>Q: Are taxes included in the price?</strong>
                  <p>A: Usually shown separately. Check final price before booking.</p>
                </div>
                <div className="qna-item">
                  <strong>Q: What amenities are important?</strong>
                  <p>A: Free WiFi, breakfast, and location are most important for most travelers.</p>
                </div>
                <button className="ask-more-btn" onClick={() => setShowAIAssistant(true)}>
                  🤖 Ask more hotel questions to AI Assistant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TRANSPORT & ROUTE TAB */}
        {currentTab === 'transport' && (
          <div className="tab-content transport-tab">
            <h3>🚗 Transport Options & Route</h3>
            <p>From {userLocation?.city || 'Mumbai'} to {placeData.name} • {dynamicData.distance || 150} km</p>

            {/* Route Summary */}
            <div className="route-summary">
              <div className="route-line">
                <div className="route-point start">
                  <div className="point-icon">📍</div>
                  <div className="point-info">
                    <strong>{userLocation?.city || 'Mumbai'}</strong>
                    <small>Your Location</small>
                  </div>
                </div>
                
                <div className="route-distance">
                  <div className="distance-line"></div>
                  <span>{dynamicData.distance || 150} km</span>
                  <div className="travel-time">{dynamicData.transportTime || '3-4 hrs'}</div>
                </div>
                
                <div className="route-point end">
                  <div className="point-icon">🎯</div>
                  <div className="point-info">
                    <strong>{placeData.name}</strong>
                    <small>Destination</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Transport Comparison Table */}
            <h4>🚗 Compare Transport Modes</h4>
            <div className="transport-comparison">
              <table className="transport-table">
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Time</th>
                    <th>Cost (Round Trip)</th>
                    <th>Comfort</th>
                    <th>Best For</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {(placeData.transportOptions || []).map((transport, idx) => {
                    const cost = getTransportCost(placeData, transport.mode);
                    const time = calculateTransportTime(placeData, transport.mode, dynamicData.distance);
                    const isSelected = selectedTransport === transport.mode;
                    
                    return (
                      <tr key={idx} className={isSelected ? 'selected' : ''}>
                        <td>
                          <div className="transport-mode">
                            {transport.mode === 'Bus' && '🚌'}
                            {transport.mode === 'Train' && '🚆'}
                            {transport.mode === 'Car' && '🚗'}
                            {transport.mode === 'Bike' && '🏍️'}
                            <strong>{transport.mode}</strong>
                          </div>
                        </td>
                        <td>{time}</td>
                        <td>
                          <strong>₹{cost.toLocaleString()}</strong>
                          <br/>
                          <small>₹{Math.round(cost/2)} one-way</small>
                        </td>
                        <td>
                          <div className="comfort-stars">
                            {transport.mode === 'Car' && '⭐⭐⭐⭐⭐'}
                            {transport.mode === 'Train' && '⭐⭐⭐⭐'}
                            {transport.mode === 'Bus' && '⭐⭐⭐'}
                            {transport.mode === 'Bike' && '⭐⭐'}
                          </div>
                        </td>
                        <td>
                          <div className="best-for">
                            {(transport.features || []).map((feat, i) => (
                              <span key={i} className="feature-tag">{feat}</span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <button
                            className={`select-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedTransport(transport.mode)}
                          >
                            {isSelected ? '✓ Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* AI Recommendation */}
            <div className="ai-transport-recommendation">
              <div className="ai-badge">🤖 AI Recommendation</div>
              <h4>Recommended: {selectedTransport}</h4>
              <p>
                Based on your {userBudget} budget and {days}-{days === 1 ? 'day' : 'day'} trip, <strong>{selectedTransport}</strong> offers 
                the best balance of cost (₹{getTransportCost(placeData, selectedTransport).toLocaleString()}) 
                and travel time ({calculateTransportTime(placeData, selectedTransport, dynamicData.distance)}).
              </p>
              {selectedTransport === 'Bus' && (
                <div className="transport-tips">
                  <p>💡 <strong>Bus Travel Tips:</strong></p>
                  <ul>
                    <li>Book sleeper/semi-sleeper for long journeys</li>
                    <li>Popular operators: Maharashtra State Transport, Private AC buses</li>
                    <li>Book 2-3 days in advance for better seats</li>
                    <li>Morning buses (6-8 AM) are usually on time</li>
                  </ul>
                </div>
              )}
              {selectedTransport === 'Train' && (
                <div className="transport-tips">
                  <p>💡 <strong>Train Travel Tips:</strong></p>
                  <ul>
                    <li>Book AC 3-tier or 2-tier for comfort</li>
                    <li>Check train schedules on IRCTC app</li>
                    <li>Arrive 30 mins before departure</li>
                    <li>Trains are usually more punctual</li>
                  </ul>
                </div>
              )}
              {selectedTransport === 'Car' && (
                <div className="transport-tips">
                  <p>💡 <strong>Car Travel Tips:</strong></p>
                  <ul>
                    <li>Start early morning to avoid traffic</li>
                    <li>Take breaks every 2 hours</li>
                    <li>Check vehicle condition before trip</li>
                    <li>Use Google Maps for real-time traffic</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Booking Links */}
            <div className="booking-section">
              <h4>🎫 Book Your Transport</h4>
              <p>Click any platform to book your {selectedTransport} tickets:</p>
              <div className="booking-links">
                <button onClick={() => window.open('https://www.redbus.in', '_blank')} className="booking-link">
                  🚌 Book Bus on RedBus
                </button>
                <button onClick={() => window.open('https://www.irctc.co.in', '_blank')} className="booking-link">
                  🚆 Book Train on IRCTC
                </button>
                <button onClick={() => window.open('https://www.zoomcar.com', '_blank')} className="booking-link">
                  🚗 Rent Car on ZoomCar
                </button>
                <button onClick={() => window.open('https://www.uber.com', '_blank')} className="booking-link">
                  🚖 Book Cab on Uber
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI SUGGESTIONS TAB */}
        {currentTab === 'ai-tips' && (
          <div className="tab-content ai-tips-tab">
            <div className="ai-header">
              <h3>🤖 AI-Powered Travel Suggestions</h3>
              <p>Smart recommendations based on your trip profile from {userLocation?.city || 'Mumbai'}</p>
            </div>

            <div className="suggestions-grid">
              {aiSuggestions.map((suggestion, idx) => (
                <div key={idx} className={`suggestion-card ${suggestion.priority}`}>
                  <div className="suggestion-icon">{suggestion.icon}</div>
                  <div className="suggestion-content">
                    <h4>{suggestion.title}</h4>
                    <p>{suggestion.text}</p>
                  </div>
                  <div className={`priority-badge ${suggestion.priority}`}>
                    {suggestion.priority === 'high' && '🔴 Important'}
                    {suggestion.priority === 'medium' && '🟡 Recommended'}
                    {suggestion.priority === 'low' && '🟢 Good to Know'}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Assistant Integration */}
            <div className="ai-assistant-integration">
              <h4>💬 Need more specific advice?</h4>
              <p>Ask our AI Assistant anything about {placeData.name}:</p>
              <div className="quick-questions-buttons">
                <button onClick={() => {
                  setShowAIAssistant(true);
                  setTimeout(() => {
                    const event = new Event('askQuestion');
                    event.question = 'What are the local food specialties?';
                    window.dispatchEvent(event);
                  }, 100);
                }} className="quick-question-btn">
                  🍽️ Ask about local food
                </button>
                <button onClick={() => {
                  setShowAIAssistant(true);
                  setTimeout(() => {
                    const event = new Event('askQuestion');
                    event.question = 'Top attractions to visit?';
                    window.dispatchEvent(event);
                  }, 100);
                }} className="quick-question-btn">
                  🏞️ Ask about attractions
                </button>
                <button onClick={() => {
                  setShowAIAssistant(true);
                  setTimeout(() => {
                    const event = new Event('askQuestion');
                    event.question = 'Any festivals happening?';
                    window.dispatchEvent(event);
                  }, 100);
                }} className="quick-question-btn">
                  🎉 Ask about festivals
                </button>
              </div>
            </div>

            {/* Additional AI Insights */}
            <div className="ai-insights">
              <h4>💡 Smart Travel Insights</h4>
              
              <div className="insight-section">
                <h5>📅 Best Time to Book</h5>
                <p>
                  For <strong>{userDuration}</strong> trips, book accommodation 
                  <strong> 7-10 days in advance</strong> for best prices.
                  Weekend rates may be 20-30% higher.
                </p>
              </div>

              <div className="insight-section">
                <h5>💰 Budget Optimization</h5>
                <p>
                  Your <strong>{userBudget}</strong> budget of <strong>₹{totalBudget.toLocaleString()}</strong> is 
                  {userBudget === 'Low' && ' tight but manageable. Focus on street food and budget hotels.'}
                  {userBudget === 'Medium' && ' well-balanced for a comfortable trip with some splurges.'}
                  {userBudget === 'High' && ' generous! You can enjoy premium experiences.'}
                </p>
                {userBudget === 'Low' && (
                  <div className="budget-tips">
                    <strong>Money-Saving Tips:</strong>
                    <ul>
                      <li>🏨 Stay in hostels or budget hotels (₹800-1200/night)</li>
                      <li>🍽️ Eat at local dhabas (₹80-150/meal)</li>
                      <li>🚌 Use public transport</li>
                      <li>🎫 Look for combo deals on attractions</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="insight-section">
                <h5>📱 Essential Apps</h5>
                <div className="app-recommendations">
                  <div className="app-card">
                    <span className="app-icon">🗺️</span>
                    <strong>Google Maps</strong>
                    <small>Navigation & local places</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">🍽️</span>
                    <strong>Zomato</strong>
                    <small>Restaurant reviews</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">🏨</span>
                    <strong>OYO/Goibibo</strong>
                    <small>Budget hotels</small>
                  </div>
                  <div className="app-card">
                    <span className="app-icon">💳</span>
                    <strong>Paytm/PhonePe</strong>
                    <small>Digital payments</small>
                  </div>
                </div>
              </div>

              <div className="insight-section safety">
                <h5>🛡️ Safety & Emergency</h5>
                <div className="emergency-contacts">
                  <p><strong>Emergency Numbers:</strong></p>
                  <ul>
                    <li>🚨 Police: 100</li>
                    <li>🚑 Ambulance: 108</li>
                    <li>🔥 Fire: 101</li>
                    <li>🆘 Women Helpline: 1091</li>
                    <li>🚓 Tourist Police: 1800-111-363</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Download Itinerary */}
            <div className="download-section">
              <button className="download-btn" onClick={() => {
                alert('✅ Your itinerary PDF is being generated...\n\nIt includes:\n• Complete itinerary\n• Budget breakdown\n• Hotel recommendations\n• Transport details\n• Contact information');
              }}>
                📥 Download Complete Itinerary PDF
              </button>
              <button className="share-btn" onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `My ${userDuration} Trip to ${placeData.name}`,
                    text: `Check out my ${days}-day travel plan to ${placeData.name}! Total budget: ₹${totalBudget.toLocaleString()}`,
                    url: window.location.href
                  });
                } else {
                  alert('Share link copied to clipboard!');
                  navigator.clipboard.writeText(`Check out my ${days}-day travel plan to ${placeData.name}!`);
                }
              }}>
                📤 Share This Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlan;