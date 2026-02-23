document.addEventListener('DOMContentLoaded', () => {
  const sections   = document.querySelectorAll('.section');
  const links      = document.querySelectorAll('.navbar a');
  const indicator  = document.querySelector('.nav-indicator');

  // płynny wskaźnik (pastylka)
  function moveIndicator(target) {
    if (!target || !indicator) return;
    const rect = target.getBoundingClientRect();
    const navRect = target.closest('.navbar').getBoundingClientRect();

    indicator.style.width = `${rect.width + 16}px`;
    indicator.style.left  = `${rect.left - navRect.left - 8}px`;
  }

  // kliknięcie → scroll + zmiana active + wskaźnik
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      moveIndicator(link);
    });
  });

  // scrollspy – zmiana active i wskaźnika podczas przewijania
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 180) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        moveIndicator(link);
      }
    });
  });

  // Intersection Observer – pojawianie się sekcji
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });

  sections.forEach(sec => observer.observe(sec));

  // początkowe ustawienie wskaźnika
  const initialActive = document.querySelector('.navbar a.active') || links[0];
  if (initialActive) {
    initialActive.classList.add('active');
    moveIndicator(initialActive);
  }

  // aktualizacja przy zmianie rozmiaru okna
  window.addEventListener('resize', () => {
    moveIndicator(document.querySelector('.navbar a.active'));
  });
});
