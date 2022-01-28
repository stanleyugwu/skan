module.exports = {
  purge: ["**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#6200EE",
        "primary-dark": "#23036A",
        "on-primary": "#ffffff",

        secondary: "#01A299",
        "secondary-dark": "#005457",
        "on-secondary": "#ffffff",

        background: "#f4f4f4",
        "on-background": "#262626",

        surface: "#ffffff",
        "on-surface": "#212121",

        error:'#B00020',
        outline:"#e0e0e0",
        'on-dark':'#d6d6d6'
      },
      fontFamily:{
        rubik:['rubik','sans-serif'],
        'rubik-medium':['rubik-medium','sans-serif'],

        comfortaa:['comfortaa','roboto'],
        'comfortaa-medium':['comfortaa-medium','roboto'],
        'comfortaa-bold':['comfortaa-bold','roboto'],

        mono:['space-mono','serif']
      },
      fontSize:{
        'heading':20,
        'title':18,
        'subTitle':16,
        'subTitle-2':14,
        'body':16,
        'body-2':14,
        'caption':12,
        'overline':10,
        'button':14,
      }
    },
  },
};
