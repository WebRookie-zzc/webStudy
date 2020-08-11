/**
 * 
 * 数组去重作业
 * 
 * hash法
 * 
 */

Array.prototype.unique = function () {
    var arr = [];
        len = this.length;
        obj = {};
    for(var i = 0; i < len;i++){
        if(!obj[this[i]]){
            obj[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
}


/**
 * 下面的是未解决的错误代码
 */



Array.prototype.unique = function (){
    for(var i = 0; i < this.length; i++){
        for(var j = i + 1; j < this.length; j++){
            if(this[i] == this[j]){
                this.splice(j, 1);
            }
        }
    }
}

var arr1 = [1,2,1,1,1,2,3,3,3,3,3];
arr1.unique();
console.log(arr1);