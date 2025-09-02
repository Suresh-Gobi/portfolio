gsap.registerPlugin(ScrollTrigger);

gsap.to(".horizontal-wrapper", {
  x: () => `-${window.innerWidth * 3}px`, // slide all overlay panels
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrapper",
    start: "top top",
    end: () => "+=" + window.innerWidth * 3, // scroll distance
    scrub: true,
    pin: true, // pin so hero stays fixed
    anticipatePin: 1,
  }
});
