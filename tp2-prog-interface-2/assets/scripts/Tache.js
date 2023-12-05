export default class Tache {
    #_el;
    #_index;
    #_elActions;
    #_elCible;
    #_elTacheDetail;
    #_elTaches;
    #_elTemplateTache;
    #_elCritereDeTri;

    constructor(el, tacheInstance) {
        this.#_el = el;
        this.#_index = this.#_el.dataset.jsTache;
        this.#_elActions = this.#_el.querySelector('[data-js-actions]');
        this.#_elCible = document.querySelector('#cible');
        this.tacheInstance = tacheInstance;
        this.#_elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this.#_elTaches = document.querySelector('[data-js-taches]');
        this.#_elTemplateTache = document.querySelector('[data-js-template-tache]');
        this.#_elCritereDeTri = document.querySelectorAll('[data-js-trier]');

        this.#init();
    }

    /**
     * Initialise les comportements
     */
    #init() {
        this.#_elActions.addEventListener('click', function (e) {
            if (e.target.dataset.jsAction == 'afficher') {
                this.#afficheDetail();

                if (this.#_elCible) {
                    window.scrollTo({
                        top: this.#_elCible.getBoundingClientRect().top - 50,
                        behavior: 'smooth'
                    });
                }
            } else if (e.target.dataset.jsAction == 'supprimer') {
                this.#supprimeTache();
            }
        }.bind(this));
    }

    /**
     * Affiche les détails d'une tâche spécifique
     */
    #afficheDetail() {
        let idTache = this.#_index;
        let data = {
            action: 'afficheDetail',
            idTache: idTache
        };
        console.log(data);

        let oOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('assets/requetes/requetesAsync.php', oOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails de la tâche');
                }
                return response.json();
            }.bind(this))
            .then(function (tacheDetail) {
                console.log("Détails de la tâche reçus:", tacheDetail);
                this.#updateDetailDOM(tacheDetail);
            }.bind(this))
            .catch(function (error) {
                console.error('Erreur:', error);
            });
    }

    /**
     * Met à jour le DOM avec les détails de la tâche
     * @param {object} tacheDetail - Détails de la tâche à afficher
     */
    #updateDetailDOM(tacheDetail) {
        console.log(tacheDetail);
        let description = tacheDetail.description || 'Aucune description disponible.';
        let elDetailDom = `
        <div class="detail__info">
            <p><small>Tâche : </small>${tacheDetail.tache}</p>
            <p><small>Description : </small>${description}</p>
            <p><small>Importance : </small>${tacheDetail.importance}</p>
        </div>`;

        this.#_elTacheDetail.innerHTML = elDetailDom;
    }

    /**
     * Supprime la tâche de la DB et appelle la méthode pour injecter les tâches mises à jour
     */
    #supprimeTache() {
        let idTache = this.#_index;
        let data = {
            action: 'supprimeTache',
            idTache: idTache
        };

        let oOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('assets/requetes/requetesAsync.php', oOptions)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression de la tâche');
                }
                return response.json();
            })
            .then(function (idTache) {
                this.#_el.remove();
            }.bind(this))
            .catch(function (error) {
                console.error('Erreur:', error);
            });
    }
}
















    


