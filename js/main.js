gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------
  // PRE LOADER ANIMATIONS
  // ---------------------------
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

  // Animate all nav links together
  heroTl.from(
    ".nav-menu",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2, // makes them appear one after another
    },
    "-=0.3"
  );

  // Function to start hero animations
  function startHeroAnimations() {
    heroTl.play();
    if (typeof startTextAnimation === "function") {
      startTextAnimation(); // optional additional animations
    }
  }

  // ---------------------------
  // BACKGROUND IMAGE ANIMTAION
  // ---------------------------
  // Register GSAP plugin (if using later for scroll)
  gsap.registerPlugin(ScrollTrigger);

  // Array of background images
  const bgImages = [
    { desktop: "img/bg-01.jpg", mobile: "img/bg-01-small.jpg" },
    { desktop: "img/bg-02.jpg", mobile: "img/bg-02-small.jpg" },
    { desktop: "img/bg-03.jpg", mobile: "img/bg-03-small.jpg" },
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
    const imgSrc =
      window.innerWidth < 768
        ? bgImages[index].mobile
        : bgImages[index].desktop;

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

  // ---------------------------
  // PANEL REVEAL ANIMATIONS
  // ---------------------------
  // PANEL 2 reveal (top-right)
  gsap.to(".panel2", {
    scrollTrigger: {
      trigger: "#container",
      start: "top top",
      end: "33% top",
      scrub: 1.2,
    },
    clipPath: "circle(150% at 100% 0%)",
    opacity: 1,
    ease: "expo.inOut",
  });

  // PANEL 3 reveal (bottom-left)
  gsap.to(".panel3", {
    scrollTrigger: {
      trigger: "#container",
      start: "33% top",
      end: "66% top",
      scrub: 1.2,
    },
    clipPath: "circle(150% at 0% 100%)",
    opacity: 1,
    ease: "expo.inOut",
  });

  // ---------------------------
  // HAMBURGER / MOBILE MENU
  // ---------------------------
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const hamburgerInside = document.getElementById("hamburgerInside");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuItems = mobileMenu.querySelectorAll("ul li a");

  let menuTimeline = gsap.timeline({ paused: true, reversed: true });

  menuTimeline
    .to(mobileMenu, { visibility: "visible", opacity: 1, duration: 0.2 })
    .to(mobileMenu, {
      clipPath: "circle(150% at 100% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
    })
    .from(
      menuItems,
      {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.6"
    );

  function toggleMenu() {
    if (menuTimeline.reversed()) {
      hamburgerBtn.classList.add("active");
      hamburgerInside.classList.add("active");
      menuTimeline.play();
    } else {
      hamburgerBtn.classList.remove("active");
      hamburgerInside.classList.remove("active");
      menuTimeline.reverse();
    }
  }

  document.getElementById("menuTrigger").addEventListener("click", toggleMenu);
  document
    .getElementById("menuTriggerInside")
    .addEventListener("click", toggleMenu);
});

// ---------------------------
// SPLIT TEXT ANIMATIONS
// ---------------------------

gsap.registerPlugin(SplitText);

// Define a function to animate text
function startTextAnimation() {
  // Helper function to animate individual text
  function animateText(selector, type, delay = 0) {
    const split = new SplitText(selector, { type: type });
    gsap.from(
      type === "chars"
        ? split.chars
        : type === "words"
        ? split.words
        : split.lines,
      {
        duration: 1,
        y: 50,
        autoAlpha: 0,
        stagger: 0.05,
        ease: "power3.out",
        delay: delay,
      }
    );
  }

  // Animate all texts
  animateText("#charsText", "chars", 0);
  animateText("#wordsText", "words", 0.5);
  animateText("#linesText", "lines", 1);
}
