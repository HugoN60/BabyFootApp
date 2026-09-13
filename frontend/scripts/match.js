// ============================================================
// Données joueurs (à remplacer par un appel API, ex: /api/joueurs)
// ============================================================
let joueurs = [];

async function chargerJoueurs() {
  try {
    const response = await fetch('/get_joueur/');
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }
    joueurs = await response.json(); // réassignation, pas de "let" ici
  } catch (error) {
    console.error(error);
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  await chargerJoueurs();
});

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {

// ============================================================
// Autocomplete
// ============================================================
function setupPicker(inputId, suggId, onChange) {
  const input = document.getElementById(inputId);
  const box = document.getElementById(suggId);
  const pickerEl = input.closest(".picker");
  let activeIndex = -1;
  let currentMatches = [];

  function openBox() {
    box.classList.add("open");
    if (pickerEl) pickerEl.classList.add("elevated");
  }

  function closeBox() {
    box.classList.remove("open");
    if (pickerEl) pickerEl.classList.remove("elevated");
  }

  function render(matches) {
    currentMatches = matches;
    activeIndex = -1;
    box.innerHTML = "";

    if (matches.length === 0) {
      box.innerHTML = '<div class="empty">Aucun joueur trouvé</div>';
      openBox();
      return;
    }

    matches.slice(0, 6).forEach((j) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.innerHTML = "<span>" + j.name + "</span><span class=\"elo\">" + j.elo + "</span>";
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        selectPlayer(j);
      });
      box.appendChild(btn);
    });
    openBox();
  }

  function selectPlayer(j) {
    input.value = j.name;
    input.dataset.playerId = String(j.id);
    closeBox();
    if (onChange) onChange();
  }

  function search(term) {
    const q = normalize(term.trim());
    if (!q) { closeBox(); return; }
    const matches = joueurs
      .filter((j) => normalize(j.name).includes(q))
      .sort((a, b) => normalize(a.name).indexOf(q) - normalize(b.name).indexOf(q));
    render(matches);
  }

  input.addEventListener("input", () => {
    delete input.dataset.playerId;
    search(input.value);
    if (onChange) onChange();
  });

  input.addEventListener("focus", () => {
    if (input.value.trim()) search(input.value);
  });

  input.addEventListener("blur", () => {
    // laisse le temps au mousedown de la suggestion de s'exécuter avant de fermer
    setTimeout(() => {
      closeBox();
      if (onChange) onChange();
    }, 120);
  });

  input.addEventListener("keydown", (e) => {
    const items = box.querySelectorAll("button");
    if (!box.classList.contains("open") || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectPlayer(currentMatches[activeIndex]);
      return;
    } else if (e.key === "Escape") {
      closeBox();
      return;
    } else {
      return;
    }

    items.forEach((it, i) => it.classList.toggle("active", i === activeIndex));
  });
}

// ============================================================
// Mode 1v1 / 2v2
// ============================================================
const modeBtn1v1 = document.getElementById("mode-1v1");
const modeBtn2v2 = document.getElementById("mode-2v2");
const pickerTop2 = document.getElementById("picker-top-2");
const pickerBottom2 = document.getElementById("picker-bottom-2");
const inputTop2 = document.getElementById("input-top-2");
const inputBottom2 = document.getElementById("input-bottom-2");

const requiredIds = {
  modeBtn1v1, modeBtn2v2, pickerTop2, pickerBottom2, inputTop2, inputBottom2,
};
for (const [name, el] of Object.entries(requiredIds)) {
  if (!el) {
    console.error(
      "match.js : élément manquant dans le HTML pour '" + name + "'. " +
      "Vérifie que match.html correspond bien à cette version de match.js."
    );
  }
}
if (!modeBtn1v1 || !modeBtn2v2 || !pickerTop2 || !pickerBottom2 || !inputTop2 || !inputBottom2) {
  // On arrête ici plutôt que de planter plus loin sur un accès à null.
  console.error("match.js : arrêt de l'initialisation à cause d'éléments manquants ci-dessus.");
  return;
}

function isMode2v2() {
  return modeBtn2v2.classList.contains("active");
}

function setMode(mode) {
  const is2v2 = mode === "2v2";
  modeBtn1v1.classList.toggle("active", !is2v2);
  modeBtn2v2.classList.toggle("active", is2v2);
  pickerTop2.style.display = is2v2 ? "" : "none";
  pickerBottom2.style.display = is2v2 ? "" : "none";
  if (!is2v2) {
    inputTop2.value = "";
    inputBottom2.value = "";
    delete inputTop2.dataset.playerId;
    delete inputBottom2.dataset.playerId;
  }
  refreshValidation();
}

modeBtn1v1.addEventListener("click", () => setMode("1v1"));
modeBtn2v2.addEventListener("click", () => setMode("2v2"));

// ============================================================
// Sliders de score (0 à 10)
// ============================================================
function setupScoreSlider(sliderId, valueId) {
  const slider = document.getElementById(sliderId);
  const valueEl = document.getElementById(valueId);

  function update() {
    const max = Number(slider.max) || 10;
    const pct = (Number(slider.value) / max) * 100;
    slider.style.setProperty("--fill", pct + "%");
    valueEl.textContent = slider.value;
  }

  slider.addEventListener("input", update);
  update();
}

setupScoreSlider("score-top", "score-top-value");
setupScoreSlider("score-bottom", "score-bottom-value");

// ============================================================
// Validation stricte des joueurs
// ============================================================
// Renvoie "empty" | "valid" | "invalid" pour un champ donné
function fieldStatus(input) {
  const val = input.value.trim();
  if (!val) return "empty";

  const rawId = input.dataset.playerId;
  if (!rawId) return "invalid"; // texte tapé sans sélectionner une suggestion

  const player = joueurs.find((j) => String(j.id) === String(rawId));
  if (!player || normalize(player.name) !== normalize(val)) {
    return "invalid"; // le texte a changé après la sélection, ou id inconnu
  }
  return "valid";
}

const saveBtn = document.getElementById("save-match");
const errorMsg = document.getElementById("error-msg");
if (!saveBtn || !errorMsg) {
  console.error("match.js : bouton 'save-match' ou 'error-msg' introuvable dans le HTML.");
  return;
}

function refreshValidation() {
  const is2v2 = isMode2v2();

  const fields = [
    { input: document.getElementById("input-top"),   label: "joueur du haut",     required: true },
    { input: document.getElementById("input-top-2"), label: "2e joueur du haut",  required: is2v2 },
    { input: document.getElementById("input-bottom"),   label: "joueur du bas",      required: true },
    { input: document.getElementById("input-bottom-2"), label: "2e joueur du bas",   required: is2v2 },
  ];

  let allOk = true;
  const problems = [];

  fields.forEach(({ input, label, required }) => {
    // on n'inspecte pas les champs masqués (2e joueur en 1v1)
    if (!required && input.closest(".picker").style.display === "none") {
      input.classList.remove("invalid");
      return;
    }

    const status = fieldStatus(input);

    if (status === "invalid") {
      input.classList.add("invalid");
      allOk = false;
      problems.push(label + " : nom non reconnu");
    } else if (status === "empty" && required) {
      input.classList.remove("invalid");
      allOk = false;
      problems.push(label + " : manquant");
    } else {
      input.classList.remove("invalid");
    }
  });

  saveBtn.disabled = !allOk;

  if (problems.length > 0) {
    errorMsg.textContent = problems.join(" • ");
    errorMsg.classList.add("show");
  } else {
    errorMsg.textContent = "";
    errorMsg.classList.remove("show");
  }

  return allOk;
}

setupPicker("input-top", "sugg-top", refreshValidation);
setupPicker("input-bottom", "sugg-bottom", refreshValidation);
setupPicker("input-top-2", "sugg-top-2", refreshValidation);
setupPicker("input-bottom-2", "sugg-bottom-2", refreshValidation);

// état initial (bouton désactivé tant que rien n'est rempli)
refreshValidation();


// ============================================================
// Ne peux pas se connecter sans session
// ============================================================

(function () {
  const LOGIN_URL = "connexion.html";
 
  async function guard() {
    let res;
    try {
      res = await fetch("/auth/me", { credentials: "include" });
    } catch (err) {
      console.error("auth-guard.js : impossible de contacter le serveur.", err);
      window.location.href = LOGIN_URL;
      return;
    }
 
    if (!res.ok) {
      window.location.href = LOGIN_URL;
      return;
    }
 
    let joueur;
    try {
      joueur = await res.json();
    } catch (err) {
      console.error("auth-guard.js : réponse /me invalide.", err);
      window.location.href = LOGIN_URL;
      return;
    }
 
    window.currentJoueur = joueur;
 
    document.querySelectorAll("[data-greeting]").forEach((el) => {
      el.textContent = "Bonjour " + joueur.name;
    });
 
    document.dispatchEvent(new CustomEvent("joueur-ready", { detail: joueur }));
 
    document.body.style.visibility = "visible";
  }
 
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", guard);
  } else {
    guard();
  }
})();

// ============================================================
// Enregistrer le match
// ============================================================
const API_URL = "/new_match"; // adapte l'URL si ton API n'est pas sur le même domaine

saveBtn.addEventListener("click", async () => {
  // double vérification au moment du clic (au cas où)
  if (!refreshValidation()) return;

  const is2v2 = isMode2v2();

  const jb1 = Number(document.getElementById("input-top").dataset.playerId);
  const jr1 = Number(document.getElementById("input-bottom").dataset.playerId);
  const jb2 = is2v2 ? Number(document.getElementById("input-top-2").dataset.playerId) : null;
  const jr2 = is2v2 ? Number(document.getElementById("input-bottom-2").dataset.playerId) : null;

  const payload = {
    jr1: jr1,
    jr2: jr2,
    jb1: jb1,
    jb2: jb2,
    scoreRouge: Number(document.getElementById("score-bottom").value),
    scoreBleu: Number(document.getElementById("score-top").value),
  };

  saveBtn.disabled = true;
  const originalLabel = saveBtn.textContent;
  saveBtn.textContent = "Enregistrement…";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || ("Erreur " + res.status));
    }

    await res.json().catch(() => null);
    saveBtn.textContent = "Match enregistré ✔";
    setTimeout(() => {
      saveBtn.textContent = originalLabel;
      refreshValidation();
    }, 1800);
  } catch (err) {
    errorMsg.textContent = "Erreur lors de l'enregistrement : " + err.message;
    errorMsg.classList.add("show");
    saveBtn.textContent = originalLabel;
    refreshValidation();
  }
});

}); // fin DOMContentLoaded

