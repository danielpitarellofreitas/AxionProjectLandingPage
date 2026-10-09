import * as element from './DOMElements.js';
import * as MNavigation from './navigation.js';

export function setMainHeaderVisibility(visible) {
  if (visible !== undefined) {
    element.mainHeader.classList.toggle("hide", !visible)
  } else {
    element.mainHeader.classList.toggle("hide");
  }
}

export function hideMobileMenu() {
  element.mobileNavigation.classList.add("hide");
  element.buttonHamburguerMenu.classList.remove("active");

  element.container.style.overflow = "auto";
  
}

export function showMobileMenu() {
  element.mobileNavigation.classList.remove("hide");
  element.buttonHamburguerMenu.classList.add("active");

  element.container.style.overflow = "hidden";
}

export async function updateWindowTitle() {
  const currentSection = await MNavigation.getCurrentSection();
  document.title = `Axion Project - ${currentSection.id}`;
}


export function validateInputs(requiredData) {

  let isValidData = true;
  requiredData.forEach(data => {
    const label   = document.querySelector(`[for=${data.id}]`);
    const isEmpty = data.value.trim() === "";

    data.style.borderColor = isEmpty ? "red" : "";

    if(label) {
      label.style.color = isEmpty ? "red" : "";
    }

    if(isEmpty) {
      isValidData = false;
    };
  });

  if (!isValidData) 
    return false;
}
