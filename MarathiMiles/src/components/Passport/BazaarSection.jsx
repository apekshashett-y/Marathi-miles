import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BazaarSection.css";

// ── Asset imports ─────────────────────────────────────────────────────────────
import shivajiIdol from "../../assets/bazaar/shivaji_idol.png";
import kolhapuriImg from "../../assets/bazaar/kolhapuri_chappals.png";
import warliImg from "../../assets/bazaar/warli_painting.png";
import honeyImg from "../../assets/bazaar/wild_honey.png";
import fortModelImg from "../../assets/bazaar/fort_miniature.png";

// Raigad Assets
import kokumImg from "../../assets/bazaar/kokum.png";
import cashewsImg from "../../assets/bazaar/cashews.png";
import spicesImg from "../../assets/bazaar/spices.png";
import copperImg from "../../assets/bazaar/copper.png";

// Sinhagad Assets
import walkingStickImg from "../../assets/bazaar/sinhagad/walking_stick.png";
const berriesImg = "https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=800&auto=format&fit=crop";
const clayPotImg = "https://images.unsplash.com/photo-1610705121404-b903e1c6b5cc?w=800&auto=format&fit=crop";
const sinhagadSpicesImg = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop";

// Pratapgad Assets (Unsplash)
const strawberryImg = "https://images.unsplash.com/photo-1518110924610-1845eb525e98?w=800&auto=format&fit=crop";
const pratapgadHoneyImg = "https://images.unsplash.com/photo-1587049352847-4d4b126a61b5?w=800&auto=format&fit=crop";
const woodenToyImg = "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop";
const maproCrushImg = "https://images.unsplash.com/photo-1597500913936-e82a6abde05b?w=800&auto=format&fit=crop";

// Lohagad Assets (Unsplash)
const chikkiImg = "https://images.unsplash.com/photo-1582285145749-e588820bd680?w=800&auto=format&fit=crop"; // Better chikki/food img
const fudgeImg = "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop";
const trekGearImg = "https://images.unsplash.com/photo-1515555230216-82228b88ea98?w=800&auto=format&fit=crop";
const monsoonCornImg = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop";

// ── Fix Leaflet default marker icons ──────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ── Constants ─────────────────────────────────────────────────────────────────
const FORT_COORDS = { lat: 19.1923, lng: 73.8638 };
const MAP_CENTER = [19.2010, 73.8710]; // mid-point overview

// ── Market definitions ────────────────────────────────────────────────────────
const SHIVNERI_MARKETS = {
    shivneri_base: {
        id: "shivneri_base",
        name: "Shivneri Base Market",
        lat: 19.2006,
        lng: 73.8746,
    },
    junnar_weekly: {
        id: "junnar_weekly",
        name: "Junnar Weekly Bazaar",
        lat: 19.2095,
        lng: 73.8782,
    },
    junnar_main: {
        id: "junnar_main",
        name: "Junnar Main Market Road",
        lat: 19.2080,
        lng: 73.8755,
    },
};

const RAIGAD_MARKETS = {
    raigad_base: {
        id: "raigad_base",
        name: "Ropeway Base Bazaar",
        lat: 18.2385,
        lng: 73.4350,
    },
    mahad_main: {
        id: "mahad_main",
        name: "Mahad Town Market",
        lat: 18.0820,
        lng: 73.4226,
    },
    pachad_village: {
        id: "pachad_village",
        name: "Pachad Artisan Village",
        lat: 18.2350,
        lng: 73.4390,
    },
};

const SINHAGAD_MARKETS = {
    sinhagad_base: {
        id: "sinhagad_base",
        name: "Sinhagad Base Market",
        lat: 18.3663,
        lng: 73.7559,
    },
    khadakwasla_stalls: {
        id: "khadakwasla_stalls",
        name: "Khadakwasla Dam Stalls",
        lat: 18.4313,
        lng: 73.7667,
    },
    donje_village: {
        id: "donje_village",
        name: "Donje Phata",
        lat: 18.3840,
        lng: 73.7850,
    },
};

const PRATAPGAD_MARKETS = {
    mahabaleshwar_market: {
        id: "mahabaleshwar_market",
        name: "Mahabaleshwar Main Market",
        lat: 17.9237,
        lng: 73.6558,
    },
    mapro_garden: {
        id: "mapro_garden",
        name: "Mapro Garden Market",
        lat: 17.9272,
        lng: 73.7431,
    },
    pratapgad_base: {
        id: "pratapgad_base",
        name: "Pratapgad Base Stalls",
        lat: 17.9250,
        lng: 73.5700,
    },
};

const LOHAGAD_MARKETS = {
    lonavala_market: {
        id: "lonavala_market",
        name: "Lonavala Main Market",
        lat: 18.7557,
        lng: 73.4061,
    },
    lohagad_base: {
        id: "lohagad_base",
        name: "Lohagad Wadi Base Village",
        lat: 18.7075,
        lng: 73.4800,
    },
};

// ── Build Google Maps DIRECTIONS URL (Fort → Market via lat/lng) ──────────────
function buildGMapsUrl(market, fortCoords) {
    return (
        `https://www.google.com/maps/dir/?api=1` +
        `&destination=${market.lat},${market.lng}` +
        `&travelmode=driving`
    );
}

// ── Haversine distance in km ──────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
}

// ── Travel time estimate at 30 km/h ──────────────────────────────────────────
function travelMinutes(distKm) {
    return Math.ceil((parseFloat(distKm) / 30) * 60);
}

// ── Product data ──────────────────────────────────────────────────────────────
const SHIVNERI_PRODUCTS = [
    {
        id: "shivaji_idol",
        name: "Shivaji Maharaj Miniature Idol",
        category: "Fort Souvenirs",
        description:
            "Cast in traditional Panchdhatu (five-metal alloy) by Junnar artisans, this miniature idol depicts Chhatrapati Shivaji Maharaj in his Abhishek pose — the moment of royal coronation at Raigad Fort in 1674. Each piece is hand-engraved with intricate Maratha battle motifs and comes wrapped in saffron cloth, a colour sacred to the Swarajya legacy.",
        priceRange: "₹450 – ₹1,200",
        priceMin: 450, priceMax: 1200,
        nearestMarket: "shivneri_base",
        artisanInfo: "Made by Dnyaneshwar Kale, a 3rd-generation brass sculptor whose family has crafted temple idols in Junnar for over 70 years.",
        image: shivajiIdol,
    },
    {
        id: "kolhapuri_chappals",
        name: "Kolhapuri Chappals",
        category: "Traditional Items",
        description:
            "Handstitched from single-piece vegetable-tanned leather following the medieval Kolhapuri craft tradition, these sandals carry the hallmark of Maharashtrian artisan guilds. Each pair uses naturally dyed leather — free of synthetic chemicals — and is shaped directly on a wooden last, ensuring a fit that softens perfectly with wear. A registered GI (Geographical Indication) craft of Maharashtra.",
        priceRange: "₹600 – ₹1,800",
        priceMin: 600, priceMax: 1800,
        nearestMarket: "junnar_weekly",
        artisanInfo: "Sourced from Kolhapuri craft cooperatives represented at the Junnar Weekly Bazaar every Tuesday.",
        image: kolhapuriImg,
    },
    {
        id: "warli_painting",
        name: "Warli Art Painting",
        category: "Handicrafts",
        description:
            "Warli painting is among India's oldest surviving tribal art forms, practiced by the Warli tribe of the Sahyadri foothills since at least the 10th century CE. Using rice paste on handmade cloth, these paintings encode stories of harvests, marriages, and forest spirits through geometric symbols — circles for the sun, triangles for mountains, and spirals for the cyclical nature of life.",
        priceRange: "₹300 – ₹1,500",
        priceMin: 300, priceMax: 1500,
        nearestMarket: "junnar_main",
        artisanInfo: "Painted by the Warli Women's Self-Help Cooperative based in Ambivali village, 12 km from Shivneri Fort.",
        image: warliImg,
    },
    {
        id: "wild_honey",
        name: "Local Shivneri Wild Honey",
        category: "Local Food Products",
        description:
            "Harvested from rock-bee (Apis dorsata) colonies that nest in the Sahyadri limestone cliffs surrounding Shivneri Fort, this raw forest honey is entirely unprocessed. The bees forage on Karvi, Hirda, and wild turmeric blossoms unique to the Junnar hill ecosystem, giving the honey its distinctive amber colour and medicinal bitterness.",
        priceRange: "₹400 – ₹900",
        priceMin: 400, priceMax: 900,
        nearestMarket: "shivneri_base",
        artisanInfo: "Collected by Mangal Patil and her cooperative of 12 women honey-hunters from Narayangaon taluka.",
        image: honeyImg,
    },
    {
        id: "fort_miniature",
        name: "Shivneri Fort Miniature Model",
        category: "Fort Souvenirs",
        description:
            "Sculpted from reinforced red laterite clay — the same geological material as Shivneri's original bastions — this scale replica faithfully reproduces the fort's Maha Darwaja (main gateway), watch towers, water cisterns, and Shivaji's birth chamber. Each model is kiln-fired and hand-painted by architectural craftsmen from Junnar.",
        priceRange: "₹600 – ₹2,000",
        priceMin: 600, priceMax: 2000,
        nearestMarket: "shivneri_base",
        artisanInfo: "Crafted by Ravi Shinde, a self-taught architectural model maker who has been recreating Deccan forts for 15 years.",
        image: fortModelImg,
    },
];

const RAIGAD_PRODUCTS = [
    {
        id: "kokum_agal",
        name: "Kokum Agal (Concentrate)",
        category: "Local Food Products",
        description:
            "A pure, unadulterated concentrate made from sun-dried Kokum (Garcinia indica) sourced directly from Konkan farms. Known for its cooling properties and distinct tangy flavor, it is the essential base for authentic Solkadhi. No artificial colors or preservatives.",
        priceRange: "₹150 – ₹300",
        priceMin: 150, priceMax: 300,
        nearestMarket: "mahad_main",
        artisanInfo: "Sourced from local farmers' cooperatives in the Mahad and Poladpur regions.",
        image: kokumImg,
    },
    {
        id: "konkan_cashews",
        name: "Premium Raw Cashews",
        category: "Local Food Products",
        description:
            "Fresh, whole raw cashew nuts harvested from the laterite soil orchards of the Konkan belt near Raigad. These cashews are known for their rich buttery taste, large size, and high nutritional value. Perfect for traditional Indian sweets or healthy snacking.",
        priceRange: "₹800 – ₹1,500/kg",
        priceMin: 800, priceMax: 1500,
        nearestMarket: "raigad_base",
        artisanInfo: "Direct from the orchards of Konkan coast cashew growers.",
        image: cashewsImg,
    },
    {
        id: "ghati_masala",
        name: "Traditional Ghati Masala",
        category: "Local Food Products",
        description:
            "A fiery, flavorful spice blend central to rural Maharashtrian cooking. Made by pounding over 15 distinct spices along with dried red chilies, this masala provides the authentic heat and deep red color required for Konkani curries like Kombdi Vade.",
        priceRange: "₹200 – ₹500",
        priceMin: 200, priceMax: 500,
        nearestMarket: "mahad_main",
        artisanInfo: "Hand-pounded by village women's self-help groups (Bachat Gat) in Pachad.",
        image: spicesImg,
    },
    {
        id: "copper_lota",
        name: "Engraved Copper Artifacts",
        category: "Handicrafts",
        description:
            "Traditional copper and brass water jugs (lota) and tumblers, meticulously hammered and engraved with Maratha martial motifs. Pachad village has been home to metal-smiths since the time of Shivaji Maharaj, when they forged weapons and armor for the Raigad garrison.",
        priceRange: "₹500 – ₹2,500",
        priceMin: 500, priceMax: 2500,
        nearestMarket: "pachad_village",
        artisanInfo: "Crafted by the Tambat (coppersmith) community of Pachad village.",
        image: copperImg,
    },
];

const SINHAGAD_PRODUCTS = [
    {
        id: "walking_stick",
        name: "Carved Wooden Trekking Pole",
        category: "Handicrafts",
        description: "Essential for the steep climb up Sinhagad, these sturdy walking sticks are hand-carved from local bamboo and teakwood by the base villagers.",
        priceRange: "₹50 – ₹150",
        priceMin: 50, priceMax: 150,
        nearestMarket: "sinhagad_base",
        artisanInfo: "Carved by local youth from Donje and Atkarwadi villages.",
        image: walkingStickImg,
    },
    {
        id: "karvanda",
        name: "Wild Karvanda Berries",
        category: "Local Food Products",
        description: "Known as the 'black grapes of Konkan', these tart, wild mountain berries are harvested by locals from the thorny bushes of the Sahyadris.",
        priceRange: "₹30 – ₹60/basket",
        priceMin: 30, priceMax: 60,
        nearestMarket: "sinhagad_base",
        artisanInfo: "Foraged daily from the slopes of Sinhagad.",
        image: berriesImg,
    },
    {
        id: "clay_matka",
        name: "Terracotta Matka (Clay Pot)",
        category: "Handicrafts",
        description: "The traditional earthen pots used to set the famous Sinhagad Matka Dahi. They keep the curd thick, creamy, and cool even in summer.",
        priceRange: "₹100 – ₹250",
        priceMin: 100, priceMax: 250,
        nearestMarket: "donje_village",
        artisanInfo: "Hand-spun by potters (Kumbhars) in nearby Donje village.",
        image: clayPotImg,
    },
    {
        id: "pitla_mix",
        name: "Instant Pitla Mix",
        category: "Local Food Products",
        description: "A ready-to-cook mix of roasted gram flour and traditional spices, allowing you to recreate the famous Sinhagad Pitla at home.",
        priceRange: "₹80 – ₹150",
        priceMin: 80, priceMax: 150,
        nearestMarket: "khadakwasla_stalls",
        artisanInfo: "Prepared by local women's cooperatives (Bachat Gat).",
        image: sinhagadSpicesImg,
    },
];

const PRATAPGAD_PRODUCTS = [
    {
        id: "strawberries",
        name: "Fresh Mahabaleshwar Strawberries",
        category: "Local Food Products",
        description: "Juicy, sweet, and freshly plucked from the local farms of the Sahyadri mountains near Pratapgad.",
        priceRange: "₹150 – ₹300/box",
        priceMin: 150, priceMax: 300,
        nearestMarket: "mahabaleshwar_market",
        artisanInfo: "Harvested by local farmers of Mahabaleshwar.",
        image: strawberryImg,
    },
    {
        id: "mapro_syrup",
        name: "Strawberry Crush & Fruit Syrups",
        category: "Local Food Products",
        description: "The legendary Mapro fruit crushes and jams. A must-buy souvenir from the region.",
        priceRange: "₹200 – ₹450",
        priceMin: 200, priceMax: 450,
        nearestMarket: "mapro_garden",
        artisanInfo: "Produced locally in the Panchgani-Mahabaleshwar belt.",
        image: maproCrushImg,
    },
    {
        id: "wooden_toys",
        name: "Handcrafted Wooden Toys",
        category: "Handicrafts",
        description: "Colorful, traditional wooden toys and artifacts carved out of lightweight local wood.",
        priceRange: "₹100 – ₹500",
        priceMin: 100, priceMax: 500,
        nearestMarket: "mahabaleshwar_market",
        artisanInfo: "Crafted by skilled woodworkers of Satara district.",
        image: woodenToyImg,
    },
    {
        id: "forest_honey",
        name: "Pure Sahyadri Forest Honey",
        category: "Local Food Products",
        description: "Thick, dark, and rich in medicinal properties, extracted from the deep forests surrounding Pratapgad.",
        priceRange: "₹350 – ₹600",
        priceMin: 350, priceMax: 600,
        nearestMarket: "pratapgad_base",
        artisanInfo: "Foraged by local tribal communities.",
        image: pratapgadHoneyImg,
    },
];

const LOHAGAD_PRODUCTS = [
    {
        id: "lonavala_chikki",
        name: "Famous Lonavala Chikki",
        category: "Local Food Products",
        description: "The iconic sweet made from jaggery and roasted nuts. A staple buy when visiting Lohagad and Lonavala.",
        priceRange: "₹200 – ₹400/kg",
        priceMin: 200, priceMax: 400,
        nearestMarket: "lonavala_market",
        artisanInfo: "Made by traditional sweet makers like Maganlal.",
        image: chikkiImg,
    },
    {
        id: "chocolate_fudge",
        name: "Walnut Chocolate Fudge",
        category: "Local Food Products",
        description: "Rich, dense chocolate fudge packed with walnuts, available extensively in the Lonavala market.",
        priceRange: "₹300 – ₹600/box",
        priceMin: 300, priceMax: 600,
        nearestMarket: "lonavala_market",
        artisanInfo: "Produced by local confectioners like Cooper's.",
        image: fudgeImg,
    },
    {
        id: "monsoon_corn",
        name: "Roasted Monsoon Corn (Bhutta)",
        category: "Local Food Products",
        description: "Hot, fire-roasted corn seasoned with lime and chili powder, sold by villagers along the trek route.",
        priceRange: "₹30 – ₹50",
        priceMin: 30, priceMax: 50,
        nearestMarket: "lohagad_base",
        artisanInfo: "Sold by local villagers from Lohagad Wadi.",
        image: monsoonCornImg,
    },
    {
        id: "trekking_gear",
        name: "Monsoon Trekking Gear",
        category: "Traditional Items",
        description: "Windcheaters, sturdy wooden sticks, and monsoon wear essential for safely scaling the fort.",
        priceRange: "₹100 – ₹500",
        priceMin: 100, priceMax: 500,
        nearestMarket: "lohagad_base",
        artisanInfo: "Local vendors catering to thousands of weekend trekkers.",
        image: trekGearImg,
    },
];

// ── Budget items ──────────────────────────────────────────────────────────────
const SHIVNERI_BUDGET_ITEMS = [
    { name: "Small Warli Bookmark", category: "Handicrafts", price: 80 },
    { name: "Wild Honey Sample Jar (100g)", category: "Local Food Products", price: 150 },
    { name: "Warli Art Card Set (6 cards)", category: "Handicrafts", price: 200 },
    { name: "Gavran Masala Spice Pack", category: "Local Food Products", price: 220 },
    { name: "Warli Art Painting (A5)", category: "Handicrafts", price: 350 },
    { name: "Wild Honey (250g)", category: "Local Food Products", price: 400 },
    { name: "Shivaji Idol – Small", category: "Fort Souvenirs", price: 450 },
    { name: "Kolhapuri Chappals – Basic", category: "Traditional Items", price: 600 },
    { name: "Fort Miniature – Small", category: "Fort Souvenirs", price: 650 },
    { name: "Shivaji Idol – Medium", category: "Fort Souvenirs", price: 850 },
    { name: "Warli Art Painting (A3)", category: "Handicrafts", price: 900 },
    { name: "Kolhapuri Chappals – Premium", category: "Traditional Items", price: 1200 },
    { name: "Warli Art Painting (A2 Framed)", category: "Handicrafts", price: 1400 },
    { name: "Fort Miniature – Large", category: "Fort Souvenirs", price: 1500 },
    { name: "Kolhapuri Chappals – Handmade", category: "Traditional Items", price: 1800 },
];

const RAIGAD_BUDGET_ITEMS = [
    { name: "Kokum Agal (250ml)", category: "Local Food Products", price: 150 },
    { name: "Spicy Ghati Masala (100g)", category: "Local Food Products", price: 200 },
    { name: "Konkan Cashews (250g)", category: "Local Food Products", price: 350 },
    { name: "Small Copper Tumbler", category: "Handicrafts", price: 500 },
    { name: "Premium Raw Cashews (500g)", category: "Local Food Products", price: 750 },
    { name: "Engraved Copper Jug", category: "Handicrafts", price: 1500 },
];

const SINHAGAD_BUDGET_ITEMS = [
    { name: "Karvanda Basket", category: "Local Food Products", price: 50 },
    { name: "Wooden Walking Stick", category: "Handicrafts", price: 80 },
    { name: "Instant Pitla Mix", category: "Local Food Products", price: 100 },
    { name: "Small Clay Matka", category: "Handicrafts", price: 150 },
];

const PRATAPGAD_BUDGET_ITEMS = [
    { name: "Fresh Strawberries (Small)", category: "Local Food Products", price: 150 },
    { name: "Strawberry Jelly Sweets", category: "Local Food Products", price: 80 },
    { name: "Small Wooden Top (Bhvra)", category: "Handicrafts", price: 50 },
    { name: "Keychains & Fort Magnets", category: "Fort Souvenirs", price: 40 },
];

const LOHAGAD_BUDGET_ITEMS = [
    { name: "Peanut Chikki Slab", category: "Local Food Products", price: 50 },
    { name: "Trekking Stick", category: "Handicrafts", price: 60 },
    { name: "Roasted Corn (Bhutta)", category: "Local Food Products", price: 30 },
    { name: "Rain Poncho", category: "Traditional Items", price: 100 },
];

// ── Artisans ──────────────────────────────────────────────────────────────────
const SHIVNERI_ARTISANS = [
    {
        id: "savita",
        name: "Savita Jadhav",
        craft: "Warli Tribal Art",
        experience: 18,
        location: "Ambivali village, Junnar",
        description:
            "A founding member of the Warli Women's Self-Help Cooperative, Savita learned painting from her mother at age 9. Her works are displayed at the Tribal Research Institute, Pune. She uses only rice paste and charcoal on hand-woven cloth.",
        avatar: "🎨", color: "#c0392b",
    },
    {
        id: "dnyaneshwar",
        name: "Dnyaneshwar Kale",
        craft: "Brass & Panchdhatu Sculpting",
        experience: 35,
        location: "Junnar town, craft quarter",
        description:
            "Third-generation metal sculptor whose grandfather supplied temple idols to the Lenyadri Buddhist caves complex. Dnyaneshwar uses traditional lost-wax casting (cire perdue) to create Shivaji idols and Maratha warrior figurines.",
        avatar: "⚒️", color: "#d4a017",
    },
    {
        id: "mangal",
        name: "Mangal Patil",
        craft: "Wild Honey Harvesting & Bamboo Craft",
        experience: 22,
        location: "Narayangaon taluka, Junnar",
        description:
            "A certified forest honey harvester licensed by the Maharashtra Forest Department, Mangal leads 12 women who sustainably harvest rock-bee honey from the Sahyadri cliffs without disturbing the colony.",
        avatar: "🍯", color: "#2ecc71",
    },
];

const RAIGAD_ARTISANS = [
    {
        id: "tambat_ali",
        name: "Pachad Tambat Community",
        craft: "Copper & Brass Forging",
        experience: "Generations",
        location: "Pachad village, base of Raigad",
        description:
            "The traditional coppersmiths (Tambats) of Pachad trace their lineage back to the royal armourers of Shivaji's army. Today, they create beautiful etched copper vessels using age-old mathar-kaam (hammering) techniques.",
        avatar: "⚒️", color: "#d35400",
    },
    {
        id: "konkan_farmers",
        name: "Konkan Cashew & Kokum Growers",
        craft: "Organic Farming",
        experience: 25,
        location: "Mahad and Poladpur",
        description:
            "Local farmer cooperatives specializing in native crops. They harvest wild kokum and process cashew nuts using traditional roasting methods that preserve the natural oils and rich taste of the Konkan soil.",
        avatar: "🌿", color: "#27ae60",
    },
];

const SINHAGAD_ARTISANS = [
    {
        id: "donje_potters",
        name: "Donje Kumbhar Ali",
        craft: "Terracotta Pottery",
        experience: "Generations",
        location: "Donje Village",
        description: "The traditional potters who supply the thousands of clay pots required daily for Sinhagad's iconic Matka Dahi.",
        avatar: "🏺", color: "#d35400",
    },
    {
        id: "atkarwadi_woodworkers",
        name: "Atkarwadi Youth",
        craft: "Bamboo & Wood Carving",
        experience: 5,
        location: "Sinhagad Base",
        description: "Local youth who sustainably source and carve the trekking sticks sold to thousands of hikers ascending the fort every weekend.",
        avatar: "🪓", color: "#8e44ad",
    },
];

const PRATAPGAD_ARTISANS = [
    {
        id: "mahabaleshwar_farmers",
        name: "Strawberry Farmers",
        craft: "Berry Cultivation",
        experience: "Generations",
        location: "Mahabaleshwar Hills",
        description: "The hardworking local farmers who cultivate the legendary sweet strawberries of Mahabaleshwar.",
        avatar: "🍓", color: "#e74c3c",
    },
    {
        id: "satara_woodworkers",
        name: "Satara Wood Crafters",
        craft: "Wooden Toys & Handicrafts",
        experience: 15,
        location: "Mahabaleshwar Market",
        description: "Artisans carving vibrant and safe wooden toys using traditional tools and lightweight wood.",
        avatar: "🪵", color: "#d35400",
    },
];

const LOHAGAD_ARTISANS = [
    {
        id: "lonavala_chikki_makers",
        name: "Lonavala Chikki Makers",
        craft: "Traditional Sweets",
        experience: "Over 100 years",
        location: "Lonavala Market",
        description: "Families that have been producing the famous crunchy nut and jaggery brittle for generations.",
        avatar: "🥜", color: "#f39c12",
    },
    {
        id: "lohagad_wadi_villagers",
        name: "Lohagad Wadi Villagers",
        craft: "Monsoon Hospitality",
        experience: "Decades",
        location: "Fort Base Village",
        description: "Locals who set up seasonal stalls to provide hot food and essential trekking gear to monsoon hikers.",
        avatar: "🏕️", color: "#27ae60",
    },
];

const CATEGORIES = ["All", "Handicrafts", "Fort Souvenirs", "Local Food Products", "Traditional Items"];

// ── Custom Leaflet Icons ──────────────────────────────────────────────────────
const makeColorIcon = (color) =>
    new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

const ICON_FORT = makeColorIcon("red");
const ICON_ACTIVE = makeColorIcon("orange");
const ICON_HOVER = makeColorIcon("gold");
const ICON_DEFAULT = makeColorIcon("grey");

// ── MapController: flyTo + route polyline ─────────────────────────────────────
function MapController({ activeMarket, showRoute, showAll }) {
    const map = useMap();

    useEffect(() => {
        if (showAll || (!activeMarket && !showRoute)) {
            map.flyTo(MAP_CENTER, 13, { duration: 1.0 });
        } else if (activeMarket) {
            // fly to midpoint between fort and market for a good view of the route
            const midLat = (FORT_COORDS.lat + activeMarket.lat) / 2;
            const midLng = (FORT_COORDS.lng + activeMarket.lng) / 2;
            map.flyTo([midLat, midLng], 14, { duration: 1.2 });
        }
    }, [activeMarket, showRoute, showAll, map]);

    return null;
}

// ── Google Maps button with "Opening…" tooltip ────────────────────────────────
function GMapsButton({ market, fortCoords, className = "detail-gmaps-btn" }) {
    const [tooltip, setTooltip] = useState(false);
    const timerRef = useRef(null);
    const url = buildGMapsUrl(market, fortCoords);

    const handleClick = (e) => {
        e.preventDefault();
        setTooltip(true);
        timerRef.current = setTimeout(() => {
            setTooltip(false);
            window.open(url, "_blank", "noopener,noreferrer");
        }, 1200);
    };

    useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
        <div className="gmaps-btn-wrap">
            {tooltip && (
                <div className="gmaps-tooltip">
                    🗺️ Opening live navigation…
                </div>
            )}
            <a
                href={url}
                className={className}
                onClick={handleClick}
                target="_blank"
                rel="noopener noreferrer"
            >
                Open in Google Maps →
            </a>
        </div>
    );
}

// ── BudgetPlanner ─────────────────────────────────────────────────────────────
function BudgetPlanner({ items }) {
    const [budget, setBudget] = useState(2000);
    const affordable = items.filter((i) => i.price <= budget).sort((a, b) => a.price - b.price);
    let total = 0;
    const selected = [];
    for (const item of affordable) {
        if (total + item.price <= budget) { selected.push(item); total += item.price; }
    }
    const remaining = budget - total;

    return (
        <div className="budget-planner">
            <div className="budget-planner-header">
                <span className="budget-icon">₹</span>
                <div>
                    <h3>Plan Your Souvenir Budget</h3>
                    <p>Slide to set your budget and get personalised shopping recommendations.</p>
                </div>
            </div>
            <div className="budget-slider-row">
                <label>Your Budget:</label>
                <span className="budget-value">₹{budget.toLocaleString("en-IN")}</span>
            </div>
            <input type="range" min={500} max={5000} step={50} value={budget}
                onChange={(e) => setBudget(Number(e.target.value))} className="budget-slider" />
            <div className="budget-range-labels"><span>₹500</span><span>₹5,000</span></div>
            <div className="budget-results">
                <h4 className="budget-results-title">Recommended Items ({selected.length})</h4>
                {selected.length === 0
                    ? <p className="no-items-msg">Increase budget to see recommendations.</p>
                    : <ul className="budget-item-list">
                        {selected.map((item, i) => (
                            <li key={i} className="budget-item-row">
                                <div>
                                    <span className="budget-item-name">{item.name}</span>
                                    <span className="budget-item-cat">{item.category}</span>
                                </div>
                                <span className="budget-item-price">₹{item.price}</span>
                            </li>
                        ))}
                    </ul>
                }
                <div className="budget-summary">
                    <div className="budget-summary-row"><span>Total:</span><span className="total-val">₹{total.toLocaleString("en-IN")}</span></div>
                    <div className="budget-summary-row"><span>Remaining:</span><span className="remaining-val">₹{remaining.toLocaleString("en-IN")}</span></div>
                </div>
                {remaining >= 0 && (
                    <div className="budget-tip">
                        🎉 You still have ₹{remaining.toLocaleString("en-IN")} left for small snacks or add-ons!
                    </div>
                )}
            </div>
        </div>
    );
}

// ── ProductCard ───────────────────────────────────────────────────────────────
function ProductCard({ product, isActive, isHovered, onClick, onMouseEnter, onMouseLeave, markets }) {
    const market = markets[product.nearestMarket];
    return (
        <div
            className={`bazaar-card ${isActive ? "bazaar-card--active" : ""} ${isHovered ? "bazaar-card--hovered" : ""}`}
            onClick={() => onClick(product)}
            onMouseEnter={() => onMouseEnter(product)}
            onMouseLeave={onMouseLeave}
        >
            <div className="bazaar-card-img-wrap">
                <img src={product.image} alt={product.name} className="bazaar-card-img" />
                <span className="price-badge">{product.priceRange}</span>
                {isActive && <div className="active-ring" />}
            </div>
            <div className="bazaar-card-body">
                <h3 className="bazaar-card-name">{product.name}</h3>
                <p className="bazaar-card-desc">{product.description.slice(0, 110)}…</p>
                <div className="bazaar-card-market">
                    <span className="market-pin">📍</span>
                    <span>{market.name}</span>
                </div>
                <div className="bazaar-card-tap-hint">
                    {isActive ? "Tap again to view full details →" : "Tap to highlight on map →"}
                </div>
            </div>
        </div>
    );
}

// ── ProductDetail modal ────────────────────────────────────────────────────────
function ProductDetail({ product, onClose, markets, fortCoords }) {
    if (!product) return null;
    const market = markets[product.nearestMarket];
    const distKm = haversineKm(fortCoords.lat, fortCoords.lng, market.lat, market.lng);
    const minutes = travelMinutes(distKm);

    return (
        <div className="product-detail-overlay" onClick={onClose}>
            <div className="product-detail-panel" onClick={(e) => e.stopPropagation()}>
                <button className="detail-close" onClick={onClose}>✕</button>
                <img src={product.image} alt={product.name} className="detail-img" />
                <div className="detail-body">
                    <span className="detail-category">{product.category}</span>
                    <h2 className="detail-name">{product.name}</h2>
                    <p className="detail-price">{product.priceRange}</p>
                    <p className="detail-desc">{product.description}</p>
                    <div className="detail-divider" />
                    <div className="detail-market-info">
                        <div className="detail-market-row"><span>🏪</span><strong>{market.name}</strong></div>
                        <div className="detail-market-row">
                            <span>📏</span>
                            <span>Distance from Fort: <strong>{distKm} km</strong></span>
                        </div>
                        <div className="detail-market-row">
                            <span>🚗</span>
                            <span>Est. Travel Time: <strong>~{minutes} mins</strong> at 30 km/h</span>
                        </div>
                        <GMapsButton market={market} fortCoords={fortCoords} className="detail-gmaps-btn" />
                    </div>
                    <div className="detail-divider" />
                    <div className="detail-artisan">
                        <span className="artisan-label">🧵 Artisan Note</span>
                        <p>{product.artisanInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── ArtisanCard ───────────────────────────────────────────────────────────────
function ArtisanCard({ artisan }) {
    return (
        <div className="artisan-card">
            <div className="artisan-avatar" style={{ background: artisan.color + "22", color: artisan.color }}>
                {artisan.avatar}
            </div>
            <div className="artisan-body">
                <h4 className="artisan-name">{artisan.name}</h4>
                <span className="artisan-craft">{artisan.craft}</span>
                <div className="artisan-meta">
                    <span>📌 {artisan.location}</span>
                    <span>⏳ {artisan.experience} years experience</span>
                </div>
                <p className="artisan-desc">{artisan.description}</p>
            </div>
        </div>
    );
}

// ── Main BazaarSection ────────────────────────────────────────────────────────
const BazaarSection = ({ fort }) => {
    const isRaigad = fort?.id === 2;
    const isSinhagad = fort?.id === 3;
    const isPratapgad = fort?.id === 4;
    const isLohagad = fort?.id === 5;
    
    const PRODUCTS = isLohagad ? LOHAGAD_PRODUCTS : (isPratapgad ? PRATAPGAD_PRODUCTS : (isSinhagad ? SINHAGAD_PRODUCTS : (isRaigad ? RAIGAD_PRODUCTS : SHIVNERI_PRODUCTS)));
    const MARKETS = isLohagad ? LOHAGAD_MARKETS : (isPratapgad ? PRATAPGAD_MARKETS : (isSinhagad ? SINHAGAD_MARKETS : (isRaigad ? RAIGAD_MARKETS : SHIVNERI_MARKETS)));
    const BUDGET_ITEMS = isLohagad ? LOHAGAD_BUDGET_ITEMS : (isPratapgad ? PRATAPGAD_BUDGET_ITEMS : (isSinhagad ? SINHAGAD_BUDGET_ITEMS : (isRaigad ? RAIGAD_BUDGET_ITEMS : SHIVNERI_BUDGET_ITEMS)));
    const ARTISANS = isLohagad ? LOHAGAD_ARTISANS : (isPratapgad ? PRATAPGAD_ARTISANS : (isSinhagad ? SINHAGAD_ARTISANS : (isRaigad ? RAIGAD_ARTISANS : SHIVNERI_ARTISANS)));
    
    // Coordinates
    let currentCoords = FORT_COORDS; // Shivneri default
    if (isRaigad) currentCoords = { lat: 18.2345, lng: 73.4464 };
    if (isSinhagad) currentCoords = { lat: 18.3663, lng: 73.7559 };
    if (isPratapgad) currentCoords = { lat: 17.9250, lng: 73.5700 };
    if (isLohagad) currentCoords = { lat: 18.7075, lng: 73.4800 };
    const CURRENT_FORT_COORDS = currentCoords;

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeProduct, setActiveProduct] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [mapCollapsed, setMapCollapsed] = useState(false);
    const [showRoute, setShowRoute] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const activeMarket = activeProduct ? MARKETS[activeProduct.nearestMarket] : null;
    const hoveredMarket = hoveredProduct ? MARKETS[hoveredProduct.nearestMarket] : null;

    const routePoints = activeMarket && showRoute
        ? [[CURRENT_FORT_COORDS.lat, CURRENT_FORT_COORDS.lng], [activeMarket.lat, activeMarket.lng]]
        : [];

    const filteredProducts =
        activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

    const handleCardClick = useCallback((product) => {
        if (activeProduct?.id === product.id) {
            setDetailProduct(product);
        } else {
            setActiveProduct(product);
            setShowRoute(true);
            setShowAll(false);
        }
    }, [activeProduct]);

    const handleClearRoute = () => {
        setActiveProduct(null);
        setShowRoute(false);
        setShowAll(false);
    };

    const handleViewAll = () => {
        setActiveProduct(null);
        setShowRoute(false);
        setShowAll(true);
    };

    const getMarketInfo = (market) => {
        const distKm = haversineKm(CURRENT_FORT_COORDS.lat, CURRENT_FORT_COORDS.lng, market.lat, market.lng);
        const minutes = travelMinutes(distKm);
        return { distKm, minutes };
    };

    return (
        <section className="bazaar-section" id="heritage-bazaar">

            <div className="bazaar-header">
                <span className="bazaar-eyebrow">SHOP THE HERITAGE</span>
                <h2 className="bazaar-title">{fort?.name || "Heritage"} Bazaar</h2>
                <p className="bazaar-subtitle">
                    Discover authentic local markets, handicrafts &amp; souvenirs near {fort?.name || "the fort"}
                </p>
            </div>

            <div className="bazaar-filters">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="bazaar-body">
                <div className="bazaar-grid">
                    {filteredProducts.length === 0
                        ? <p className="no-products">No products in this category yet.</p>
                        : filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                markets={MARKETS}
                                isActive={activeProduct?.id === product.id}
                                isHovered={hoveredProduct?.id === product.id && activeProduct?.id !== product.id}
                                onClick={handleCardClick}
                                onMouseEnter={(p) => setHoveredProduct(p)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            />
                        ))
                    }
                    <p className="tap-hint-global">Tap once to draw route on map · Tap again to view details</p>
                </div>

                <div className={`bazaar-map-sidebar ${mapCollapsed ? "map-collapsed" : ""}`}>
                    <button className="map-toggle-btn" onClick={() => setMapCollapsed((v) => !v)}>
                        {mapCollapsed ? "🗺️ Show Map" : "🗺️ Hide Map"}
                    </button>

                    {!mapCollapsed && (
                        <div className="bazaar-map-container">
                            <div className="bazaar-map-label">
                                <span>📍</span>
                                <span>Market Locations &amp; Routes</span>
                            </div>

                            {activeMarket && (
                                <div className="active-market-chip">
                                    <div>
                                        <strong>{activeMarket.name}</strong>
                                        <span>{getMarketInfo(activeMarket).distKm} km · ~{getMarketInfo(activeMarket).minutes} min drive</span>
                                    </div>
                                    {showRoute && <span className="route-live-badge">Route Active</span>}
                                </div>
                            )}

                            <MapContainer
                                center={CURRENT_FORT_COORDS}
                                zoom={13}
                                style={{ height: "400px", width: "100%" }}
                                scrollWheelZoom={false}
                                className="bazaar-leaflet-map"
                            >
                                <TileLayer
                                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                />

                                <Marker position={[CURRENT_FORT_COORDS.lat, CURRENT_FORT_COORDS.lng]} icon={ICON_FORT}>
                                    <Popup className="bazaar-popup">
                                        <div className="popup-inner">
                                            <strong>🏰 {fort?.name || "Fort"}</strong>
                                            <span className="popup-dist">Origin of your journey</span>
                                        </div>
                                    </Popup>
                                </Marker>

                                {Object.values(MARKETS).map((market) => {
                                    const isActive = activeMarket?.id === market.id;
                                    const isHovered = hoveredMarket?.id === market.id && !isActive;
                                    const { distKm, minutes } = getMarketInfo(market);
                                    const icon = isActive ? ICON_ACTIVE : isHovered ? ICON_HOVER : ICON_DEFAULT;

                                    return (
                                        <Marker
                                            key={market.id}
                                            position={[market.lat, market.lng]}
                                            icon={icon}
                                            zIndexOffset={isActive ? 1000 : isHovered ? 500 : 0}
                                        >
                                            <Popup className="bazaar-popup">
                                                <div className="popup-inner">
                                                    <strong>{market.name}</strong>
                                                    <span className="popup-dist">📏 Distance: {distKm} km</span>
                                                    <span className="popup-dist">🚗 Est. Travel: ~{minutes} mins</span>
                                                    <GMapsButton market={market} fortCoords={CURRENT_FORT_COORDS} className="popup-gmaps" />
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}

                                {/* Animated dashed polyline route */}
                                {routePoints.length === 2 && (
                                    <Polyline
                                        positions={routePoints}
                                        pathOptions={{
                                            color: "#c0622a",
                                            weight: 3,
                                            opacity: 0.85,
                                            dashArray: "10, 8",
                                            dashOffset: "0",
                                            lineCap: "round",
                                        }}
                                        className="route-polyline"
                                    />
                                )}

                                <MapController
                                    activeMarket={activeMarket}
                                    showRoute={showRoute}
                                    showAll={showAll}
                                />
                            </MapContainer>

                            {/* ── Action Panel ── */}
                            <div className="map-action-panel">
                                <button
                                    className={`map-action-btn ${showRoute && activeMarket ? "map-action-btn--active" : ""}`}
                                    onClick={() => {
                                        if (activeProduct) setShowRoute(true);
                                    }}
                                    disabled={!activeProduct}
                                    title={activeProduct ? "Draw route from Fort to selected market" : "Select a product first"}
                                >
                                    🗺️ Show Route
                                </button>
                                <button
                                    className="map-action-btn"
                                    onClick={handleClearRoute}
                                    disabled={!activeProduct && !showRoute}
                                    title="Clear route and reset map"
                                >
                                    ✕ Clear Route
                                </button>
                                <button
                                    className={`map-action-btn ${showAll ? "map-action-btn--active" : ""}`}
                                    onClick={handleViewAll}
                                    title="Zoom out to view all markets"
                                >
                                    👁️ View All Markets
                                </button>
                            </div>

                            {/* Legend */}
                            <div className="market-legend">
                                <div className="legend-item">
                                    <span className="legend-dot dot-red" />
                                    <span>{fort?.name || "Fort"} (Origin)</span>
                                </div>
                                {Object.values(MARKETS).map((m) => (
                                    <div key={m.id} className={`legend-item ${activeMarket?.id === m.id ? "legend-item--active" : ""}`}>
                                        <span className={`legend-dot ${activeMarket?.id === m.id ? "dot-orange" : "dot-grey"}`} />
                                        <span>{m.name}</span>
                                    </div>
                                ))}
                                {showRoute && routePoints.length === 2 && (
                                    <div className="legend-item">
                                        <span className="legend-dash" />
                                        <span>Route (Fort → Market)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Meet the Makers ── */}
            <div className="makers-section">
                <div className="makers-header">
                    <h3 className="makers-title">Meet the Makers</h3>
                    <p className="makers-subtitle">Supporting local artisans and their centuries-old traditions</p>
                </div>
                <div className="makers-grid">
                    {ARTISANS.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
                </div>
            </div>

            {/* ── Budget Planner ── */}
            <BudgetPlanner items={BUDGET_ITEMS} />

            {/* ── Detail Modal ── */}
            {detailProduct && (
                <ProductDetail product={detailProduct} markets={MARKETS} fortCoords={CURRENT_FORT_COORDS} onClose={() => setDetailProduct(null)} />
            )}
        </section>
    );
};

export default BazaarSection;
