// Modo oscuro persistente
const toggleBtn = document.getElementById('toggle-dark');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('darkMode');

// Aplicar modo inicial
if (savedMode === 'true' || (prefersDark && savedMode !== 'false')) {
  document.body.classList.add('dark');
}

// Botón de toggle
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// Animación escalonada de tarjetas
const cards = document.querySelectorAll('.grid > div');
cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `all 0.5s ease ${index * 0.1}s`;
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 100);
});

// Tooltips para tarjetas
cards.forEach(card => {
  const title = card.querySelector('h3').textContent;
  const tooltip = document.createElement('div');
  tooltip.className = 'hidden absolute bg-gray-900 text-white p-2 rounded text-sm';
  tooltip.textContent = `Ver detalles de ${title}`;
  card.appendChild(tooltip);

  card.addEventListener('mouseenter', () => {
    tooltip.classList.remove('hidden');
  });
  card.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
  });
});

// Contador de semanas
const weekCount = document.createElement('div');
weekCount.className = 'text-center mb-8 text-blue-600 font-bold';
weekCount.textContent = `Total de semanas: ${cards.length}`;
document.querySelector('main').prepend(weekCount);

// Barra de progreso de scroll
const progressBar = document.createElement('div');
progressBar.className = 'h-1 bg-blue-400 fixed top-0 left-0';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});