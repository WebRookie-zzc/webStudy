$(function () {
    function loadAfter () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5500/ajax_geted_content/ajax1.txt',true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                $('div').html(xhr.responseText);
                }
            }
        }
    }

    $('.btn').on('click', loadAfter);
})