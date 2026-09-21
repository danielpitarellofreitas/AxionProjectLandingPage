import { selectNavButton } from './navigation.js';
import { navHome, homeSection } from './DOMElements.js';



function start() {
  window.history.scrollRestoration = "manual";

  homeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navHome.classList.add("selected-nav-link");
}

window.addEventListener("load", start);
window.addEventListener("hashchange", selectNavButton);



