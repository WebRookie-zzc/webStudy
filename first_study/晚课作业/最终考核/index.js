$(function () {
    function getData () {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://os.ncuos.com/api/user/token', true);
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log(xhr.responseText);
            }
        }
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send();
    }
    $('button').on('click', getData);
})