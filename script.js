document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  const lightModeIconClass = "fa-sun";
  const darkModeIconClass = "fa-moon";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      themeIcon.classList.remove(darkModeIconClass);
      themeIcon.classList.add(lightModeIconClass);
    } else {
      body.classList.remove("dark-mode");
      themeIcon.classList.remove(lightModeIconClass);
      themeIcon.classList.add(darkModeIconClass);
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  themeToggle.addEventListener("click", () => {
    let newTheme;
    if (body.classList.contains("dark-mode")) {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  for (const element of elementsToAnimate) {
    observer.observe(element);
  }
});
