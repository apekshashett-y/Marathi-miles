import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./FlavorsSection.css";

// Import local assets
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
        tagline: "The Fiery Soul of Junnar",
        image: "https://images.unsplash.com/photo-1619193100179-af4cc742ed3e?w=600&auto=format&fit=crop&q=60",
        alt: "Junnar Misal Pav – spicy black masala sprouts curry from Junnar",
        history: "A spicy sprouts curry unique to the Junnar region, known for its distinct black masala (Kala Masala) that fuels trekkers.",
        ingredients: "Sprouted moth beans, Black Masala, Farsan, Lemon, Pav.",
        calories: "480 kcal",
        priceRange: "₹80 - ₹120"
    },
    {
        id: "thali",
        name: "Gavran Thali",
        tagline: "A Royal Rural Feast",
        image: gavranThali,
        alt: "Authentic Gavran Thali – rural Maharashtrian meal",
        history: "A complete meal showcasing Junnar's farm-to-table culture, featuring local vegetables and traditional preparations.",
        ingredients: "Bhakri, Pithla, Thecha, Gavran Chole, Solkadhi.",
        calories: "850 kcal",
        priceRange: "₹180 - ₹250"
    },
    {
        id: "kandabhaji",
        name: "Kanda Bhaji",
        tagline: "Crispy Golden Sahyadri Soul",
        image: "https://i.pinimg.com/736x/0b/be/78/0bbe78caa1a464770fb8e5d29e2c9e67.jpg",
        alt: "Crispy Kanda Bhaji – Shivneri rainy season specialty",
        history: "Locally known as 'Khekda Bhaji', these deep-fried onion fritters are a staple at Shivneri fort base stalls.",
        ingredients: "Sliced onions, Besan, Fresh Green Chilies, Ajwain.",
        calories: "220 kcal",
        priceRange: "₹40 - ₹80"
    },
    {
        id: "vadapav",
        name: "Vada Pav",
        tagline: "The Soul of Maharashtra",
        image: "https://images.unsplash.com/photo-1769030905851-c0e0a4fe5c51?w=600&auto=format&fit=crop&q=60",
        alt: "Traditional Maharashtrian Vada Pav",
        history: "The iconic street food of Maharashtra, perfected in the local style near historical transit routes.",
        ingredients: "Potato Batata Vada, Spicy Chutney, Fresh Pav.",
        calories: "320 kcal",
        priceRange: "₹20 - ₹40"
    },
    {
        id: "zunka",
        name: "Zunka Bhakar",
        tagline: "The Peasant's Pride",
        image: zunka,
        alt: "Zunka Bhakar – rustic gram flour and millet flatbread dish",
        history: "A rustic, thick gram flour preparation served with pearl millet bread (Bhakri), representing rural resilience.",
        ingredients: "Gram flour, Onions, Garlic, Green Chilies, Bajra Bhakri.",
        calories: "450 kcal",
        priceRange: "₹90 - ₹150"
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

const FoodCard = ({ food, onTryClick, isActive }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`food-card-container ${isActive ? 'active-glow' : ''} ${isFlipped ? 'is-flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="food-card-inner"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className="food-card-front">
                    <div className="food-card-image-wrapper">
                        <img
                            src={food.image}
                            alt={food.alt}
                            className="food-card-img-element"
                        />
                        <div className="food-card-name-overlay">
                            <h3>{food.name}</h3>
                            <p className="tagline">{food.tagline}</p>
                        </div>
                        <div className="food-card-hover-overlay">
                            <span className="click-hint">Click to Explore</span>
                        </div>
                    </div>
                </div>

                <div className="food-card-back">
                    <div className="back-content">
                        <h4>Local History</h4>
                        <p>{food.history}</p>
                        <div className="food-details">
                            <div className="detail-item"><strong>Ingredients:</strong> {food.ingredients}</div>
                            <div className="detail-item"><strong>Calories:</strong> {food.calories}</div>
                            <div className="detail-item"><strong>Price:</strong> {food.priceRange}</div>
                        </div>
                        <button
                            className="try-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onTryClick(food);
                            }}
                        >
                            Where to Try Near Fort
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


const FlavorsSection = () => {
    const [selectedFood, setSelectedFood] = useState(null);
    const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [mapCenter, setMapCenter] = useState(FORT_COORDS);
    const [routePoints, setRoutePoints] = useState([]);
    const [routeInfo, setRouteInfo] = useState({ distance: null, duration: null });
    const [isCalculating, setIsCalculating] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        const handleSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setLocationError(null);
        };

        const handleError = (error) => {
            console.error("Geolocation error:", error.message);
            setLocationError(error.code === 1 ? "Permission Denied" : "Location Unavailable");
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { enableHighAccuracy: true });
            const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, { enableHighAccuracy: true });
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setLocationError("Geolocation not supported");
        }
    }, []);

    const fetchRoute = async (start, end) => {
        setIsCalculating(true);
        try {
            const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRoutePoints(coordinates);
                setRouteInfo({
                    distance: (route.distance / 1000).toFixed(2),
                    duration: Math.ceil(route.duration / 60)
                });
            } else {
                setRoutePoints([start, end]);
                setRouteInfo({ distance: (L.latLng(start).distanceTo(end) / 1000).toFixed(2), duration: null });
            }
        } catch (error) {
            console.error("Routing error:", error);
            setRoutePoints([start, end]);
        } finally {
            setIsCalculating(false);
        }
    };

    const handleWhereToTry = async (food) => {
        setSelectedFood(food);

        // Use current user location or default to Fort
        const basePoint = userLocation || FORT_COORDS;

        // Filter restaurants serving this food
        const filtered = RESTAURANTS_DATA
            .filter(r => r.serves.includes(food.id))
            .map(r => ({
                ...r,
                directDist: (L.latLng(basePoint).distanceTo(L.latLng([r.lat, r.lng])) / 1000).toFixed(2)
            }))
            .sort((a, b) => a.directDist - b.directDist);

        const topRestaurants = filtered.slice(0, 4);
        setNearbyRestaurants(topRestaurants);
        setShowPanel(true);

        if (topRestaurants.length > 0) {
            handleRestaurantSelect(topRestaurants[0]);
        }
    };

    const handleRestaurantSelect = async (res) => {
        setSelectedRestaurant(res);
        const baseCoords = userLocation || FORT_COORDS;
        const targetCoords = [res.lat, res.lng];

        setMapCenter(targetCoords);
        await fetchRoute(baseCoords, targetCoords);
    };

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

    return (
        <section className="flavors-section">
            <div className="flavors-container">
                <div className="flavors-left">
                    <div className="section-title-group">
                        <span className="eyebrow">TASTE THE HERITAGE</span>
                        <h2 className="serif-title">Flavors Near Shivneri</h2>
                        <p className="section-intro">Discover authentic local delicacies born in the shadow of the birthplace of the King.</p>
                    </div>
                    <div className="food-grid">
                        {FOOD_DATA.map((food) => (
                            <FoodCard
                                key={food.id}
                                food={food}
                                onTryClick={handleWhereToTry}
                                isActive={selectedFood?.id === food.id}
                            />
                        ))}
                    </div>
                </div>

                <div className="flavors-right">
                    <div className="mini-map-container">
                        <div className="map-header">
                            <div className="header-top">
                                <h3>Heritage Food Locations</h3>
                                {isCalculating && <span className="calculating-badge">Calculating Route...</span>}
                            </div>
                            <p className="map-subtitle">
                                {selectedFood ? `Finding best ${selectedFood.name} spots` : 'Explore Junnar Heritage Flavors'}
                                {locationError && <span className="loc-error"> ({locationError})</span>}
                            </p>
                        </div>

                        <div className="map-panel-wrapper">
                            <div className="map-wrapper">
                                <MapContainer center={FORT_COORDS} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
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
                                                <div className="popup-content">
                                                    <strong>{selectedRestaurant.name}</strong>
                                                    <br />
                                                    <span>Rating: ⭐{selectedRestaurant.rating}</span>
                                                    {routeInfo.distance && (
                                                        <span className="route-stat">{routeInfo.distance} KM away</span>
                                                    )}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {routePoints.length > 0 && (
                                        <Polyline
                                            positions={routePoints}
                                            color="#e67e22"
                                            weight={5}
                                            opacity={0.8}
                                            lineJoin="round"
                                        />
                                    )}

                                    <ChangeView center={mapCenter} routePoints={routePoints} />
                                </MapContainer>
                            </div>

                            <AnimatePresence>
                                {showPanel && (
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                        className="restaurant-panel"
                                    >
                                        <div className="panel-header">
                                            <h4>{selectedFood?.name} Spots Near Fort</h4>
                                            <button className="close-panel" onClick={() => setShowPanel(false)}>✕</button>
                                        </div>
                                        <div className="restaurant-suggestions">
                                            {nearbyRestaurants.length === 0 ? (
                                                <p style={{ textAlign: 'center', color: '#8b5a2b', padding: '20px 0' }}>
                                                    No specific spots found — try any local dhaba near Junnar!
                                                </p>
                                            ) : nearbyRestaurants.map((res, index) => {
                                                const isSelected = selectedRestaurant?.id === res.id;
                                                return (
                                                    <div
                                                        key={res.id}
                                                        className={`res-suggestion-card ${index === 0 ? 'recommended' : ''} ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleRestaurantSelect(res)}
                                                    >
                                                        {index === 0 && <span className="rec-badge">Best Match</span>}
                                                        <div className="res-info-main">
                                                            <div>
                                                                <h4>{res.name}</h4>
                                                                <div className="res-meta-inline">
                                                                    <span>⭐ {res.rating}</span>
                                                                    <span>•</span>
                                                                    <span>🕒 {res.timing}</span>
                                                                </div>
                                                            </div>
                                                            <span className="res-dist">
                                                                {isSelected && routeInfo.distance ? `${routeInfo.distance} KM` : `${res.directDist} KM`}
                                                            </span>
                                                        </div>

                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                className="selected-res-actions"
                                                            >
                                                                {routeInfo.duration && (
                                                                    <span className="travel-time">🕒 Estimated: {routeInfo.duration} mins drive</span>
                                                                )}
                                                                <a
                                                                    href={res.googleMapsUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="gmaps-btn"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    Open in Google Maps
                                                                </a>
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlavorsSection;
