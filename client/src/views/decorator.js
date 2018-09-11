// ================== 纯粹的装饰模式 不给类添加新方法 ==================
/**
 *
 * @param {*} target  Man
 * @param {*} key  'init'
 * @param {object} descriptor  属性描述符 { writable:true,value: ()=>{}, enumerable:true}
 *
 * @return {object} descriptor
 */
function decoratorArmour(target, key, descriptor) {
  const method = descriptor.value;
  let moreDef = 100;
  let ret;
  descriptor.value = (...args) => {
    args[0] += moreDef;
    ret = method.apply(target, args);
    return ret;
  };
  return descriptor;
}

function decoratorLight(target, key, decorator) {
  const method = decorator.value;
  const moreAtk = 2000;
  let ret;
  decorator.value = (...args) => {
    args[1] += moreAtk;
    ret = method.apply(target, args);
    return ret;
  };
  return decorator;
}

// ================== 纯粹的装饰模式 不给类添加新方法 ==================

// ================== 半透明的装饰模式 给类增加新方法 ==================
function addFly(canFly) {
  return function(target) {
    target.canFly = canFly;
    let extra = canFly ? "(技能加成: 飞行能力)" : "";
    let method = target.prototype.toString;
    target.prototype.toString = (...args) => {
      return method.apply(target.prototype, args) + extra;
    };
    return target;
  };
}
// ================== 半透明的装饰模式 给类增加新方法 ==================

@addFly(true)
class Man {
  constructor(def = 2, atk = 3, hp = 3) {
    this.init(def, atk, hp);
  }

  @decoratorLight
  @decoratorArmour
  init(def, atk, hp) {
    this.def = def;
    this.atk = atk;
    this.hp = hp;
  }

  toString() {
    return `防御力：${this.def},攻击力:${this.atk},血量:${this.hp}`;
  }
}

var tony = new Man();
console.log(`当前状态===>${tony}`);
