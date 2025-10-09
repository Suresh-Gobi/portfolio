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
  // gsap.to(".panel2", {
  //   scrollTrigger: {
  //     trigger: "#container",
  //     start: "top top",
  //     end: "33% top",
  //     scrub: 1.2,
  //   },
  //   clipPath: "circle(150% at 100% 0%)",
  //   opacity: 1,
  //   ease: "expo.inOut",
  // });

  // PANEL 3 reveal (bottom-left)
  // gsap.to(".panel3", {
  //   scrollTrigger: {
  //     trigger: "#container",
  //     start: "33% top",
  //     end: "66% top",
  //     scrub: 1.2,
  //   },
  //   clipPath: "circle(150% at 0% 100%)",
  //   opacity: 1,
  //   ease: "expo.inOut",
  // });

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

// ---------------------------
// Floating Image
// ---------------------------
// Floating portfolio image for list-view only
const floatWrap = document.querySelector(".float-image-wrap");
const floatImg = document.getElementById("float-img");

document.querySelectorAll(".portfolio-grid .portfolio-item").forEach((item) => {
  const imgSrc = item.getAttribute("data-img") || item.querySelector("img").src;

  item.addEventListener("mouseenter", () => {
    // Only show floating image in list-view
    if (item.closest(".portfolio-grid").classList.contains("list-view")) {
      floatImg.src = imgSrc;
      gsap.to(floatWrap, { opacity: 1, scale: 1, duration: 0.3 });
    }
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(floatWrap, { opacity: 0, scale: 0.9, duration: 0.3 });
  });

  item.addEventListener("mousemove", (e) => {
    // Only move floating image in list-view
    if (item.closest(".portfolio-grid").classList.contains("list-view")) {
      gsap.to(floatWrap, {
        x: e.clientX + 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });
});
// ---------------------------
// Button Animation
// ---------------------------
// Button animation
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }
  init() {
    const el = gsap.utils.selector(this.block);
    this.DOM = { button: this.block, flair: el(".button__flair") };
    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }
  getXY(e) {
    const { left, top, width, height } =
      this.DOM.button.getBoundingClientRect();
    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );
    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );
    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top),
    };
  }
  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);
      this.xSet(x);
      this.ySet(y);
      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);
      gsap.killTweensOf(this.DOM.flair);
      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);
      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');
buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});

// ---------------------------
// Footer Parallax
// ---------------------------

function scrollFooter(scrollY, heightFooter) {
        const footer = document.querySelector("footer");
        if (scrollY >= heightFooter) {
          footer.style.bottom = "0px"; // show
        } else {
          footer.style.bottom = "-" + heightFooter + "px"; // hide
        }
      }

      window.addEventListener("load", () => {
        const windowHeight = window.innerHeight;
        const footer = document.querySelector("footer");
        const footerHeight = footer.offsetHeight;
        const contentHeight = document.querySelector(".content").offsetHeight;
        const heightDocument = windowHeight + contentHeight;

        // set scroll container size
        document
          .querySelectorAll("#scroll-animate, #scroll-animate-main")
          .forEach((el) => (el.style.height = heightDocument + "px"));

        // push content below viewport initially
        //   document.querySelector(".wrapper-parallax").style.marginTop =
        //     windowHeight + "px";

        scrollFooter(window.scrollY, footerHeight);

        // on scroll
        let scrollPos = 0;
        const scrollEase = 0.1;

        function smoothScroll() {
          const scroll = window.scrollY;
          scrollPos += (scroll - scrollPos) * scrollEase;

          document.getElementById("scroll-animate-main").style.top =
            "-" + scrollPos + "px";

          scrollFooter(scrollPos, footerHeight);

          requestAnimationFrame(smoothScroll);
        }

        // start the smooth scroll loop
        smoothScroll();
      });