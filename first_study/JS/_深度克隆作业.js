/**
 *
 *  深层克隆作业
 * 
 */

/**
 * 
 *  1.遍历对象
 *  2。判断是不是原始值
 *  3.判断对象类型(这里只考虑对象和数组)
 *  4.建立相对应的数组或对象
 *  5.递归
 * 
 */


var obj1 = {
    name : 'abc',
    num : [1,2,3,[1,2]],
};
var obj2 = {};

function deepClone(origin, target){
    var target = target || {};
    var toStr = Object.prototype.toString;
    var isObject = '[object Array]';

    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){//这里排除对象原型上的属性值
            if(typeof(origin[prop]) == 'object' && origin[prop] !== null){
                if(toStr.call(origin[prop]) == isObject){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            }else{
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

//执行并验证函数
deepClone(obj1, obj2);
console.log(obj2);

obj1.num[3].push(4);
console.log(obj2.num);