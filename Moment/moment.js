document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".timeline-item"));
  const perPage = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / perPage);
  const pagination = document.querySelector(".moment-pagination");

  function renderPage(page) {
    items.forEach((item, idx) => {
      item.style.display = (idx >= (page - 1) * perPage && idx < page * perPage) ? "" : "none";
    });
    renderPagination();
    beautifyDates();
  }

  function renderPagination() {
    if (!pagination) return;
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    const prev = document.createElement('button');
    prev.textContent = '上一页';
    prev.disabled = currentPage === 1;
    prev.onclick = () => { if (currentPage > 1) { currentPage--; renderPage(currentPage); } };
    const next = document.createElement('button');
    next.textContent = '下一页';
    next.disabled = currentPage === totalPages;
    next.onclick = () => { if (currentPage < totalPages) { currentPage++; renderPage(currentPage); } };
    const info = document.createElement('span');
    info.textContent = `第${currentPage}页 / 共${totalPages}页`;
    pagination.appendChild(prev);
    pagination.appendChild(info);
    pagination.appendChild(next);
  }

  function beautifyDates() {
    const metas = document.querySelectorAll(".timeline-meta");
    metas.forEach(meta => {
      const dateStr = meta.dataset.date;
      if (!dateStr) return;
      const postDate = new Date(dateStr);
      const now = new Date();
      const diffTime = Math.abs(now - postDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      let readable = "";
      if (diffDays === 0) readable = "今天发布";
      else if (diffDays === 1) readable = "昨天发布";
      else readable = `${diffDays}天前发布`;
      const dateSpan = meta.querySelector(".timeline-date");
      if (dateSpan) {
        dateSpan.innerHTML = `${dateStr} · ${readable}`;
      }
    });
  }

  renderPage(currentPage);
});
  