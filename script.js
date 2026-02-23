document.addEventListener('DOMContentLoaded', () => {
  // ────────────────────────────────────────
  //          Poprzedni kod navbar + sekcje
  // ────────────────────────────────────────

  const sections = document.querySelectorAll('.section');
  const links = document.querySelectorAll('.navbar a');
  const indicator = document.querySelector('.nav-indicator');

  function moveIndicator(target) {
    if (!target || !indicator) return;
    const rect = target.getBoundingClientRect();
    const navRect = target.closest('.navbar').getBoundingClientRect();
    indicator.style.width = `${rect.width + 16}px`;
    indicator.style.left  = `${rect.left - navRect.left - 8}px`;
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      moveIndicator(link);
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 180) current = sec.getAttribute('id');
    });
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        moveIndicator(link);
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: 0.18 });

  sections.forEach(sec => observer.observe(sec));

  const initial = document.querySelector('.navbar a.active') || links[0];
  if (initial) {
    initial.classList.add('active');
    moveIndicator(initial);
  }

  window.addEventListener('resize', () => moveIndicator(document.querySelector('.navbar a.active')));

  // ────────────────────────────────────────
  //             TEXTBYPASS – logika
  // ────────────────────────────────────────

  const input  = document.getElementById('inputText');
  const output = document.getElementById('outputText');
  const btn    = document.getElementById('bypassBtn');
  const copy   = document.getElementById('copyBtn');

  const numMap = { 'a':'4', 'e':'3', 'i':'1', 'o':'0', 's':'5', 't':'7', 'b':'8', 'g':'9' };
  const fontMap = { /* przykładowe matematyczne czcionki – możesz rozbudować */
    'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘',
    'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟',
    'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦',
    'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫'
  };

  function bypassText(text, options) {
    if (!text.trim()) return "Wpisz jakiś tekst najpierw...";

    let result = text;

    if (options.numbers) {
      result = result.split('').map(c => {
        const lower = c.toLowerCase();
        return numMap[lower] ? numMap[lower] : c;
      }).join('');
    }

    if (options.font) {
      result = result.split('').map(c => {
        const lower = c.toLowerCase();
        return fontMap[lower] || c;
      }).join('');
    }

    if (options.similar) {
      // bardzo prosty przykład – można rozbudować o setki zamienników
      result = result.replace(/a/gi, 'ɑ').replace(/o/gi, 'ο').replace(/i/gi, 'і');
    }

    return result || "[nic nie wyszło – sprawdź opcje]";
  }

  btn.addEventListener('click', () => {
    const opts = {
      numbers: document.getElementById('useNumbers').checked,
      font:    document.getElementById('useFont').checked,
      similar: document.getElementById('useSimilar').checked
    };
    output.value = bypassText(input.value, opts);
  });

  copy.addEventListener('click', () => {
    if (!output.value.trim()) return alert("Nic do skopiowania!");
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
      alert("Skopiowano!");
    }).catch(() => {
      alert("Błąd kopiowania – spróbuj zaznaczyć ręcznie.");
    });
  });
});
