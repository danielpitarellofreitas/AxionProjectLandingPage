export async function handleFormData(formData){
  const lead = {
    "name": formData.get("input-name"),
    "email": formData.get("input-email"),
    "phone": formData.get("input-phone"),
    "business": formData.get("input-business")
  };

  try {
    const response = await sendData(lead);
    const data =  await response.json();

    if(!response.ok) {
      return [false, data];
    }
    
    return [true, data];

  } catch (error) {
      console.log("falha na requisição: ", error);
      throw error;
  }
  
}

export async function sendData(lead){
  const response = await fetch("https://axionprojectlandingpage.onrender.com/save-lead",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(lead)
    }
  );

  return response;
}


// Resposta da api
export function handleApiDatavalidation(response) {
  let message;
  const error = response.detail[0];


  const inputType = document.querySelector(
    `[for="input-${error.loc[1]}"]`
  );

  if(response.detail.length == 1) {
    
    switch(error.type) {
      case "string_too_long":
      case "too_long":
        message = `O campo de "${inputType.textContent}" nao pode conter mais que ${error.ctx.max_length} caracteres.`;
        break;

      case "string_too_short": 
      case "too_short":
        message = `O campo de "${inputType.textContent}" nao pode conter menos que ${error.ctx.min_length} caracteres.`;
        break;
      
      default:
        message = "Houve um erro inesperado.";
    } 
  }
  return message;

}