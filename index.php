<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>코로나19 감염자 현황</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
</head>
<body>
    <header>
        <span id="title_name"><h1>코로나19 현황 조회하기</h1></span>
    </header>
    <section>
        <script>
            // 어제 날짜를 구한다.
            // 오늘 날짜를 넘겨주면 API가 작동하지 않음.
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
                    url: 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=cUOPX%2BSd5nQS89x3FKfp1T7EwpB0ntAMuLIJaKdVYXlRshVmXeY4TNxIhFXDnxAYwobzjIE6TnDwBAEAXox2FA%3D%3D&pageNo=1&numOfRows=10&startCreateDt='+yesterday+'&endCreateDt='+yesterday,
                    dataType: 'xml',
                    success: function(data) {
                        $(data).find('item').each(function() {
                            var decide = $('decideCnt', this).text();
                            var clear = $('clearCnt', this).text();
                            var death = $('deathCnt', this).text();
                            var care = $('careCnt', this).text();
                            var exam = $('examCnt', this).text();
                            var text = "<p class=\"content\"><b>누적 확진자:</b> " + decide + "명</p>"
                            + "<p class=\"content\"><b>누적 완치자:</b> " + clear + "명</p>"
                            + "<p class=\"content\"><b>검사 중:</b> " + exam + "명</p>"
                            + "<p class=\"content\"><b>치료 중:</b> " + care + "명</p>"
                            + "<p class=\"content\"><b>누적 사망자:</b> " + death + "명</p>";
                            $('body').append(text);
                        });
                    }
                });
            })
        </script>
    </section>
</body>
</html>