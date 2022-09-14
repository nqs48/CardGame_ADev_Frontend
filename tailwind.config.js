/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      90: ".9",
      95: ".95",
      97: ".97",
      98: ".98",
      100: "1",
      105: "1.05",
      110: "1.1",
      125: "1.25",
      150: "1.5",
      200: "2",
    },
    extend: {
      transform: ["hover", "focus"],
      backgroundImage: {
        "hero-pattern":
          "url('https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')",
        "footer-texture": "url('/img/footer-texture.png')",
        logo: "url('https://i.annihil.us/u/prod/marvel/images/mu/web/2021/mu-logo-full-light.png')",
        main: "url('https://wallpapercave.com/wp/wp2903386.gif')",
        main02: "url('https://wc.wallpaperuse.com/wallp/69-699460_s.jpg')",
        main03:
          "url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/997070/6704338131eac5f8ab62a23153e5d5c8712393b1.jpg')",
        board:
          "url(https://i.pinimg.com/736x/d1/77/1a/d1771a0fd36ca7771492c91a64b18e4b.jpg)",
      },
    },
  },
  plugins: [],
};
