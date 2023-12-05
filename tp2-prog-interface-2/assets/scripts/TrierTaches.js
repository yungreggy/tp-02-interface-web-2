export default class TrierTaches {
  #_el;
  #_elTaches;
  #_trieTaches;
  #_elTrierTaches;
  #_elBtnTrier;

  constructor(el) {
    this.#_el = el;
    this.#_elTaches = document.querySelector("[data-js-taches]");
    this.#_elTrierTaches = document.querySelector("[data-js-trier-taches]");
    this.#_elBtnTrier = document.querySelectorAll("[data-js-trier]");
   

    this.init();
  }
    
    /**
     * Initialise les comportements
     */
 init() {
    this.#_elTrierTaches.addEventListener("click", this.#trieTaches.bind(this));
  }

  /**
     * Réordonne le tableau aTaches et appelle la méthode pour injecter les tâches mises à jour
     * @param {String} propriete 
     */
  #trieTaches(propriete) {
    let data = {
      action: "trierTaches",
      propriete: propriete
    };

    let oOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data)
    };

    fetch("assets/requetes/requetesAsync.php", oOptions)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("Erreur lors du tri des tâches");
        }
        return response.json();
      }.bind(this))
      .then(function(tachesTriees) {
        this.#_elTaches.innerHTML = "";
        tachesTriees.forEach(function(tache) {
          this.#_elTaches.insertAdjacentHTML("beforeend", tache);
        }.bind(this));
      }.bind(this))
      .catch(function(error) {
        console.error("Erreur:", error);
      });
  }
}

