const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const duration = 1300;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      element.textContent = value.toLocaleString('pt-BR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');
const dateInput = form.querySelector('input[type="date"]');

dateInput.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name');
  status.textContent = `Obrigado, ${name}! Seu pedido foi recebido.`;
  form.reset();
});
