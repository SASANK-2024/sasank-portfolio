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
