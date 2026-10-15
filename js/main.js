import { updateHash, getScrollStatus} from './navigation.js';
import { selectNavButton } from './behavior.js'; 
import { navHome, homeSection, container, buttonBackMobileMenu, buttonHamburguerMenu, allLinks, formBoxUser, formLeadsData, mobileNavigation, links, aboutProjSection, aboutProjText, aboutProjArrow } from './DOMElements.js';
import { setMainHeaderVisibility, updateWindowTitle, hideMobileMenu, showMobileMenu, messageBox, handleApiRequest } from './actions.js';
import { handleFormSubmission } from './data_process.js';
import { isSubmiting, setIsSubmiting } from './state.js'

let showHeader;

async function handleHeaderVisibility() {
  const scrollStatus = getScrollStatus();
  const setHeaderVisible   = setMainHeaderVisibility;

  switch(scrollStatus) {
    case "down":
      showHeader = false;
      break;
    case "up":
      showHeader = true;
      break;
  }
  
  setHeaderVisible(showHeader)
}

function handleWheel() {
  updateHash();
  updateWindowTitle();
  handleHeaderVisibility();
}

function start() {
  showHeader = true
  window.history.scrollRestoration = "manual";

  homeSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  navHome.classList.add("selected-nav-link");
}

async function handleSubmit(e) {
  e.preventDefault(); 

  if(isSubmiting) return;

  setIsSubmiting(true);

  const isValidForm = handleFormSubmission();

  if(!isValidForm) return;

  try {
    await messageBox({
      title: "Dados enviados!",
      content: "Seus dados foram enviados! Aguarde um momento.",
      buttonText: "Ok"
    });
  
    await handleApiRequest();

  } finally {
    setIsSubmiting(false);
  }
}

function phoneFormat(input){
  let inputValue = input.replace(/\D/g, "").slice(0, 11);

  if(inputValue.length > 7) {
    inputValue = inputValue.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  }

  else if(inputValue.length > 6) {
    inputValue = inputValue.replace(/^(\d{2})(\d{5})/, "($1) $2");
  }

  else if(inputValue.length > 0) {
    inputValue = inputValue.replace(/^(\d{0,2})/, "($1)");
  }
  return inputValue;
}

window.addEventListener("load", start);
window.addEventListener("wheel", handleWheel);
window.addEventListener("hashchange", selectNavButton);

container.addEventListener("click", () => {
  if(!mobileNavigation.classList.contains("hide")) 
    return;

  showHeader = !showHeader;
  setMainHeaderVisibility(showHeader);
});
container.addEventListener("scroll", handleWheel);


buttonBackMobileMenu.addEventListener("click", hideMobileMenu);
buttonHamburguerMenu.addEventListener("click", showMobileMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
    showHeader = !showHeader;
    
    setMainHeaderVisibility(showHeader);
    hideMobileMenu();
  })
});

allLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const href = link.href;

    setTimeout(() => {
      if (link.target === "_blank") {
        window.open(href, "_blank");
      } else {
        window.location.href = href;
      }
    }, 500);
  });
});


formBoxUser.forEach((boxUser) => {
  const input = boxUser.firstElementChild.tagName == "INPUT" ? boxUser.firstElementChild : false;
  if(!input) 
    return;
  else {
    let isEmpty;
    
    input.addEventListener("input", () => {
      input.value = input.id == "input-phone" ? phoneFormat(input.value)  : input.value;

      isEmpty = input.value === "" ? false : true;
      isEmpty ? input.classList.add("has-value") : input.classList.remove("has-value");
    });
  }
});


formLeadsData.addEventListener("submit", handleSubmit);


aboutProjText.addEventListener("scroll", () => {
  const scrollEndend = aboutProjText.clientHeight + aboutProjText.scrollTop >= aboutProjText.scrollHeight -19;
  
  if(scrollEndend) {
    aboutProjArrow.style.display = "none";
  } else {
    aboutProjArrow.style.display = "flex";  
  }
});

