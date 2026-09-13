async function loadPlayer() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');

    const response = await fetch(`/get_joueur/${userId}`);
    const joueur = await response.json();

    document.getElementById('profil-content').innerHTML = `
        <h2>${joueur.name}</h2>
        <h4>${joueur.bio}</h4>
        <p>Elo : ${joueur.elo}</p>
    `;
    const matchJoues = joueur.match_joues;
    const matchGagnes = joueur.match_gagne;
    let Winrate;
    if (matchJoues > 0) {
        Winrate = matchGagnes / matchJoues * 100;
        Winrate = Math.round(Winrate);
    } else {
        Winrate = 100;
    }
    document.getElementById('other-stats').innerHTML = `
        <p>Match joués: ${joueur.match_joues}</p>
        <p>Match gagnés: ${joueur.match_gagne}</p>
        <p>Winrate: ${Winrate}%</p>
    `;
}


// ============================================================
// Ne peux pas se connecter sans session
// ============================================================

(function () {
  const LOGIN_URL = "connexion.html";
 
  async function guard() {
    let res;
    try {
      res = await fetch("/me", { credentials: "include" });
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

loadPlayer();
