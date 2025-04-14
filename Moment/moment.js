document.addEventListener("DOMContentLoaded", () => {
    const metas = document.querySelectorAll(".timeline-meta");
    metas.forEach(meta => {
      const dateStr = meta.dataset.date;
      const postDate = new Date(dateStr);
      const now = new Date();
      const diffTime = Math.abs(now - postDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      let readable = "";
      if (diffDays === 0) readable = "今天";
      else if (diffDays === 1) readable = "昨天";
      else readable = `${diffDays}天前`;
  
      const span = meta.querySelector(".timeline-date");
      if (span) {
        span.textContent += ` · ${readable}`;
      }
    });
  });
  