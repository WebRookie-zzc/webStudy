const xhr = new XMLHttpRequest();
xhr.open('GET', './data.json');
xhr.send();
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            const data = JSON.parse(xhr.responseText); 
            // console.log(data);

            function render(data) {
                $('ul').html(`
                    ${
                        data.reduce(function (prev='', curr) {
                            console.log(prev);
                            return prev+= `
                            <li class="user">
                            <img src="${curr.pic}">
                            <p>${curr.name}</p>
                            <span>关注</span>
                        </li>
                            `;
                        })
                    }
                `);
            }
            render (data.content);
            let page = 1;
            $('.slide-btn').on('click', function () {
                if($(this).hasClass('left')){
                    if(page === 1){
                        page = 3;
                        $('.iner-list').css('left', '-2000px');
                    }else if(page === 3){
                        $('.iner-list').css('left', '-1000px');
                        page--;
                    }else{
                        $('.iner-list').css('left', '0px');
                        page--;
                    }
                }else{
                    if(page === 3){
                        page = 1;
                        $('.iner-list').css('left', '0px');
                    }else if(page === 1){
                        $('.iner-list').css('left', '-1000px');
                        page++;
                    }else{
                        $('.iner-list').css('left', '-2000px');
                        page++;
                    }
                }
            });
        }
    }
}