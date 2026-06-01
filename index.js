/* =============================================
   SKILLS CATALOG — DATA
   =============================================
   Para adicionar novas anotações, basta incluir
   um novo objeto neste array seguindo o padrão.
   ============================================= */
const catalog = [
  {
    id: "git-github",
    title: "Git e GitHub",
    category: "Ferramentas",
    description:
      "Controle de versão com Git: commits, branches, merge, resolução de conflitos, repositórios remotos, SSH e fluxo colaborativo com pull requests.",
    tags: ["git", "github", "versionamento", "branches", "commit", "merge", "ssh", "pull request"],
    date: "2025",
    file: "paginas/git-github.html",
  },
  // Adicione mais anotações aqui seguindo o padrão acima
];

/* =============================================
   STATE
   ============================================= */
const state = {
  query: "",
  activeCategory: null,
  activeTag: null,
  sortOrder: "default",
};

/* =============================================
   DOM REFERENCES
   ============================================= */
const searchInput    = document.getElementById("search-input");
const clearBtn       = document.getElementById("clear-btn");
const categoriesList = document.getElementById("categories-list");
const tagsCloud      = document.getElementById("tags-cloud");
const cardsGrid      = document.getElementById("cards-grid");
const noResults      = document.getElementById("no-results");
const searchTermDisplay = document.getElementById("search-term-display");
const resultsInfo    = document.getElementById("results-info");
const sortSelect     = document.getElementById("sort-select");
const resetFiltersBtn   = document.getElementById("reset-filters");
const noResultsReset    = document.getElementById("no-results-reset");

/* =============================================
   HELPERS
   ============================================= */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function matchesSearch(item, q) {
  if (!q) return true;
  const n = normalize(q);
  return (
    normalize(item.title).includes(n) ||
    normalize(item.description).includes(n) ||
    normalize(item.category).includes(n) ||
    item.tags.some((t) => normalize(t).includes(n))
  );
}

/* =============================================
   DERIVED DATA
   ============================================= */
function getCategories() {
  const map = {};
  catalog.forEach((item) => {
    map[item.category] = (map[item.category] || 0) + 1;
  });
  return map;
}

function getAllTags() {
  const set = new Set();
  catalog.forEach((item) => item.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}

/* =============================================
   FILTER & SORT
   ============================================= */
function getFiltered() {
  let items = catalog.filter((item) => {
    if (!matchesSearch(item, state.query)) return false;
    if (state.activeCategory && item.category !== state.activeCategory) return false;
    if (state.activeTag && !item.tags.includes(state.activeTag)) return false;
    return true;
  });

  if (state.sortOrder === "az") {
    items = [...items].sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  } else if (state.sortOrder === "za") {
    items = [...items].sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
  }

  return items;
}

/* =============================================
   RENDER — CATEGORIES
   ============================================= */
function renderCategories() {
  const categories = getCategories();
  categoriesList.innerHTML = "";

  // "Todas" option
  const allLi = document.createElement("li");
  const allBtn = document.createElement("button");
  allBtn.className = "category-btn" + (!state.activeCategory ? " active" : "");
  allBtn.innerHTML = `<span>Todas</span><span class="badge bg-secondary rounded-pill">${catalog.length}</span>`;
  allBtn.addEventListener("click", () => {
    state.activeCategory = null;
    render();
  });
  allLi.appendChild(allBtn);
  categoriesList.appendChild(allLi);

  Object.entries(categories).forEach(([cat, count]) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "category-btn" + (state.activeCategory === cat ? " active" : "");
    btn.innerHTML = `<span>${cat}</span><span class="badge bg-secondary rounded-pill">${count}</span>`;
    btn.addEventListener("click", () => {
      state.activeCategory = state.activeCategory === cat ? null : cat;
      render();
    });
    li.appendChild(btn);
    categoriesList.appendChild(li);
  });
}

/* =============================================
   RENDER — TAGS
   ============================================= */
function renderTags() {
  const tags = getAllTags();
  tagsCloud.innerHTML = "";
  tags.forEach((tag) => {
    const chip = document.createElement("button");
    chip.className = "tag-chip" + (state.activeTag === tag ? " active" : "");
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      state.activeTag = state.activeTag === tag ? null : tag;
      render();
    });
    tagsCloud.appendChild(chip);
  });
}

/* =============================================
   RENDER — CARDS
   ============================================= */
function renderCards(items) {
  cardsGrid.innerHTML = "";
  const q = state.query;

  items.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column gap-2">
          <span class="badge rounded-pill align-self-start"
            style="background:var(--accent-dim);color:var(--accent-h);font-size:0.7rem;letter-spacing:0.08em">
            ${item.category}
          </span>
          <h2 class="card-title h6 fw-bold mb-0">${highlight(item.title, q)}</h2>
          <p class="card-text text-secondary small flex-grow-1">${highlight(item.description, q)}</p>
          <div class="d-flex flex-wrap gap-1">
            ${item.tags.map((t) => `<button class="card-tag">${highlight(t, q)}</button>`).join("")}
          </div>
          <div class="d-flex align-items-center justify-content-between pt-2 mt-auto border-top">
            <small class="text-secondary">📅 ${item.date}</small>
            <a href="${item.file}" class="btn btn-sm btn-accent d-flex align-items-center gap-1">
              Ver anotação
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;

    // Tag click dentro do card
    col.querySelectorAll(".card-tag").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        state.activeTag = state.activeTag === item.tags[i] ? null : item.tags[i];
        render();
      });
    });

    cardsGrid.appendChild(col);
  });
}

/* =============================================
   RENDER — MAIN
   ============================================= */
function render() {
  const filtered = getFiltered();

  renderCategories();
  renderTags();
  renderCards(filtered);

  // Results info
  if (filtered.length === catalog.length) {
    resultsInfo.innerHTML = `<strong>${catalog.length}</strong> anotações`;
  } else {
    resultsInfo.innerHTML = `<strong>${filtered.length}</strong> de <strong>${catalog.length}</strong> anotações`;
  }

  // No results
  const hasFilters = state.query || state.activeCategory || state.activeTag;
  if (filtered.length === 0) {
    noResults.classList.remove("d-none");
    cardsGrid.classList.add("d-none");
    searchTermDisplay.textContent = state.query || state.activeTag || state.activeCategory || "";
  } else {
    noResults.classList.add("d-none");
    cardsGrid.classList.remove("d-none");
  }

  // Reset button visibility
  if (hasFilters) {
    resetFiltersBtn.classList.remove("d-none");
  } else {
    resetFiltersBtn.classList.add("d-none");
  }

  // Clear search button
  if (state.query) {
    clearBtn.classList.remove("d-none");
  } else {
    clearBtn.classList.add("d-none");
  }
}

/* =============================================
   EVENT LISTENERS
   ============================================= */
let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.query = searchInput.value.trim();
    render();
  }, 200);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  render();
  searchInput.focus();
});

sortSelect.addEventListener("change", () => {
  state.sortOrder = sortSelect.value;
  render();
});

function resetAllFilters() {
  state.query = "";
  state.activeCategory = null;
  state.activeTag = null;
  state.sortOrder = "default";
  searchInput.value = "";
  sortSelect.value = "default";
  render();
}

resetFiltersBtn.addEventListener("click", resetAllFilters);
noResultsReset.addEventListener("click", resetAllFilters);

/* =============================================
   INIT
   ============================================= */
render();
