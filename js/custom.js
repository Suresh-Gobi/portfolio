// GSAP basic animation
      gsap.to(".box", {
        x: 300,
        rotation: 360,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      // ScrollTrigger example
      gsap.from("section:nth-child(2)", {
        scrollTrigger: {
          trigger: "section:nth-child(2)",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false, // set to true for debugging
        },
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
      });