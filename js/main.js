import { selectNavButton, updateHash, handleHeaderVisibility, getCurrentSection, handleLeadsInputs} from './navigation.js';
import { navHome, homeSection, container, buttonBackMobileMenu, buttonHamburguerMenu, links, linksContainer, allLinks, formBoxUser, formLeadsData, formInputName, formInputEmail, formInputPhone, formInputBusiness } from './DOMElements.js';
import { setMainHeaderVisibility, updateWindowTitle, hideMobileMenu, showMobileMenu, validateInputs } from './actions.js';
import { handleFormData } from './data_process.js';


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

container.addEventListener("click", () => {setMainHeaderVisibility(undefined)});
container.addEventListener("scroll", handleWheel);

buttonBackMobileMenu.addEventListener("click", hideMobileMenu);

buttonHamburguerMenu.addEventListener("click", showMobileMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
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


// em dev
//formBoxUser.forEach((element))
//formBoxUser.addEventListener("input", (event) => {
// console.log(event.target.id)
//});

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

formLeadsData.addEventListener("submit", async (event) => {
    event.preventDefault();

    const requiredData = [
      formInputName, 
      formInputEmail,
      formInputBusiness
    ];
    
    const isValidData = validateInputs(requiredData);
    
    if (!isValidData) return;

  const formData = new FormData(formLeadsData);

  try {
    const [success, result] = await handleFormData(formData);

    console.log("Sucesso:", success);
    console.log("Resposta:", result);

    if (success) {
      alert("Dados enviados com sucesso!");
    } else {
      alert("A API recusou os dados.");
      console.error("Resposta da API:", result);
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Não foi possível enviar os dados.");
  }
});

