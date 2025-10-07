document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("portfolio-container");
  const modal = document.getElementById("portfolio-modal");
  const modalClose = modal.querySelector(".modal-close");

  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImages = document.getElementById("modal-images");
  const modalSkills = document.getElementById("modal-skills");
  const modalLive = document.getElementById("modal-live");
  const modalGithub = document.getElementById("modal-github");
  const modalPublished = document.getElementById("modal-published");
  const modalCompany = document.getElementById("modal-company");

  // Fetch JSON
  fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
          <img src="${item.thumbnail_img}" class="news-card__image" alt="${item.title}" />
          <div class="news-card__text-wrapper">
            <h4 class="news-card__title">${item.title}</h4>
          </div>
        `;
        container.appendChild(card);

        // Open modal on click
        card.addEventListener("click", () => {
          modal.style.display = "block";
          modalTitle.textContent = item.title;
          modalDescription.textContent = item.project_description;
          modalImages.innerHTML = `
            <img src="${item.portfolio_img01}" />
            <img src="${item.portfolio_img02}" />
            <img src="${item.portfolio_img03}" />
          `;
          modalSkills.innerHTML = item.skills
            .map((s) => `<button class="button-2">${s}</button>`)
            .join(" ");

          modalLive.href = item.live_site_link;
          modalGithub.href = item.github_repo;
          modalPublished.textContent = `Published on ${item.published_date}`;
          modalCompany.innerHTML = `Contributed to <span class="company-name">${item.contributed_company}</span>`;
        });
      });
    })
    .catch((err) => console.error(err));

  // Close modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});