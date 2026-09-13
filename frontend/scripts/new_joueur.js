document.addEventListener("DOMContentLoaded", () => {

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PASSWORD_MIN_LEN = 8;

  const form = document.getElementById("joueur-form");
  const nameInput = document.getElementById("joueur-name");
  const emailInput = document.getElementById("joueur-email");
  const passwordInput = document.getElementById("joueur-password");
  const submitBtn = document.getElementById("joueur-submit");
  const formMsg = document.getElementById("joueur-msg");

  const nameHint = document.getElementById("joueur-name-hint");
  const emailHint = document.getElementById("joueur-email-hint");
  const passwordHint = document.getElementById("joueur-password-hint");

  const requiredEls = { form, nameInput, emailInput, passwordInput, submitBtn, formMsg, nameHint, emailHint, passwordHint };
  for (const [name, el] of Object.entries(requiredEls)) {
    if (!el) {
      console.error("new_joueur.js : élément manquant pour '" + name + "'. Vérifie que le HTML correspond à ce script.");
      return;
    }
  }

  function setFieldState(input, hintEl, state, message) {
    input.classList.remove("valid", "invalid");
    if (state === "valid") input.classList.add("valid");
    if (state === "invalid") input.classList.add("invalid");
    hintEl.textContent = message || "";
    hintEl.classList.toggle("error", state === "invalid");
  }

  function showFormMessage(type, text) {
    formMsg.textContent = text;
    formMsg.className = "form-msg show " + type;
  }

  function hideFormMessage() {
    formMsg.classList.remove("show");
    formMsg.textContent = "";
  }

  function validate() {
    let allValid = true;

    if (!nameInput.value.trim()) {
      setFieldState(nameInput, nameHint, "none", "");
      allValid = false;
    } else {
      setFieldState(nameInput, nameHint, "valid", "");
    }

    if (!emailInput.value.trim()) {
      setFieldState(emailInput, emailHint, "none", "");
      allValid = false;
    } else if (!EMAIL_RE.test(emailInput.value.trim())) {
      setFieldState(emailInput, emailHint, "invalid", "Adresse e-mail invalide");
      allValid = false;
    } else {
      setFieldState(emailInput, emailHint, "valid", "");
    }

    if (!passwordInput.value) {
      setFieldState(passwordInput, passwordHint, "none", "");
      allValid = false;
    } else if (passwordInput.value.length < PASSWORD_MIN_LEN) {
      setFieldState(passwordInput, passwordHint, "invalid", PASSWORD_MIN_LEN + " caractères minimum");
      allValid = false;
    } else {
      setFieldState(passwordInput, passwordHint, "valid", "");
    }

    submitBtn.disabled = !allValid;
    return allValid;
  }

  [nameInput, emailInput, passwordInput].forEach((el) => {
    el.addEventListener("input", validate);
  });
  validate();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;

    hideFormMessage();
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Création…";

    // Le mot de passe part en clair ici : le hash est fait côté serveur (Pydantic/CreateJoueur -> crud_user.create_joueur).
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    try {
      const res = await fetch("/new_joueur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = "Erreur " + res.status;
        try {
          const errBody = await res.json();
          errText = errBody.detail ? JSON.stringify(errBody.detail) : errText;
        } catch (_) {}
        throw new Error(errText);
      }

      showFormMessage("success", "Compte créé avec succès !");
      form.reset();
      [nameInput, emailInput, passwordInput].forEach((el) => el.classList.remove("valid", "invalid"));
      submitBtn.disabled = true;
    } catch (err) {
      showFormMessage("error", "Création impossible : " + err.message);
      submitBtn.disabled = false;
    } finally {
      submitBtn.textContent = originalLabel;
    }
    setTimeout(() => { window.location.href = "connexion.html"; }, 600);
  });

});