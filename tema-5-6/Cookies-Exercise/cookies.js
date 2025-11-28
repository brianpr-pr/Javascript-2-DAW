document.addEventListener('DOMContentLoaded', () => {
  const ul = document.querySelector('ul');
  ul.innerHTML = listCookies();
  const button = document.getElementById('create');
  const key = document.getElementById('key');
  const value = document.getElementById('value');
  const message = document.getElementById('message');  
  message.innerHTML = '';
  const deleteButton = document.getElementById('deleteButton');
  const keyToDelete = document.getElementById('delete');

  button.addEventListener('click', (event) =>{
    try{        
      if(key.value.trim() === ''){
        throw new Error('Please insert a key');  
      }

      if(value.value.trim() === ''){
        throw new Error('Please insert a value');  
     }

      document.cookie = `${key.value}=${value.value}`;
      key.value = '';
      value.value = '';
      ul.innerHTML = listCookies();

    message.innerHTML = 'Cookie created successfully';
    message.style.color = 'green';

    }catch(e){
      message.innerHTML = e.message;
      message.style.color = 'red';
    }  
  });

  deleteButton.addEventListener('click', (event) =>{
    if(keyToDelete.value.trim() !== ''){
      document.cookie = `${keyToDelete.value}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      ul.innerHTML = listCookies();
    }  
  });
});
function listCookies(){
  const cookies = document.cookie.split(';');
  let resultado = '';

  cookies.forEach(cookie => {
    cookieSplited = cookie.split('=');

    resultado += `<li>Key: ${cookieSplited[0]} Value: ${cookieSplited[1]}</li>`;
  });

  return (resultado) ? resultado : 'Cookies list is empty';
}