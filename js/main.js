const allSections = document.querySelectorAll("section");
const homeSection = document.querySelector("#home");
const problemsSection = document.querySelector("#problems");
const howItWorksSection = document.querySelector("#how-it-works");

const navHome = document.getElementById("nav-home");
const navHowItWorks = document.getElementById("nav-how-it-works");
const navBenefits = document.getElementById("nav-benefits");

function start() {
  window.history.scrollRestoration = "manual";

  homeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navHome.classList.add("selected-nav-link");
}

window.addEventListener("DOMContentLoaded", start);

