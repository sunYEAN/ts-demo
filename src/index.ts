
let s_name: string = 'yangheng';

let arr: [string, number];

arr = ['a', 213123];

enum Color {Red, Green, Blue};
let c:Color = Color.Blue;


interface Person {
    readonly name: string,
    readonly sex: string,
    readonly age: number,
}

let person: Person = {
    name: 'yangheng',
    sex: 'Male',
    age: 20
};


let ro: ReadonlyArray<number> = [1];

let a = ro as Array<number>;

a[0] = 10;
console.log(a)

// 类型推导
let noTypeName;
noTypeName = 1;
noTypeName = 'aaa';


let abcdef: number = undefined;

type myName = string | number;
function getLength(s: myName): number {
    s = '213';
    return s.length;// 访问联合类型的属性或者方法，必须是其共有得才行。
}

// 如
function getLengthTemp(s: number[] | string): number {
    return s.length; // length是数组和string共有的属性。
}

// 赋值时，会自动推导出它的类型
let n : string | number;
n = 'sss'; // string
console.log(n.length);
n = 1; // number;

// 接口 ------
interface Man {
    name: string,
    age?: number,
    readonly id: string,
    [propName: string]: any
}

let billy : Man = {
    name: 'yangheng',
    id: '221231213',
    age: 24, // 可有不没有
    sex: 'male' // 新增的额外的属性
};

// billy.id = '12321'; // [id] 是只读属性，不能被修改

// -------


// 数组

let numberArr : number[];
numberArr = [1, 2, 3];

let stringArr: string [];
stringArr = ['a', 'b', 'c'];

let numstrArr : (string | number)[];
numstrArr = [1, 2, 'cc'];

//泛型

let numArr: Array<number>;
numArr = numberArr; // 两种方法相同
let strArr: Array<string>;
strArr = stringArr; // 两种方法相同

let sAn: {
    [index: number]: (string | number)
} = [1, '2'];

// =>

let nAs: (string | number)[] = [1, '2'];

interface myType {
    [index: number]: number | string
}
let numsArr : myType;
numsArr = numstrArr; // 用接口表示数组
// --------


// 函数声明

function getNumber(a: string): number {
    console.log(parseInt(a));
    return parseInt(a);
}
getNumber('12哈哈');


// 函数表达式
let fn: (a: string) => number = getNumber;
fn('123213');

// typescript 中的 “=>” 是表示函数的定义，左边是输入类型（需要括号括起来），右边是输出类型


// 接口定义函数
interface PersonMan {
    name: string,
    sex: string,
    sayHi: (name:string) => void
}
let p1:PersonMan = {
    name: 'yangheng',
    sex: 'male',
    sayHi (name: string) {
        console.log('你好' + name);
    }
};
p1.sayHi('美女');

// 函数可选参数

function fnn (a: number, b?: string) : number {
    console.log(b ? a + parseInt(b) : a);
    return b ? a + parseInt(b) : a;
}
fnn(1);
fnn(1, '243ddd');

// 函数剩余参数
function fnnn (a: number, ...items: any[]) {
    console.log(a);
    console.log(items);
}
fnnn(1, 2, 3, 4);

// 函数重载 会从上到下进行匹配
function reverse(a: number): number;
function reverse(a: string): string;
function reverse(a: string | number): (string | number) {
    if (typeof a === "number") {
        return Number(a.toString().split('').reverse().join(''));
    } else if (typeof a === "string") {
        return a.split('').reverse().join('');
    }
}
console.log(reverse(123), reverse('hello'));

// ------



// 类型断言
function getLengths (a: string | number): number {
    if ((a as string).length) {
        return (a as string).length;
    } else return a.toString().length;
}
console.log(getLengths(123));

// ---



// 声明文件 d.ts
countdownTime = function (str) {
    const now = Date.now();
    const target = Date.parse(str);
    const diff = target - now;

    let hours = Math.floor(diff / (1000 * 60 * 60)),
        minutes = Math.floor(diff / (60 * 1000) % 24),
        seconds = Math.floor(diff / 1000 % 60);

    hours = Math.max(0, hours);
    minutes = Math.max(0, minutes);
    seconds = Math.max(0, seconds);
    const add_zero: (num: number) => string = (num: number) => num < 10 ? '0' + num : num.toString();

    return {
        hours: add_zero(hours),
        minutes: add_zero(minutes),
        seconds: add_zero(seconds)
    }
};
let timer = setInterval(() => {
    const date = countdownTime('2020-01-20 17:30');
    if (!parseInt(date.hours) && !parseInt(date.minutes) && !parseInt(date.seconds)) {
        clearInterval(timer);
        document.writeln('倒计时结束');
    }
    document.writeln(`倒计时：${date.hours}:${date.minutes}:${date.seconds}`);
}, 1000);



// MVVM
function observe(data: any) {
    if (!data || typeof data !== "object") {
        return;
    }

    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
    });
}

// 给每个属性加上getter setter
function defineReactive(data: any, key: string, value: any) {
    observe(value);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get(): any {
            return value;
        },
        //闭包改变value， 对象未销毁，将一直存在内存中
        set(v: any): void {
            if (value === v) return;
            console.log('监测到数据变化');
            value = v;
        }
    })
}

let localData = {
    hours: {
        name: {
            a: 10
        }
    },
    minutes: 0,
    seconds: 0,
};

observe(localData);

