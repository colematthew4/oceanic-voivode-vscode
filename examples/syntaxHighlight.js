var globalVar;
/**
 * Constructor for AjaxRequest class
 * @param {string} url the url for the request<p/>
 */
function AjaxRequest(url) {
  function local() { }
  var urls = ["www.cnn.com", 5, globalVar];
  this.request = new XMLHttpRequest();
  url = url.replace(/^\s*(.*)/, "$1") // skip loading whitespace
  url = url.replace(/^[\w\.-]+@([\w\-]+|\.)+[A-Z0-9]{2,4}(?x)/, "$1") // skip loading whitespace
  url = url.replace(/\x0g\#\p{Alpha}\1(?#comment)/, "$1") // skip loading whitespace
  url = url.replace(/.*\Q...\E$/, "$1") // skip loading whitespace
  /* check the url to be in urls */
  var a = "\u1111\z\n\u11";
  this.foo = new function () { };
  this.foo();
  #
  var hello = () => console.log("hello");
}

@decorator()
class NameClass {
}
declare module name {
  declare export var exportedVar: string;
  declare export function exportedFunction(): void;
  declare export class ExportedClass { }
}
interface MyInterface { }
type FooBarAlias = string;
var html = `<div title='HTML injection'>Injected language fragment</div>`
var x: MyInterface, y: string, z: FooBarAlias

import _ from 'lodash';

class SomeClass extends AbstractClass implements Interface<T> {
  constructor() { }
  static foo() { }
  get hello() { }
  set hello(v) {}
}
function foo() {
  var x = 10;
  this.x = null;
  if (x === undefined) {
    console.log('foo');
    window.alert('foo');
    debugger;
    return false;
  }

  return true;
}

async function promise() {
  try {
    const res = await myCall();
    yield 10;
  } catch (e) {
    throw new Error('invalid');
  } finally {
    for (let elem of array) {
      if (elem instanceof SomeClass || elem typeof NameClass) return false;
    }
  }

  return true;
}

SomeClass.prototype.foo = foo;

export default foo;
module.exports = foo;

