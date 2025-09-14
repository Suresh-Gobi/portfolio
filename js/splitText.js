gsap.registerPlugin(SplitText);

let split, animation;

function animateLines() {
  animation && animation.revert();
  animation = gsap.from(split.lines, {
    rotationX: -100,
    transformOrigin: "50% 50% -160px",
    opacity: 0,
    duration: 0.8,
    ease: "power3",
    stagger: 0.25
  });
}

function setup() {
  split && split.revert();
  animation && animation.revert();
  split = SplitText.create(".text", { type: "lines, words, chars" });
  animateLines();
}

setup();
window.addEventListener("resize", setup);