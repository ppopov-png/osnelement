(() => {
  const section = document.getElementById("pipeline-process");
  if (!section) return;

  const stages = Array.from(section.querySelectorAll(".pipeline-stage"));
  const stageCount = stages.length;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const updateProcess = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    const start = vh * 0.62;
    const end = -rect.height * 0.05;
    const raw = (start - rect.top) / (start - end);
    const progress = clamp(raw, 0, 1);

    section.style.setProperty("--process-progress", progress.toFixed(4));

    const activeIndex = clamp(Math.floor(progress * stageCount), 0, stageCount - 1);

    stages.forEach((stage, index) => {
      stage.classList.toggle("completed", index < activeIndex);
      stage.classList.toggle("active", index === activeIndex);
    });
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    section.style.setProperty("--process-progress", "1");
    stages.forEach((stage, index) => {
      stage.classList.toggle("completed", index < stageCount - 1);
      stage.classList.toggle("active", index === stageCount - 1);
    });
    return;
  }

  window.addEventListener("scroll", updateProcess, { passive: true });
  window.addEventListener("resize", updateProcess);
  updateProcess();
})();
