gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768; // tablets & mobiles

if (isMobile) {
  // Vertical scroll on mobile/tablet
  gsap.to(".horizontal-wrapper", {
    y: () => `-${window.innerHeight * 3}px`, // slide panels vertically
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      end: () => "+=" + window.innerHeight * 3,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });
} else {
  // Horizontal scroll on desktop
  gsap.to(".horizontal-wrapper", {
    x: () => `-${window.innerWidth * 3}px`,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      end: () => "+=" + window.innerWidth * 3,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });
}

// Optional: re-init on resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
