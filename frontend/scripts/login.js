document.addEventListener("DOMContentLoaded", () => {

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const submitBtn = document.getElementById("login-submit");
  const formMsg = document.getElementById("login-msg");

  const emailHint = document.getElementById("login-email-hint");
  const passwordHint = document.getElementById("login-password-hint");

  const requiredEls = { form, emailInput, passwordInput, submitBtn, formMsg, emailHint, passwordHint };
  for (const [name, el] of Object.entries(requiredEls)) {
    if (!el) {
      console.error("login.js : élément manquant pour '" + name + "'. Vérifie que le HTML correspond à ce script.");
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
    } else {
      setFieldState(passwordInput, passwordHint, "valid", "");
    }

    submitBtn.disabled = !allValid;
    return allValid;
  }

  [emailInput, passwordInput].forEach((el) => {
    el.addEventListener("input", validate);
  });
  validate();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;

    hideFormMessage();
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Connexion…";

    const payload = {
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errText = res.status === 401 ? "Email ou mot de passe incorrect" : "Erreur " + res.status;
        try {
          const errBody = await res.json();
          if (errBody.detail && typeof errBody.detail === "string") errText = errBody.detail;
        } catch (_) {}
        throw new Error(errText);
      }

      showFormMessage("success", "Connexion réussie. Redirection…");
      // Adapte cette redirection à ta page principale.
      setTimeout(() => { window.location.href = "acceuil.html"; }, 600);
    } catch (err) {
      showFormMessage("error", err.message);
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });

});