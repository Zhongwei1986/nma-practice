var events = require('events'); //调用'events'模块
function Account() { //自定义Account构造函数，构造函数的实例用于两个方法和一个属性
    this.balance = 0;
    events.EventEmitter.call(this);
    this.deposit = function(amount) {
        this.balance += amount;
        this.emit('balanceChanged');
    };
    this.withdraw = function(amount) {
        this.balance -= amount;
        this.emit('balanceChanged');
    };
}
//Account构造函数的原型对象指向events.EventEmitter的原型对象
//这样保证自定义构造函数的实例能使用EventEmitter原型对象的方法
Account.prototype = new events.EventEmitter();

function displayBalance() {
    console.log("Account balance : $%d", this.balance);
}

function checkOverdarw() {
    if (this.balance < 0) {
        console.log("Account overdraw!!!");
    }
}

function checkGoal(acc, goal) {
    if (acc.balance > goal) {
        console.log("Goal Achieved!!!");
    }
}

//创建Account实例，并绑定三个回调函数
var account = new Account();
account.on("balanceChanged", displayBalance);
account.on("balanceChanged", checkOverdarw);
account.on("balanceChanged", function() {
    checkGoal(this, 1000);
});

//调用方法
account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withdraw(1200);
