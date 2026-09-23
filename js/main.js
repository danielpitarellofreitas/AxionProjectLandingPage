import { selectNavButton, updateHash, handleHeaderVisibility } from './navigation.js';
import { navHome, homeSection, container } from './DOMElements.js';
import { setMainHeaderVisibility } from './actions.js';


function handleWheel() {
  updateHash();
  handleHeaderVisibility();
}

function start() {
  window.history.scrollRestoration = "manual";

  homeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navHome.classList.add("selected-nav-link");
}

window.addEventListener("load", start);
window.addEventListener("wheel", handleWheel);
window.addEventListener("hashchange", selectNavButton);

window.addEventListener("click", () => {setMainHeaderVisibility(undefined)})

container.addEventListener("scroll", handleWheel);
