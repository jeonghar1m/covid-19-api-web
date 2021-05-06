const langs = ['한국어', 'English', '中文'];
let lang = '한국어';    // Set default value
let city = "합계";  // 맨 처음 사이트 접속시 기본적으로 전국 정보 출력

langs.forEach((lang)=> {
    $("#lang_button").append(
        `<input type="button" value="${lang}" />`
    );
})

PrintCityButton();
PrintResult();
ClickCityButton();

$('#lang_button input[type=button]').on('click', function(value) {                                
    lang = $(this).val();

    let contentTexts = undefined;

    if(lang == "한국어")
        contentTexts = ['코로나19 감염자 현황', '도시 선택', '코로나19 현황 조회하기'];
    else if(lang == "English")
        contentTexts = ['COVID-19 Infected Status', 'Select the city', 'COVID-19 Status'];
    else if(lang == "中文")
        contentTexts = ['COVID-19 感染者状况', '城市选择', 'COVID-19 查询状态'];

    $('head > title').text(contentTexts[0]);
    $('#select > legend').text(contentTexts[1]);
    $('#title_name > h1').text(contentTexts[2]);

    PrintCityButton();
})

$('#lang_button input[type=button]').on('click', function(value) {
    lang = $(this).val();
    ClickCityButton();
})

function PrintCityButton() {
    $("#cities").empty();
    let cities = undefined;

    if(lang == '한국어')
        cities = ["전국", "서울", "제주", "경남", "경북", "전남", "전북", "충남", "충북", "강원", "경기", "세종", "울산", "대전", "광주", "인천", "대구", "부산"];
    else if(lang == 'English')
        cities = ["Total", "Seoul", "Jeju", "Gyeongsangnam-do", "Gyeongsangbuk-do", "Jeollanam-do", "Jeollabuk-do", "Chungcheongnam-do", "Chungcheongbuk-do", "Gangwon-do", "Gyeonggi-do", "Sejong", "Ulsan", "Daejeon", "Gwangju", "Incheon", "Daegu", "Busan"];
    else if(lang == "中文")
        cities = ["合计", "首尔", "济州", "庆南", "庆北", "全南", "全北", "忠南", "忠北", "江原", "京畿", "世宗", "蔚山", "大田", "光州", "仁川", "大邱", "釜山"];

    cities.forEach( (city) => {
        $("#cities").append(
            `<input type="button" value="${city}" />`
        );
    })
}

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
            let cityData = undefined;
            if(lang == "한국어")
                cityData = items.filter ( (item) => item.gubun ==  city );
            else if(lang == "English")
                cityData = items.filter ( (item) => item.gubunEn ==  city );
            else if(lang == "中文")
                cityData = items.filter ( (item) => item.gubunCn ==  city );

            $("#result").empty();   // 새롭게 버튼을 누를 경우 result 초기화.
            
            cityData.forEach( (item) => {
                let outputText = undefined;

                if(lang == "한국어")
                    outputText = ['의 코로나19 감염자 현황', '추가 확진자', '누적 확진자', '누적 완치자', '누적 사망자', '해외 유입자'];
                else if(lang == "English")
                    outputText = ['\'s COVID-19 infomations', 'New Confirmed Persons', 'Accumulate Confirmed persons', 'Accumulate Cure persons', 'Accumulate Deaths', 'Overseas inflow'];
                else if(lang == "中文")
                    outputText = [' COVID-19 信息', '其他确诊病例', '累计确诊病例', '累积固化', '累计死亡', '外国流入'];

                if(lang == "한국어" && city == "합계")  // "합계"가 아닌 "전국"으로 출력해주기 위해 조건문 구현
                    result.html(`<h2 class=\"content\">전국${outputText[0]}</h2>`)
                else
                    result.html(`<h2 class=\"content\">${city}${outputText[0]}</h2>`)

                result.append(
                    `<p class="\content\"><b>${outputText[1]}:</b> ${item.incDec}</p>`,
                    `<p class="\content\"><b>${outputText[2]}:</b> ${item.defCnt}</p>`,
                    `<p class="\content\"><b>${outputText[3]}:</b> ${item.isolClearCnt}</p>`,
                    `<p class="\content\"><b>${outputText[4]}:</b> ${item.deathCnt}</p>`,
                    `<p class="\content\"><b>${outputText[5]}:</b> ${item.overFlowCnt}</p>`,
                );
            }
        )
    });
}