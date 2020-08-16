/**
 * 伪搜索
 */
function fakeSearch () {
    $('.search-city').on('input', () => {
        setTimeout(()=>{
            let text = $('.search-city').val();
        if(text){
            $('.faker-search')
                .css('display', 'block')
                .text(text);
        }else{
            $('.faker-search')
                .css('display', 'none')
                .text("");
        }
        },300);
    })
}