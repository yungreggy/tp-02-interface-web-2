export default class Validation {
  #_el;
  #_elInputTache;
  #_elInputDescription;
  #_elsInputImportance;

  constructor(el) {
    this.#_el = el;
    this.#_elInputTache = document.querySelector('[name="tache"]');
    this.#_elInputDescription = document.querySelector('[name="description"]');
    this.#_elsInputImportance = document.querySelectorAll('input[name="importance"]');

    this.#init();
  }

    
    /**
     * Initialise les comportements
     */
  #init() {
    this.#_el.addEventListener("submit", function(event) {
      event.preventDefault();

      let estValide = this.#valideFormulaire();

      if (estValide) {
        this.#_el.submit();
      }
    }.bind(this));
  }

  #valideFormulaire() {
    let estValide = true;

    /* Input 'Nouvelle tâche' */
    if (this.#_elInputTache.value == "") {
      this.#_elInputTache.parentNode.classList.add("error");
      estValide = false;
    } else {
      this.#_elInputTache.parentNode.classList.remove("error");
    }

    /* Inputs Radio 'Importance' */
    let elCheckedImportance = this.#_el.querySelector('input[name="importance"]:checked');

    if (elCheckedImportance) {
      if (this.#_elsInputImportance[0].parentNode.classList.contains("error"))
        this.#_elsInputImportance[0].parentNode.classList.remove("error");
    } else {
      this.#_elsInputImportance[0].parentNode.classList.add("error");
      estValide = false;
    }

    return estValide;
  }
}
