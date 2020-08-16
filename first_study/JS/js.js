class Person{
    constructor(name) {
        this.name = name;
    }
    showName(){
        console.log("the class of parents");
    }
}

class Student extends Person{
    constructor(name, skill){
        super();
        this.skill = skill;
    }
    showName() {
        super.showName();//执行父元素里面的showName方法
        console.log("the class of son");
    }
}
new Student().showName();