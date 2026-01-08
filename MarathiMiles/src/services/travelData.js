// src/services/travelData.js

export const moodBasedPlaces = {
  // 🎉 HAPPY - Fun, Adventure, Social places
  happy: [
    {
      id: 1,
      name: "Alibaug Beach Camping",
      location: "Raigad, Maharashtra",
      category: ["beach", "adventure"],
      interests: ["Beaches", "Water Sports", "Camping"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Friends", "Couple"],
      moodTags: ["happy", "excited"],
      highlights: ["Beach Camping", "Water Sports", "Bonfire"],
      description: "Perfect for fun-loving groups with beach activities and camping"
    },
    {
      id: 2,
      name: "Della Adventure Park",
      location: "Lonavala, Maharashtra",
      category: ["adventure", "theme-park"],
      interests: ["Adventure", "Rides", "Team Events"],
      budget: "high",
      duration: "1 Day",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["happy", "excited"],
      highlights: ["Bungee Jumping", "ATV Rides", "Adventure Sports"],
      description: "Thrilling adventure park for adrenaline junkies"
    },
    {
      id: 3,
      name: "Pawna Lake Camping",
      location: "Lonavala, Maharashtra",
      category: ["camping", "adventure"],
      interests: ["Camping", "Boating", "Trekking"],
      budget: "mid-range",
      duration: "1-2 Days",
      recommendedFor: ["Friends", "Couple"],
      moodTags: ["happy", "excited"],
      highlights: ["Lakeside Camping", "Bonfire", "Stargazing"],
      description: "Popular camping destination with beautiful lake views"
    },
    {
      id: 4,
      name: "Kolad River Rafting",
      location: "Raigad, Maharashtra",
      category: ["adventure", "water-sports"],
      interests: ["Rafting", "Adventure", "Water Sports"],
      budget: "mid-range",
      duration: "1 Day",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["happy", "excited"],
      highlights: ["White Water Rafting", "River Activities"],
      description: "Exciting river rafting experience for adventure lovers"
    },
    {
      id: 5,
      name: "Lonavala Hill Station",
      location: "Pune, Maharashtra",
      category: ["hill-station", "nature"],
      interests: ["Nature", "Waterfalls", "Weekend Getaway"],
      budget: "budget",
      duration: "2-3 Days",
      recommendedFor: ["Friends", "Family", "Couple"],
      moodTags: ["happy", "calm"],
      highlights: ["Bhushi Dam", "Tiger's Leap", "Local Chikki"],
      description: "Popular hill station perfect for fun weekend trips"
    },
    {
      id: 6,
      name: "Kashid Beach",
      location: "Raigad, Maharashtra",
      category: ["beach"],
      interests: ["Beaches", "Water Sports", "Relaxation"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Couple", "Friends", "Family"],
      moodTags: ["happy", "calm"],
      highlights: ["White Sand Beach", "Water Sports", "Beach Shacks"],
      description: "Beautiful white sand beach perfect for fun beach activities"
    },
    {
      id: 7,
      name: "Imagicaa Theme Park",
      location: "Khopoli, Maharashtra",
      category: ["theme-park", "entertainment"],
      interests: ["Rides", "Entertainment", "Family Fun"],
      budget: "high",
      duration: "1 Day",
      recommendedFor: ["Family", "Friends"],
      moodTags: ["happy", "excited"],
      highlights: ["Roller Coasters", "Water Rides", "Entertainment Shows"],
      description: "Amusement park with thrilling rides and entertainment"
    },
    {
      id: 8,
      name: "Matheran Toy Train",
      location: "Raigad, Maharashtra",
      category: ["hill-station", "heritage"],
      interests: ["Nature", "Toy Train", "Scenic Views"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Family", "Couple"],
      moodTags: ["happy", "calm"],
      highlights: ["Toy Train Ride", "Echo Point", "Horse Riding"],
      description: "Vehicle-free hill station with charming toy train"
    },
    {
      id: 9,
      name: "Sinhagad Fort Trek",
      location: "Pune, Maharashtra",
      category: ["heritage", "trekking"],
      interests: ["Trekking", "History", "Adventure"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Friends", "Solo"],
      moodTags: ["happy", "excited"],
      highlights: ["Fort Trek", "Historical Sites", "Pune Views"],
      description: "Historic fort with exciting trek and panoramic views"
    },
    {
      id: 10,
      name: "Water Kingdom",
      location: "Mumbai, Maharashtra",
      category: ["water-park", "entertainment"],
      interests: ["Water Rides", "Family Fun", "Entertainment"],
      budget: "mid-range",
      duration: "1 Day",
      recommendedFor: ["Family", "Friends"],
      moodTags: ["happy", "excited"],
      highlights: ["Water Slides", "Wave Pool", "Family Rides"],
      description: "Asia's largest water theme park for fun-filled day"
    }
  ],

  // 😔 SAD - Calm, Peaceful, Healing places
  sad: [
    {
      id: 11,
      name: "Kaas Plateau",
      location: "Satara, Maharashtra",
      category: ["nature", "flora"],
      interests: ["Nature", "Photography", "Peaceful Walks"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["sad", "calm"],
      highlights: ["Valley of Flowers", "Scenic Views", "Nature Trails"],
      description: "Peaceful flower valley perfect for quiet contemplation"
    },
    {
      id: 12,
      name: "Bhandardara Lake",
      location: "Ahmednagar, Maharashtra",
      category: ["nature", "lakes"],
      interests: ["Camping", "Nature", "Peace"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Solo", "Couple", "Family"],
      moodTags: ["sad", "calm"],
      highlights: ["Serene Lake", "Camping", "Stargazing"],
      description: "Tranquil lakeside destination for peaceful retreat"
    },
    {
      id: 13,
      name: "Malshej Ghat",
      location: "Pune, Maharashtra",
      category: ["nature", "scenic"],
      interests: ["Nature", "Photography", "Bird Watching"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["sad", "calm"],
      highlights: ["Misty Valleys", "Waterfalls", "Flamingos"],
      description: "Beautiful ghat with misty valleys and waterfalls"
    },
    {
      id: 14,
      name: "Thoseghar Waterfalls",
      location: "Satara, Maharashtra",
      category: ["nature", "waterfalls"],
      interests: ["Nature", "Waterfalls", "Peace"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["sad", "calm"],
      highlights: ["Cascading Waterfalls", "Scenic Beauty"],
      description: "Serene waterfalls perfect for quiet reflection"
    },
    {
      id: 15,
      name: "Panchgani Hill Station",
      location: "Satara, Maharashtra",
      category: ["hill-station", "nature"],
      interests: ["Nature", "Scenic Views", "Peace"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Solo", "Couple", "Family"],
      moodTags: ["sad", "calm"],
      highlights: ["Table Land", "Sydney Point", "Strawberry Farms"],
      description: "Peaceful hill station with breathtaking valley views"
    }
  ],

  // 🎊 EXCITED - Thrilling, Adventurous places
  excited: [
    {
      id: 16,
      name: "Rajmachi Fort Trek",
      location: "Lonavala, Maharashtra",
      category: ["trekking", "adventure"],
      interests: ["Trekking", "Adventure", "Camping"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["excited", "happy"],
      highlights: ["Night Trek", "Fort Camping", "Valley Views"],
      description: "Challenging trek with overnight camping experience"
    },
    {
      id: 17,
      name: "Kodaki Valley Rappelling",
      location: "Karjat, Maharashtra",
      category: ["adventure", "trekking"],
      interests: ["Rappelling", "Adventure", "Trekking"],
      budget: "mid-range",
      duration: "1 Day",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["excited", "happy"],
      highlights: ["Valley Rappelling", "Rock Climbing"],
      description: "Thrilling rappelling experience in scenic valley"
    },
    {
      id: 18,
      name: "Devkund Waterfall Trek",
      location: "Raigad, Maharashtra",
      category: ["trekking", "waterfalls"],
      interests: ["Trekking", "Waterfalls", "Adventure"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["excited", "happy"],
      highlights: ["Waterfall Trek", "Natural Pool", "Jungle Trail"],
      description: "Exciting trek to beautiful hidden waterfall"
    },
    {
      id: 19,
      name: "Prabalgad Fort Trek",
      location: "Raigad, Maharashtra",
      category: ["trekking", "adventure"],
      interests: ["Trekking", "Adventure", "History"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Friends", "Adventure Seekers"],
      moodTags: ["excited", "happy"],
      highlights: ["Challenging Trek", "Fort Ruins", "Panoramic Views"],
      description: "Difficult trek for experienced adventure seekers"
    },
    {
      id: 20,
      name: "Water Sports at Kashid",
      location: "Raigad, Maharashtra",
      category: ["water-sports", "beach"],
      interests: ["Water Sports", "Beaches", "Adventure"],
      budget: "mid-range",
      duration: "1-2 Days",
      recommendedFor: ["Friends", "Couple"],
      moodTags: ["excited", "happy"],
      highlights: ["Jet Skiing", "Banana Boat", "Parasailing"],
      description: "Thrilling water sports activities at beautiful beach"
    }
  ],

  // 🧘 CALM - Relaxing, Spiritual places
  calm: [
    {
      id: 21,
      name: "Bhimashankar Temple",
      location: "Pune, Maharashtra",
      category: ["spiritual", "nature"],
      interests: ["Spiritual", "Trekking", "Nature"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Solo", "Family", "Spiritual"],
      moodTags: ["calm", "sad"],
      highlights: ["Jyotirlinga Temple", "Forest Trek", "Peaceful Atmosphere"],
      description: "Sacred temple in peaceful forest surroundings"
    },
    {
      id: 22,
      name: "Trimbakeshwar Temple",
      location: "Nashik, Maharashtra",
      category: ["spiritual", "heritage"],
      interests: ["Spiritual", "Heritage", "Peace"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Solo", "Family", "Spiritual"],
      moodTags: ["calm", "sad"],
      highlights: ["Jyotirlinga", "Godavari River", "Spiritual Vibes"],
      description: "Ancient temple with powerful spiritual energy"
    },
    {
      id: 23,
      name: "Shirdi Sai Baba Temple",
      location: "Ahmednagar, Maharashtra",
      category: ["spiritual"],
      interests: ["Spiritual", "Peace", "Devotion"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Family", "Solo", "Spiritual"],
      moodTags: ["calm", "sad"],
      highlights: ["Sai Baba Temple", "Spiritual Atmosphere"],
      description: "Famous pilgrimage site for peace and devotion"
    },
    {
      id: 24,
      name: "Mahableshwar Hill Station",
      location: "Satara, Maharashtra",
      category: ["hill-station", "nature"],
      interests: ["Nature", "Peace", "Scenic Views"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Family", "Couple", "Solo"],
      moodTags: ["calm", "happy"],
      highlights: ["View Points", "Strawberry Farms", "Boating"],
      description: "Serene hill station perfect for peaceful retreat"
    },
    {
      id: 25,
      name: "Ganpatipule Beach",
      location: "Ratnagiri, Maharashtra",
      category: ["beach", "spiritual"],
      interests: ["Beaches", "Spiritual", "Peace"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Family", "Couple", "Solo"],
      moodTags: ["calm", "happy"],
      highlights: ["Beach Temple", "White Sand Beach", "Sunset Views"],
      description: "Peaceful beach with spiritual temple and calm waters"
    }
  ],

  // 😥 STRESSED - Relaxing, Therapeutic places
  stressed: [
    {
      id: 26,
      name: "Vipassana Center Igatpuri",
      location: "Nashik, Maharashtra",
      category: ["spiritual", "meditation"],
      interests: ["Meditation", "Spiritual", "Peace"],
      budget: "budget",
      duration: "3-10 Days",
      recommendedFor: ["Solo", "Spiritual"],
      moodTags: ["stressed", "calm"],
      highlights: ["Meditation Courses", "Silent Retreat", "Peaceful Environment"],
      description: "Meditation center for stress relief and inner peace"
    },
    {
      id: 27,
      name: "Tamhini Ghat Drive",
      location: "Pune, Maharashtra",
      category: ["scenic", "nature"],
      interests: ["Road Trip", "Nature", "Waterfalls"],
      budget: "budget",
      duration: "1 Day",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["stressed", "calm"],
      highlights: ["Scenic Drive", "Waterfalls", "Monsoon Beauty"],
      description: "Therapeutic drive through beautiful ghats and waterfalls"
    },
    {
      id: 28,
      name: "Yoga Retreat Lonavala",
      location: "Lonavala, Maharashtra",
      category: ["wellness", "yoga"],
      interests: ["Yoga", "Wellness", "Meditation"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["stressed", "calm"],
      highlights: ["Yoga Sessions", "Meditation", "Healthy Food"],
      description: "Wellness retreat for stress relief and rejuvenation"
    },
    {
      id: 29,
      name: "Koyna Wildlife Sanctuary",
      location: "Satara, Maharashtra",
      category: ["wildlife", "nature"],
      interests: ["Wildlife", "Nature", "Peace"],
      budget: "mid-range",
      duration: "2-3 Days",
      recommendedFor: ["Solo", "Family"],
      moodTags: ["stressed", "calm"],
      highlights: ["Wildlife Safari", "Nature Walks", "Bird Watching"],
      description: "Peaceful wildlife sanctuary for nature therapy"
    },
    {
      id: 30,
      name: "Harihareshwar Beach",
      location: "Raigad, Maharashtra",
      category: ["beach", "spiritual"],
      interests: ["Beaches", "Spiritual", "Peace"],
      budget: "budget",
      duration: "1-2 Days",
      recommendedFor: ["Solo", "Couple"],
      moodTags: ["stressed", "calm"],
      highlights: ["Beach Temple", "Rock Formations", "Sunset"],
      description: "Quiet beach town perfect for stress relief"
    }
  ]
};

// All places combined for filtering
export const allPlaces = Object.values(moodBasedPlaces).flat();

export default moodBasedPlaces;