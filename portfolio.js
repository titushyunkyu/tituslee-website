/* Titus Lee — project filtering */
(function () {
  "use strict";

  var chips = Array.prototype.slice.call(document.querySelectorAll(".filter .chip"));
  var projects = Array.prototype.slice.call(document.querySelectorAll(".project"));
  var countEl = document.querySelector("[data-count]");
  var emptyEl = document.querySelector(".empty");

  function apply(category) {
    var shown = 0;
    projects.forEach(function (p) {
      var match = category === "All" || p.dataset.category === category;
      p.hidden = !match;
      if (match) shown++;
    });
    if (countEl) countEl.textContent = shown + (shown === 1 ? " Project" : " Projects");
    if (emptyEl) emptyEl.hidden = shown !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      apply(chip.dataset.filter);
    });
  });

  apply("All");
})();
