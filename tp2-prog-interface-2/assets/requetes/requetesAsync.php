<?php
require_once('fonctionsDB.php');
header('Content-Type: application/json');

$connexion = connexionDB();
$request_payload = trim(file_get_contents('php://input'));
$data = json_decode($request_payload, true);

if (!isset($data['action'])) {
    echo json_encode(['error' => 'Aucune action spécifiée']);
    exit;
}

switch ($data['action']) {
    case 'getAllTaches':
        if (isset($data['id'])) {
            $projet = mysqli_fetch_assoc(getAllTaches($data['id']));
            echo json_encode($projet);
        } else {
            echo json_encode(['error' => 'ID manquant']);
        }
        break;

    case 'ajouteTache':
        if (isset($data['tache'], $data['description'], $data['importance'])) {
            $resultat = ajouteTache($data['tache'], $data['description'], $data['importance']);
            echo json_encode(['success' => $resultat]);
        } else {
            echo json_encode(['error' => 'Données manquantes']);
        }
        break;

    case 'supprimeTache':
        if (isset($data['id'])) {
            $resultat = supprimeTache($data['id']);
            echo json_encode(['success' => $resultat]);
        } else {
            echo json_encode(['error' => 'ID manquant']);
        }
        break;


    case 'afficheDetail':
    if (isset($data['idTache'])) {
        $tacheDetail = getTacheDetail($data['idTache']);
        if ($tacheDetail) {
            echo json_encode($tacheDetail);
        } else {
            echo json_encode(['error' => 'Erreur lors de la récupération des détails de la tâche']);
        }
    } else {
        echo json_encode(['error' => 'ID de la tâche manquant']);
    }
    break;

    case 'trierTaches':
        if (isset($data['propriete'])) {
            $propriete = $data['propriete'];
            $resultat = trierTaches($propriete);
            echo json_encode($resultat);
        } else {
            echo json_encode(['error' => 'Critère de tri non défini']);
        }
        break;


    default:
        error_log('Action non spécifiée ou incorrecte: ' . $data['action']);
        echo json_encode(['error' => 'Action non spécifiée ou incorrecte.']);
        break;
}

?>