import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FlavorsSection.css";

import gavranThali from "../../assets/food/shivneri/gavran_thali.jpeg";
import zunka from "../../assets/food/shivneri/zunka.jpeg";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FORT_COORDS = [19.1989, 73.8617]; // Shivneri Fort

const FOOD_DATA = [
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
        image: zunka,
        description: "A rustic, thick gram flour preparation served with pearl millet bread (Bhakri), representing rural resilience and flavor.",
        places: ["Hotel Vedant", "Local Dhabas"],
        location: "Highway Dhabas, Junnar Outskirts",
        price: "90-150"
    }
];

const RESTAURANTS_DATA = [
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

const FlavorsSection = () => {
    const [selectedFood, setSelectedFood] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(FORT_COORDS);

    // Scroll to top when this section mounts
    useEffect(() => {
        window.scrollTo(0, 0);
        
        // Try getting user location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            }, () => {});
        }
    }, []);

    const handleFoodSelect = (food) => {
        setSelectedFood(food);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Find restaurants serving this food
        const basePoint = userLocation || FORT_COORDS;
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
                <div className="flavors-header-banner">
                    <h1>{selectedFood.name}</h1>
                    <p>Authentic Maharashtrian Flavors & Delicacies</p>
                </div>
                
                <div className="detail-view-container">
                    <button className="back-to-menu-btn" onClick={() => setSelectedFood(null)}>
                        ← Back to Menu
                    </button>
                    
                    <div className="detail-content-split">
                        {/* Left Side: Large Food Card */}
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

                        {/* Right Side: Leaflet Map */}
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
