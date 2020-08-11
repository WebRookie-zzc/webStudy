/**
 * 
 * 一个字符串[ a - z ]组成，找出该字符串第一个只出现一次的字母
 * 
 * 只会暴力求解？？？？
 * 
 */

String.prototype.onlyFirst = function () {
    var len = this.length;
    for(var i = 0; i < len; i++){
        for(var j = 0; j < len; j++){
            if(i != j){
                if(this[i] == this[j]){
                    // console.log(i)
                    // console.log(j);
                    break;
                }
            }
        }
        if(j == len){
            return this[i];
        }
    }
}

var str = "aabcd";
var only = str.onlyFirst();
console.log(only);