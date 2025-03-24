// Eliminar márgenes predeterminados para que todo ocupe el 100% del ancho
document.body.style.margin = '0';

// Generar o recuperar el id del usuario para identificar mensajes propios
let currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
  currentUser = Math.random().toString(36).substring(2, 10);
  localStorage.setItem('currentUser', currentUser);
}

// Variables globales para poder actualizar estilos en applyTheme
let currentTheme = localStorage.getItem('theme') || 'light';
let header, headerGradient, messagesContainer, inputContainer, sendButton;

// Función para aplicar el tema (modo claro u oscuro)
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#404040';
    document.body.style.color = '#f0f0f0';
    // Encabezado en modo oscuro: fondo se fija en #2e2e2e y se aplica degradado
    header.style.backgroundColor = '#2e2e2e';
    headerGradient.style.background = 'linear-gradient(to bottom, #2e2e2e, #404040)';
    // Cuerpo del chat
    messagesContainer.style.backgroundColor = '#404040';
    // Área de entrada
    inputContainer.style.backgroundColor = '#404040';
    // Botón enviar
    sendButton.style.backgroundColor = '#757575';
  } else {
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000000';
    header.style.backgroundColor = '#007934';
    headerGradient.style.background = 'linear-gradient(to bottom, #007934, #ffffff)';
    messagesContainer.style.backgroundColor = '#ffffff';
    inputContainer.style.backgroundColor = '#007934';
    sendButton.style.backgroundColor = '#01b15e';
  }
}
applyTheme(currentTheme);

// Contenedor principal que ocupa el 100% del ancho y alto de la ventana
const appContainer = document.createElement('div');
appContainer.style.display = 'flex';
appContainer.style.flexDirection = 'column';
appContainer.style.height = '100vh';
appContainer.style.width = '100%';
appContainer.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(appContainer);

// =====================================
// Encabezado (header)
// =====================================
header = document.createElement('div');
header.style.position = 'relative';
header.style.display = 'flex';
header.style.alignItems = 'center';
header.style.padding = '10px 0';  // Sin padding lateral para ocupar todo el ancho
header.style.height = '140px';      // Encabezado más alto
header.style.width = '100%';

// Para centrar el logo y ubicar el botón de tema más cerca del centro, usamos dos contenedores:
// uno central para el logo y otro a la derecha (con ancho fijo pero menor)
const headerCenter = document.createElement('div');
headerCenter.style.flex = '1';
headerCenter.style.display = 'flex';
headerCenter.style.justifyContent = 'center';
headerCenter.style.alignItems = 'flex-start'; // Logo más arriba

// Logo (más grande y elevado)
const logoImage = document.createElement('img');
logoImage.src = 'img/logo.png';
logoImage.alt = 'Logo';
logoImage.style.height = '90px'; // Logo más grande
logoImage.style.objectFit = 'contain';
logoImage.style.marginTop = '-15px'; // Elevar el logo
headerCenter.appendChild(logoImage);

// Contenedor para el botón de tema (más cercano al centro)
const headerRight = document.createElement('div');
headerRight.style.width = '80px';  // Ancho reducido para acercarlo
headerRight.style.flexShrink = '0';
headerRight.style.display = 'flex';
headerRight.style.justifyContent = 'center';
headerRight.style.alignItems = 'center';

// Botón de cambio de tema (50x50 px, perfectamente circular)
const themeButton = document.createElement('button');
themeButton.style.width = '50px';
themeButton.style.height = '50px';
themeButton.style.borderRadius = '50%';
themeButton.style.border = 'none';
themeButton.style.outline = 'none';
themeButton.style.cursor = 'pointer';
themeButton.style.backgroundColor = 'transparent';

const themeImage = document.createElement('img');
themeImage.src = currentTheme === 'light' ? 'img/luna.png' : 'img/sol.png';
themeImage.alt = 'Cambiar tema';
themeImage.style.width = '100%';
themeImage.style.height = '100%';
themeImage.style.borderRadius = '50%';

themeButton.appendChild(themeImage);
headerRight.appendChild(themeButton);

// Agregar el contenedor central y el de botón al header
header.appendChild(headerCenter);
header.appendChild(headerRight);

// Degradado en la parte inferior del header
headerGradient = document.createElement('div');
headerGradient.style.position = 'absolute';
headerGradient.style.bottom = '0';
headerGradient.style.left = '0';
headerGradient.style.width = '100%';
headerGradient.style.height = '20px';
headerGradient.style.background = 'linear-gradient(to bottom, #007934, #ffffff)';
header.appendChild(headerGradient);

appContainer.appendChild(header);

// Evento para cambiar de tema
themeButton.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  themeImage.src = currentTheme === 'light' ? 'img/luna.png' : 'img/sol.png';
  applyTheme(currentTheme);
});

// =====================================
// Cuerpo del chat (área de mensajes)
// =====================================
messagesContainer = document.createElement('div');
messagesContainer.style.flex = '1';
messagesContainer.style.overflowY = 'auto';
messagesContainer.style.padding = '10px';
messagesContainer.style.boxSizing = 'border-box';
messagesContainer.style.display = 'flex';
messagesContainer.style.flexDirection = 'column';
messagesContainer.style.width = '100%';
messagesContainer.style.backgroundColor = '#ffffff';
appContainer.appendChild(messagesContainer);

// =====================================
// Área de entrada (textbox y botón enviar)
// =====================================
inputContainer = document.createElement('div');
inputContainer.style.display = 'flex';
inputContainer.style.padding = '10px';
inputContainer.style.borderTop = '1px solid #ccc';
inputContainer.style.alignItems = 'center';
inputContainer.style.width = '100%';
inputContainer.style.backgroundColor = '#007934';
appContainer.appendChild(inputContainer);

// Textbox: fondo blanco, bordes redondeados y que ocupe el ancho disponible
const messageInput = document.createElement('input');
messageInput.type = 'text';
messageInput.placeholder = 'Escribe tu mensaje (máximo 140 caracteres)...';
messageInput.maxLength = 140;
messageInput.style.flex = '1';
messageInput.style.padding = '10px';
messageInput.style.fontSize = '16px';
messageInput.style.backgroundColor = '#ffffff';
messageInput.style.border = 'none';
messageInput.style.borderRadius = '15px';
inputContainer.appendChild(messageInput);

// Botón enviar: texto en negrita, fuente grande, con fondo y bordes redondeados
sendButton = document.createElement('button');
sendButton.innerText = 'Enviar';
sendButton.style.marginLeft = '10px';
sendButton.style.padding = '10px';
sendButton.style.fontWeight = 'bold';
sendButton.style.fontSize = '18px';
sendButton.style.backgroundColor = '#01b15e';
sendButton.style.color = '#ffffff';
sendButton.style.border = 'none';
sendButton.style.borderRadius = '5px';
inputContainer.appendChild(sendButton);

// =====================================
// Funcionalidad del chat
// =====================================
const apiUrl = 'https://chat.devng.online/chats';

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

async function fetchMessages() {
  try {
    const response = await fetch(apiUrl);
    const messages = await response.json();
    console.log('Mensajes recibidos:', messages);
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

sendButton.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text !== '') {
    sendMessage(text);
    messageInput.value = '';
  }
});

fetchMessages();
setInterval(fetchMessages, 5000);
