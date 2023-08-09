export function Singleton<T extends Object>() {
  return function (constructor: { new (...args: any[]): T }) {
    let instance: T;

    return new Proxy(constructor, {
      construct(target, argArray) {
        if (!instance) instance = new target(...argArray);
        return instance;
      },
    });
  }
}

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;
 
  constructor(t: string) {
    this.title = t;
  }
}

// Alternatively, you can use the decorator directly as:
// @sealed() class Person {}


