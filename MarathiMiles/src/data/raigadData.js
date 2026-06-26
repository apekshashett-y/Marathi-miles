
export const raigadData = {
  famousCuisine: [
    {
      id: 1,
      name: "Ukadiche Modak",
      description: "Steamed rice flour dumplings filled with coconut and jaggery. A sacred sweet offered to Lord Ganesha and deeply rooted in Konkan tradition. The Raigad region is known for its distinctly fragrant version.",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
      context: "Available at local sweet shops and homes during Ganesh Chaturthi."
    },
    {
      id: 2,
      name: "Kombdi Vade",
      description: "Spicy chicken curry served with deep-fried puris (vade). The quintessential Konkan non-veg feast, known for its fiery red coconut-based gravy and the satisfying crunch of the vade.",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
      context: "Best at Konkani restaurants near the ropeway base in Pachad."
    },
    {
      id: 3,
      name: "Solkadhi",
      description: "A cooling digestive drink made from kokum fruit and coconut milk. The pink-purple elixir of the Konkan coast, essential after a spicy meal or a long trek up the fort.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
      context: "Perfect post-trek refresher available at every local eatery."
    },
    {
      id: 4,
      name: "Puran Poli",
      description: "Sweet flatbread stuffed with chana dal and jaggery filling (puran), served with a dollop of ghee. A beloved festive dish representing Maharashtrian hospitality at its finest.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop",
      context: "Available at local eateries and during festival celebrations."
    }
  ],
  shoppingAreas: [
    {
      id: 1,
      name: "Raigad Ropeway Bazaar",
      items: "Fort Miniatures, Shivaji Memorabilia, Spices",
      description: "A bustling market near the ropeway base offering souvenirs, Shivaji memorabilia, miniature fort models, and local handicrafts. The go-to stop before or after your fort visit.",
      location: "Ropeway Base, Pachad"
    },
    {
      id: 2,
      name: "Mahad Market",
      items: "Cashew Nuts, Kokum Products, Brass Items",
      description: "The main town market of Mahad, the nearest city to Raigad. Known for fresh Konkani spices, raw cashews, and handcrafted brass items.",
      location: "Mahad Town Center"
    },
    {
      id: 3,
      name: "Pachad Village Crafts",
      items: "Copper Artifacts, Warli Art, Woven Baskets",
      description: "The small village of Pachad at the base of Raigad has artisans who create traditional copper and brass artifacts, Warli-style paintings, and woven crafts unique to the region.",
      location: "Pachad Village"
    },
    {
      id: 4,
      name: "Konkan Farm Outlets",
      items: "Alphonso Mangoes, Cashew Feni, Wild Honey",
      description: "The Raigad district is renowned for its Alphonso mangoes, cashew feni, and raw honey. Farm outlets along the road sell these directly from producers.",
      location: "Along Mahad-Raigad Highway"
    }
  ],
  culturalExperiences: [
    {
      id: 1,
      name: "Shivaji Samadhi Darshan",
      description: "Pay respects at the sacred samadhi (memorial tomb) of Chhatrapati Shivaji Maharaj. The most emotionally powerful experience at Raigad — a moment of deep reverence and connection with Maratha history.",
      significance: "Spiritual & Historical peak"
    },
    {
      id: 2,
      name: "Takmak Tok Experience",
      description: "Stand at the edge of the 1,400-foot sheer cliff from which traitors were thrown. While grim in history, the views are the most breathtaking on the entire fort — the Konkan coast stretches endlessly below.",
      significance: "Historical Justice & Scenic Beauty"
    },
    {
      id: 3,
      name: "Coronation Site Tour",
      description: "Walk the exact ground where Chhatrapati Shivaji Maharaj was crowned in 1674. The royal palace ruins, audience hall, and coronation memorial bring the grand ceremony back to life.",
      significance: "Political & Historical Heritage"
    },
    {
      id: 4,
      name: "Hirakani Buruj Story Walk",
      description: "Visit the watch tower named after Hirakani, a brave village woman who climbed the impossible cliff face at night to reach her infant child. Her courage so impressed Shivaji Maharaj that he named the bastion after her.",
      significance: "Legendary Courage"
    }
  ],

  // Activity database for dynamic itinerary generation
  activities: [
    {
      id: 'ropeway_ascent',
      name: 'Ropeway Ascent',
      description: 'Take the aerial ropeway up to the fort plateau with panoramic views of the Sahyadri valleys',
      duration: 20,
      priority: 'essential',
      category: 'arrival'
    },
    {
      id: 'maha_darwaja',
      name: 'Maha Darwaja & Nagarkhana',
      description: 'Walk through the grand main gate and see the royal drum house where musicians announced daily events',
      duration: 25,
      priority: 'essential',
      category: 'architecture'
    },
    {
      id: 'raj_bhavan',
      name: 'Raj Bhavan (Royal Palace)',
      description: 'Explore the ruins of the royal palace — the seat of Chhatrapati Shivaji Maharaj\'s rule and the heart of the empire',
      duration: 35,
      priority: 'essential',
      category: 'heritage'
    },
    {
      id: 'samadhi',
      name: 'Shivaji Samadhi Visit',
      description: 'Pay respects at the sacred memorial tomb of Chhatrapati Shivaji Maharaj',
      duration: 20,
      priority: 'essential',
      category: 'spiritual'
    },
    {
      id: 'jagdishwar_temple',
      name: 'Jagdishwar Temple',
      description: 'Visit the ancient Shiva temple where the King prayed before major campaigns',
      duration: 15,
      priority: 'medium',
      category: 'spiritual'
    },
    {
      id: 'takmak_tok',
      name: 'Takmak Tok (Execution Cliff)',
      description: 'Stand at the 1,400-foot sheer cliff with breathtaking views of the Konkan coast',
      duration: 20,
      priority: 'medium',
      category: 'scenic'
    },
    {
      id: 'hatti_lake',
      name: 'Hatti Lake (Elephant Tank)',
      description: 'See the royal water reservoir where the royal elephants were bathed',
      duration: 15,
      priority: 'optional',
      category: 'engineering'
    },
    {
      id: 'peth_ruins',
      name: 'Market Ruins (Raigad Peth)',
      description: 'Walk through the ruins of the ancient marketplace — once 200 shops lined these streets',
      duration: 20,
      priority: 'optional',
      category: 'history'
    },
    {
      id: 'hirakani_buruj',
      name: 'Hirakani Buruj (Watch Tower)',
      description: 'Visit the tower named after a brave woman who scaled the cliff to reach her child',
      duration: 25,
      priority: 'optional',
      category: 'architecture'
    },
    {
      id: 'panoramic_view',
      name: 'Panoramic Viewpoint',
      description: 'Enjoy sweeping views of the Sahyadri ranges and the Konkan coastline',
      duration: 15,
      priority: 'medium',
      category: 'scenic'
    },
    {
      id: 'rest_break',
      name: 'Rest & Refreshment',
      description: 'Short break for water and rest at the designated area',
      duration: 10,
      priority: 'optional',
      category: 'break'
    }
  ],

  // Configuration for itinerary logic
  itineraryRules: {
    walkingSpeedMinutes: 7, // Average time between major points (larger fort)
    minimumBreakAfterMinutes: 50, // Add break after 50min of continuous activity
    essentialActivitiesRequired: true
  }
};
