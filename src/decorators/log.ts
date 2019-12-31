/**
 * 构造函数类型
 */

type IConstructable = new (...args: any[]) => any;

function Log<T extends IConstructable>(constructor: T) {
    console.log("执行了类装饰器");
    return class extends constructor {
        static log: string = "log";
    };
}

/**
 * 
 * @param target ;
 * @param propertyName;
 * @param descriptor ;
 */

function Method(
    target: Object,
    propertyName: any,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
    console.log("target", target);
    console.log("propertyName", propertyName);
    console.log("descriptor", descriptor);
}

export {
    Log,
    Method,
};
