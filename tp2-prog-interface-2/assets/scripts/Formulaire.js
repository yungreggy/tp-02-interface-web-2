import Tache from './Tache.js';

export default class Formulaire {
    #_el;
    #_elInputTache;
    #_elInputDescription;
    #_elsInputImportance;
    #_elBouton;
    #_elTemplateTache;
    #_elTaches;

    constructor(el) {
        this.#_el = el;
        this.#_elInputTache = this.#_el.querySelector('[name="tache"]');
        this.#_elInputDescription = this.#_el.querySelector('[name="description"]');
        this.#_elsInputImportance = this.#_el.querySelectorAll('input[name="importance"]');
        this.#_elBouton = this.#_el.querySelector('[data-js-btn]');
        this.#_elTemplateTache = document.querySelector('[data-js-template-tache]');
        this.#_elTaches = document.querySelector('[data-js-taches]');

        this.#init();
    }

    /**
     * Initialise les comportements
     */
    #init() {
        this.#_elBouton.addEventListener('click', function (e) {
            e.preventDefault();

            let estValide = this.#valideFormulaire();
            if (estValide) {
                this.#ajouteTache();
                this.#_el.reset();
            }
        }.bind(this));
    }

    /**
     * Validation du formulaire
     * @returns {boolean}
     */
    #valideFormulaire() {
        let estValide = true;

        if (this.#_elInputTache.value == '') {
            this.#_elInputTache.parentNode.classList.add('error');
            estValide = false;
        } else {
            this.#_elInputTache.parentNode.classList.remove('error');
        }

        let elCheckedImportance = this.#_el.querySelector('input[name="importance"]:checked');
        if (!elCheckedImportance) {
            this.#_elsInputImportance[0].parentNode.classList.add('error');
            estValide = false;
        } else {
            this.#_elsInputImportance[0].parentNode.classList.remove('error');
        }

        return estValide;
    }

    /**
     * Ajoute la tâche au tableau aTaches et appelle la méthode pour injecter la nouvelle tâche
     */
    #ajouteTache() {
        let tache = {
            action: 'ajouteTache',
            tache: this.#_elInputTache.value.trim(),
            description: this.#_elInputDescription.value.trim(),
            importance: this.#_el.querySelector('input[name="importance"]:checked').value.trim()
        };

        let oOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tache)
        };

        fetch('assets/requetes/requetesAsync.php', oOptions)
            .then(function (response) {
                if (!response.ok) throw new Error('Erreur serveur');
                return response.json();
            }.bind(this))
            .then(function (data) {
                let elCloneTemplate = this.#_elTemplateTache.cloneNode(true);
                for (const cle in tache) {
                    let regex = new RegExp('{{' + cle + '}}', 'g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, tache[cle]);
                }

                let elNouvelleTache = document.importNode(elCloneTemplate.content, true);
                this.#_elTaches.append(elNouvelleTache);
                new Tache(this.#_elTaches.lastElementChild);
            }.bind(this))
            .catch(function (error) {
                console.error('Erreur:', error);
            });
    }
}
