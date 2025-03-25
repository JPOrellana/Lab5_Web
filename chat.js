// Eliminar márgenes predeterminados
document.body.style.margin = '0';

// Generar id del usuario 
let currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  currentUser = Math.random().toString(36).substring(2, 10);
  localStorage.setItem('currentUser', currentUser);
}

// Variable global para el tema actual 
let currentTheme = localStorage.getItem('theme') || 'light';

// Funcion para aplicar tema
function applyTheme(theme) {
  if (theme === 'dark') {

    document.body.style.backgroundColor = '#404040';
    document.body.style.color = '#f0f0f0';
    // Modo oscuro
    header.style.backgroundColor = '#000000';
    headerGradient.style.background = 'linear-gradient(to bottom, #000000, #404040)';
    // Contenedor de mensajes
    messagesContainer.style.backgroundColor = '#404040';
    // Textbox y botón enviar
    inputContainer.style.backgroundColor = '#404040';
    // Botón de enviar
    sendButton.style.backgroundColor = '#757575';
    sendButton.style.color = '#ffffff';

  } else {
    // Modo claro
    document.body.style.backgroundColor = '#2ac16a';
    document.body.style.color = '#000000';
    header.style.backgroundColor = '#007934';
    headerGradient.style.background = 'linear-gradient(to bottom, transparent, #2ac16a)';
    messagesContainer.style.backgroundColor = '#2ac16a';
    inputContainer.style.backgroundColor = '#2ac16a';
    sendButton.style.backgroundColor = '#01b15e';
    sendButton.style.color = '#ffffff';
  }
}

// Elementos del chat

// Contenedor principal 
const appContainer = document.createElement('div');
appContainer.style.display = 'flex';
appContainer.style.flexDirection = 'column';
appContainer.style.height = '100vh';
appContainer.style.width = '100%';
appContainer.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(appContainer);

// Encabezado 
const header = document.createElement('div');
header.style.position = 'relative';
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.padding = '10px 0';  // Sin padding lateral para ocupar todo el ancho
header.style.height = '120px';
header.style.width = '100%';

// Contenedor central para el logo
const headerCenter = document.createElement('div');
headerCenter.style.flex = '1';
headerCenter.style.display = 'flex';
headerCenter.style.justifyContent = 'center';
headerCenter.style.alignItems = 'center';

// Logo centrado
const logo = document.createElement('img');
logo.src = 'img/logo.png';
logo.alt = 'Logo';
logo.style.height = '100px';
logo.style.objectFit = 'contain';
logo.style.marginTop = '-20px'; // Elevar el logo un poco
logo.style.fontwidth = '100px';
headerCenter.appendChild(logo);

// Contenedor para el botón de tema
const headerRight = document.createElement('div');
headerRight.style.width = '180px';
headerRight.style.flexShrink = '0';
headerRight.style.display = 'flex';
headerRight.style.justifyContent = 'center';
headerRight.style.alignItems = 'center';

// Botón rectangular
const themeButton = document.createElement('button');
themeButton.style.padding = '10px 20px';
themeButton.style.borderRadius = '10px'; 
themeButton.style.border = 'none';
themeButton.style.fontWeight = 'bold';   
themeButton.style.display = 'flex';
themeButton.style.alignItems = 'center';
themeButton.style.cursor = 'pointer';
themeButton.style.outline = 'none';

// Texto dentro del botón
const themeButtonText = document.createElement('span');
themeButtonText.style.color = '#ffffff';  

// Imagen dentro del botón 
const themeButtonImg = document.createElement('img');
themeButtonImg.style.width = '30px';
themeButtonImg.style.height = '30px';
themeButtonImg.style.marginLeft = '10px';
themeButtonImg.style.objectFit = 'contain';

// Función para actualizar el contenido y estilo del botón según el tema
function updateThemeButton() {
  if (currentTheme === 'light') {
    // Modo claro
    themeButtonText.innerText = 'Oscuro';
    themeButtonText.style.fontSize = '20px';   
    themeButtonImg.src = 'img/luna.png';
    themeButton.style.backgroundColor = '#00ab49'; 
    themeButtonText.style.color = '#ffffff';      
  } else {
    // Modo oscuro
    themeButtonText.innerText = 'Claro';
    themeButtonImg.src = 'img/sol.png';
    themeButton.style.backgroundColor = '#9f9f9f'; 
    themeButtonText.style.color = '#ffffff';       
  }
}

// Inicializa el contenido del botón según el tema actual
updateThemeButton();

// Añadir texto e imagen al botón
themeButton.appendChild(themeButtonText);
themeButton.appendChild(themeButtonImg);

// Añadir el botón al contenedor de la derecha y éste al header
headerRight.appendChild(themeButton);
header.appendChild(headerCenter);
header.appendChild(headerRight);

// Agregar degradado 
const headerGradient = document.createElement('div');
headerGradient.style.position = 'absolute';
headerGradient.style.bottom = '0';
headerGradient.style.left = '0';
headerGradient.style.width = '100%';
headerGradient.style.height = '20px';
// Valor inicial 
headerGradient.style.background = 'linear-gradient(to bottom, transparent, #ffffff)';
header.appendChild(headerGradient);

// Header al contenedor principal
appContainer.appendChild(header);

// Contenedor de mensajes (cuerpo del chat)
const messagesContainer = document.createElement('div');
messagesContainer.style.flex = '0 0 67vh';
messagesContainer.style.overflowY = 'auto';
messagesContainer.style.padding = '10px';
messagesContainer.style.boxSizing = 'border-box';
messagesContainer.style.display = 'flex';
messagesContainer.style.flexDirection = 'column';
messagesContainer.style.backgroundColor = '#ffffff';
appContainer.appendChild(messagesContainer);

// Área de entrada 
const inputContainer = document.createElement('div');
inputContainer.style.display = 'flex';
inputContainer.style.padding = '10px';
inputContainer.style.borderTop = '1px solid #ccc';
inputContainer.style.alignItems = 'center';
inputContainer.style.width = '100%';
// Valor inicial (modo claro)
inputContainer.style.backgroundColor = '#007934';
appContainer.appendChild(inputContainer);


const messageInput = document.createElement('input');
messageInput.type = 'text';
messageInput.placeholder = 'Escribe tu mensaje (máximo 140 caracteres)...';
messageInput.maxLength = 140;
messageInput.style.width = '1370px';
messageInput.style.padding = '20px';
messageInput.style.fontSize = '16px';
messageInput.style.borderRadius = '8px';
inputContainer.appendChild(messageInput);


const sendButton = document.createElement('button');
sendButton.innerText = 'Enviar';
sendButton.style.fontSize = '20px';   
sendButton.style.fontWeight = 'bold';   
sendButton.style.marginLeft = '15px';
sendButton.style.width = '100px';
sendButton.style.padding = '18px';
sendButton.style.backgroundColor = '#0b6431';
sendButton.style.color = '#ffffff';
sendButton.style.border = 'none';
sendButton.style.borderRadius = '8px';
sendButton.style.transition = 'transform 0.2s ease';
inputContainer.appendChild(sendButton);


sendButton.addEventListener('mouseenter', () => {
  sendButton.style.transform = 'scale(1.05)';
});
sendButton.addEventListener('mouseleave', () => {
  sendButton.style.transform = 'scale(1)';
});


// APLICAR EL TEMA 
applyTheme(currentTheme);

// EVENTOS Y FUNCIONALIDAD DEL CHAT

// Alternar tema al hacer clic en el botón de tema
themeButton.addEventListener('click', () => {
  currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  updateThemeButton();       
  applyTheme(currentTheme); 
});

// URL del API del chat
const apiUrl = 'https://chat.devng.online/chats';

// Animar la aparición de cada mensaje 
function animateMessage(element) {
  element.style.opacity = 0;
  let last = +new Date();
  const tick = function() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+element.style.opacity < 1) {
      requestAnimationFrame(tick);
    } else {
      element.style.opacity = 1;
    }
  };
  tick();
}

// Función para crear burbuja de chat
function createMessageElement(message) {
  const { id, text, user } = message;
  const messageEl = document.createElement('div');
  messageEl.style.marginBottom = '15px';
  messageEl.style.padding = '10px';
  messageEl.style.borderRadius = '15px';
  messageEl.style.maxWidth = '70%';
  messageEl.style.wordWrap = 'break-word';

  if (user === currentUser) {
    messageEl.style.alignSelf = 'flex-end';
    messageEl.style.backgroundColor = currentTheme === 'dark' ? '#4c4c4c' : '#dcf8c6';
  } else {
    messageEl.style.alignSelf = 'flex-start';
    messageEl.style.backgroundColor = currentTheme === 'dark' ? '#1e1e1e' : '#f9f9f9';
  }
  
  messageEl.innerText = text;
  
  // Detectar links a imágenes y crear preview
  const imageRegex = /(https?:\/\/\S+\.(jpg|jpeg|png|gif))/i;
  const imgMatch = text.match(imageRegex);
  if (imgMatch) {
    const imgUrl = imgMatch[1];
    const imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.style.maxWidth = '100%';
    imgEl.style.display = 'block';
    imgEl.style.marginTop = '10px';
    messageEl.appendChild(imgEl);
  }
  
  // Detectar links a páginas web (no imágenes) y crear preview
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  if (urls) {
    urls.forEach(url => {
      if (!url.match(/\.(jpg|jpeg|png|gif)$/i)) {
        const linkPreview = document.createElement('div');
        linkPreview.style.border = '1px solid #aaa';
        linkPreview.style.padding = '5px';
        linkPreview.style.marginTop = '10px';
        linkPreview.style.borderRadius = '3px';
        const linkEl = document.createElement('a');
        linkEl.href = url;
        linkEl.target = '_blank';
        linkEl.innerText = url;
        linkPreview.appendChild(linkEl);
        messageEl.appendChild(linkPreview);
      }
    });
  }
  
  animateMessage(messageEl);
  return messageEl;
}

// Función asíncrona para obtener los mensajes del servidor
async function fetchMessages() {
  try {
    const response = await fetch(apiUrl);
    const messages = await response.json();
    console.log('Mensajes recibidos:', messages);
    
    // Guardar posición actual del scroll
    const scrollTopBefore = messagesContainer.scrollTop;
    messagesContainer.innerHTML = '';
    messages.forEach(msg => {
      const messageEl = createMessageElement(msg);
      messagesContainer.appendChild(messageEl);
    });
    messagesContainer.scrollTop = scrollTopBefore;
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
  }
}

// Función asíncrona para enviar un mensaje al servidor
async function sendMessage(text) {
  try {
    const payload = { text, user: currentUser };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      console.log('Mensaje enviado:', text);
      await fetchMessages();
    } else {
      console.error('Error al enviar mensaje:', response.statusText);
    }
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
  }
}

// Enviar mensaje con la tecla "Enter"
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const text = messageInput.value.trim();
    if (text !== '') {
      sendMessage(text);
      messageInput.value = '';
    }
  }
});

// Enviar mensaje al hacer clic en el botón "Enviar"
sendButton.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text !== '') {
    sendMessage(text);
    messageInput.value = '';
  }
});

// Obtener mensajes al iniciar y refrescarlos cada 5 segundos
fetchMessages();
setInterval(fetchMessages, 5000);
