window.addEventListener("load", () => {
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

  // Timeline for milestone animation
  let tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

  milestones.forEach((milestone) => {
    tl.to(
      {},
      {
        duration: totalDuration / milestones.length,
        onUpdate: function () {
          const hundreds = Math.floor(milestone / 100);
          const tens = Math.floor((milestone % 100) / 10);
          const ones = milestone % 10;

          gsap.to(digit2, { y: -tens + "em", duration: 0.3 });
          gsap.to(digit3, { y: -ones + "em", duration: 0.3 });
        },
      }
    );
  });

  // Fade out loader after completion
  tl.to("#preloader", {
    opacity: 0,
    duration: 1,
    onComplete: () => {
      document.querySelector("#preloader").style.display = "none";
    },
  });
});
