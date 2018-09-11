// ============== 针对属性方法的装饰器 ==================
// 包装函数
function Decorator(type) {
  /**
   *  @param {any} target 装饰的属性所属的类的原型
   *  @param {string} key 装饰的属性的名称
   *  @param {object} descriptor 装饰的属性的属性描述符
   */
  return function(target, key, descriptor) {
    // 获取实例化的时候此属性的默认值 ?
    let v = descriptor.initializer && descriptor.initializer.call(this);
    return {
      enumerable: true,
      configurable: true,
      get: function() {
        return v;
      },
      set: function(c) {
        v = c;
      }
    };
  };
}

function CheckDecorator(type) {
  return function(target, key, descriptor) {
    let v = descriptor.initializer && descriptor.initializer.call(this);
    console.log("descriptor:", descriptor);
    return {
      enumerable: true,
      configurable: true,
      get: function() {
        return v;
      },
      set: function(c) {
        var cType = typeof c;
        if (cType !== type) {
          console.error(`${key} must be ${type}`)
          return
          // throw new Error(`${key} must be ${type}`);
        }
        v = c;
      }
    };
  };
}
// ============== 针对属性方法的装饰器 ==================

// ============== 针对类的装饰器 ==================

// ============== 针对类的装饰器 ==================

class CarModal {
  /**
   * 价格
   */
  price = 0;

  /**
   * 卖家名
   */
  @CheckDecorator("string")
  sellerName = "";
}

const carInstance = new CarModal();
carInstance.sellerName = 2;
console.log("carInstance:", carInstance.sellerName);
