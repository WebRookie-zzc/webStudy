/**
 * 渲染字典
 */
function renderDic (data) {
    const letters = [
        'A','B', 'C', 'D', 'E', 'F','G','H','J','K', 'L', 'M', 'N', 'P', 'Q','R', 'S', 'T','W','X','Y','Z'
    ];
    let htmlstr = ``;
    let listr = ``;
    letters.forEach(letter => {
        for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].cityInfoList.length; j++){
                if(data[i].cityInfoList[j].firstChar == letter){
                    listr += `
                    <li class="city ${data[i].cityInfoList[j].rank == 'S' || data[i].cityInfoList[j].rank == 'A' ? 'high-rank' : ""}">${data[i].cityInfoList[j].name}</li>
                    `
                }
            }
        }
        htmlstr += `
        <div id="lable${letter}" class="city-wrapper">
        <div class="lable">${letter}</div>
        <ul class="citis">
            ${listr}
        </ul>
    </div>
        `
        listr = ``;
    });
    $('.dic').html(htmlstr);
}

