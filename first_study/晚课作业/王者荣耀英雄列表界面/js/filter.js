/**
 * 筛选数组
 * @param {*} data 过滤的数组
 * @param {*} type 类型
 * @param {*} key 关键字
 */
function filter(data, type, key) {
    if(type === 'free'){
        return data.filter((item)=> {
            return item.isFree;
        });
    }else if(type === 'new'){
        return data.filter(item => {
            return item.isNew;
        });
    }else if(type === 'type'){
        if(key == ""){
            return heros;
        }
        return data.filter(item => {
            return item.types.includes(parseInt(key));
        })
    }else if(type === 'key'){
        return data.filter(item => {
            return item.name.includes(key) || item.nickname.includes(key)
        })
    }else{
        return [];
    }
}
