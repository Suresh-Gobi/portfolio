const cursor = document.querySelector(".custom-cursor");
const cursorCircle = document.querySelector(".cursor-circle");
const navLinks = document.querySelectorAll(".nav-menu a");

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;
const speed = 0.2; // smaller = slower lag, bigger = faster follow

// Track mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor
function animate() {
  posX += (mouseX - posX) * speed;
  posY += (mouseY - posY) * speed;

  cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
  requestAnimationFrame(animate);
}

animate();

// Hover effect on navbar links
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursorCircle.style.display = "none";          // hide large circle
    cursor.style.backgroundColor = "rgba(255, 251, 0, 1)";    // change cursor color
  });
  link.addEventListener("mouseleave", () => {
    cursorCircle.style.display = "flex";         // show large circle
    cursor.style.backgroundColor = "white";      // revert cursor color
  });
});
