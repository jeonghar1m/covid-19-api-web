const langs = ['한국어', 'English', '中文'];
let lang = '한국어';    // Set default language value
// 맨 처음 사이트 접속시 기본적으로 전국 정보 출력
let city = '합계';
let vaccineCity = '합계';

langs.forEach((lang)=> {
    $('#lang_button').append(
        `<input type='button' value='${lang}' />`
    );
})

PrintCityButton();
PrintResult();
ClickCityButton();
PrintVaccineResult()

$('#lang_button input[type=button]').on('click', function(value) {                                
    lang = $(this).val();

    let contentTexts = undefined;

    if(lang == '한국어')
        contentTexts = ['코로나19 감염자 현황', '도시 선택', '코로나19 현황 조회하기'];
    else if(lang == 'English')
        contentTexts = ['COVID-19 Infected Status', 'Select the city', 'COVID-19 Status'];
    else if(lang == '中文')
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
    let cities = undefined;

    $('#cities').empty();

    if(lang == '한국어')
        cities = ['전국', '서울', '제주', '경남', '경북', '전남', '전북', '충남', '충북', '강원', '경기', '세종', '울산', '대전', '광주', '인천', '대구', '부산'];
    else if(lang == 'English')
        cities = ['Total', 'Seoul', 'Jeju', 'Gyeongsangnam-do', 'Gyeongsangbuk-do', 'Jeollanam-do', 'Jeollabuk-do', 'Chungcheongnam-do', 'Chungcheongbuk-do', 'Gangwon-do', 'Gyeonggi-do', 'Sejong', 'Ulsan', 'Daejeon', 'Gwangju', 'Incheon', 'Daegu', 'Busan'];
    else if(lang == '中文')
        cities = ['合计', '首尔', '济州', '庆南', '庆北', '全南', '全北', '忠南', '忠北', '江原', '京畿', '世宗', '蔚山', '大田', '光州', '仁川', '大邱', '釜山'];

    cities.forEach( (city) => {
        $('#cities').append(
            `<input type='button' value='${city}' />`
        );
    })
}

function ClickCityButton() {
    $('#cities input[type=button]').on('click', function(value) {
        let clickValue = $(this).val();
        if(clickValue == '전국') {
            city = '합계';
            vaccineCity = '합계';
        }
        else {
            city = clickValue;   // button의 value를 지역변수 city에 대입.

            switch(clickValue) {
                case '서울': vaccineCity = '서울특별시'
                break;
                case '울산':
                case '대전':
                case '광주':
                case '인천':
                case '대구':
                case '부산': vaccineCity = `${clickValue}광역시`;
                break;
                case '제주': vaccineCity = '제주특별자치도';
                break;
                case '경남': vaccineCity = '경상남도';
                break;
                case '경북': vaccineCity = '경상북도';
                break;
                case '전남': vaccineCity = '전라남도';
                break;
                case '전북': vaccineCity = '전라북도';
                break;
                case '충남': vaccineCity = '충청남도';
                break;
                case '충북': vaccineCity = '충청북도';
                break;
                case '강원': vaccineCity = '강원도';
                break;
                case '경기': vaccineCity = '경기도';
                break;
                case '세종': vaccineCity = '세종특별자치시';
                break;
            }
        }
            
        PrintResult();
        PrintVaccineResult();
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

            if(lang == '한국어')
                cityData = items.filter ( (item) => item.gubun ==  city );
            else if(lang == 'English')
                cityData = items.filter ( (item) => item.gubunEn ==  city );
            else if(lang == '中文')
                cityData = items.filter ( (item) => item.gubunCn ==  city );

            $('#result').empty();   // 새롭게 버튼을 누를 경우 result 초기화.
            
            cityData.forEach( (item) => {
                let outputText = undefined;

                if(lang == '한국어')
                    outputText = ['의 코로나19 감염자 현황', '추가 확진자', '누적 확진자', '누적 완치자', '누적 사망자', '해외 유입자'];
                else if(lang == 'English')
                    outputText = ['\'s COVID-19 infomations', 'New Confirmed Persons', 'Accumulate Confirmed persons', 'Accumulate Cure persons', 'Accumulate Deaths', 'Overseas inflow'];
                else if(lang == '中文')
                    outputText = [' COVID-19 信息', '其他确诊病例', '累计确诊病例', '累积固化', '累计死亡', '外国流入'];

                if(lang == '한국어' && city == '합계')  // '합계'가 아닌 '전국'으로 출력해주기 위해 조건문 구현
                    result.html(`<h2 class='content'>전국${outputText[0]}</h2>`)
                else
                    result.html(`<h2 class='content'>${city}${outputText[0]}</h2>`)

                result.append(
                    `<p class='content'><b>${outputText[1]}:</b> ${item.incDec}명</p>`,
                    `<p class='content'><b>${outputText[2]}:</b> ${item.defCnt}명</p>`,
                    `<p class='content'><b>${outputText[3]}:</b> ${item.isolClearCnt}명</p>`,
                    `<p class='content'><b>${outputText[4]}:</b> ${item.deathCnt}명</p>`,
                    `<p class='content'><b>${outputText[5]}:</b> ${item.overFlowCnt}명</p>`
                );
            }
        )
    });
}

function PrintVaccineResult() {
    let result = $('#vaccine');
    let cityData = undefined;
    let outputText = ['금일 1차 접종', '금일 2차 접종', '누적 1차 접종', '누적 2차 접종'];

    result.html(`<h2 class='content'>백신 접종 현황</h3>`);
    if(vaccineCity == '합계') {
        fetch('vaccine.php?list=all')
        .then( (response) => {
            return response.json();
        })
        .then ( (data) => {
            let items = data.items.item;
    
            result.append(
                `<p class=content'><b>${outputText[0]}: </b> ${items[0].firstCnt}명</p>`,
                `<p class=content'><b>${outputText[1]}: </b> ${items[0].secondCnt}명</p>`,
                `<p class=content'><b>${outputText[2]}: </b> ${items[2].firstCnt}명</p>`,
                `<p class=content'><b>${outputText[3]}: </b> ${items[2].secondCnt}명</p>`
            )
        })
    }
    else {
        fetch('vaccine.php?list=sido')
        .then( (response) => {
            return response.json();
        })
        .then ( (data) => {
            let items = data.items.item;
            cityData = items.filter( (item) => item.sidoNm == vaccineCity )
            cityData.forEach( (item) => {    
                result.append(
                    `<p class=content'><b>${outputText[0]}: </b> ${item.firstCnt}명</p>`,
                    `<p class=content'><b>${outputText[1]}: </b> ${item.secondCnt}명</p>`,
                    `<p class=content'><b>${outputText[2]}: </b> ${item.firstTot}명</p>`,
                    `<p class=content'><b>${outputText[3]}: </b> ${item.secondTot}명</p>`
                )
            })
        })
    }
}