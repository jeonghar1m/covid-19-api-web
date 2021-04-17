<?php
    $city = $_GET['city'];  // index.php로 부터 'city' 변수를 받아옴.
?>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>도시별 코로나19 감염자 현황</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
    <script>
        var city = "<?php echo $city; ?>"; // php에서 변수 호출
        let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
        if((yesterday.getMonth() + 1) >= 10 && yesterday.getDate() < 10)
            yesterday = yesterday.getFullYear()+""+(yesterday.getMonth() + 1)+"0"+yesterday.getDate();
        else if((yesterday.getMonth() + 1) < 10 && yesterday.getDate() >= 10)
            yesterday = yesterday.getFullYear()+"0"+(yesterday.getMonth() + 1)+""+yesterday.getDate();
        else if((yesterday.getMonth() + 1) < 10 && yesterday.getDate() < 10)
            yesterday = yesterday.getFullYear()+"0"+(yesterday.getMonth() + 1)+"0"+yesterday.getDate();
        else
            yesterday = yesterday.getFullYear()+""+(yesterday.getMonth() + 1)+""+yesterday.getDate();

        $(function() {
            $.ajax({
                url: 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=cUOPX%2BSd5nQS89x3FKfp1T7EwpB0ntAMuLIJaKdVYXlRshVmXeY4TNxIhFXDnxAYwobzjIE6TnDwBAEAXox2FA%3D%3D&pageNo=1&numOfRows=10&startCreateDt='+yesterday+'&endCreateDt='+yesterday,
                dataType: 'xml',
                success: function(data) {
                    $(data).find('item').each(function() {
                        var gubun = $('gubun', this).text();
                        var decide = $('defCnt', this).text();
                        var clear = $('isolClearCnt', this).text();
                        var death = $('deathCnt', this).text();
                        var care = $('isolIngCnt', this).text();

                        if(gubun == city)
                            var text = "<p class=\"content\"><b>누적 확진자:</b> " + decide + "명</p>"
                            + "<p class=\"content\"><b>누적 완치자:</b> " + clear + "명</p>"
                            + "<p class=\"content\"><b>치료 중:</b> " + care + "명</p>"
                            + "<p class=\"content\"><b>누적 사망자:</b> " + death + "명</p>";
                        $('MAIN').append(text);
                    });
                }
            });
        })
    </script>
</head>
<body>
    <header>
        <h1>코로나19 현황 조회하기</h1>
    </header>
    <section>
        <h2 style="text-align:center;"><?php echo $city ?>의 코로나19 감염자 현황</h2>
        <MAIN></MAIN>
        <form action="index.php" method="get">
            <p><input type="submit" value="이전" /></p>
        </form>
    </section>
</body>
</html>