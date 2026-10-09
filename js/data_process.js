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