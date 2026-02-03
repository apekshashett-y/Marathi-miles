
export const shivneriData = {
  famousCuisine: [
    {
      id: 1,
      name: "Misal Pav",
      description: "A spicy sprouted moth bean curry topped with farsan, onions, and lemon. Originally a peasant dish, it's now a beloved breakfast across Maharashtra. Junnar has its own spicy variant.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
      context: "Best eaten at local eateries near the bus stand."
    },
    {
      id: 2,
      name: "Bhakri with Thecha",
      description: "Jowar or Bajra flatbread served with fiery green chili chutney (Thecha). The staple food of the Mawalas (Shivaji's soldiers), providing lasting energy for fort climbing.",
      image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop",
      context: "Available at small shacks at the fort base."
    },
    {
      id: 3,
      name: "Solkadhi",
      description: "A cooling drink made from kokum and coconut milk. Though a Konkan specialty, it's widely available here to beat the heat after a trek.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
      context: "Perfect post-trek refresher."
    },
    {
      id: 4,
      name: "Maswadi",
      description: "A delicacies from the Pune region, it's a stuffed gram flour roll with a spicy coconut-garlic-sesame filling, often served with curry.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Xf2g0k3k92k2m2522222222222222222&s", // Placeholder, using generic logic in component if fails
      context: "A savory lunch option in Junnar town."
    }
  ],
  shoppingAreas: [
    {
      id: 1,
      name: "Junnar Weekly Market",
      items: "Fresh Produce, Spices",
      description: "Held every Sunday, this traditional market offers a glimpse into rural life. Farmers sell fresh vegetables, local spices, and agricultural tools.",
      location: "Junnar Town Center"
    },
    {
      id: 2,
      name: "Sahyadri Handicrafts",
      items: "Warli Paintings, Artifacts",
      description: "Small shops selling tribal Warli art, which is indigenous to the North Sahyadri region. Great for souvenirs.",
      location: "Near Fort Parking"
    },
    {
      id: 3,
      name: "Farm Fresh Outlets",
      items: "Grapes, Raisins",
      description: "The Junnar-Narayangaon belt is famous for grape cultivation. Buy export-quality raisins and fresh grapes directly from farm outlets.",
      location: "Highway towards Narayangaon"
    },
    {
      id: 4,
      name: "Local Sweet Marts",
      items: "Pedha, Mawa",
      description: "Traditional sweet shops offering fresh milk-based sweets, famous in this dairy-rich belt.",
      location: "Shivaji Chowk, Junnar"
    }
  ],
  culturalExperiences: [
    {
      id: 1,
      name: "Shiv Jayanti Celebrations",
      description: "Witness the grandeur of Chhatrapati Shivaji Maharaj's birth anniversary (19th Feb) at his birthplace. The fort comes alive with decorations, palanquins, and traditional music.",
      significance: "Historical & Emotional peak"
    },
    {
      id: 2,
      name: "Powada Performance",
      description: "Listen to the 'Powada', a traditional ballad genre that narrates historical events and heroic deeds of the Maratha warriors, performed by Shahirs.",
      significance: "Musical Heritage"
    },
    {
      id: 3,
      name: "Kadelot Experience",
      description: "Visit the 'Kadelot' point (execution point). While grim, standing there gives a chilling realization of the strict justice system of the Maratha administration.",
      significance: "Historical Justice"
    },
    {
      id: 4,
      name: "Buddhist Caves Tour",
      description: "Explore the ancient rock-cut caves surrounding Shivneri (like Lenyadri). These caves predate the Maratha empire, showing the region's ancient trade importance.",
      significance: "Ancient History"
    }
  ],

  // Activity database for dynamic itinerary generation
  activities: [
    {
      id: 'entry',
      name: 'Entry & Orientation',
      description: 'Enter through Maha Darwaja and get oriented with the fort layout',
      duration: 20,
      priority: 'essential',
      category: 'arrival'
    },
    {
      id: 'birthplace',
      name: 'Shiv Janmasthan Visit',
      description: 'Visit the birthplace building with the majestic statue of young Shivaji and Jijabai',
      duration: 40,
      priority: 'essential',
      category: 'heritage'
    },
    {
      id: 'gates',
      name: 'Seven Gates Walk',
      description: 'Observe the architecture of all 7 defensive gates (Maha Darwaja, Ganesh Darwaja, etc.)',
      duration: 30,
      priority: 'medium',
      category: 'architecture'
    },
    {
      id: 'water_cisterns',
      name: 'Ganga-Jamuna Water Cisterns',
      description: 'Explore the ancient water storage system that sustained the fort',
      duration: 25,
      priority: 'medium',
      category: 'engineering'
    },
    {
      id: 'kadelot',
      name: 'Kadelot Point',
      description: 'View the execution point with historical significance',
      duration: 15,
      priority: 'optional',
      category: 'history'
    },
    {
      id: 'badami_talav',
      name: 'Badami Talav Reservoir',
      description: 'Visit the main water reservoir with surrounding ruins',
      duration: 20,
      priority: 'medium',
      category: 'engineering'
    },
    {
      id: 'ambarkhana',
      name: 'Ambarkhana & Storage',
      description: 'Explore grain storage houses and palace ruins',
      duration: 30,
      priority: 'optional',
      category: 'architecture'
    },
    {
      id: 'panoramic_view',
      name: 'Panoramic Viewpoint',
      description: 'Enjoy sweeping views of Sahyadri ranges',
      duration: 15,
      priority: 'medium',
      category: 'scenic'
    },
    {
      id: 'temple',
      name: 'Shivai Temple',
      description: 'Visit the sacred temple within the fort',
      duration: 20,
      priority: 'optional',
      category: 'spiritual'
    },
    {
      id: 'rest_break',
      name: 'Rest & Refreshment',
      description: 'Short break for water and rest',
      duration: 10,
      priority: 'optional',
      category: 'break'
    }
  ],

  // Configuration for itinerary logic
  itineraryRules: {
    walkingSpeedMinutes: 5, // Average time between major points
    minimumBreakAfterMinutes: 60, // Add break after 60min of continuous activity
    essentialActivitiesRequired: true
  }
};
