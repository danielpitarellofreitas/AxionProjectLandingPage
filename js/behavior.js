import { getCurrentSection, getScrollStatus } from "./navigation.js";
import { setMainHeaderVisibility } from "./actions.js";
import { container, mainHeader } from "./DOMElements.js";


export async function handleHeaderVisibility() {
  const scrollStatus = getScrollStatus();
  const showHeader   = setMainHeaderVisibility;

  switch(scrollStatus) {
    case "down":
      showHeader(false);
      break;
    case "up":
      showHeader(true); 
      break;
  }
}

export function selectNavButton(){

  const previousLink = document.querySelector('.selected-nav-link');

  if (previousLink) {
    previousLink.classList.remove('selected-nav-link');
  }

  const currentLink = document.querySelector(`[href="${location.hash}"]`)
  
  if (currentLink) {
    currentLink.classList.add('selected-nav-link');
  }
}