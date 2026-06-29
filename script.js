document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  const lightModeIconClass = "fa-sun";
  const darkModeIconClass = "fa-moon";

  const applyTheme = (theme) => {
    window.requestAnimationFrame(() => {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        themeIcon.classList.remove(darkModeIconClass);
        themeIcon.classList.add(lightModeIconClass);
      } else {
        body.classList.remove("dark-mode");
        themeIcon.classList.remove(lightModeIconClass);
        themeIcon.classList.add(darkModeIconClass);
      }
    });
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme("dark");
  }

  themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";

    applyTheme(newTheme);
    setTimeout(() => localStorage.setItem("theme", newTheme), 0);
  });

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    },
  );

  reveals.forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  const navbar = document.getElementById("navbar");
  let tickingScroll = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!tickingScroll) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
          } else {
            navbar.classList.remove("scrolled");
          }
          tickingScroll = false;
        });
        tickingScroll = true;
      }
    },
    { passive: true },
  );

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const heroImage = document.querySelector(".profile-image-container img");
  const heroSection = document.getElementById("hero-section");

  if (heroImage && heroSection) {
    let tickingParallax = false;
    let mouseX = 0,
      mouseY = 0;
    const windowHalfWidth = window.innerWidth / 2;
    const windowHalfHeight = window.innerHeight / 2;

    heroSection.addEventListener(
      "mousemove",
      (e) => {
        mouseX = e.pageX;
        mouseY = e.pageY;

        if (!tickingParallax) {
          window.requestAnimationFrame(() => {
            const x = (windowHalfWidth - mouseX) / 30;
            const y = (windowHalfHeight - mouseY) / 30;

            heroImage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.05)`;
            tickingParallax = false;
          });
          tickingParallax = true;
        }
      },
      { passive: true },
    );

    heroSection.addEventListener("mouseleave", () => {
      window.requestAnimationFrame(() => {
        heroImage.style.transform = `translate3d(0, 0, 0) scale(1)`;
      });
    });
  }
});
