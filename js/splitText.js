gsap.registerPlugin(SplitText);

// Define a function to animate text
function startTextAnimation() {
  // Helper function to animate individual text
  function animateText(selector, type, delay = 0) {
    const split = new SplitText(selector, { type: type });
    gsap.from(
      type === "chars" ? split.chars :
      type === "words" ? split.words :
      split.lines,
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
