<!DOCTYPE html>
<html lang="fr_CA">

<head>
    <!-- meta -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>TP2 | Simon C-B</title>
    <meta name="description" content="TP2 du cours 582-21F-MA Programmation d'interface Web 1">

    <!-- styles -->
    <link rel="stylesheet" type="text/css" href="./assets/styles/styles.css">

    <!-- scripts -->
    <script src="./assets/scripts/main.js" type="module" defer></script>
</head>

<body data-js-component="Router">
    <header>
        <h1>TP2</h1>
        <p>Un gestionnaire de tâches (to-do-list) en POO.</p>
        <hr>
    </header>
    <main>

        <!-- Section ajout d'une tâche -->
        <section>
            <h3>Ajouter une tâche</h3>
            <form data-js-formulaire>
                <div>
                    <label for="tache">Nouvelle tâche : </label>
                    <input type="text" id="tache" name="tache">
                </div>

                <div>
                    <label for="description">Description : </label>
                    <input type="text" id="description" name="description">
                </div>

                <div>
                    <label for="haute">Haute : </label>
                    <input type="radio" id="haute" name="importance" value="1">
                    <label for="moyenne">Moyenne : </label>
                    <input type="radio" id="moyenne" name="importance" value="2">
                    <label for="basse">Basse : </label>
                    <input type="radio" id="basse" name="importance" value="3">
                </div>

                <div>
                    <button data-js-btn>Ajouter</button>
                </div>
            </form>
        </section>

<!-- Section liste des tâches -->
<section class="to-do-list">
    <h3>Liste des tâches</h3>

 <template data-js-template-tache>
    <div class="tache" data-js-tache="{{id}}">
        <span class="tache-nom">   <small>Tâche : </small>{{tache}}</span>
       
        <span class="tache-importance"><small>Importance : </small>{{importance}}</span>
        <span data-js-actions>
                    <button data-js-action="afficher">Afficher le détail</button>
                    <button data-js-action="supprimer">Supprimer</button>
                </span>
    
    </div>
</template>



    <?php
    require_once('assets/requetes/fonctionsDB.php'); 
    $taches = getAllTaches(); 

   
    while ($tache = mysqli_fetch_assoc($taches)) {
        echo '<div data-js-tache='. $tache['id'] . '>
            <p>
                <span>
                    <small>Tâche : </small> '. $tache['tache'] . '
                </span>
                -
                <span class="tache-importance">
                    <small>Importance : </small>' . $tache['importance'] .'
                </span>
                <span data-js-actions>
                    <button data-js-action="afficher">Afficher le détail</button>
                    <button data-js-action="supprimer">Supprimer</button>
                </span>
            </p>
        </div>';

    

    }
    
    ?>

    <div data-js-taches></div>

    <div class="to-do-list__actions" data-js-trier-taches>
        <button data-js-trier="tache">Trier par ordre alphabétique</button>
        <button data-js-trier="importance">Trier par importance</button>
    </div>
</section>


<!-- Section détail d'une tâche -->
<section class="detail detail--ouvert" data-js-detail id="cible">
    <h3>Détail d'une tâche</h3>

    <div class="chevron chevron--top" data-js-chevron></div>

    <div class="detail__tache" data-js-tache-detail></div>
</section>
</body>

</html>