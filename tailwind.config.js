/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        pokeBox: "url('/src/assets/background.png')",
        cave: "url('/habitats/cave.jpg')",
        forest: "url('/habitats/forest.jpg')",
        grassland: "url('/habitats/grassland.jpg')",
        mountain: "url('/habitats/mountain.jpg')",
        rare: "url('/habitats/rare.jpg')",
        rough_terrain: "url('/habitats/rough-terrain.jpeg')",
        sea: "url('/habitats/sea.jpg')",
        urban: "url('/habitats/urban.jpeg')",
        water_edge: "url('/habitats/water-edge.jpg')",
      }
    },
  },
  plugins: [],
}

