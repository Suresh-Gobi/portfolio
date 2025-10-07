// Main cursor and tail setup
const cursor = document.getElementById("cursor");
const tails = document.querySelectorAll(".cursor-tail");
const cursorCircle = document.querySelector(".cursor-circle");

let mouse = { x: 0, y: 0 };
let positions = Array(tails.length).fill({ x: 0, y: 0 });

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  // Main cursor follows instantly
  cursor.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;

  // Circle cursor position
  cursorCircle.style.left = mouse.x + "px";
  cursorCircle.style.top = mouse.y + "px";
});

// Animate tail
function animateTail() {
  let prevX = mouse.x;
  let prevY = mouse.y;

  tails.forEach((tail, i) => {
    let pos = positions[i];

    // Smooth lerp movement
    pos = {
      x: pos.x + (prevX - pos.x) * 0.5,
      y: pos.y + (prevY - pos.y) * 0.5,
    };
    positions[i] = pos;

    tail.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    tail.style.opacity = 1 - i / tails.length; // fade effect

    prevX = pos.x;
    prevY = pos.y;
  });

  requestAnimationFrame(animateTail);
}

animateTail();

// Portfolio hover effect for circle cursor
document.querySelectorAll(".portfolio-item").forEach((item) => {
  item.addEventListener("mouseenter", () => cursorCircle.classList.add("active"));
  item.addEventListener("mouseleave", () => cursorCircle.classList.remove("active"));
});
