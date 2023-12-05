import Tache from "./Tache.js";

export default class Router {
    #_routes;
    #_el;
    #_elBtnTrier;
    #_elListeTaches;
    #_elBoutonAfficher;
    #_index;
    #_elLienAccueil;
    #_path;

     /**
     * Constructeur de la classe Router
     * Initialise les éléments et les routes nécessaires pour le routage
     * @param {HTMLElement} el - Élément racine pour le routage
     */
    constructor(el) {
        this.#_el = el; 
        this.#_elBtnTrier = document.querySelectorAll('[data-js-trier]');
        this.#_elBoutonAfficher = document.querySelectorAll('[data-js-action="afficher"]');
        this.#_index = this.#_el.dataset.jsTache;
        this.#_elLienAccueil = this.#_el.querySelector('header h1');
        this.#_elListeTaches = document.querySelector('[data-js-taches]');
        this.#_routes = [
            ['/tache/:id', this.#afficheDetail.bind(this)]
        ];

        this.#_path = location.pathname;

        this.#init();
    }

/**
 * //Affiche les détails d'une tâche spécifique
 */
    #afficheDetail(id) {
        let tacheTrouvee = null;
        for (let i = 0; i < this.tachesInstances.length; i++) {
            if (this.tachesInstances[i].id == id) {
                tacheTrouvee = this.tachesInstances[i];
            }
        }

        if (tacheTrouvee) {
            tacheTrouvee.afficheDetail();
        }
    }
    

    /**
     * Initialise les écouteurs d'événements et le routage
     */
    #init() {
        let id = this.#gereHashbang();

        this.#_elBoutonAfficher.forEach(function (bouton, index) {
            bouton.addEventListener('click', function (e) {
                e.preventDefault();
                let idTache = index; 
                if (idTache !== 0) {
                    window.location = `#!/taches/${idTache}`;
                }
                history.pushState(null, null, this.#_path);
            }.bind(this));
        });

        window.addEventListener('hashchange', function () {
            this.#gereHashbang();
        }.bind(this));

        this.#_elLienAccueil.addEventListener('click', function (e) {
            e.preventDefault();
            this.#_elListeTaches.innerHTML = '';

            history.pushState(null, null, this.#_path);
        }.bind(this));

        for (let i = 0; i < this.#_elBtnTrier.length; i++) {
            this.#_elBtnTrier[i].addEventListener('click', function (e) {
                console.log('Clic sur Trier');
                this.trieTaches(e);
            }.bind(this));
        }
    }


    /**
     * Gère les changements de hashbang dans l'URL
     * @returns {number | undefined} Identifiant de la tâche si présent dans le hashbang
     */
    #gereHashbang() {
        let hash = window.location.hash.slice(2),
            isRoute = false;

        if (hash.endsWith('/')) hash = hash.slice(0, -1);

        for (let i = 0; i < this.#_routes.length; i++) {
            let route = this.#_routes[i][0],
                isId = false;

            if (route.indexOf(':') > -1) {
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            }

            if (hash.indexOf(route) > -1) {
                let hashInArray = hash.split(route);

                if (hashInArray[1]) {
                    if (isId) {
                        let id = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true;
                        return id;
                    }
                } else {
                    if (hash === this.#_routes[i][0]) {
                        this.#_routes[i][1]();
                        isRoute = true;
                    }
                }
            }
        }
    }
}

