import * as element from './DOMElements.js';
import * as MNavigation from './navigation.js'

export function setMainHeaderVisibility(visible) {
  if (visible !== undefined) {
    element.mainHeader.classList.toggle("hide", !visible)
  } else {
    element.mainHeader.classList.toggle("hide");
  }
}

export async function updateWindowTitle() {
  const currentSection = await MNavigation.getCurrentSection();
  document.title = `Axion Project - ${currentSection.id}`;
}