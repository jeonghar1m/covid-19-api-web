<?php
    header('Content-Type: application/json');

    $ch = curl_init();
    $url = 'https://nip.kdca.go.kr/irgd/cov19stats.do?list=sido'; /*URL*/

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    $response = curl_exec($ch);
    curl_close($ch);

    $xml = simplexml_load_string($response);
    $json = json_encode($xml -> body);
    echo $json;
?> 