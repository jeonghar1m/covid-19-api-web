const langs = ['한국어', 'English', '中文'];
langs.forEach((lang)=> {
    $("#lang_button").append(
        '<input type="button" value="' + lang + '" />'
    );
})