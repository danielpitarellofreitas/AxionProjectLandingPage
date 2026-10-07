import { selectNavButton, updateHash, handleHeaderVisibility, getCurrentSection} from './navigation.js';
import { navHome, homeSection, container, buttonBackMobileMenu, buttonHamburguerMenu, links, linksContainer } from './DOMElements.js';
import { setMainHeaderVisibility, updateWindowTitle, hideMobileMenu, showMobileMenu } from './actions.js';


function handleWheel() {
  updateHash();
  updateWindowTitle();
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

container.addEventListener("click", () => {setMainHeaderVisibility(undefined)});
container.addEventListener("scroll", handleWheel);

buttonBackMobileMenu.addEventListener("click", hideMobileMenu);

buttonHamburguerMenu.addEventListener("click", showMobileMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
    hideMobileMenu();
  })
});