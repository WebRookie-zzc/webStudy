$(function () {
    $('button').on('click', function () {
        var $div = $('div');
        $div.load('../ajax_geted_content/ajax2.json', function (data) {
            const jsonData = JSON.parse(data);
            console.log(jsonData.name);
        })
    })
})