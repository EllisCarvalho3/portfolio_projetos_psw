// Tabs Portfolio (mantido)
  const tabs = document.querySelectorAll('.tabs button');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      contents.forEach(c => c.classList.remove('active'));
      const activeContent = document.getElementById(tab.dataset.tab);
      activeContent.classList.add('active');
      const cards = activeContent.querySelectorAll('.card');
      cards.forEach((card,i)=>{ card.classList.remove('visible'); setTimeout(()=>card.classList.add('visible'),i*150); });
    });
  });

  // 1. Marcação das seções na navegação
  // 2. Efeito de scroll ativo
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  const options = {
    root: null,
    rootMargin: '0px',
    // O threshold determina quando o evento será acionado.
    // 0.7 significa que o evento será acionado quando 70% da seção estiver visível.
    // Isso garante que a seção só "apareça" quando você estiver realmente nela.
    threshold: 0.7 
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adiciona a classe 'visible' à seção quando ela entra na viewport
        entry.target.classList.add('visible');

        // Encontra o link de navegação correspondente
        const currentId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === currentId) {
            link.classList.add('active');
          }
        });
      } else {
        // Remove a classe 'visible' quando a seção sai da viewport
        entry.target.classList.remove('visible');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

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

// Slideshow automático + manual
  document.querySelectorAll(".slideshow").forEach(slideshow => {
    let slides = slideshow.querySelectorAll("img");
    let prevBtn = slideshow.querySelector(".prev");
    let nextBtn = slideshow.querySelector(".next");
    let index = 0;
    let interval;

    function showSlide(i) {
      slides.forEach(s => s.classList.remove("active"));
      slides[i].classList.add("active");
    }
    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }
    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });
    function startAuto() { interval = setInterval(nextSlide, 3000); }
    function resetInterval() { clearInterval(interval); startAuto(); }
    startAuto();
  });

/* --- Script Completo e Corrigido --- */
(function() {
    // === Seletores de Elementos ===
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const tabs = document.querySelectorAll('.tabs button');
    const tabContents = document.querySelectorAll('.tab-content');

    // === Ajustes para Fixed Header e Intersection Observer ===
    function updateScrollMargin() {
        const headerHeight = header ? header.offsetHeight : 80;
        sections.forEach(sec => {
            sec.style.scrollMarginTop = (headerHeight + 16) + 'px';
        });
    }
    updateScrollMargin();
    window.addEventListener('resize', updateScrollMargin);

    // Função que revela a seção (adiciona .visible e anima elementos internos)
    function revealSection(sec) {
        if (!sec.classList.contains('visible')) {
            sec.classList.add('visible');
            const elements = Array.from(sec.children);
            elements.forEach((el, i) => {
                el.style.transitionDelay = `${i * 0.12}s`;
                el.classList.add('visible');
            });
            const cards = sec.querySelectorAll('.card, .card-projeto, .card .card-content, .card-content, .card-actions');
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 100);
            });
        }
    }

    let sectionObserver;
    function createObserver() {
        const headerHeight = header ? header.offsetHeight : 80;
        const rootMargin = `-${headerHeight + 8}px 0px -20% 0px`;
        sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealSection(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin,
            threshold: 0.12
        });
        sections.forEach(s => sectionObserver.observe(s));
    }
    createObserver();
    window.addEventListener('resize', () => {
        if (sectionObserver) sectionObserver.disconnect();
        createObserver();
        updateScrollMargin();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            setTimeout(() => revealSection(target), 250);
        });
    });

    // Revele seções já visíveis no load
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            revealSection(sec);
        }
    });

    // === Gerenciamento de Abas (Tabs) ---
    // Esta função agora é independente e não interfere com a animação por scroll
    function setupTabs() {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.tab;

                // Remove a classe 'active' de todos os botões e conteúdos
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Adiciona a classe 'active' apenas ao botão e conteúdo clicados
                tab.classList.add('active');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Força a ativação da aba de projetos ao carregar a página
        const projetosTab = document.querySelector('button[data-tab="projetos"]');
        if (projetosTab) {
            projetosTab.click();
        }
    }

    // Chama a função para configurar o sistema de abas
    setupTabs();

})();