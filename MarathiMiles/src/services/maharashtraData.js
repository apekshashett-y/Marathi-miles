// src/services/maharashtraData.js
// Curated list of places with ACTUAL WORKING Unsplash image URLs

export const maharashtraPlaces = [
  {
    id: 1,
    name: "Alibaug",
    location: "Raigad, Maharashtra",
    category: ["beach"],
    interests: ["Beaches", "Fort", "Water Sports"],
    budget: "mid-range",
    duration: "1-2 days",
    recommendedFor: ["friends", "couple", "family"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Friends", "Couple", "Family"],
  tripTypeTags: ["Relaxing", "Adventure", "Beach"],
  interestTags: ["Beaches", "Fort", "Water Sports", "Photography", "Food"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["1 Day", "2-3 Days"],
  moodCompatibility: ["happy", "excited"],
    accessibility: ["road", "ferry"],
    bestSeason: "Oct–Feb",
    moodTags: ["happy", "excited"],
    highlights: ["Kolaba Fort", "Alibaug Beach", "Kashid Beach nearby"],
    description: "Coastal town with beaches, forts and watersport options.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    coordinates: { lat: 18.6414, lng: 72.8722 },
    baseBudget: 8500,
    transportOptions: [
      {
        mode: "Train",
        costPerKm: 2,
        durationPer100Km: 2,
        features: ["Comfortable seating", "Food available", "Scenic route"]
      },
      {
        mode: "Bus", 
        costPerKm: 1.5,
        durationPer100Km: 2.5,
        features: ["Direct service", "Comfortable"]
      },
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 1.8, 
        features: ["Flexible timing", "Private", "Door-to-door"]
      }
    ],
    detailedHighlights: [
      {
        name: "Kolaba Fort",
        duration: "2-3 hours", 
        cost: 100,
        description: "Historic sea fort accessible during low tide"
      },
      {
        name: "Alibaug Beach",
        duration: "3-4 hours",
        cost: 0,
        description: "Main beach for swimming and water sports"
      },
      {
        name: "Kashid Beach", 
        duration: "2-3 hours",
        cost: 0,
        description: "White sand beach with water sports"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Beach Exploration",
        activities: [
          "Travel to Alibaug via chosen transport",
          "Check into hotel/resort", 
          "Visit Alibaug Beach for swimming and relaxation",
          "Evening at Kolaba Fort (check low tide timing)",
          "Dinner with local seafood"
        ]
      },
      {
        day: 2,
        title: "Local Sightseeing & Departure", 
        activities: [
          "Breakfast with local Maharashtrian cuisine",
          "Visit Kashid Beach for water sports",
          "Explore local markets for souvenirs",
          "Lunch with coastal delicacies",
          "Return journey with beautiful memories"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Matheran",
    location: "Raigad, Maharashtra", 
    category: ["hill-station", "nature", "relaxing"],
    interests: ["Nature", "Scenic Views", "Trekking"],
    budget: "budget",
    duration: "1-2 days",
    recommendedFor: ["solo", "couple", "family"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Solo", "Couple", "Family"],
  tripTypeTags: ["Relaxing", "Nature", "Peaceful"],
  interestTags: ["Nature", "Scenic Views", "Trekking", "Photography"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day", "2-3 Days"],
  moodCompatibility: ["calm", "sad", "happy"],
    accessibility: ["road"],
    bestSeason: "Oct–May",
    moodTags: ["calm", "sad", "happy"],
    highlights: ["Echo Point", "Charlotte Lake", "Toy Train"],
    description: "Vehicle-free hill station ideal for peaceful walks and viewpoints.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    coordinates: { lat: 18.9822, lng: 73.2687 },
    baseBudget: 6000,
    transportOptions: [
      {
        mode: "Train",
        costPerKm: 2.5,
        durationPer100Km: 2.2,
        features: ["Toy train experience", "Scenic route", "Heritage ride"]
      },
      {
        mode: "Bus",
        costPerKm: 1.8, 
        durationPer100Km: 2.8,
        features: ["Direct service", "Comfortable"]
      },
      {
        mode: "Car",
        costPerKm: 9,
        durationPer100Km: 2,
        features: ["Flexible timing", "Private vehicle"]
      }
    ],
    detailedHighlights: [
      {
        name: "Toy Train Ride",
        duration: "1-2 hours",
        cost: 300,
        description: "Heritage toy train with breathtaking valley views"
      },
      {
        name: "Echo Point", 
        duration: "1 hour",
        cost: 0,
        description: "Famous viewpoint where your voice echoes back"
      },
      {
        name: "Charlotte Lake",
        duration: "2 hours", 
        cost: 0,
        description: "Serene lake perfect for photography and relaxation"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Toy Train Experience",
        activities: [
          "Travel to Matheran via chosen transport",
          "Check into hotel/homestay",
          "Enjoy the famous toy train ride",
          "Visit Echo Point and experience the echo",
          "Evening walk through the vehicle-free streets"
        ]
      },
      {
        day: 2,
        title: "Nature Exploration & Departure",
        activities: [
          "Morning trek to Charlotte Lake",
          "Breakfast with local Parsi cuisine", 
          "Visit Panorama Point for scenic views",
          "Horse riding through forest trails",
          "Return journey with peaceful memories"
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Lonavala", 
    location: "Pune, Maharashtra",
    category: ["hill-station", "nature", "adventure"],
    interests: ["Nature", "Waterfalls", "Weekend Getaway"],
    budget: "budget",
    duration: "1-2 days",
    recommendedFor: ["friends", "family"],
     suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Friends", "Family", "Couple", "Solo"],
  tripTypeTags: ["Relaxing", "Adventure", "Nature"],
  interestTags: ["Nature", "Waterfalls", "Weekend Getaway", "Photography", "Food"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day", "2-3 Days"],
  moodCompatibility: ["happy", "excited", "calm"],
    accessibility: ["road"],
    bestSeason: "All year (monsoon is beautiful)",
    moodTags: ["happy", "excited", "calm"],
    highlights: ["Bhushi Dam", "Tiger's Leap", "Kune Falls"],
    description: "Popular weekend hill station with easy access from Mumbai/Pune.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    coordinates: { lat: 18.7480, lng: 73.4072 },
    baseBudget: 7000,
    transportOptions: [
      {
        mode: "Train",
        costPerKm: 2.2,
        durationPer100Km: 1.8,
        features: ["Frequent service", "Comfortable", "Scenic route"]
      },
      {
        mode: "Bus",
        costPerKm: 1.6,
        durationPer100Km: 2.2,
        features: ["Direct buses", "Economical"]
      },
      {
        mode: "Car", 
        costPerKm: 7,
        durationPer100Km: 1.5,
        features: ["Flexible stops", "Private", "Road trip experience"]
      }
    ],
    detailedHighlights: [
      {
        name: "Bhushi Dam",
        duration: "2-3 hours",
        cost: 0,
        description: "Famous dam with waterfall during monsoon season"
      },
      {
        name: "Tiger's Leap",
        duration: "1-2 hours", 
        cost: 0,
        description: "Cliff top with spectacular valley views"
      },
      {
        name: "Local Chikki Shopping",
        duration: "1 hour",
        cost: 500,
        description: "Famous Lonavala chikki and fudge shopping"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Waterfalls & Scenic Views",
        activities: [
          "Travel to Lonavala via chosen transport",
          "Check into resort/hotel",
          "Visit Bhushi Dam (monsoon special)",
          "Trek to Tiger's Leap for sunset views",
          "Evening chikki shopping spree"
        ]
      },
      {
        day: 2, 
        title: "Adventure & Departure",
        activities: [
          "Breakfast with local delicacies",
          "Visit Kune Waterfalls for photography",
          "Adventure activities at nearby parks",
          "Lunch with Maharashtrian thali",
          "Return journey with sweet memories"
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Pawna Lake Camping",
    location: "Lonavala, Maharashtra",
    category: ["camping", "adventure", "nature"],
    interests: ["Camping", "Boating", "Trekking"],
    budget: "mid-range", 
    duration: "1-2 days",
    recommendedFor: ["friends", "adventure seekers"],
    suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Friends", "Couple"],
  tripTypeTags: ["Adventure", "Camping", "Nature"],
  interestTags: ["Camping", "Boating", "Trekking", "Photography"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["1 Day", "2-3 Days"],
  moodCompatibility: ["happy", "excited"],
    accessibility: ["road"],
    bestSeason: "Oct–Feb",
    moodTags: ["happy", "excited"],
    highlights: ["Lake camping", "Bonfire", "Stargazing"],
    description: "Popular weekend camping spot on Pawna reservoir.",
    image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?w=600&h=400&fit=crop",
    coordinates: { lat: 18.6500, lng: 73.5000 },
    baseBudget: 4500,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 2,
        features: ["Best for camping gear", "Flexible timing", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2,
        durationPer100Km: 2.5, 
        features: ["Group friendly", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "Lakeside Camping",
        duration: "Overnight", 
        cost: 1500,
        description: "Tent camping with beautiful lake views"
      },
      {
        name: "Bonfire & Stargazing",
        duration: "2-3 hours",
        cost: 500,
        description: "Evening bonfire with clear night skies"
      },
      {
        name: "Boating", 
        duration: "1-2 hours",
        cost: 300,
        description: "Relaxing boat ride in the reservoir"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Camping Setup & Adventure",
        activities: [
          "Travel to Pawna Lake via chosen transport",
          "Set up campsite with tents",
          "Boating and water activities",
          "Evening bonfire with music and games",
          "Stargazing session"
        ]
      },
      {
        day: 2,
        title: "Sunrise & Departure", 
        activities: [
          "Sunrise viewing over the lake",
          "Breakfast at campsite",
          "Nature walk and photography",
          "Pack up campsite",
          "Return journey with adventure stories"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Kaas Plateau",
    location: "Satara, Maharashtra",
    category: ["nature", "flora", "relaxing"],
    interests: ["Botany", "Photography", "Nature Walks"],
    budget: "budget",
    duration: "1 day",
    recommendedFor: ["solo", "couple", "family"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Solo", "Couple", "Family"],
  tripTypeTags: ["Nature", "Relaxing", "Photography"],
  interestTags: ["Botany", "Photography", "Nature Walks"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["calm", "sad"],
    accessibility: ["road"],
    bestSeason: "Aug–Sep (flower bloom season)",
    moodTags: ["calm", "sad"],
    highlights: ["Wildflower plateau", "Scenic viewpoints"],
    description: "A UNESCO biodiversity site famous for seasonal wildflowers.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    coordinates: { lat: 17.7200, lng: 73.8200 },
    baseBudget: 3500,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 9,
        durationPer100Km: 2.5,
        features: ["Flexible stops", "Best for photography gear", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2.2,
        durationPer100Km: 3,
        features: ["Economical", "Direct service from Satara"]
      }
    ],
    detailedHighlights: [
      {
        name: "Flower Valley Walk",
        duration: "3-4 hours",
        cost: 100,
        description: "Walk through valley of colorful seasonal flowers"
      },
      {
        name: "Photography Session",
        duration: "2-3 hours",
        cost: 0,
        description: "Perfect spot for nature and macro photography"
      },
      {
        name: "Viewpoint Exploration",
        duration: "1-2 hours",
        cost: 0,
        description: "Scenic viewpoints overlooking the plateau"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Flower Paradise Day Trip",
        activities: [
          "Early morning travel to Kaas Plateau",
          "Entry and registration at visitor center",
          "Guided walk through flower valleys",
          "Photography session with rare flowers",
          "Picnic lunch amidst nature",
          "Visit to nearby viewpoints",
          "Return journey with beautiful memories"
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Della Adventure Park",
    location: "Lonavala, Maharashtra",
    category: ["adventure", "theme-park"],
    interests: ["Adventure", "Rides", "Team Events"],
    budget: "high",
    duration: "1 day",
    recommendedFor: ["friends", "adventure seekers"],
    accessibility: ["road"],
    suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Friends", "Adventure Seekers"],
  tripTypeTags: ["Adventure", "Theme Park"],
  interestTags: ["Adventure", "Rides", "Team Events"],
  budgetCompatibility: "high",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["happy", "excited"],
    bestSeason: "All year",
    moodTags: ["happy", "excited"],
    highlights: ["Bungee", "ATV", "Swoop Swing"],
    description: "Large adventure park with many adrenaline activities.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    coordinates: { lat: 18.6500, lng: 73.5000 },
    baseBudget: 12000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 1.8,
        features: ["Convenient for groups", "Flexible timing", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2,
        durationPer100Km: 2.2,
        features: ["Group transport", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "Bungee Jumping",
        duration: "30-45 mins",
        cost: 2500,
        description: "Thrilling 150ft bungee jump experience"
      },
      {
        name: "ATV Ride",
        duration: "1 hour",
        cost: 1200,
        description: "All-terrain vehicle adventure through tracks"
      },
      {
        name: "Swoop Swing",
        duration: "15-20 mins",
        cost: 1500,
        description: "Giant swing for adrenaline rush"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Adventure Day Out",
        activities: [
          "Travel to Della Adventure Park",
          "Registration and safety briefing",
          "Bungee Jumping session",
          "ATV riding adventure",
          "Lunch at park restaurant",
          "Swoop Swing and other rides",
          "Evening return with adrenaline memories"
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Kashid Beach",
    location: "Raigad, Maharashtra",
    category: ["beach"],
    interests: ["Beaches", "Water Sports", "Relaxation"],
    budget: "budget",
    duration: "1 day",
    recommendedFor: ["couple", "family", "friends"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Couple", "Family", "Friends"],
  tripTypeTags: ["Relaxing", "Beach", "Romantic"],
  interestTags: ["Beaches", "Water Sports", "Relaxation", "Photography"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["happy", "calm"],
    accessibility: ["road"],
    bestSeason: "Oct–Feb",
    moodTags: ["happy", "calm"],
    highlights: ["White sand", "Water sports", "Beachfront stays"],
    description: "A clean white-sand beach near Alibaug; calmer than touristy beaches.",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&h=400&fit=crop",
    coordinates: { lat: 18.3200, lng: 72.9500 },
    baseBudget: 5000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 2,
        features: ["Beach gear friendly", "Flexible", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 1.8,
        durationPer100Km: 2.5,
        features: ["Direct service", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "White Sand Beach",
        duration: "3-4 hours",
        cost: 0,
        description: "Pristine white sand beach for relaxation"
      },
      {
        name: "Water Sports",
        duration: "2-3 hours",
        cost: 1500,
        description: "Jet skiing, banana boat, parasailing"
      },
      {
        name: "Beach Shacks",
        duration: "1-2 hours",
        cost: 500,
        description: "Fresh seafood at beachfront shacks"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Beach Day Relaxation",
        activities: [
          "Travel to Kashid Beach",
          "Set up beach spot for the day",
          "Swimming and beach relaxation",
          "Water sports adventure",
          "Lunch at beach shacks",
          "Sunset viewing and photography",
          "Return journey refreshed"
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Kolad River Rafting",
    location: "Raigad, Maharashtra",
    category: ["adventure", "water-sports"],
    interests: ["Rafting", "Camping", "Adventure"],
    budget: "mid-range",
    duration: "1 day",
    recommendedFor: ["friends", "adventure seekers"],
    suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Friends", "Adventure Seekers"],
  tripTypeTags: ["Adventure", "Water Sports"],
  interestTags: ["Rafting", "Camping", "Adventure"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["excited", "happy"],
    accessibility: ["road"],
    bestSeason: "Jun–Sep (monsoon rafting)",
    moodTags: ["excited", "happy"],
    highlights: ["White water rafting", "River camping"],
    description: "Thrilling rafting on Kundalika river; popular for adventure groups.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop",
    coordinates: { lat: 18.4300, lng: 73.1500 },
    baseBudget: 6000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 2,
        features: ["Adventure gear friendly", "Group transport", "Flexible"]
      },
      {
        mode: "Bus",
        costPerKm: 2,
        durationPer100Km: 2.5,
        features: ["Group booking available", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "White Water Rafting",
        duration: "2-3 hours",
        cost: 2000,
        description: "Grade 2-3 rapids on Kundalika river"
      },
      {
        name: "Riverside Camping",
        duration: "Overnight",
        cost: 1500,
        description: "Camping by the river with bonfire"
      },
      {
        name: "Adventure Activities",
        duration: "2 hours",
        cost: 1000,
        description: "Kayaking, rappelling, and team building"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "River Adventure Day",
        activities: [
          "Travel to Kolad rafting point",
          "Safety briefing and gear distribution",
          "White water rafting experience",
          "Riverside lunch and relaxation",
          "Additional adventure activities",
          "Return journey with thrilling stories"
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Bhandardara",
    location: "Ahmednagar, Maharashtra",
    category: ["nature", "lakes", "relaxing"],
    interests: ["Camping", "Nature Trails", "Boat rides"],
    budget: "mid-range",
    duration: "2-3 days",
    recommendedFor: ["family", "couple", "solo"],
    accessibility: ["road"],
     suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Family", "Couple", "Solo"],
  tripTypeTags: ["Relaxing", "Nature", "Lakeside"],
  interestTags: ["Camping", "Nature Trails", "Boat rides", "Photography"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["2-3 Days"],
  moodCompatibility: ["calm", "sad"],
    bestSeason: "Nov–Feb",
    moodTags: ["calm", "sad"],
    highlights: ["Arthur Lake", "Randha Falls", "Wilson Dam"],
    description: "Quiet lakeside town excellent for disconnecting and camping.",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&h=400&fit=crop",
    coordinates: { lat: 19.5300, lng: 73.7800 },
    baseBudget: 8000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 9,
        durationPer100Km: 2.2,
        features: ["Scenic drive", "Camping gear friendly", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2.5,
        durationPer100Km: 3,
        features: ["Direct service", "Comfortable"]
      }
    ],
    detailedHighlights: [
      {
        name: "Arthur Lake Boating",
        duration: "1-2 hours",
        cost: 400,
        description: "Serene boating in pristine lake waters"
      },
      {
        name: "Randha Falls",
        duration: "2 hours",
        cost: 0,
        description: "Beautiful waterfall especially in monsoon"
      },
      {
        name: "Wilson Dam",
        duration: "1 hour",
        cost: 0,
        description: "Historic dam with scenic views"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Lake Exploration",
        activities: [
          "Travel to Bhandardara",
          "Check into lakeside resort",
          "Boating in Arthur Lake",
          "Visit Wilson Dam for sunset",
          "Evening bonfire by the lake"
        ]
      },
      {
        day: 2,
        title: "Waterfalls & Nature",
        activities: [
          "Morning trek to Randha Falls",
          "Breakfast with local cuisine",
          "Nature photography session",
          "Lakeside relaxation",
          "Stargazing at night"
        ]
      },
      {
        day: 3,
        title: "Departure & Memories",
        activities: [
          "Sunrise viewing over the lake",
          "Breakfast and checkout",
          "Last minute photography",
          "Return journey with peaceful memories"
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Bhimashankar Temple",
    location: "Pune, Maharashtra",
    category: ["spiritual", "heritage", "nature"],
    interests: ["Pilgrimage", "Trekking", "Nature"],
    budget: "budget",
    duration: "1 day",
    recommendedFor: ["solo", "family", "spiritual seekers"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Solo", "Family", "Spiritual Seekers"],
  tripTypeTags: ["Spiritual", "Heritage", "Nature"],
  interestTags: ["Pilgrimage", "Trekking", "Nature"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["sad", "calm", "stressed"],
    accessibility: ["road"],
    bestSeason: "Oct–Mar",
    moodTags: ["sad", "calm", "stressed"],
    highlights: ["Jyotirlinga", "Forest trails"],
    description: "One of the 12 Jyotirlinga temples located in lush forests.",
    image: "https://images.unsplash.com/photo-1547996160-81dfd9c9a0c9?w=600&h=400&fit=crop",
    coordinates: { lat: 19.0700, lng: 73.5300 },
    baseBudget: 3000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 2.5,
        features: ["Flexible timing", "Private", "Comfortable"]
      },
      {
        mode: "Bus",
        costPerKm: 2,
        durationPer100Km: 3,
        features: ["Pilgrimage special", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "Jyotirlinga Darshan",
        duration: "1-2 hours",
        cost: 0,
        description: "Darshan of one of the 12 sacred Jyotirlingas"
      },
      {
        name: "Forest Trek",
        duration: "2-3 hours",
        cost: 0,
        description: "Trek through Bhimashankar Wildlife Sanctuary"
      },
      {
        name: "Hanuman Lake",
        duration: "1 hour",
        cost: 0,
        description: "Peaceful lake near the temple"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Spiritual Day Trip",
        activities: [
          "Early morning travel to Bhimashankar",
          "Temple darshan and prayers",
          "Breakfast at temple premises",
          "Forest trek and nature walk",
          "Visit Hanuman Lake",
          "Lunch at local eateries",
          "Return journey with spiritual peace"
        ]
      }
    ]
  },
  {
    id: 11,
    name: "Tamhini Ghat",
    location: "Pune, Maharashtra",
    category: ["scenic", "waterfalls", "drive"],
    interests: ["Road Trips", "Waterfalls", "Photography"],
    budget: "budget",
    duration: "1 day",
    recommendedFor: ["friends", "couple"],
    accessibility: ["road"],
    suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Friends", "Couple"],
  tripTypeTags: ["Scenic Drive", "Nature", "Adventure"],
  interestTags: ["Road Trips", "Waterfalls", "Photography"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["calm", "stressed"],
    bestSeason: "Monsoon",
    moodTags: ["calm", "stressed"],
    highlights: ["Kolad falls", "Scenic monsoon drive"],
    description: "A scenic ghats drive with waterfalls and lush greenery in monsoon.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
    coordinates: { lat: 18.4700, lng: 73.4200 },
    baseBudget: 4000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 8,
        durationPer100Km: 2,
        features: ["Best for road trip", "Flexible stops", "Private"]
      },
      {
        mode: "Bike",
        costPerKm: 3,
        durationPer100Km: 1.8,
        features: ["Adventure ride", "Best for photography", "Thrilling"]
      }
    ],
    detailedHighlights: [
      {
        name: "Scenic Drive",
        duration: "2-3 hours",
        cost: 0,
        description: "Beautiful ghat road with 360° views"
      },
      {
        name: "Waterfall Spotting",
        duration: "2 hours",
        cost: 0,
        description: "Multiple waterfalls during monsoon season"
      },
      {
        name: "Photography Points",
        duration: "1-2 hours",
        cost: 0,
        description: "Numerous spots for landscape photography"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Monsoon Road Trip",
        activities: [
          "Start early for Tamhini Ghat drive",
          "Stop at multiple viewpoints for photos",
          "Waterfall spotting and exploration",
          "Picnic lunch amidst nature",
          "Visit local villages and markets",
          "Evening return with beautiful memories"
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Panchgani",
    location: "Satara, Maharashtra",
    category: ["hill-station", "nature"],
    interests: ["Scenic Views", "Relaxation"],
    budget: "mid-range",
    duration: "2-3 days",
    recommendedFor: ["family", "couple"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Family", "Couple"],
  tripTypeTags: ["Relaxing", "Nature", "Hill Station"],
  interestTags: ["Scenic Views", "Relaxation", "Food", "Photography"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["2-3 Days"],
  moodCompatibility: ["calm", "happy"],
    accessibility: ["road"],
    bestSeason: "Oct–Jun",
    moodTags: ["calm", "happy"],
    highlights: ["Table Land", "Sydney Point"],
    description: "A plateau famous for tranquil views and pleasant weather.",
    image: "https://images.unsplash.com/photo-1464822759849-42f1d1e5b0e5?w=600&h=400&fit=crop",
    coordinates: { lat: 17.9200, lng: 73.8200 },
    baseBudget: 9000,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 9,
        durationPer100Km: 2.2,
        features: ["Scenic drive", "Comfortable", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2.5,
        durationPer100Km: 2.8,
        features: ["Hill station special", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "Table Land",
        duration: "2-3 hours",
        cost: 100,
        description: "Second longest volcanic plateau in Asia"
      },
      {
        name: "Sydney Point",
        duration: "1 hour",
        cost: 0,
        description: "360° view of Krishna Valley and Dhom Dam"
      },
      {
        name: "Strawberry Farms",
        duration: "1-2 hours",
        cost: 500,
        description: "Visit local strawberry farms and tasting"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Scenic Views",
        activities: [
          "Travel to Panchgani",
          "Check into hill resort",
          "Visit Table Land for sunset",
          "Evening walk through town",
          "Dinner with local cuisine"
        ]
      },
      {
        day: 2,
        title: "Valley Exploration",
        activities: [
          "Sunrise at Sydney Point",
          "Breakfast with strawberry delicacies",
          "Visit strawberry farms",
          "Lunch with panoramic views",
          "Shopping for local products"
        ]
      },
      {
        day: 3,
        title: "Departure & Memories",
        activities: [
          "Morning photography session",
          "Breakfast and checkout",
          "Last minute sightseeing",
          "Return journey with sweet memories"
        ]
      }
    ]
  },
  {
    id: 13,
    name: "Koyna Wildlife Sanctuary",
    location: "Satara, Maharashtra",
    category: ["wildlife", "adventure"],
    interests: ["Wildlife", "Trekking"],
    budget: "mid-range",
    duration: "2-3 days",
    recommendedFor: ["family", "nature lovers"],
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Family", "Nature Lovers"],
  tripTypeTags: ["Wildlife", "Adventure", "Nature"],
  interestTags: ["Wildlife", "Trekking", "Bird Watching"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["2-3 Days"],
  moodCompatibility: ["excited", "happy"],
    accessibility: ["road"],
    bestSeason: "Oct–Mar",
    moodTags: ["excited", "happy"],
    highlights: ["Wildlife trails", "Trekking & birding"],
    description: "Dense forest with wildlife and trekking opportunities.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
    coordinates: { lat: 17.4000, lng: 73.7500 },
    baseBudget: 7500,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 10,
        durationPer100Km: 2.5,
        features: ["Wildlife safari ready", "Adventure gear friendly", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 3,
        durationPer100Km: 3.2,
        features: ["Wildlife tour packages", "Guided"]
      }
    ],
    detailedHighlights: [
      {
        name: "Wildlife Safari",
        duration: "3-4 hours",
        cost: 800,
        description: "Guided safari to spot tigers, leopards, and birds"
      },
      {
        name: "Nature Trekking",
        duration: "2-3 hours",
        cost: 500,
        description: "Trek through dense forests with guide"
      },
      {
        name: "Bird Watching",
        duration: "2 hours",
        cost: 300,
        description: "Spot rare and migratory bird species"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Arrival & Nature Introduction",
        activities: [
          "Travel to Koyna Wildlife Sanctuary",
          "Check into forest resort",
          "Evening nature walk",
          "Wildlife documentary screening",
          "Dinner with local tribal cuisine"
        ]
      },
      {
        day: 2,
        title: "Wildlife Adventure",
        activities: [
          "Early morning wildlife safari",
          "Breakfast at resort",
          "Guided nature trekking",
          "Bird watching session",
          "Evening bonfire with forest stories"
        ]
      },
      {
        day: 3,
        title: "Departure & Conservation",
        activities: [
          "Morning photography walk",
          "Breakfast and checkout",
          "Visit interpretation center",
          "Return journey with wildlife memories"
        ]
      }
    ]
  },
  {
    id: 14,
    name: "Harihareshwar",
    location: "Raigad, Maharashtra",
    category: ["beach", "temple", "trek"],
    interests: ["Beaches", "Trekking", "Spiritual"],
    budget: "budget",
    duration: "1-2 days",
    suitableAgeGroups: ["18-30", "30-50", "50+"],
  suitableTravelGroups: ["Couple", "Family"],
  tripTypeTags: ["Spiritual", "Beach", "Nature"],
  interestTags: ["Beaches", "Trekking", "Spiritual", "Photography"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1-2 Days"],
  moodCompatibility: ["excited", "calm"],
    recommendedFor: ["couple", "family"],
    accessibility: ["road"],
    bestSeason: "Oct–Feb",
    moodTags: ["excited", "calm"],
    highlights: ["Harihareshwar Temple", "Rock beaches"],
    description: "A small temple town with quiet beaches and cliff treks.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    coordinates: { lat: 17.9900, lng: 73.0300 },
    baseBudget: 5500,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 9,
        durationPer100Km: 2.2,
        features: ["Beach gear friendly", "Flexible", "Private"]
      },
      {
        mode: "Bus",
        costPerKm: 2.2,
        durationPer100Km: 2.8,
        features: ["Direct service", "Economical"]
      }
    ],
    detailedHighlights: [
      {
        name: "Harihareshwar Temple",
        duration: "1-2 hours",
        cost: 0,
        description: "Ancient Shiva temple by the sea"
      },
      {
        name: "Rock Beach Exploration",
        duration: "2-3 hours",
        cost: 0,
        description: "Unique rock formations and tidal pools"
      },
      {
        name: "Cliff Trekking",
        duration: "1-2 hours",
        cost: 0,
        description: "Moderate trek with coastal views"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Temple & Beach Day",
        activities: [
          "Travel to Harihareshwar",
          "Check into beachside accommodation",
          "Visit Harihareshwar Temple",
          "Beach relaxation and swimming",
          "Cliff trekking for sunset views",
          "Dinner with coastal cuisine"
        ]
      },
      {
        day: 2,
        title: "Rock Exploration & Departure",
        activities: [
          "Sunrise viewing at beach",
          "Breakfast with local food",
          "Rock beach exploration",
          "Photography session",
          "Lunch and return journey"
        ]
      }
    ]
  },
  {
    id: 15,
    name: "Sinhagad Fort",
    location: "Pune, Maharashtra",
    category: ["heritage", "trek"],
    interests: ["Trekking", "History"],
    budget: "budget",
    duration: "1 day",
    recommendedFor: ["friends", "solo"],
    suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Friends", "Solo"],
  tripTypeTags: ["Heritage", "Adventure", "Trekking"],
  interestTags: ["Trekking", "History", "Photography"],
  budgetCompatibility: "budget",
  durationCompatibility: ["1 Day"],
  moodCompatibility: ["excited", "happy"],
    accessibility: ["road"],
    bestSeason: "Oct–Mar",
    moodTags: ["excited", "happy"],
    highlights: ["Trek route", "Fort history", "Breakfast at top"],
    description: "Historic fort with short trek and panoramic views of Pune.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop",
    coordinates: { lat: 18.3667, lng: 73.7500 },
    baseBudget: 2500,
    transportOptions: [
      {
        mode: "Car",
        costPerKm: 7,
        durationPer100Km: 1.5,
        features: ["Early morning trek", "Flexible", "Private"]
      },
      {
        mode: "Bike",
        costPerKm: 2.5,
        durationPer100Km: 1.3,
        features: ["Adventure ride", "Quick access", "Thrilling"]
      }
    ],
    detailedHighlights: [
      {
        name: "Fort Trek",
        duration: "1-2 hours",
        cost: 0,
        description: "Moderate trek to the fort summit"
      },
      {
        name: "Historical Exploration",
        duration: "2 hours",
        cost: 0,
        description: "Explore fort ruins and historical sites"
      },
      {
        name: "Summit Breakfast",
        duration: "1 hour",
        cost: 200,
        description: "Famous local breakfast at fort top"
      }
    ],
    itineraryTemplate: [
      {
        day: 1,
        title: "Heritage Trek Day",
        activities: [
          "Early morning travel to Sinhagad base",
          "Start trek to fort summit",
          "Reach top and explore historical sites",
          "Famous breakfast at local stalls",
          "Photography with panoramic views",
          "Descend and visit nearby points",
          "Return journey with historical insights"
        ]
      }
    ]
  },
  {
  id: 16,
  name: "Pune City",
  location: "Pune, Maharashtra",
  category: ["urban", "cultural", "nightlife", "food"],
  interests: ["Nightlife", "Food", "Shopping", "Historical", "Photography"],
  budget: "mid-range",
  duration: "2-3 days",
  recommendedFor: ["solo", "friends", "couple"],
  // NEW REAL-TIME FILTERING PROPERTIES:
  suitableAgeGroups: ["18-30", "30-50"],
  suitableTravelGroups: ["Solo", "Friends", "Couple"],
  tripTypeTags: ["Relaxing", "Urban", "Cultural", "Food"],
  interestTags: ["Nightlife", "Food", "Shopping", "Historical", "Photography"],
  budgetCompatibility: "mid-range",
  durationCompatibility: ["2-3 Days", "1 Week"],
  moodCompatibility: ["happy", "excited"],
  accessibility: ["road", "train", "flight"],
  bestSeason: "Oct–Mar",
  moodTags: ["happy", "excited"],
  highlights: ["Nightlife", "Food Streets", "Historical Sites", "Shopping"],
  description: "Vibrant city perfect for urban exploration, nightlife, food tours and photography.",
  image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=400&fit=crop",
  coordinates: { lat: 18.5204, lng: 73.8567 },
  baseBudget: 12000,
  transportOptions: [
    {
      mode: "Train",
      costPerKm: 2.5,
      durationPer100Km: 1.8,
      features: ["Comfortable", "Frequent service", "City center access"]
    },
    {
      mode: "Bus",
      costPerKm: 1.8,
      durationPer100Km: 2.2,
      features: ["Economical", "Multiple routes", "Comfortable"]
    },
    {
      mode: "Car",
      costPerKm: 8,
      durationPer100Km: 1.5,
      features: ["Flexible", "Private", "City exploration"]
    }
  ],
  detailedHighlights: [
    {
      name: "Koregaon Park Nightlife",
      duration: "3-4 hours",
      cost: 2000,
      description: "Trendy pubs, clubs and lounges for nightlife experience"
    },
    {
      name: "Food Street Exploration",
      duration: "2-3 hours",
      cost: 800,
      description: "Famous FC Road and JM Road for street food and cafes"
    },
    {
      name: "Historical Photography",
      duration: "3-4 hours",
      cost: 300,
      description: "Shaniwar Wada, Aga Khan Palace for heritage photography"
    },
    {
      name: "Shopping Experience",
      duration: "2-3 hours",
      cost: 1500,
      description: "Phoenix Marketcity and local markets for shopping"
    }
  ],
  itineraryTemplate: [
    {
      day: 1,
      title: "Urban Exploration & Nightlife",
      activities: [
        "Travel to Pune and check into hotel",
        "Lunch at famous Misal Pav stall",
        "Visit Shaniwar Wada for historical photography",
        "Evening at FC Road Food Street",
        "Nightlife experience at Koregaon Park",
        "Late night street food tasting"
      ]
    },
    {
      day: 2,
      title: "Culture & Shopping Day",
      activities: [
        "Breakfast at German Bakery",
        "Visit Aga Khan Palace for photography",
        "Lunch at authentic Maharashtrian restaurant",
        "Shopping at Phoenix Marketcity",
        "Evening at Dagdusheth Temple",
        "Dinner at rooftop restaurant with city views"
      ]
    },
    {
      day: 3,
      title: "Local Experience & Departure",
      activities: [
        "Morning walk at Saras Baug",
        "Breakfast at local cafe",
        "Visit Osho Ashram for peaceful experience",
        "Last minute shopping for souvenirs",
        "Lunch with local delicacies",
        "Return journey with urban memories"
      ]
    }
  ]
}
];

export default maharashtraPlaces;