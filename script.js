// dark mode

// Animação da malha quadriculada (mantida)
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const canvas = document.getElementById('bg');

// aplica o fundo do canvas a partir da variável CSS atual
function applyCanvasBackground() {
  const bg = getComputedStyle(document.body).getPropertyValue('--background-color')?.trim() || '#0d0d0d';
  canvas.style.background = bg;
}

// inicializa ícone e tema a partir do localStorage
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  body.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
} else {
  body.classList.remove('light-mode');
  themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
}
applyCanvasBackground(); // garante que o canvas já esteja coerente no load

// alterna tema ao clicar e salva escolha
themeToggle.addEventListener('click', () => {
  const isLight = body.classList.toggle('light-mode');
  if (isLight) {
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }
  applyCanvasBackground(); // atualiza fundo do canvas imediatamente
});

/* Grid / partículas: use a variável --grid-color dinamicamente */
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const gridSize = 50;

function drawGrid() {
  // pega a cor da variável CSS (trim para remover quebras)
  const gridColor = getComputedStyle(document.body).getPropertyValue('--grid-color')?.trim() || 'rgba(200,200,255,0.05)';
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  applyCanvasBackground(); // reajusta se necessário
});

// dark mode

// Efeito de digitação corrigido na seção Home
// --- DADOS PARA O EFEITO ---
const roles = ["Developer", "Designer", "Creator"]; 
const descriptions = [
    "Construo experiências digitais criativas e funcionais para todos os dispositivos.", 
    "Crio interfaces intuitivas e designs centrados no usuário que encantam.",
    "Dou vida a ideias, transformando conceitos em produtos digitais funcionais."
]; 
let textIndex = 0; 

const dynamicTextElement = document.getElementById('dynamic-text');
const dynamicDescriptionElement = document.getElementById('dynamic-description'); 

// AJUSTES DE VELOCIDADE
const roleSpeed = 120; // Velocidade de digitação do CARGO (um pouco mais lenta que antes)
const descriptionSpeed = 40; // Velocidade de digitação da DESCRIÇÃO (deve ser mais lenta para textos longos)
const pauseTime = 2500; // Tempo de pausa após TUDO ser digitado (aumentado para leitura)
const deleteSpeed = 40; // Velocidade de apagar (agora a mesma para ambos)

// 1. Digitar o Cargo (H1)
function typeRole() {
    const currentRole = roles[textIndex];
    let i = 0;

    function addCharacter() {
        if (i < currentRole.length) {
            dynamicTextElement.textContent += currentRole.charAt(i);
            i++;
            setTimeout(addCharacter, roleSpeed);
        } else {
            // Terminou de digitar o cargo. Começa a digitar a descrição.
            typeDescription();
        }
    }
    
    addCharacter();
}

// NOVO: 2. Digitar a Descrição (Parágrafo)
function typeDescription() {
    const currentDescription = descriptions[textIndex];
    let j = 0;

    function addDescriptionCharacter() {
        if (j < currentDescription.length) {
            // Adiciona a próxima letra ao parágrafo
            dynamicDescriptionElement.textContent += currentDescription.charAt(j);
            j++;
            setTimeout(addDescriptionCharacter, descriptionSpeed);
        } else {
            // Terminou de digitar a descrição. Próxima ação: pausar e depois apagar.
            setTimeout(erase, pauseTime);
        }
    }
    
    addDescriptionCharacter();
}

// 3. Apagar o texto (Agora apaga o Parágrafo e depois o H1)
function erase() {
    
    // Primeiro, apaga o parágrafo
    function eraseDescription() {
        let currentDesc = dynamicDescriptionElement.textContent;
        let j = currentDesc.length;

        function removeDescCharacter() {
            if (j > 0) {
                dynamicDescriptionElement.textContent = currentDesc.substring(0, j - 1);
                j--;
                setTimeout(removeDescCharacter, deleteSpeed);
            } else {
                // Parágrafo apagado. Começa a apagar o Cargo.
                eraseRole();
            }
        }
        removeDescCharacter();
    }
    
    // Segundo, apaga o cargo
    function eraseRole() {
        let currentRole = dynamicTextElement.textContent;
        let i = currentRole.length;

        function removeRoleCharacter() {
            if (i > 0) {
                dynamicTextElement.textContent = currentRole.substring(0, i - 1);
                i--;
                setTimeout(removeRoleCharacter, deleteSpeed);
            } else {
                // Tudo apagado. Cicla para o próximo texto e recomeça.
                textIndex = (textIndex + 1) % roles.length; 
                typeRole();
            }
        }
        removeRoleCharacter();
    }
    
    // Inicia o processo de apagar a descrição
    eraseDescription();
}


// Início do ciclo (controlado pelo IntersectionObserver)
function startTypingLoop() {
    dynamicTextElement.textContent = ''; 
    dynamicDescriptionElement.textContent = ''; 
    typeRole();
}


// Observador para iniciar a animação apenas quando a seção Home estiver visível
const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypingLoop();
            homeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); 

homeObserver.observe(document.getElementById('home'));



//modal de certificados

// Modal de zoom para certificados (requere o HTML do modal presente na página)
document.querySelectorAll('#certificados .card .overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        e.stopPropagation();
        const img = this.parentNode.querySelector('img');
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        modalImg.src = img.src;
        modal.style.display = 'flex';
    });
});
document.querySelector('.image-modal-close').onclick = function() {
    document.getElementById('image-modal').style.display = 'none';
};
document.getElementById('image-modal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};


//modal de certificados


document.addEventListener('DOMContentLoaded', () => {
  // NAVBAR MOBILE (hamburguer)
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('header nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // --- TABS PORTFÓLIO ---
  const tabs = document.querySelectorAll('.tabs button');
  const contents = document.querySelectorAll('.tab-content');
  function activateTab(tabId) {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-content .card').forEach(card => card.classList.remove('visible'));
    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    const content = document.getElementById(tabId);
    if (btn && content) {
      btn.classList.add('active');
      content.classList.add('active');
      const cards = content.querySelectorAll('.card');
      cards.forEach((card, i) => setTimeout(() => card.classList.add('visible'), i * 120));
    }
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });
  activateTab('projetos');

  // --- SLIDESHOW ---
  document.querySelectorAll('.slideshow-container').forEach(container => {
    const slides = container.querySelectorAll('.slide');
    let current = 0, interval;
    function showSlide(n) {
      slides.forEach(slide => slide.style.display = 'none');
      slides[n].style.display = 'flex';
    }
    function nextSlide(dir = 1) {
      current = (current + dir + slides.length) % slides.length;
      showSlide(current);
    }
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    if (prev && next) {
      prev.addEventListener('click', () => { nextSlide(-1); resetInterval(); });
      next.addEventListener('click', () => { nextSlide(1); resetInterval(); });
    }
    function startInterval() {
      interval = setInterval(() => nextSlide(1), 5000);
    }
    function resetInterval() {
      clearInterval(interval);
      startInterval();
    }
    showSlide(current);
    startInterval();
    container.addEventListener('mouseenter', () => clearInterval(interval));
    container.addEventListener('mouseleave', startInterval);
  });

  // --- NAVBAR ACTIVE ON SCROLL ---
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = Array.from(document.querySelectorAll('section')).filter(sec => sec.id);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const currentId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href').substring(1) === currentId);
        });
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.6 });
  sections.forEach(section => observer.observe(section));
});

// responsividade