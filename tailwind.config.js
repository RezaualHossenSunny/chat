/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'open': ['Open Sans', 'sans-serif'],
        'popins':['Poppins', 'sans-serif'],
     
      },
      colors: {
    'hedding':'#11175D',
    'primary': '#5F35F5',
    'icon':'#BAD1FF',
    'overlay':'rgba(0, 0, 0, 0.41)',

      },
      boxShadow :{
        'shadow':' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',

      },
    },
   
  },
  plugins: [],
}
