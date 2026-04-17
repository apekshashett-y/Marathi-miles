import thali from "../assets/food/shivneri/gavran_thali.jpeg";
import zunka from "../assets/food/shivneri/zunka.jpeg";

export const CUISINE_DATA = {

  shivneri: [

    {
      id: "vada-pav",
      name: "Vada Pav",
      image: thali,
      description: "Mumbai's iconic street food - spiced potato fritter in a soft bun",

      famousPlaces: [
        "Ashok Vada Pav",
        "Kirti College Vada Pav",
        "Anand Stall"
      ],

      location: "Dadar West, Mumbai, Maharashtra 400028",
      price: "₹15-30"
    },

    {
      id: "misal",
      name: "Misal Pav",
      image: zunka,

      description: "Spicy sprouts curry with farsan served with pav",

      famousPlaces: [
        "Sardar Misal",
        "Cannon Misal",
        "Aram Misal"
      ],

      location: "Tardeo, Mumbai, Maharashtra 400034",
      price: "₹80-150"
    },

    {
      id: "gavran-thali",
      name: "Gavran Thali",
      image: thali,

      description:
        "Complete traditional Maharashtrian meal with bhakri and pithla",

      famousPlaces: [
        "Gajalee",
        "Mahesh Lunch Home",
        "Trishna"
      ],

      location: "Fort Area, Mumbai, Maharashtra 400001",
      price: "₹800-1500"
    }

  ]

};