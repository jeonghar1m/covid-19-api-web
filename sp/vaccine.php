<?php
	$url = 'https://nip.kdca.go.kr/irgd/cov19stats.do';
	$queryParams = '?' . urlencode('list') . '=' . urlencode($_GET['list']);
	$headers = array(
	'Host: nip.kdca.go.kr',
	'User-Agent: '.$_SERVER['HTTP_USER_AGENT'],
	'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Language: ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
	'Accept-Encoding: gzip, deflate',
	'Connection: keep-alive',
	'Upgrade-Insecure-Requests: 1',
	);

	$ch = curl_init();
    curl_setopt( $ch, CURLOPT_URL, $url . $queryParams );
	curl_setopt( $ch, CURLOPT_POST, false );
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    $response = curl_exec($ch);
    curl_close($ch);
	
    $xml = simplexml_load_string($response);
    $json = json_encode($xml -> body, JSON_UNESCAPED_UNICODE);
    echo $json;

?> 