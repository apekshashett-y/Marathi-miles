import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
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
        image: shivneriZunka,
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
        image: "https://images.unsplash.com/photo-1546886819-21840003e654?w=800&auto=format&fit=crop",
        description: "The signature dessert of the Mahabaleshwar region. Freshly plucked local strawberries layered with thick, sweetened cream.",
        places: ["Mapro Garden", "Bagicha Corner"],
        location: "Panchgani-Mahabaleshwar Road",
        price: "150-250"
    },
    {
        id: "makai_pattice",
        name: "Makai (Corn) Pattice",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop",
        description: "Hot, crispy potato and sweet corn patties served with spicy green chutney. Perfect for the misty mountain weather.",
        places: ["Mapro Garden", "Mahabaleshwar Market"],
        location: "Mahabaleshwar",
        price: "80-120"
    },
    {
        id: "pratapgad_pithla",
        name: "Chulivarchya Pithla Bhakri",
        image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=800&auto=format&fit=crop",
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

const SHIVNERI_RESTAURANTS = [
    {
        id: "vedant_hotel",
        name: "Hotel Vedant (Junnar)",
        lat: 19.2051,
        lng: 73.8718,
        rating: 4.4,
        timing: "9 AM - 10 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Vedant+Junnar",
        serves: ["misal", "thali", "zunka", "vadapav"]
    },
    {
        id: "sahyadri_snacks",
        name: "Sahyadri Snacks Centre",
        lat: 19.1982,
        lng: 73.8681,
        rating: 4.2,
        timing: "7 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sahyadri+Snacks+Centre+Junnar",
        serves: ["kandabhaji", "misal", "vadapav"]
    },
    {
        id: "pokket_cafe",
        name: "Pokket Cafe Junnar",
        lat: 19.2105,
        lng: 73.8785,
        rating: 4.5,
        timing: "10 AM - 10 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pokket+Cafe+Junnar",
        serves: ["kandabhaji", "vadapav"]
    },
    {
        id: "hotel_bhushan",
        name: "Hotel Bhushan Udipi",
        lat: 19.2110,
        lng: 73.8810,
        rating: 4.3,
        timing: "8 AM - 9:30 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Bhushan+Junnar",
        serves: ["thali", "misal"]
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
        serves: ["kombdi_vade", "solkadhi"]
    },
    {
        id: "pachad_dhabas",
        name: "Pachad Village Eateries",
        lat: 18.2355,
        lng: 73.4390,
        rating: 4.5,
        timing: "7 AM - 8 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pachad+Village",
        serves: ["ukadiche_modak", "solkadhi"]
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
        serves: ["zunka_bhakar", "matka_dahi", "kanda_bhaji"]
    },
    {
        id: "donje_base",
        name: "Donje Base Eateries",
        lat: 18.3840,
        lng: 73.7850,
        rating: 4.2,
        timing: "7 AM - 9 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Donje+Village",
        serves: ["zunka_bhakar", "matka_dahi"]
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
        serves: ["strawberry_cream", "makai_pattice"]
    },
    {
        id: "pratapgad_base_dhabas",
        name: "Pratapgad Base Eateries",
        lat: 17.9250,
        lng: 73.5700,
        rating: 4.3,
        timing: "7 AM - 7 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pratapgad+Fort+Base",
        serves: ["pratapgad_pithla"]
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
        serves: ["maggi", "vada_pav", "bhutta"]
    },
    {
        id: "kinara_village_dhaba",
        name: "Kinara Village Dhaba",
        lat: 18.7500,
        lng: 73.4100,
        rating: 4.2,
        timing: "8 AM - 11 PM",
        googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kinara+Village+Dhaba",
        serves: ["vada_pav"]
    }
];

function ChangeView({ center, routePoints }) {
    const map = useMap();
    useEffect(() => {
        if (routePoints && routePoints.length > 1) {
            const bounds = L.latLngBounds(routePoints);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
        } else {
            map.setView(center, 14);
        }
    }, [center, routePoints, map]);
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

                        <div className="map-side-panel">
                            <div className="map-header">
                                <h3>Heritage Food Locations</h3>
                                <p>Finding best {selectedFood.name} spots</p>
                            </div>
                            
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
                                    <ChangeView center={mapCenter} routePoints={[]} />
                                </MapContainer>
                            </div>
                            
                            <div className="restaurant-list">
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
                                                <span className="res-dist">{res.directDist} KM away</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Grid View
    return (
        <section className="modern-flavors-section">
            <div className="flavors-header-banner">
                <h1>Famous Cuisine</h1>
                <p>Authentic Maharashtrian Flavors & Delicacies</p>
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
