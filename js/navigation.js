import  *  as elements from "./DOMElements.js";

export function selectNavButton(){

  const previousLink = document.querySelector('.selected-nav-link');

  if (previousLink) {
    previousLink.classList.remove('selected-nav-link');
  }
  
  if (location.hash !== '#problems'){
    const currentLink = document.querySelector(`[href="${location.hash}"]`)
    if (currentLink) {
      currentLink.classList.add('selected-nav-link');
    }
  }
}

