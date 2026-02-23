document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const links = document.querySelectorAll('.navbar a');
  const indicator = document.querySelector('.nav-indicator');

  // Płynny wskaźnik (pastylka)
  function moveIndicator(target) {
    if (!target || !indicator) return;
    const rect = target.getBoundingClientRect();
    const navRect = target.closest('.navbar').getBoundingClientRect();

    indicator.style.width = `${rect.width + 16}px`;
    indicator.style.left = `${rect.left - navRect.left - 8}px`;
  }

  // Kliknięcie → scroll + zmiana active + wskaźnik
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

  // Scrollspy – zmiana active i wskaźnika podczas przewijania
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

  // Początkowe ustawienie wskaźnika
  const initialActive = document.querySelector('.navbar a.active') || links[0];
  if (initialActive) {
    initialActive.classList.add('active');
    moveIndicator(initialActive);
  }

  // Aktualizacja przy zmianie rozmiaru okna
  window.addEventListener('resize', () => {
    moveIndicator(document.querySelector('.navbar a.active'));
  });

  // Logika dla TextBypass
  const bypassBtn = document.getElementById('bypassBtn');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const useNumbers = document.getElementById('useNumbers');
  const useFont = document.getElementById('useFont');
  const useSimilar = document.getElementById('useSimilar');
  const copyBtn = document.getElementById('copyBtn');

  bypassBtn.addEventListener('click', () => {
    const options = {
      numbers: useNumbers.checked,
      font: useFont.checked,
      similar: useSimilar.checked
    };
    const bypassed = bypassText(inputText.value, options);
    outputText.value = bypassed;
  });

  copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    alert('Skopiowano do schowka!');
  });
});
