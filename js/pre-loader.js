const logo = document.getElementById("logo");
      const totalDuration = 5; // total seconds for logo fill

      // Animate logo fill
      gsap.to(logo, {
        duration: totalDuration,
        backgroundPosition: "bottom",
        ease: "power2.inOut",
      });

      // Odometer animation synced with logo fill
      const odometer = { value: 0 }; // current number

      gsap.to(odometer, {
        value: 100, // final number
        duration: totalDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentValue = Math.floor(odometer.value);

          const hundreds = Math.floor(currentValue / 100);
          const tens = Math.floor((currentValue % 100) / 10);
          const ones = currentValue % 10;

          gsap.set("#digit-1", { y: -hundreds * 100 });
          gsap.set("#digit-2", { y: -tens * 100 });
          gsap.set("#digit-3", { y: -ones * 100 });
        },
        onComplete: () => {
          // Fade out preloader, fade in homepage
          gsap.to("#preloader", {
            duration: 1.2,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
              document.getElementById("preloader").style.display = "none";
            },
          });

          gsap.to("#homepage", {
            duration: 1.5,
            opacity: 1,
            delay: 0.5,
            ease: "power2.inOut",
          });
        },
      });