// gsap.registerPlugin(ScrollTrigger);

// const isMobile = window.innerWidth <= 768;

// // Mobile/tablet → vertical scroll
// if (isMobile) {
//   gsap.to(".horizontal-wrapper", {
//     y: () => `-${window.innerHeight * 3}px`,
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: ".horizontal-wrapper",
//       start: "top top",
//       end: () => "+=" + window.innerHeight * 3,
//       scrub: 1.2,
//       pin: true,
//       anticipatePin: 1,
//     }
//   });
// } else {
//   // Desktop → horizontal scroll
//   gsap.to(".horizontal-wrapper", {
//     x: () => `-${window.innerWidth}px`,
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: ".horizontal-wrapper",
//       start: "top top",
//       end: () => "+=" + window.innerWidth,
//       scrub: 1.5,
//       pin: true,
//       anticipatePin: 1,
//     }
//   });
// }

// // PANEL 2 REVEAL
// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".panel2",
//     start: "left center",   // when panel2 enters view
//     end: "left 20%",
//     scrub: 1.2,
//     toggleActions: "play none none reverse"
//   }
// })
// .to(".panel2", {
//   clipPath: "circle(150% at 50% 50%)",
//   opacity: 1,
//   duration: 1.2,
//   ease: "expo.inOut"
// })
// .from(".panel2 > *", {
//   y: 60,
//   opacity: 0,
//   stagger: 0.2,
//   duration: 0.8,
//   ease: "power3.out"
// }, "-=0.6");

// // PANEL 3 REVEAL
// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".panel3",
//     start: "left center",
//     end: "left 20%",
//     scrub: 1.2,
//     toggleActions: "play none none reverse"
//   }
// })
// .to(".panel3", {
//   clipPath: "circle(150% at 50% 50%)",
//   opacity: 1,
//   duration: 1.2,
//   ease: "expo.inOut"
// })
// .from(".panel3 > *", {
//   y: 60,
//   opacity: 0,
//   stagger: 0.2,
//   duration: 0.8,
//   ease: "power3.out"
// }, "-=0.6");

// // Refresh on resize
// window.addEventListener("resize", () => {
//   ScrollTrigger.refresh();
// });
