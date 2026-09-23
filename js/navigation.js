import  *  as elements from "./DOMElements.js";
import * as actions from './actions.js';

export function getCurrentSection() {
  return new Promise(resolve => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((section) => {
        if (section.intersectionRatio) {
          resolve(section.target);
          observer.disconnect();
        };
      });
    });

    elements.allSections.forEach((section) => {
      observer.observe(section);
    });
  });
}

let lastScroll = elements.container.scrollTop;
export function getScrollStatus() {
    const currentScroll = elements.container.scrollTop;
    let status = undefined;

    if (currentScroll > lastScroll) {
      status = "down";
    } 

    if (currentScroll < lastScroll) {
      status = "up";
    }

    lastScroll = currentScroll;
    return status;
}

export async function updateHash() {
  const currentSection = await getCurrentSection(); // já sem Promise/observer descartável, ver correção anterior
  if (!currentSection) return;

  const newHash = `#${currentSection.id}`;
  if (location.hash === newHash) return;

  history.replaceState(null, "", newHash);
  selectNavButton();
}

export function handleHeaderVisibility() {
  const scrollStatus = getScrollStatus();
  const showHeader   = actions.setMainHeaderVisibility;
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
  
  if (location.hash !== '#problems'){
    const currentLink = document.querySelector(`[href="${location.hash}"]`)
    if (currentLink) {
      currentLink.classList.add('selected-nav-link');
    }
  }
}

