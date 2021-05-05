var city = "합계";  // 맨 처음 사이트 접속시 기본적으로 전국 정보 출력
var lang = "한국어";
PrintResult();
ClickCityButton();

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
                if(lang == "한국어") {
                    if(city == "합계")
                        result.html('<h2 class=\"content\">전국의 코로나19 감염자 현황</h2>');
                    else
                        result.html('<h2 class=\"content\">' + city + '의 코로나19 감염자 현황</h2>');

                    result.append(
                        '<p class=\"content\"><b>추가 확진자:</b> ' + item.incDec + ' </p>',
                        '<p class=\"content\"><b>누적 확진자:</b> ' + item.defCnt + ' </p>',
                        '<p class=\"content\"><b>누적 완치자:</b> ' + item.isolClearCnt + ' </p>',
                        '<p class=\"content\"><b>누적 사망자:</b> ' + item.deathCnt + ' </p>',
                        '<p class=\"content\"><b>해외 유입자:</b> ' + item.overFlowCnt + ' </p>',
                        '<p class=\"content\">' + item.stdDay + '기준 </p>'
                    );
                }
                else if(lang == "English") {
                    result.html('<h2 class=\"content\">' + city + "'s COVID-19 infomations");

                    result.append(
                        '<p class=\"content\"><b>New Confirmed persons:</b> ' + item.incDec + ' </p>',
                        '<p class=\"content\"><b>Accumulate Confirmed persons:</b> ' + item.defCnt + ' </p>',
                        '<p class=\"content\"><b>Accumulate Cure persons:</b> ' + item.isolClearCnt + ' </p>',
                        '<p class=\"content\"><b>Accumulate Deaths:</b> ' + item.deathCnt + ' </p>',
                        '<p class=\"content\"><b>Overseas inflow:</b> ' + item.overFlowCnt + ' </p>',
                        '<p class=\"content\">As of ' + item.stdDay + '</p>'
                    );
                }
                else if(lang == "中文") {
                    result.html('<h2 class=\"content\">' + city + " COVID-19 信息");

                    result.append(
                        '<p class=\"content\"><b>其他确诊病例:</b> ' + item.incDec + ' </p>',
                        '<p class=\"content\"><b>累计确诊病例:</b> ' + item.defCnt + ' </p>',
                        '<p class=\"content\"><b>累积固化:</b> ' + item.isolClearCnt + ' </p>',
                        '<p class=\"content\"><b>累计死亡:</b> ' + item.deathCnt + ' </p>',
                        '<p class=\"content\"><b>外国流入:</b> ' + item.overFlowCnt + ' </p>',
                        '<p class=\"content\">' + item.stdDay + '标准</p>'
                    ); 
                }
            }
        )
    });
}