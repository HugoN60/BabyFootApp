async function loadUsersByRank() {
    const container = document.querySelector("#list-joueur");
    const response = await fetch("/get_rank_joueur/8");
    const users = await response.json();
    console.log(users);
    if(users.length == 0){
        const div = document.createElement("div");
        div.textContent = "No joueurs found";
        container.append(div);
    } else {
        for (const user of users) {
            const div = document.createElement("div");
            div.classList.add("user");
            div.dataset.userId = user.id;
            const nameSpan = document.createElement("span");
            nameSpan.classList.add("user-name");
            nameSpan.textContent = user.name;

            const eloSpan = document.createElement("span");
            eloSpan.classList.add("user-elo");
            eloSpan.textContent = user.elo;

            div.addEventListener('click', () => {
                window.location.href = `profile.html?id=${div.dataset.userId}`;
            });

            div.append(nameSpan, eloSpan);
            
            container.append(div);
        }
    }
}


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

loadUsersByRank();

document.addEventListener("DOMContentLoaded", async () => {

    try {
        const res = await fetch("/auth/me", {
            credentials: "include"
        });

        if (!res.ok) {
            window.location.href = "connexion.html";
            return;
        }

        const joueur = await res.json();

        document.querySelector("h2").textContent =
            `Bienvenue ${joueur.name}`;

        document.querySelector("#player-elo strong").textContent =
            joueur.elo;

        document.querySelector("#player-winrate strong").textContent =
            `${joueur.winrate}%`;

        document.querySelector("#player-ranking strong").textContent =
            `${joueur.classement}${joueur.classement === 1 ? "er" : "e"}`;

    } catch (error) {
        console.error("Erreur :", error);
    }
});

