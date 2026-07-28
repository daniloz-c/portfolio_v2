lucide.createIcons();

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.remove('hidden-menu');
    mobileMenu.classList.add('visible-menu');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.remove('visible-menu');
    mobileMenu.classList.add('hidden-menu');
    document.body.style.overflow = '';
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    isMenuOpen = false;
    mobileMenu.classList.remove('visible-menu');
    mobileMenu.classList.add('hidden-menu');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function makeDraggable(el) {
  let isDragging = false;
  let startX;
  let startY;
  let initialLeft;
  let initialTop;

  const startDrag = (e) => {
    if (e.type !== 'touchstart') e.preventDefault();
    isDragging = true;
    el.style.zIndex = 100;

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const rect = el.getBoundingClientRect();
    const parentRect = el.offsetParent ? el.offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
    const relativeLeft = rect.left - parentRect.left;
    const relativeTop = rect.top - parentRect.top;

    el.style.left = `${relativeLeft}px`;
    el.style.top = `${relativeTop}px`;
    el.style.right = 'auto';
    el.style.bottom = 'auto';
    el.style.position = 'absolute';
    el.style.margin = '0';

    startX = clientX;
    startY = clientY;
    initialLeft = relativeLeft;
    initialTop = relativeTop;
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    if (e.type === 'touchmove') e.preventDefault();

    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    el.style.left = `${initialLeft + (clientX - startX)}px`;
    el.style.top = `${initialTop + (clientY - startY)}px`;
  };

  const stopDrag = () => {
    if (isDragging) {
      isDragging = false;
      el.style.zIndex = '50';
    }
  };

  el.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', doDrag);
  window.addEventListener('mouseup', stopDrag);
  el.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('touchmove', doDrag, { passive: false });
  window.addEventListener('touchend', stopDrag);
}

document.querySelectorAll('.draggable').forEach(makeDraggable);

const stampWords = ['BRUTAL', 'CLICK', 'WOW', 'CODE', '404', 'NULL', 'ERROR', 'NICE'];
const colors = ['#ccff00', '#00B6B7', '#ffffff', '#ff0055', '#00d4ff'];
let lastClickTime = 0;

document.addEventListener('click', (e) => {
  const now = Date.now();
  if (now - lastClickTime < 100) return;
  lastClickTime = now;

  if (
    e.target.closest('a') ||
    e.target.closest('button') ||
    e.target.closest('.draggable') ||
    e.target.closest('#mobile-menu')
  ) {
    return;
  }

  const stamp = document.createElement('div');
  stamp.classList.add('stamp');
  stamp.innerText = stampWords[Math.floor(Math.random() * stampWords.length)];

  const color = colors[Math.floor(Math.random() * colors.length)];
  stamp.style.backgroundColor = color;
  stamp.style.color = color === '#ffffff' || color === '#ccff00' ? 'black' : 'white';
  stamp.style.left = `${e.pageX}px`;
  stamp.style.top = `${e.pageY}px`;
  stamp.style.setProperty('--rotation', `${Math.random() * 40 - 20}deg`);

  document.body.appendChild(stamp);

  setTimeout(() => {
    stamp.style.transition = 'opacity 0.5s';
    stamp.style.opacity = '0';
    setTimeout(() => stamp.remove(), 500);
  }, 1000);
});
