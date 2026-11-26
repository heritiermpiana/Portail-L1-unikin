// Mode strict pour éviter les erreurs silencieuses
"use strict";

// 1. Sélection des éléments du DOM pour le formulaire d'inscription
const formulaireTP = document.querySelector("#form-tp");
const champNom = document.querySelector("#nom");
const champEmail = document.querySelector("#email");
const champGroupe = document.querySelector("#groupe");
const zoneMessageTP = document.querySelector("#message-tp");

// 2. Écouteur d'événement sur la soumission du formulaire
if (formulaireTP) {
    formulaireTP.addEventListener("submit", (event) => {
        // Empêche le rechargement automatique de la page
        event.preventDefault();

        const nom = champNom.value.trim();
        const email = champEmail.value.trim();
        const groupe = champGroupe.value;

        // Validation personnalisée : vérifier que le nom comporte au moins 3 caractères
        if (nom.length < 3) {
            zoneMessageTP.innerHTML = `<div class="alert alert-danger mt-3">Erreur : Veuillez saisir un nom complet valide (minimum 3 caractères).</div>`;
            return;
        }

        // Affichage dynamique de la confirmation dans le DOM
        zoneMessageTP.innerHTML = `
            <div class="alert alert-success mt-3">
                <strong>Inscription enregistrée !</strong><br>
                Étudiant : <strong>${nom}</strong> (${email}) — Affecté au <strong>${groupe}</strong>.
            </div>
        `;

        // Réinitialisation des champs du formulaire
        formulaireTP.reset();
    });
}

// 3. Calculateur interactif de moyenne semestrielle (Système LMD)
const btnCalculer = document.querySelector("#btn-calculer");

if (btnCalculer) {
    btnCalculer.addEventListener("click", () => {
        const noteWeb = parseFloat(document.querySelector("#note-web").value);
        const noteAlgo = parseFloat(document.querySelector("#note-algo").value);
        const noteArchi = parseFloat(document.querySelector("#note-archi").value);
        const zoneResultat = document.querySelector("#resultat-lmd");

        // Vérification que les 3 notes sont valides (entre 0 et 20)
        if (
            isNaN(noteWeb) || isNaN(noteAlgo) || isNaN(noteArchi) ||
            noteWeb < 0 || noteWeb > 20 ||
            noteAlgo < 0 || noteAlgo > 20 ||
            noteArchi < 0 || noteArchi > 20
        ) {
            zoneResultat.innerHTML = `<div class="alert alert-warning mt-3">Veuillez saisir trois notes valides comprises entre 0 et 20.</div>`;
            return;
        }

        // Calcul de la moyenne pondérée par les crédits (Web: 6, Algo: 6, Archi: 4 => Total = 16 crédits)
        const totalPoints = (noteWeb * 6) + (noteAlgo * 6) + (noteArchi * 4);
        const moyenne = (totalPoints / 16).toFixed(2);

        // Décision académique LMD (Seuil de validation = 10/20)
        const estAdmis = moyenne >= 10;
        const classeAlerte = estAdmis ? "alert-success" : "alert-danger";
        const decision = estAdmis ? "Semestre VALIDÉ (16/16 crédits capitalisés)" : "Semestre AJOURNÉ (Session de rattrapage)";

        zoneResultat.innerHTML = `
            <div class="alert ${classeAlerte} mt-3">
                <strong>Moyenne pondérée LMD : ${moyenne} / 20</strong><br>
                Décision : ${decision}
            </div>
        `;
    });
}