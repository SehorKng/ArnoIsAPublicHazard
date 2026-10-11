/* Day/night toggle. Night is the default; the choice is remembered in this browser. */
(function () {
  var KEY = "theme", root = document.documentElement, theme = "dark";
  try { var saved = localStorage.getItem(KEY); if (saved === "light" || saved === "dark") theme = saved; } catch (e) {}

  // Runs immediately (script is in <head>) so the page never flashes the wrong theme.
  root.setAttribute("data-theme", theme);

  function apply(t) {
    root.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');   // colors the phone's browser bar
    if (meta) meta.setAttribute("content", t === "dark" ? "#0e0e10" : "#fafaf8");
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = t === "dark" ? "\u2600\uFE0F Day" : "\uD83C\uDF19 Night";
      btn.setAttribute("aria-label", t === "dark" ? "Switch to day mode" : "Switch to night mode");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      apply(theme);
      try { localStorage.setItem(KEY, theme); } catch (e) {}
    });
  });
})();
