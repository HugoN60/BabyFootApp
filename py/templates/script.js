document.getElementById("new_joueur").addEventListener("submit", async(e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let joueur = {name, email, password};
    const res = await fetch("/new_joueur", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(joueur)
    });
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", await res.json());
    console.log(res.text);
    if(res.ok) {
        location.reload();
    }
});