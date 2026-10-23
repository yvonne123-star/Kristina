const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = [...navigation.querySelectorAll("a")];

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
  menuButton.textContent = open ? "Close" : "Menu";
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-wrap")) closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 640) closeMenu();
});

if ("IntersectionObserver" in window) {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js-motion");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      revealObserver.observe(element);
    });
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navigationLinks.forEach((link) => {
            if (link.hash === "#" + entry.target.id) {
            link.setAttribute("aria-current", "location");
            } else {
            link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-15% 0px -55% 0px", threshold: 0 }
  );

  document.querySelectorAll("#home, #about, #projects, #contact").forEach((section) => {
    sectionObserver.observe(section);
  });
}
