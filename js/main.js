const allSections = document.querySelectorAll("section");
const homeSection = document.querySelector("#home");
const problemsSection = document.querySelector("#problems");
const howItWorksSection = document.querySelector("#how-it-works");

const navHome = document.getElementById("nav-home");
const navProblems = document.getElementById("nav-problems");
const navHowItWorks = document.getElementById("nav-how-it-works");
const navBenefits = document.getElementById("nav-benefits");

function main(){

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

function start() {
  window.history.scrollRestoration = "manual";

  homeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navHome.classList.add("selected-nav-link");
}

window.addEventListener("load", start);
window.addEventListener("hashchange", main);



