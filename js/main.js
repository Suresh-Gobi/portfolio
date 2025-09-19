gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768;

// Horizontal scroll for desktop, vertical for mobile
if (isMobile) {
  // Vertical scroll on mobile/tablet
  gsap.to(".horizontal-wrapper", {
    y: () => `-${window.innerHeight * 3}px`,
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
    x: () => `-${window.innerWidth}px`,
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-wrapper",
      start: "top top",
      end: () => "+=" + window.innerWidth,
      scrub: true,
      pin: true,
      anticipatePin: 1,
    }
  });

  // Animate panel2 and panel3 with circle reveal + content fade-in (desktop only)
  [".panel2", ".panel3"].forEach((panelSelector) => {
    const panel = document.querySelector(panelSelector);

    gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      }
    })
    .to(panel, {
      clipPath: "circle(150% at 50% 50%)",
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut",
    })
    .from(panel.children, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.8");
  });
}

// Refresh on resize
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
