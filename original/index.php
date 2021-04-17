<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>코로나19 감염자 현황</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
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
                        $('MAIN').append(text);
                    });
                }
            });
        })
    </script>
</head>
<body>
    <header>
        <span id="title_name"><h1>코로나19 현황 조회하기</h1></span>
    </header>
    <section>
        <MAIN></MAIN>
        <form action="result.php" method="get">
            <fieldset>
                <legend>도시 선택</legend>
                <table>
                    <tr>
                        <td>
                            <select name="city">
                                <option value="서울">서울</option>
                                <option value="제주">제주</option>
                                <option value="경남">경남</option>
                                <option value="경북">경북</option>
                                <option value="전남">전남</option>
                                <option value="전북">전북</option>
                                <option value="충남">충남</option>
                                <option value="충북">충북</option>
                                <option value="강원">강원</option>
                                <option value="경기">경기</option>
                                <option value="세종">세종</option>
                                <option value="울산">울산</option>
                                <option value="대전">대전</option>
                                <option value="광주">광주</option>
                                <option value="인천">인천</option>
                                <option value="대구">대구</option>
                                <option value="부산">부산</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <input type="submit" value="확인" />
        </fieldset>
        </form>
    </section>
</body>
</html>