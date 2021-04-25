<?php
    header('Content-Type: application/json');

    date_default_timezone_set('Asia/Seoul');    // 시간대를 서울로 설정. (GMT + 09:00)
    $yesterday = date('Ymd', $_SERVER['REQUEST_TIME']-86400);   // 하루 전 날짜로 변수 선언
    $ch = curl_init();
    $url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'; /*URL*/
    $queryParams = '?' . urlencode('serviceKey') . '=cUOPX%2BSd5nQS89x3FKfp1T7EwpB0ntAMuLIJaKdVYXlRshVmXeY4TNxIhFXDnxAYwobzjIE6TnDwBAEAXox2FA%3D%3D'; /*Service Key*/
    $queryParams .= '&' . urlencode('pageNo') . '=' . urlencode('1'); /**/
    $queryParams .= '&' . urlencode('numOfRows') . '=' . urlencode('10'); /**/
    $queryParams .= '&' . urlencode('startCreateDt') . '=' . urlencode($yesterday); /**/
    $queryParams .= '&' . urlencode('endCreateDt') . '=' . urlencode($yesterday); /**/

    curl_setopt($ch, CURLOPT_URL, $url . $queryParams);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    $response = curl_exec($ch);
    curl_close($ch);

    //var_dump($response);

    $object = simplexml_load_string($response);
    // $items = $object->body->items->item[1]->gubun;
    $items = $object;
    var_dump($items);
?>