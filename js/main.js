
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Horizontal scrolling effect
gsap.to(".scroll-container", {
  xPercent: -400, // 5 panels → move left by 400% (except first one)
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal",
    pin: true,
    scrub: 1,
    snap: 1 / 4, // snap to each panel (4 transitions)
    end: () => "+=" + document.querySelector(".scroll-container").offsetWidth
  }
});
