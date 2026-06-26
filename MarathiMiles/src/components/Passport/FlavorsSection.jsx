import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FlavorsSection.css";

import gavranThali from "../../assets/food/shivneri/gavran_thali.jpeg";
import shivneriZunka from "../../assets/food/shivneri/zunka.jpeg";

import kombdiVadeImg from "../../assets/food/raigad/kombdi_vade.png";
import solkadhiImg from "../../assets/food/raigad/solkadhi.png";

import sinhagadZunkaImg from "../../assets/food/sinhagad/zunka.png";
import sinhagadKandaBhajiImg from "../../assets/food/sinhagad/kanda_bhaji.png";
import matkaDahiImg from "../../assets/food/sinhagad/matka_dahi.png";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SHIVNERI_COORDS = [19.1989, 73.8617];
const RAIGAD_COORDS = [18.2345, 73.4464];
const SINHAGAD_COORDS = [18.3663, 73.7559];
const PRATAPGAD_COORDS = [17.9250, 73.5700];
const LOHAGAD_COORDS = [18.7075, 73.4800];

const SHIVNERI_FOOD = [
    {
        id: "misal",
        name: "Junnar Misal",
        image: "https://images.unsplash.com/photo-1619193100179-af4cc742ed3e?w=600&auto=format&fit=crop&q=60",
        description: "A spicy sprouts curry unique to the Junnar region, known for its distinct black masala (Kala Masala) that fuels trekkers.",
        places: ["Hotel Vedant", "Sahyadri Snacks Centre", "Hotel Bhushan Udipi"],
        location: "Base of Shivneri Fort, Junnar",
        price: "80-120"
    },
    {
        id: "thali",
        name: "Gavran Thali",
        image: gavranThali,
        description: "A complete meal showcasing Junnar's farm-to-table culture, featuring local vegetables, Bhakri, Pithla, and Thecha.",
        places: ["Hotel Vedant", "Hotel Bhushan Udipi"],
        location: "Kalyan - Ahmednagar Hwy, Junnar",
        price: "180-250"
    },
    {
        id: "kandabhaji",
        name: "Kanda Bhaji",
        image: "https://i.pinimg.com/736x/0b/be/78/0bbe78caa1a464770fb8e5d29e2c9e67.jpg",
        description: "Locally known as 'Khekda Bhaji', these crispy, deep-fried onion fritters are a staple at Shivneri fort base stalls during monsoons.",
        places: ["Sahyadri Snacks Centre", "Pokket Cafe Junnar"],
        location: "Shivneri Fort Trek Base Route",
        price: "40-80"
    },
    {
        id: "vadapav",
        name: "Vada Pav",
        image: "https://images.unsplash.com/photo-1769030905851-c0e0a4fe5c51?w=600&auto=format&fit=crop&q=60",
        description: "The iconic street food of Maharashtra, perfected in the local style near historical transit routes. Hot, spicy, and satisfying.",
        places: ["Hotel Vedant", "Sahyadri Snacks", "Pokket Cafe"],
        location: "Junnar City Center",
        price: "20-40"
    },
    {
        id: "zunka",
        name: "Zunka Bhakar",
        image: "https://images.unsplash.com/photo-1626779836859-9976378e91e6?w=800&auto=format&fit=crop",
        description: "A rustic, thick gram flour preparation served with pearl millet bread (Bhakri), representing rural resilience and flavor.",
        places: ["Hotel Vedant", "Local Dhabas"],
        location: "Highway Dhabas, Junnar Outskirts",
        price: "90-150"
    }
];

const RAIGAD_FOOD = [
    {
        id: "kombdi_vade",
        name: "Kombdi Vade",
        image: kombdiVadeImg,
        description: "The quintessential Konkan non-veg feast. Spicy chicken curry served with deep-fried multi-grain bread (Vade).",
        places: ["Hotel Kuber", "Pachad Base Eateries"],
        location: "Raigad Ropeway Base",
        price: "250-350"
    },
    {
        id: "solkadhi",
        name: "Solkadhi",
        image: solkadhiImg,
        description: "A cooling, pink digestive drink made from Kokum and fresh coconut milk. Essential after a spicy coastal meal.",
        places: ["Hotel Kuber", "Local Thali places"],
        location: "Mahad-Pachad Highway",
        price: "40-60"
    },
    {
        id: "ukadiche_modak",
        name: "Ukadiche Modak",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop",
        description: "Steamed rice flour dumplings stuffed with coconut and jaggery, a traditional Maharashtrian sweet.",
        places: ["Pachad Sweets", "Mahad Town"],
        location: "Pachad Village",
        price: "150-200"
    }
];

const SINHAGAD_FOOD = [
    {
        id: "zunka_bhakar",
        name: "Zunka Bhakar",
        image: sinhagadZunkaImg,
        description: "The iconic dish of Sinhagad. A thick, spicy gram-flour curry served with hot Bajra/Jowar flatbread, raw onions, and fiery Thecha.",
        places: ["Base Village Stalls", "Top Fort Stalls"],
        location: "All over Sinhagad Fort",
        price: "80-120"
    },
    {
        id: "matka_dahi",
        name: "Matka Dahi",
        image: matkaDahiImg,
        description: "Fresh, thick, and creamy yogurt set naturally in traditional terracotta clay pots (matkas). The perfect coolant after a steep trek.",
        places: ["Fort Plateau Stalls", "Donje Village"],
        location: "Sinhagad Plateau",
        price: "50-80"
    },
    {
        id: "kanda_bhaji",
        name: "Khekda Bhaji",
        image: sinhagadKandaBhajiImg,
        description: "Deep-fried, ultra-crispy onion fritters best enjoyed with hot cutting chai while looking at the Khadakwasla dam views.",
        places: ["Fort Top Shacks", "Base Trek Start"],
        location: "Sinhagad Viewpoints",
        price: "40-60"
    }
];

const PRATAPGAD_FOOD = [
    {
        id: "strawberry_cream",
        name: "Strawberry Cream",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop",
        description: "The signature dessert of the Mahabaleshwar region. Freshly plucked local strawberries layered with thick, sweetened cream.",
        places: ["Mapro Garden", "Bagicha Corner"],
        location: "Panchgani-Mahabaleshwar Road",
        price: "150-250"
    },
    {
        id: "makai_pattice",
        name: "Makai (Corn) Pattice",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop",
        description: "Hot, crispy potato and sweet corn patties served with spicy green chutney. Perfect for the misty mountain weather.",
        places: ["Mapro Garden", "Mahabaleshwar Market"],
        location: "Mahabaleshwar",
        price: "80-120"
    },
    {
        id: "pratapgad_pithla",
        name: "Chulivarchya Pithla Bhakri",
        image: "https://images.unsplash.com/photo-1626779836859-9976378e91e6?w=800&auto=format&fit=crop",
        description: "Authentic, rustic gram flour curry cooked on a wood-fired mud stove (chul), served hot at the base of the fort.",
        places: ["Pratapgad Base Dhabas", "Afzal Khan Tomb Stalls"],
        location: "Pratapgad Fort Base",
        price: "90-150"
    }
];

const LOHAGAD_FOOD = [
    {
        id: "maggi",
        name: "Hill Station Maggi",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&auto=format&fit=crop",
        description: "Steaming hot, spicy Maggi noodles. A legendary comfort food when trekking through the misty, rainy slopes of Lohagad.",
        places: ["Lohagad Base Dhabas"],
        location: "Lonavala Region",
        price: "40-70"
    },
    {
        id: "vada_pav",
        name: "Lonavala Vada Pav",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop",
        description: "The quintessential Maharashtrian snack. Hot, spicy potato fritters in soft bread, perfect after a long trek.",
        places: ["Lohagad Base Dhabas"],
        location: "Local Street Food",
        price: "20-40"
    },
    {
        id: "bhutta",
        name: "Roasted Bhutta",
        image: "https://images.unsplash.com/photo-1596660608573-00e998c5dfc6?w=800&auto=format&fit=crop",
        description: "Corn on the cob roasted over open coals and rubbed with spicy chili-lime salt, ubiquitous during the monsoons.",
        places: ["Lohagad Base Dhabas"],
        location: "Trek Route",
        price: "30-50"
    }
];

// Curated Restaurant Databases with Distances & Directions from respective Forts
const SHIVNERI_RESTAURANTS = [
    {
        id: "vedant_hotel",
        name: "Hotel Vedant (Junnar)",
        lat: 19.2051,
        lng: 73.8718,
        rating: 4.4,
        timing: "9 AM - 10 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Vedant+Junnar",
        serves: ["misal", "thali", "zunka", "vadapav"],
        distFromFort: "2.1 km from Shivneri Base",
        travelTime: "6 mins by auto / 25 mins walk",
        specialtyDesc: "Authentic family restaurant serving rich Black Masala curry and local organic Thalis.",
        directions: [
            "Exit the Shivneri main parking gate.",
            "Drive straight down Junnar Road for 1.8 km.",
            "Hotel Vedant is on your left, just before the Junnar City Clock Tower."
        ]
    },
    {
        id: "sahyadri_snacks",
        name: "Sahyadri Snacks Centre",
        lat: 19.1982,
        lng: 73.8681,
        rating: 4.2,
        timing: "7 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sahyadri+Snacks+Centre+Junnar",
        serves: ["kandabhaji", "misal", "vadapav"],
        distFromFort: "0.8 km from Shivneri Base",
        travelTime: "2 mins by auto / 10 mins walk",
        specialtyDesc: "Famous post-trek pitstop serving piping hot Kanda Bhaji and spicy Junnar Misal.",
        directions: [
            "Walk down the fort trek trail to the main arch exit.",
            "Walk 500 meters along the fort approach lane.",
            "Sahyadri Snacks is located on the right corner of the main road T-junction."
        ]
    },
    {
        id: "pokket_cafe",
        name: "Pokket Cafe Junnar",
        lat: 19.2105,
        lng: 73.8785,
        rating: 4.5,
        timing: "10 AM - 10 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pokket+Cafe+Junnar",
        serves: ["kandabhaji", "vadapav"],
        distFromFort: "3.2 km from Shivneri Base",
        travelTime: "9 mins by auto",
        specialtyDesc: "Modern café offering quick bites, cold coffee, and fresh vada pavs.",
        directions: [
            "Drive down Shivneri Road for 2 km into Junnar town.",
            "Turn right at the Shivaji Statue Chowk.",
            "Pokket Cafe is on the first floor above the local bank."
        ]
    },
    {
        id: "hotel_bhushan",
        name: "Hotel Bhushan Udipi",
        lat: 19.2110,
        lng: 73.8810,
        rating: 4.3,
        timing: "8 AM - 9:30 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Bhushan+Junnar",
        serves: ["thali", "misal"],
        distFromFort: "3.5 km from Shivneri Base",
        travelTime: "10 mins by auto",
        specialtyDesc: "Popular local eatery serving authentic Maharashtrian breakfast and Thalis.",
        directions: [
            "Take the main town road from the fort entrance parking.",
            "Drive 3.2 km towards Kalyan-Ahmednagar highway intersection.",
            "Hotel Bhushan is located next to the primary bus stand."
        ]
    }
];

const RAIGAD_RESTAURANTS = [
    {
        id: "hotel_kuber",
        name: "Hotel Kuber",
        lat: 18.2380,
        lng: 73.4350,
        rating: 4.3,
        timing: "8 AM - 10 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Kuber+Pachad",
        serves: ["kombdi_vade", "solkadhi"],
        distFromFort: "1.2 km from Raigad Ropeway Base",
        travelTime: "3 mins by auto / 15 mins walk",
        specialtyDesc: "Famous for Konkani styled chicken thalis, fried fish, and fresh Solkadhi.",
        directions: [
            "Exit the Raigad Ropeway lower station exit gate.",
            "Head down Pachad Road for 1.2 km.",
            "Hotel Kuber is the large green building on your right."
        ]
    },
    {
        id: "pachad_dhabas",
        name: "Pachad Village Eateries",
        lat: 18.2355,
        lng: 73.4390,
        rating: 4.5,
        timing: "7 AM - 8 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pachad+Village",
        serves: ["ukadiche_modak", "solkadhi"],
        distFromFort: "0.5 km from Raigad Trek Base",
        travelTime: "6 mins walk",
        specialtyDesc: "Locally cooked Pithla Bhakri and Ukadiche Modak served in mud-stoved village homes.",
        directions: [
            "Walk down from the main Raigad step-path entrance.",
            "Walk 300 meters straight into the Pachad village market lane.",
            "Look for local homes with banners saying 'Chulivarchi Jevan'."
        ]
    }
];

const SINHAGAD_RESTAURANTS = [
    {
        id: "fort_stalls",
        name: "Sinhagad Plateau Stalls",
        lat: 18.3665,
        lng: 73.7555,
        rating: 4.8,
        timing: "6 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sinhagad+Fort+Food+Stalls",
        serves: ["zunka_bhakar", "matka_dahi", "kanda_bhaji"],
        distFromFort: "0 km (Located on the Fort Summit)",
        travelTime: "0 mins (Right on the peak plateau)",
        specialtyDesc: "Authentic wood-fire cooked Pithla Bhakri served with fresh clay-pot Matka Dahi.",
        directions: [
            "Walk past the Tanaji Malusare Memorial on the upper plateau.",
            "Walk 50 meters toward the Sunset Point edge corridor.",
            "A series of traditional food stalls are lined along the cliff edge."
        ]
    },
    {
        id: "donje_base",
        name: "Donje Base Eateries",
        lat: 18.3840,
        lng: 73.7850,
        rating: 4.2,
        timing: "7 AM - 9 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Donje+Village",
        serves: ["zunka_bhakar", "matka_dahi"],
        distFromFort: "9.0 km from Fort Summit (At the base gate)",
        travelTime: "20 mins drive",
        specialtyDesc: "Popular highway dhabas serving spicy Sajji style chicken/mutton and bhakri.",
        directions: [
            "Drive down the winding Sinhagad Ghat road for 9 km.",
            "Pass through the Forest Department toll gate.",
            "Eateries are located on the left side of the main Donje junction."
        ]
    }
];

const PRATAPGAD_RESTAURANTS = [
    {
        id: "mapro_garden",
        name: "Mapro Garden",
        lat: 17.9272,
        lng: 73.7431,
        rating: 4.7,
        timing: "8 AM - 9 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Mapro+Garden+Mahabaleshwar",
        serves: ["strawberry_cream", "makai_pattice"],
        distFromFort: "15 km from Pratapgad Fort Base",
        travelTime: "25 mins drive",
        specialtyDesc: "World famous fresh Strawberry with Cream, wood-fired pizzas, and corn pattice.",
        directions: [
            "Drive down the Pratapgad Ghat road for 7 km to the highway intersection.",
            "Turn left onto Mahabaleshwar road and drive 8 km past the main market.",
            "Mapro Garden is a large, brightly lit garden entrance on the right."
        ]
    },
    {
        id: "pratapgad_base_dhabas",
        name: "Pratapgad Base Eateries",
        lat: 17.9250,
        lng: 73.5700,
        rating: 4.3,
        timing: "7 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pratapgad+Fort+Base",
        serves: ["pratapgad_pithla"],
        distFromFort: "0.2 km from Pratapgad Base Parking",
        travelTime: "3 mins walk",
        specialtyDesc: "Wood-fired Pithla and local Maharashtrian vegetarian thali.",
        directions: [
            "Walk out of the Pratapgad lower parking lot.",
            "Take the step trail towards the Afzal Khan tomb area.",
            "Look for the local shacks with mud stoves under the banyan trees."
        ]
    }
];

const LOHAGAD_RESTAURANTS = [
    {
        id: "lohagad_base_dhabas",
        name: "Lohagad Base Dhabas",
        lat: 18.7075,
        lng: 73.4800,
        rating: 4.5,
        timing: "7 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Lohagad+Fort+Base",
        serves: ["maggi", "vada_pav", "bhutta"],
        distFromFort: "0.3 km from Lohagad Trek Entrance",
        travelTime: "5 mins walk",
        specialtyDesc: "Comforting hill-station Maggi, roasted sweet corn (Bhutta), and hot ginger tea.",
        directions: [
            "Start from the Lohagad trek base gate.",
            "Walk down the slope path for 300 meters towards the parking area.",
            "The base shacks are located along the parking loop."
        ]
    },
    {
        id: "kinara_village_dhaba",
        name: "Kinara Village Dhaba",
        lat: 18.7500,
        lng: 73.4100,
        rating: 4.2,
        timing: "8 AM - 11 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kinara+Village+Dhaba",
        serves: ["vada_pav"],
        distFromFort: "8.5 km from Lohagad Base",
        travelTime: "18 mins drive",
        specialtyDesc: "Traditional Punjabi-Maharashtrian theme dhaba with a rustic rural vibe.",
        directions: [
            "Drive down from Lohagad base road to Pawna Lake road.",
            "Head towards the Mumbai-Pune Old Highway for 8 km.",
            "Kinara Village is located on the main highway corridor near Lonavala."
        ]
    }
];

// Helper components for Leaflet
function ChangeView({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 14);
    }, [center, map]);
    return null;
}

const orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const FlavorsSection = ({ fort }) => {
    const isRaigad = fort?.id === 2;
    const isSinhagad = fort?.id === 3;
    const isPratapgad = fort?.id === 4;
    const isLohagad = fort?.id === 5;
    
    const FOOD_DATA = isLohagad ? LOHAGAD_FOOD : (isPratapgad ? PRATAPGAD_FOOD : (isSinhagad ? SINHAGAD_FOOD : (isRaigad ? RAIGAD_FOOD : SHIVNERI_FOOD)));
    const RESTAURANTS_DATA = isLohagad ? LOHAGAD_RESTAURANTS : (isPratapgad ? PRATAPGAD_RESTAURANTS : (isSinhagad ? SINHAGAD_RESTAURANTS : (isRaigad ? RAIGAD_RESTAURANTS : SHIVNERI_RESTAURANTS)));
    const CURRENT_COORDS = isLohagad ? LOHAGAD_COORDS : (isPratapgad ? PRATAPGAD_COORDS : (isSinhagad ? SINHAGAD_COORDS : (isRaigad ? RAIGAD_COORDS : SHIVNERI_COORDS)));

    const [selectedFood, setSelectedFood] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(CURRENT_COORDS);

    // 🗺️ Panel Tabs: 'directions' | 'map'
    const [activePanelTab, setActivePanelTab] = useState("directions");

    // 🛺 Rickshaw Modal Booking simulation
    const [rickshawModalOpen, setRickshawModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isBookingRickshaw, setIsBookingRickshaw] = useState(false);
    const [bookingSuccessText, setBookingSuccessText] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            }, () => {});
        }
    }, []);

    const handleFoodSelect = (food) => {
        setSelectedFood(food);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const basePoint = userLocation || CURRENT_COORDS;
        const filtered = RESTAURANTS_DATA
            .filter(r => r.serves.includes(food.id))
            .map(r => ({
                ...r,
                directDist: (L.latLng(basePoint).distanceTo(L.latLng([r.lat, r.lng])) / 1000).toFixed(2)
            }))
            .sort((a, b) => a.directDist - b.directDist);
            
        setNearbyRestaurants(filtered);
        if (filtered.length > 0) {
            handleRestaurantSelect(filtered[0]);
        }
    };

    const handleRestaurantSelect = (res) => {
        setSelectedRestaurant(res);
        setMapCenter([res.lat, res.lng]);
    };

    const triggerRickshawBooking = (driver) => {
        setSelectedDriver(driver);
        setIsBookingRickshaw(true);
        setBookingSuccessText("");
        
        setTimeout(() => {
            setIsBookingRickshaw(false);
            setBookingSuccessText(`🛺 Auto Booked! ${driver.name} is arriving at the fort base. Look for rickshaw registration ${driver.reg}. Phone: ${driver.phone}`);
        }, 1500);
    };

    const mockDrivers = [
        { name: "Shankar Bhau", phone: "+91 98450 10293", reg: "MH-14-EF-2018", eta: "4 mins" },
        { name: "Ramdas Kaka", phone: "+91 99210 30219", reg: "MH-14-EG-4932", eta: "7 mins" }
    ];

    if (selectedFood) {
        return (
            <section className="modern-flavors-section">
                <div className="flavors-header">
                    <span className="flavors-eyebrow">CULINARY JOURNEY</span>
                    <h2 className="flavors-title">Taste {fort?.name || "the Heritage"}</h2>
                    <p className="flavors-subtitle">
                        Explore the authentic, local culinary delights that fuel the trekkers and villagers near {fort?.name || "the fort"}.
                    </p>
                </div>
                
                <div className="detail-view-container">
                    <button className="back-to-menu-btn" onClick={() => setSelectedFood(null)}>
                        ← Back to Menu
                    </button>
                    
                    <div className="detail-content-split">
                        {/* Food Description Card */}
                        <div className="large-food-card">
                            <img className="large-food-img" src={selectedFood.image} alt={selectedFood.name} />
                            <div className="large-food-info">
                                <h2>{selectedFood.name}</h2>
                                <p className="food-desc">{selectedFood.description}</p>
                                
                                <div className="famous-places-section">
                                    <span className="places-label">Famous Places:</span>
                                    <div className="places-pills">
                                        {selectedFood.places.map((place, idx) => (
                                            <span className="place-pill" key={idx}>{place}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="location-price-footer" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="location-info">
                                        <span className="loc-icon">📍</span>
                                        <span>{selectedFood.location}</span>
                                    </div>
                                    <div className="price-info">
                                        <span>₹ {selectedFood.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Dining Guide Panel */}
                        <div className="map-side-panel interactive-guide-panel">
                            <div className="map-header">
                                <h3>🍽️ Dining Spot Guide</h3>
                                <p>Navigating from {fort?.name || 'Fort Base'}</p>
                            </div>

                            {/* Navigation Tabs */}
                            <div className="panel-tab-selectors">
                                <button 
                                    className={`panel-tab-btn ${activePanelTab === 'directions' ? 'active' : ''}`}
                                    onClick={() => setActivePanelTab('directions')}
                                >
                                    🚶 How to Reach
                                </button>
                                <button 
                                    className={`panel-tab-btn ${activePanelTab === 'map' ? 'active' : ''}`}
                                    onClick={() => setActivePanelTab('map')}
                                >
                                    🗺️ Live Map
                                </button>
                            </div>
                            
                            {/* Tab Content 1: Step-by-Step Directions */}
                            {activePanelTab === 'directions' && selectedRestaurant && (
                                <div className="tab-directions-content">
                                    <div className="spot-highlights">
                                        <div className="highlight-item">
                                            <span className="highlight-label">📏 DISTANCE FROM FORT</span>
                                            <span className="highlight-value">{selectedRestaurant.distFromFort || "1.5 KM"}</span>
                                        </div>
                                        <div className="highlight-item">
                                            <span className="highlight-label">⏱️ TRAVEL TIME</span>
                                            <span className="highlight-value">{selectedRestaurant.travelTime || "5 mins"}</span>
                                        </div>
                                    </div>

                                    <div className="spot-specialty-card">
                                        <strong>Chef's Note:</strong> {selectedRestaurant.specialtyDesc || "A popular local spot serving freshly prepared delicacies."}
                                    </div>

                                    <div className="directions-steps-list">
                                        <h5>🗺️ Step-by-Step Route</h5>
                                        {selectedRestaurant.directions ? (
                                            selectedRestaurant.directions.map((step, i) => (
                                                <div key={i} className="direction-step-row">
                                                    <span className="step-number">{i + 1}</span>
                                                    <p className="step-text">{step}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-directions">Directions loading from base station...</p>
                                        )}
                                    </div>

                                    <div className="action-buttons-row">
                                        <button 
                                            className="nav-gmaps-btn"
                                            onClick={() => window.open(selectedRestaurant.googleMapsUrl, "_blank")}
                                        >
                                            🧭 Navigate in Google Maps
                                        </button>
                                        <button 
                                            className="book-rickshaw-btn"
                                            onClick={() => setRickshawModalOpen(true)}
                                        >
                                            🛺 Book a Local Auto
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Tab Content 2: Real Leaflet Map */}
                            {activePanelTab === 'map' && (
                                <div className="map-wrapper">
                                    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
                                        <TileLayer
                                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        {userLocation && (
                                            <Marker position={userLocation} icon={userIcon}>
                                                <Popup>Your Current Position</Popup>
                                            </Marker>
                                        )}

                                        {selectedRestaurant && (
                                            <Marker
                                                key={selectedRestaurant.id}
                                                position={[selectedRestaurant.lat, selectedRestaurant.lng]}
                                                icon={orangeIcon}
                                                zIndexOffset={1000}
                                            >
                                                <Popup>
                                                    <div style={{ textAlign: 'center' }}>
                                                        <strong>{selectedRestaurant.name}</strong><br/>
                                                        ⭐ {selectedRestaurant.rating}
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        )}
                                        <ChangeView center={mapCenter} />
                                    </MapContainer>
                                </div>
                            )}
                            
                            {/* Suggestions List (Serves this food item) */}
                            <div className="restaurant-list">
                                <span className="list-eyebrow">Select a Restaurant:</span>
                                {nearbyRestaurants.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No specific spots found nearby.</p>
                                ) : (
                                    nearbyRestaurants.map((res) => (
                                        <div 
                                            key={res.id} 
                                            className={`res-suggestion-card ${selectedRestaurant?.id === res.id ? 'selected' : ''}`}
                                            onClick={() => handleRestaurantSelect(res)}
                                        >
                                            <div className="res-info-main">
                                                <h4>{res.name}</h4>
                                                <div className="res-meta-inline">
                                                    <span>⭐ {res.rating}</span>
                                                    <span>•</span>
                                                    <span>🕒 {res.timing}</span>
                                                </div>
                                                <span className="res-dist">{res.distFromFort || `${res.directDist} KM away`}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Rickshaw Booking Modal */}
                {rickshawModalOpen && (
                    <div className="auto-modal-backdrop" onClick={() => setRickshawModalOpen(false)}>
                        <div className="auto-modal-card" onClick={(e) => e.stopPropagation()}>
                            <button className="auto-modal-close" onClick={() => setRickshawModalOpen(false)}>✕</button>
                            <h3>🛺 Book a Local Auto Ride</h3>
                            <p className="auto-modal-subtitle">Travel directly from the fort base gate to {selectedRestaurant?.name}.</p>
                            
                            <div className="auto-fare-info">
                                <span>Estimated Fare:</span>
                                <strong>₹50 - ₹80</strong>
                            </div>

                            {isBookingRickshaw ? (
                                <div className="auto-booking-loader">
                                    <div className="auto-booking-spinner"></div>
                                    <p>Contacting nearest local driver...</p>
                                </div>
                            ) : bookingSuccessText ? (
                                <div className="auto-booking-success">
                                    <div className="success-badge-icon">✓</div>
                                    <p className="success-main-text">{bookingSuccessText}</p>
                                    <button className="done-auto-btn" onClick={() => setRickshawModalOpen(false)}>Perfect, Thanks!</button>
                                </div>
                            ) : (
                                <div className="auto-drivers-list">
                                    {mockDrivers.map((driver, idx) => (
                                        <div className="auto-driver-card" key={idx}>
                                            <div className="driver-avatar">🛺</div>
                                            <div className="driver-details">
                                                <h4>{driver.name}</h4>
                                                <p className="driver-meta">ETA: {driver.eta} • Reg: {driver.reg}</p>
                                                <p className="driver-phone">📞 {driver.phone}</p>
                                            </div>
                                            <button 
                                                className="confirm-driver-btn" 
                                                onClick={() => triggerRickshawBooking(driver)}
                                            >
                                                Book Auto
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        );
    }

    // Grid View
    return (
        <section className="modern-flavors-section">
            <div className="flavors-header-banner">
                <h1>Famous Cuisine</h1>
                <p>Authentic Maharashtrian Flavors & Delicacies at {fort?.name || "Shivneri Fort"}</p>
            </div>
            
            <div className="flavors-grid-container">
                {FOOD_DATA.map((food) => (
                    <div className="mini-food-card" key={food.id} onClick={() => handleFoodSelect(food)}>
                        <div className="mini-card-img-wrapper">
                            <img src={food.image} alt={food.name} />
                            <div className="mini-card-overlay">
                                <span>Click to View Details</span>
                            </div>
                        </div>
                        <div className="mini-card-body">
                            <h3>{food.name}</h3>
                            <div className="mini-price">₹ {food.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FlavorsSection;
