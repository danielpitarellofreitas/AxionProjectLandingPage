import * as element from './DOMElements.js';
import * as MNavigation from './navigation.js';
import { handleFormData } from './data_process.js';
import { setIsSubmiting } from './state.js';

export function setMainHeaderVisibility(visible) {
  const currentElementReference = element.container.querySelector("header");
  
  if (visible !== undefined) {
    if(visible != true) {
      element.container.style.marginTop = "0px";
    } else {
      element.container.style.marginTop = "var(--height-header-desktop)";
    }
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

  return isValidData;
}


export function messageBox(message) {
  return new Promise((resolve) => {
    const title = document.querySelector(".msg-title");
    const content = document.querySelector(".msg-content");
    const button = document.querySelector(".msg-button");

    title.textContent = message.title;
    content.textContent = message.content;
    button.textContent = message.buttonText;

    element.messageContainer.style.display = "flex";

    requestAnimationFrame(() => {
      element.messageContainer.classList.add("show");
    });

    button.onclick = () => {
      closeMessageBox();
      resolve();
    };
  });
}

export function closeMessageBox() {
  element.messageContainer.classList.remove("show");

  setTimeout(() => {
    element.messageContainer.style.display = "none";
  }, 300);
}

/* comunicação */
export async function handleApiRequest() {
  const formData = new FormData(element.formLeadsData);
  let statusMessage;

  try { 
    const [success, result] = await handleFormData(formData);

    console.log("Sucesso:", success);
    console.log("Resposta:", result);

    if (success) {
      statusMessage = {
        title: `Bem-vindo ${formData.get("input-name")}`,
        content: `Olá, ${formData.get("input-name").trim().split(" ")[0]}! Ficamos felizes que gostou do projeto. Fique atento ao seu email ou WhatsApp para ficar por dentro das novidades!`,
        buttonText: "OK"
      }
    } else {
      const message = handleApiDatavalidation(result);
      statusMessage = {
        title: "Erro",
        content: message,
        buttonText: 'OK'
      }
    }
  } catch (error) {
      statusMessage = {
        title: "Erro Interno",
        content: "Houve uma falha de conexão, ou problemas de comunicação em nossos servidores. Pedimos q tente novamente!",
        buttonText: "OK"
      }
  } finally {
      await messageBox(statusMessage);
      setIsSubmiting(false);
  } 
}