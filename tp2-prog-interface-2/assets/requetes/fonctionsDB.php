<?php
$connexion = connexionDB();

/**
 * Connection avec la base de données
 */
function connexionDB()
{
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    //define('DB_PASSWORD', 'root');			// MAC
    define('DB_PASSWORD', '');			// Windows

    $laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);

    if (!$laConnexion) {
        // La connexion n'a pas fonctionné
        die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
    }

    $db = mysqli_select_db($laConnexion, 'to-do-list');

    if (!$db) {
        die('La base de données n\'existe pas.');
    }

    mysqli_query($laConnexion, 'SET NAMES "utf8"');
    return $laConnexion;
}

/**
 * Exécute la requête SQL
 * Si le paramètre $insert est true, retourne l'id de la ressource ajoutée à la db
 */
function executeRequete($requete, $insert = false)
{
    global $connexion;
    if ($insert) {
        mysqli_query($connexion, $requete);
        return $connexion->insert_id;
    } else {
        $resultats = mysqli_query($connexion, $requete);
        return $resultats;
    }
}

/**
 * Retourne toutes les tâches de la base de données.
 */
function getAllTaches()
{
    return executeRequete("SELECT * FROM taches");
}

/**
 * Ajoute une tâche à la base de données.
 */
function ajouteTache($tache, $description, $importance)
{
    global $connexion;
    $tache = trim(mysqli_real_escape_string($connexion, $tache));
    $description = trim(mysqli_real_escape_string($connexion, $description));
    $importance = trim(mysqli_real_escape_string($connexion, $importance));

    return executeRequete("INSERT INTO taches (tache, description, importance) VALUES ('$tache', '$description', '$importance')");
}

/**
 * Supprime une tâche de la base de données.
 */
function supprimeTache($idTache)
{
    global $connexion;
    $idTache = intval(trim(mysqli_real_escape_string($connexion, $idTache)));

    return executeRequete("DELETE FROM taches WHERE id = $idTache");
}


/**
 * Obtient les détails d'une tâche spécifique de la base de données.
 * @param int $idTache L'identifiant de la tâche à récupérer.
 * @return array|false Le tableau associatif des détails de la tâche ou false en cas d'erreur.
 */
function getTacheDetail($idTache)
{
    global $connexion;
    $idTache = intval(mysqli_real_escape_string($connexion, $idTache));
    $requete = "SELECT * FROM taches WHERE id = $idTache";
    $resultat = mysqli_query($connexion, $requete);

    if ($resultat) {
        return mysqli_fetch_assoc($resultat);
    } else {
        error_log("Erreur lors de la récupération des détails de la tâche: " . mysqli_error($connexion));
        return false;
    }
}


/**
 * Met à jour une tâche dans la base de données.
 */
function mettreAJourTache($idTache, $nouvelleTache, $nouvelleDescription, $nouvelleImportance)
{
    global $connexion;
    $idTache = trim(mysqli_real_escape_string($connexion, $idTache));
    $nouvelleTache = trim(mysqli_real_escape_string($connexion, $nouvelleTache));
    $nouvelleDescription = trim(mysqli_real_escape_string($connexion, $nouvelleDescription));
    $nouvelleImportance = trim(mysqli_real_escape_string($connexion, $nouvelleImportance));

    return executeRequete("UPDATE taches SET tache = '$nouvelleTache', description = '$nouvelleDescription', importance = '$nouvelleImportance' WHERE id = $idTache");
}


/**
 * Trie les tâches en fonction de la propriété spécifiée.
 */
function trierTaches($propriete)
{
    global $connexion;

    $orderBy = "";
    switch ($propriete) {
        case 'tache':
            $orderBy = "ORDER BY tache ASC";
            break;
        case 'importance':
            $orderBy = "ORDER BY importance DESC";
            break;
        default:
           
            return getAllTaches(); 
    }

    return executeRequete("SELECT * FROM taches $orderBy");
}



