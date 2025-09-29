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


// MENU HAMBURGUER
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
menuToggle.addEventListener('click',()=>{
nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});


// TABS
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
tabBtns.forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
tabPanels.forEach(p=>p.style.display='none');
document.getElementById(btn.dataset.tab).style.display='block';
});
});


// SLIDESHOWS
function initCarousel(carousel){
const slides = carousel.querySelectorAll('.slides img');
let index = 0;
function showSlide(i){
slides.forEach((s,idx)=> s.style.display = idx===i? 'block':'none');
}
showSlide(index);
const prev = carousel.querySelector('.prev');
const next = carousel.querySelector('.next');
prev.addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;showSlide(index)});
next.addEventListener('click',()=>{index=(index+1)%slides.length;showSlide(index)});
setInterval(()=>{index=(index+1)%slides.length;showSlide(index)},5000);
}
document.querySelectorAll('[data-carousel]').forEach(initCarousel);


// MODAL CERTIFICADOS
const modal = document.getElementById('modal');
const zoomBtns = document.querySelectorAll('.zoom-btn');
zoomBtns.forEach(btn=>{
btn.addEventListener('click',()=>{
modal.innerHTML = `<div class="modal-img"><button class="close">&times;</button><img src="${btn.dataset.src}" alt="certificado"></div>`;
modal.style.display='block';
modal.querySelector('.close').onclick=()=>{modal.style.display='none'};
modal.onclick=(e)=>{if(e.target===modal) modal.style.display='none'};
});
});


// EFEITO DIGITAÇÃO
function typingEffect(el,text,speed=80,delay=1200){
let i=0;
function type(){
if(i<text.length){
el.innerHTML += text.charAt(i);
i++;
setTimeout(type,speed);
} else {
setTimeout(()=>{
el.innerHTML='';
i=0;
type();
},delay);
}
}
el.innerHTML='';
type();
}
const title = document.getElementById('hero-title');
const desc = document.getElementById('hero-desc');
typingEffect(title,'Front-End Developer',80,2000);
typingEffect(desc,'Dev Front-End em evolução, que constroe experiências digitais criativas e funcionais para todos os dispositivos.',40,2500);

