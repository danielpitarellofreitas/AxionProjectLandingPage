
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