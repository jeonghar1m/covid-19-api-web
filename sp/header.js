var lang = '한국어';    // 기본값 한국어
PrintButton();

$('#lang_button input[type=button]').on('click', function(value) {                                
    if($(this).val() == "한국어") {
        $('title').text('코로나19 감염자 현황');
        $('legend').text('도시 선택');
        $('#title_name').html('<h1>코로나19 현황 조회하기</h1>');

        lang = "한국어";
    }
    else if($(this).val() == "English") {
        $('title').text('COVID-19 Infected Status');
        $('legend').text('Select the city');
        $('#title_name').html('<h1>COVID-19 Status</h1>');

        lang = "English";
    }
    else if($(this).val() == "中文") {
        $('title').text('COVID-19 感染者状况');
        $('legend').text('城市选择');
        $('#title_name').html('<h1>COVID-19 查询状态</h1>');

        lang = "中文";  
    }

    PrintButton();
        
    console.log("Button Language: " + lang);
})

function PrintButton() {
    $("#cities").empty();

    if(lang == '한국어')
        cities = ["전국", "서울", "제주", "경남", "경북", "전남", "전북", "충남", "충북", "강원", "경기", "세종", "울산", "대전", "광주", "인천", "대구", "부산"];
    else if(lang == 'English')
        cities = ["Total", "Seoul", "Jeju", "Gyeongsangnam-do", "Gyeongsangbuk-do", "Jeollanam-do", "Jeollabuk-do", "Chungcheongnam-do", "Chungcheongbuk-do", "Gangwon-do", "Gyeonggi-do", "Sejong", "Ulsan", "Daejeon", "Gwangju", "Incheon", "Daegu", "Busan"];
    else if(lang == "中文")
        cities = ["合计", "首尔", "济州", "庆南", "庆北", "全南", "全北", "忠南", "忠北", "江原", "京畿", "世宗", "蔚山", "大田", "光州", "仁川", "大邱", "釜山"];

    cities.forEach( (city) => {
        $("#cities").append(
            '<input type="button" value="' + city + '" />'
        );
    })
}