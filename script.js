//   dark mode

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

  function drawGrid(){
    // pega a cor da variável CSS (trim para remover quebras)
    const gridColor = getComputedStyle(document.body).getPropertyValue('--grid-color')?.trim() || 'rgba(200,200,255,0.05)';
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for(let x=0;x<width;x+=gridSize){
      ctx.beginPath();
      ctx.moveTo(x,0);
      ctx.lineTo(x,height);
      ctx.stroke();
    }
    for(let y=0;y<height;y+=gridSize){
      ctx.beginPath();
      ctx.moveTo(0,y);
      ctx.lineTo(width,y);
      ctx.stroke();
    }
  }

  function animate(){
    ctx.clearRect(0,0,width,height);
    drawGrid();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    applyCanvasBackground(); // reajusta se necessário
  });

//   dark mode

// Efeito de digitação corrigido na seção Home
  function startTypingEffect() {
    const h1 = document.getElementById('home').querySelector('h1');
    const h2 = document.getElementById('home').querySelector('h2');
    
    h1.style.animation = 'typing 2s steps(15) forwards, blink 0.75s step-end infinite';
    
    // Atraso para a animação do h2 começar após a do h1
    h2.style.animation = 'none'; // Reseta a animação antes de iniciar
    setTimeout(() => {
      h2.style.animation = 'typing2 2s steps(10) forwards, blink 0.75s step-end infinite';
    }, 2000); // 2 segundos de atraso (duração da animação do h1)
  }

  // Observa a seção Home e inicia a animação apenas quando ela está visível
  const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startTypingEffect();
        // Para de observar após a primeira vez para não reiniciar
        homeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Inicia quando metade da seção Home está visível

  homeObserver.observe(document.getElementById('home'));







//modal de certificados


 document.addEventListener('DOMContentLoaded', () => {
            const certificadosSection = document.getElementById('certificados');
            const imageModal = document.getElementById('image-modal');
            const modalImage = document.getElementById('modal-image');
            const closeButton = document.querySelector('.image-modal-close');

            if (certificadosSection && imageModal && modalImage && closeButton) {
                // Adiciona um listener de clique na seção de certificados
                certificadosSection.addEventListener('click', (event) => {
                    const card = event.target.closest('.card');
                    if (card) {
                        const img = card.querySelector('img');
                        if (img && img.src) {
                            // Define a fonte da imagem do modal e a exibe
                            modalImage.src = img.src;
                            imageModal.style.display = 'flex';
                        }
                    }
                });

                // Fecha o modal ao clicar no botão de fechar ou fora da imagem
                closeButton.addEventListener('click', () => {
                    imageModal.style.display = 'none';
                });

                imageModal.addEventListener('click', (event) => {
                    if (event.target === imageModal) {
                        imageModal.style.display = 'none';
                    }
                });
            }
        });


//modal de certificados




document.addEventListener('DOMContentLoaded', () => {

    // Variaveis e funções do Slideshow (mantidas)
    let slideIndex1 = 0;
    let slideIndex2 = 0;
    let slideshowInterval1;
    let slideshowInterval2;

    function showSlides1() {
        const slides = document.getElementsByClassName("mySlides1");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex1++;
        if (slideIndex1 > slides.length) { slideIndex1 = 1; }
        slides[slideIndex1 - 1].style.display = "block";
    }

    function showSlides2() {
        const slides = document.getElementsByClassName("mySlides2");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex2++;
        if (slideIndex2 > slides.length) { slideIndex2 = 1; }
        slides[slideIndex2 - 1].style.display = "block";
    }

    // Funções de navegação manual do slideshow (mantidas)
    window.plusSlides1 = function(n) {
        clearInterval(slideshowInterval1);
        slideIndex1 += n;
        const slides = document.getElementsByClassName("mySlides1");
        if (slideIndex1 > slides.length) { slideIndex1 = 1; }
        if (slideIndex1 < 1) { slideIndex1 = slides.length; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex1 - 1].style.display = "block";
        slideshowInterval1 = setInterval(showSlides1, 5000);
    }

    window.plusSlides2 = function(n) {
        clearInterval(slideshowInterval2);
        slideIndex2 += n;
        const slides = document.getElementsByClassName("mySlides2");
        if (slideIndex2 > slides.length) { slideIndex2 = 1; }
        if (slideIndex2 < 1) { slideIndex2 = slides.length; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex2 - 1].style.display = "block";
        slideshowInterval2 = setInterval(showSlides2, 5000);
    }

    // Lógica das abas e da animação dos cards
    const tabs = document.querySelectorAll('.tabs button');
    const contents = document.querySelectorAll('.tab-content');

    // Função que inicia o conteúdo das abas e as animações
    function activateTab(tabId) {
        // Remove a classe 'active' de todos os botoes e conteúdos
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Ativa o botão e o conteúdo correspondente
        const activeTabButton = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeTabButton && activeContent) {
            activeTabButton.classList.add('active');
            activeContent.classList.add('active');
            
            // Lógica para controle dos Slideshows
            if (tabId === 'projetos') {
                showSlides1();
                showSlides2();
                slideshowInterval1 = setInterval(showSlides1, 5000);
                slideshowInterval2 = setInterval(showSlides2, 5000);
            } else {
                clearInterval(slideshowInterval1);
                clearInterval(slideshowInterval2);
            }
            
            // Animação de entrada dos cards
            const cards = activeContent.querySelectorAll('.card');
            cards.forEach((card, i) => {
                card.classList.remove('visible');
                // Use setTimeout para aplicar a animação com atraso
                setTimeout(() => card.classList.add('visible'), i * 150);
            });
        }
    }

    // Adiciona evento de clique a todos os botões de aba
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            activateTab(tab.dataset.tab);
        });
    });

    // Ativa a primeira aba ao carregar a página
    activateTab('projetos');


    // Lógica para o efeito de scroll ativo (mantida)
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.7 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});