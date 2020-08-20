let arr = [['foo', 'bar'], ['name', 'Oscar Hills']];
let obj = Object.fromEntries((arr));
console.log(obj);
//{ foo: 'bar', name: 'Oscar Hills' }