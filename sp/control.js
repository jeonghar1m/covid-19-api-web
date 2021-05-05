const langs = ['한국어', 'English', '中文'];
let lang = '한국어';    // Set default value
let city = "합계";  // 맨 처음 사이트 접속시 기본적으로 전국 정보 출력

langs.forEach((lang)=> {
    $("#lang_button").append(
        '<input type="button" value="' + lang + '" />'
    );
})

PrintCityButton();
PrintResult();
ClickCityButton();

$('#lang_button input[type=button]').on('click', function(value) {                                
    lang = $(this).val();

    let contentTexts;

    if(lang == "한국어")
        contentTexts = ['코로나19 감염자 현황', '도시 선택', '코로나19 현황 조회하기'];
    else if(lang == "English")
        contentTexts = ['COVID-19 Infected Status', 'Select the city', 'COVID-19 Status'];
    else if(lang == "中文")
        contentTexts = ['COVID-19 感染者状况', '城市选择', 'COVID-19 查询状态'];

    $('title').text(contentTexts[0]);
    $('legend').text(contentTexts[1]);
    $('#title_name > h1').text(contentTexts[2]);

    PrintCityButton();
})

function PrintCityButton() {
    $("#cities").empty();
    let cities;

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

$('#lang_button input[type=button]').on('click', function(value) {
    lang = $(this).val();
    ClickCityButton();
})

function ClickCityButton() {
    $('#cities input[type=button]').on('click', function(value) {
        if($(this).val() == "전국")
            city = "합계";
        else
            city = $(this).val();   // button의 value를 지역변수 city에 대입.
            
        PrintResult();
    })
}

function PrintResult() {
    fetch('result.php')
        .then( (response) => {
            return response.json();
        })
        .then ( (data) => {
            let result = $('#result');
            let items = data.items.item;
            let cityData;
            if(lang == "한국어")
                cityData = items.filter ( (item) => item.gubun ==  city );
            else if(lang == "English")
                cityData = items.filter ( (item) => item.gubunEn ==  city );
            else if(lang == "中文")
                cityData = items.filter ( (item) => item.gubunCn ==  city );

            $("#result").empty();   // 새롭게 버튼을 누를 경우 result 초기화.
            
            cityData.forEach( (item) => {
                let incDecText, defCntText, isolClearCntText, deathCntText, overFlowCntText;

                if(lang == "한국어") {
                    if(city == "합계")
                        result.html('<h2 class=\"content\">전국의 코로나19 감염자 현황</h2>');
                    else
                        result.html('<h2 class=\"content\">' + city + '의 코로나19 감염자 현황</h2>');

                    incDecText = "추가 확진자";
                    defCntText = "누적 확진자";
                    isolClearCntText = "누적 완치자";
                    deathCntText = "누적 사망자";
                    overFlowCntText = "해외 유입자";
                }
                else if(lang == "English") {
                    result.html('<h2 class=\"content\">' + city + "'s COVID-19 infomations");

                    incDecText = "New Confirmed Persons";
                    defCntText = "Accumulate Confirmed persons";
                    isolClearCntText = "Accumulate Cure person";
                    deathCntText = "Accumulate Deaths";
                    overFlowCntText = "Overseas inflow";
                }
                else if(lang == "中文") {
                    result.html('<h2 class=\"content\">' + city + " COVID-19 信息");

                    incDecText = "其他确诊病例";
                    defCntText = "累计确诊病例";
                    isolClearCntText = "累积固化";
                    deathCntText = "累计死亡";
                    overFlowCntText = "外国流入";
                }

                result.append(
                    `<p class="\content\"><b>${incDecText}:</b> ${item.incDec}</p>`,
                    `<p class="\content\"><b>${defCntText}:</b> ${item.defCnt}</p>`,
                    `<p class="\content\"><b>${isolClearCntText}:</b> ${item.isolClearCnt}</p>`,
                    `<p class="\content\"><b>${deathCntText}:</b> ${item.deathCnt}</p>`,
                    `<p class="\content\"><b>${overFlowCntText}:</b> ${item.overFlowCnt}</p>`,
                );
            }
        )
    });
}