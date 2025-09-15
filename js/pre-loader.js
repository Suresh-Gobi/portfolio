document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("no-scroll");
  const logo = document.getElementById("logo");
  const totalDuration = 5; // seconds for the logo fill

  // Animate logo fill dynamically
  gsap.to(logo, {
    duration: totalDuration,
    backgroundPosition: "0% 100%", // animate from top to bottom
    ease: "power2.inOut",
  });

  // Slot-machine style number animation
  const milestones = [10, 36, 58, 76, 99];
  const digit2 = document.querySelector(".number-2 .number-wrap");
  const digit3 = document.querySelector(".number-3 .number-wrap");

  // Timeline for preloader animation
  let preloaderTl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  milestones.forEach((milestone) => {
    preloaderTl.to(
      {},
      {
        duration: totalDuration / milestones.length,
        onUpdate: function () {
          const tens = Math.floor((milestone % 100) / 10);
          const ones = milestone % 10;

          gsap.to(digit2, { y: -tens + "em", duration: 0.3 });
          gsap.to(digit3, { y: -ones + "em", duration: 0.3 });
        },
      }
    );
  });

  // Fade out preloader after completion and start hero animations
  preloaderTl.to("#preloader", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      startHeroAnimations(); // trigger hero animations
      document.body.classList.remove("no-scroll");
    },
  });

  // --- Hero section animations (paused until preloader finishes) ---
  const heroTl = gsap.timeline({ paused: true });

  // Profile header animation
  heroTl.from(".profile-pic", {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
  });
  heroTl.from(
    ".profile-header h2",
    { y: 30, opacity: 0, duration: 0.8 },
    "-=0.5"
  );

  // Hero main title animation
  heroTl.from(".hero-content h1", { y: 50, opacity: 0, duration: 1 });
  heroTl.from(
    ".hero-content h1 span",
    { scale: 0, opacity: 0, duration: 0.5 },
    "-=0.5"
  );

  // description animation
  heroTl.from("#linesText1", { y: 50, opacity: 0, duration: 1 });
  heroTl.from("#linesText2", { y: 50, opacity: 0, duration: 0.5 }, "-=0.5");


  
  // Function to start hero animations
  function startHeroAnimations() {
    heroTl.play();
    if (typeof startTextAnimation === "function") {
      startTextAnimation(); // optional additional animations
    }
  }
});
