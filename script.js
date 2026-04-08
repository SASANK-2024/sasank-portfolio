// ===========================
// THEME TOGGLE
// ===========================

(function () {
  var toggleBtn = document.getElementById('themeToggle');
  var iconMoon = toggleBtn.querySelector('.icon-moon');
  var iconSun  = toggleBtn.querySelector('.icon-sun');

  function playTick() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { /* audio not supported */ }
  }

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light');
      iconMoon.style.display = 'none';
      iconSun.style.display  = 'block';
    } else {
      document.body.classList.remove('light');
      iconMoon.style.display = 'block';
      iconSun.style.display  = 'none';
    }
  }

  // Persist preference
  var saved = localStorage.getItem('theme');
  applyTheme(saved === 'light');

  toggleBtn.addEventListener('click', function () {
    var isLight = !document.body.classList.contains('light');
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    playTick();
  });
})();

// ===========================
// SKILL FILTER — Portfolio
// ===========================

(function () {
  const pills = document.querySelectorAll('.pill');
  const projects = document.querySelectorAll('.project-row');

  /**
   * Activate the clicked pill and deactivate all others.
   * @param {HTMLElement} activePill
   */
  function setActivePill(activePill) {
    pills.forEach(function (pill) {
      pill.classList.remove('active');
    });
    activePill.classList.add('active');
  }

  /**
   * Filter project rows by skill tag.
   * @param {string} skill — "all" shows everything, otherwise match data-tags
   */
  function filterProjects(skill) {
    projects.forEach(function (project) {
      if (skill === 'all') {
        project.classList.remove('hidden');
      } else {
        var tags = project.getAttribute('data-tags').split(',');
        if (tags.indexOf(skill) !== -1) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      }
    });
  }

  // Attach click handlers to every pill
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var skill = pill.getAttribute('data-skill');
      setActivePill(pill);
      filterProjects(skill);

      // Keep the hidden radio in sync (optional, for semantics)
      var radio = pill.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });

  // Initialize — show all on page load
  filterProjects('all');
})();
