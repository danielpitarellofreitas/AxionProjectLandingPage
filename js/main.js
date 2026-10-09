import { selectNavButton, updateHash, handleHeaderVisibility, getCurrentSection, handleLeadsInputs} from './navigation.js';
import { navHome, homeSection, container, buttonBackMobileMenu, buttonHamburguerMenu, links, linksContainer, allLinks, formBoxUser, formLeadsData, formInputName, formInputEmail, formInputPhone, formInputBusiness } from './DOMElements.js';
import { setMainHeaderVisibility, updateWindowTitle, hideMobileMenu, showMobileMenu } from './actions.js';
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


formLeadsData.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const requiredData = [
    formInputName, 
    formInputEmail,
    formInputBusiness
  ];

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

