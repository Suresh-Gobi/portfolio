// Register GSAP plugin (if using later for scroll)
gsap.registerPlugin(ScrollTrigger);

// Array of background images
const bgImages = [
  {desktop: "img/bg-01.jpg", mobile: "img/bg-01-small.jpg"},
  {desktop: "img/bg-02.jpg", mobile: "img/bg-02-small.jpg"},
  {desktop: "img/bg-03.jpg", mobile: "img/bg-03-small.jpg"}
];

const hero = document.querySelector(".panel1");

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
  });
}

async function setBg(index) {
  const imgSrc = window.innerWidth < 768 ? bgImages[index].mobile : bgImages[index].desktop;
  
  // Preload image before setting as background
  await preloadImage(imgSrc);
  
  hero.style.backgroundImage = `url(${imgSrc})`;
}

let current = 0;
setBg(current);

// Rotate background every 5 seconds with lazy load
setInterval(() => {
  current = (current + 1) % bgImages.length;
  setBg(current);
}, 5000);
