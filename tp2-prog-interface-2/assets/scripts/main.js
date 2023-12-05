import Router from "./Router.js";
import Formulaire from "./Formulaire.js";
import Validation from "./Validation.js";
import Tache from "./Tache.js";
import Detail from "./Detail.js";
import TrierTaches from "./TrierTaches.js";

(function() {
  // Instancie Formulaire pour l'élément trouvé
  let elFormulaire = document.querySelector("[data-js-formulaire]");
  if (elFormulaire) {
    let formulaireInstance = new Formulaire(elFormulaire);

    // Ajout d'une instance de Validation
    let validationInstance = new Validation(elFormulaire);
    elFormulaire.addEventListener("submit", function(event) {
      if (!validationInstance.valideFormulaire()) {
        event.preventDefault();
      }
    });
  }

  // Instancie Detail pour l'élément trouvé
  let elDetail = document.querySelector("[data-js-detail]");
  if (elDetail) {
    new Detail(elDetail);
  }

  // Création et stockage des instances de Tache
  let elTaches = document.querySelectorAll("[data-js-tache]");
  let tachesInstances = [];
  for (let i = 0; i < elTaches.length; i++) {
    tachesInstances.push(new Tache(elTaches[i]));
  }

  // Instancie Router si l'élément correspondant est trouvé
  let elRouter = document.querySelector('[data-js-component="Router"]');
  if (elRouter) {
    new Router(elRouter, tachesInstances);
  }

  // Instancie TrierTaches si l'élément correspondant est trouvé
  let elTrierTaches = document.querySelector("[data-js-trier-taches]");
  if (elTrierTaches) {
    new TrierTaches();
  }
})();







