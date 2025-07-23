<?php
// CORS headers (sempre)
//header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Gestione preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Gestione POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $data = [
        "annoselezionato"     => $input["annoselezionato"] ?? "",
        "dataFine"            => $input["dataFine"] ?? "",
        "dataInizio"          => $input["dataInizio"] ?? "",
        "idtipoatto"          => $input["idtipoatto"] ?? "",
        "numeroprogressivo"   => $input["numeroprogressivo"] ?? "",
        "numeroprotocollo"    => $input["numeroprotocollo"] ?? "",
        "oggetto"             => $input["oggetto"] ?? "",
        "PageNumber"          => $input["PageNumber"] ?? "1",
        "searchfield"         => $input["searchfield"] ?? "",
        "statopubblicazione"  => $input["statopubblicazione"] ?? "1"
    ];

    $url = "https://www.trasparenzascuole.it/Ajax/APP_Ajax_Get.aspx?action=GET_APD_TABLE&Others=9be004ad-1368-43a7-aa12-18cfb412b3e1";
    $jsonData = json_encode($data);

    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $jsonData,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json']
    ]);

    $htmlContent = curl_exec($curl);

    if ($htmlContent === false) {
        echo json_encode(['error' => curl_error($curl)]);
        curl_close($curl);
        http_response_code(500);
        exit;
    }

    curl_close($curl);

    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    $dom->loadHTML($htmlContent);
    $payload = [];

    foreach ($dom->getElementsByTagName("tr") as $row) {
        $text = $row->textContent;
        $tagliata = substr($text, 26); // attenzione: fragile se il contenuto cambia

        if (strpos($tagliata, ':') !== false && strpos($tagliata, '.pdf') !== false) {
            $explode = explode(".pdf", explode(":", $tagliata)[1]);

            $payload[] = [
                "datainserimento" => substr($tagliata, 0, 10),
                "oggetto" => trim($explode[0])
            ];
        }
    }
    unset($dom);
    // 🔽 CONTROLLO NUOVO DOCUMENTO PUBBLICATO
    $ultimoTrovato = $payload[0]['datainserimento'] ?? '';
    $ultimoSalvato = @file_get_contents("last.txt");

    if ($ultimoTrovato && $ultimoTrovato !== $ultimoSalvato) {
        file_put_contents("last.txt", $ultimoTrovato);

        // 🔔 INVIO NOTIFICA PUSH
        invia_notifica("Nuovo atto pubblicato il $ultimoTrovato");
    }

    echo json_encode($payload);
    exit;

}

// 🔔 FUNZIONE PER INVIARE NOTIFICHE ONESIGNAL
function invia_notifica($messaggio)
{
    $fields = [
        'app_id' => 'INSERISCI_IL_TUO_APP_ID_ONESIGNAL',
        'included_segments' => ['All'],
        'headings' => ['en' => 'Trasparenza Scuole'],
        'contents' => ['en' => $messaggio]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic INSERISCI_LA_TUA_REST_API_KEY'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    curl_setopt($ch, CURLOPT_POST, true);

    $result = curl_exec($ch);
    curl_close($ch);
}
