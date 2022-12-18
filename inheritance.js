// ==========================================
//      JavaScript classes and inheritance
// ==========================================
// Task:
// Create a base class that will contain common methods. Then create 2 child classes (inherit from base): IntBuilder in ES6 style and StringBuilder in ES5 style. Almost all methods should be chainable for handy usage. You can add any own methods and properties to the classes BUT! methods described bellow must be in your solution

document.getElementById('app').innerText = 'Inheritance Project 2022';

// ------------------------------------------
// ES6 superclass Builder:
// ------------------------------------------

// Create base class:
class Builder {
    constructor(value) {
      this.value = value;
    }

    // take infinite number of integers and sum all with stored value:
    plus(...value) {
      this.value = this.value + value.reduce((prevVal, currVal, inx) => inx === 0 ? currVal : prevVal + currVal);
      return this;
    }

    // Error objects are thrown when runtime errors occur.
    minus(...value) {
      throw new Error('Error Message: Hey geek, Error is working all fine.. Something went wrong!');
    }

    multiply(value) {
      throw new Error('Error Message: Hey geek, Error is working all fine.. Something went wrong!');
    }

    divide(value) {
      throw new Error('Error Message: Hey geek, Error is working all fine.. Something went wrong!');
    }

    // example of a method that is not modified in the subclass
    // and shows us the error message
    sayError() {
      throw new Error(
        'Error Message: Hey geek, Error is working all fine.. Something went wrong!'
      );
    }

    // returns stored value:
    get() {
      return this.value;
    }

    // static method; from, to: integer; values limits the range of random values:
    static random(from, to) {
      return Math.floor(Math.random() * (to - from) + from);
    }
}

// ------------------------------------------
// ES6 subclass IntBuilder:
// ------------------------------------------

// Create child class:
class IntBuilder extends Builder {
    // constructor takes starting integer, if not passed starts with 0:
    constructor(value = 0) {
      super(value);
    }

    // take infinite number of integers and subtract from stored value:
    minus(...value) {
      this.value = this.value - value.reduce((acc, curr) => acc + curr);
      return this;
    }

    // multiply param n on stored value:
    multiply(n) {
      this.value = this.value * n;
      return this;
    }

    // leaves integer part of division stored value on n:
    divide(n) {
      this.value = Math.floor(this.value / n);
      return this;
    }

    // leaves remainder of the division stored value with on n:
    mod(n) {
      this.value = this.value % n;
      return this;
    }

    // number of simbols
    toPrecision(n) {
      this.value = this.value.toPrecision(n);
      return this;
    }
}

let intBuilder = new IntBuilder(10);

// EXAMPLE:
let number = IntBuilder.random(10, 100);
console.log('IntBuilder random number: ', number);

// chein methods
intBuilder
    .plus(2, 3, 2)
    .minus(1, 2)
    .multiply(2)
    .divide(4)
    .mod(3)
    .toPrecision(4)
    .get();

console.log('IntBuilder value: ', intBuilder.value); // 1.000

// ------------------------------------------
// ES5 subclass StringBuilder:
// ------------------------------------------

// Create child class:
function StringBuilder(value) {
    // constructor takes starting string, if not passed starts with '':
    Object.assign(this, new Builder(value || ''));
}

// Create prototype object for StringBuilder class from Builder class:
StringBuilder.prototype = Object.create(Builder.prototype);
// Reassign constructor function:
StringBuilder.prototype.constructor = StringBuilder;
StringBuilder.superclass = Builder;

// cut last n chars from stored string:
StringBuilder.prototype.minus = function (n) {
    // example for verifying the correct pasted value
    if (typeof n !== 'number') {
      throw new Error('Error Message: value should be a number!');
    } else {
      this.value = this.value.slice(0, -n);
      return this;
    }
};

// repeat stored strings n times:
StringBuilder.prototype.multiply = function (n) {
    this.value = new Array(n + 1).join(this.value);
    return this;
};

// leaves first k chars of stored string, where k = Math.floor(str.length / n):
StringBuilder.prototype.divide = function (n) {
    let k = Math.floor(this.value.length / n);
    this.value = this.value.slice(0, k);
    return this;
};

// remove taken string str from stored; Prohibited to use String.prototype.replace():
StringBuilder.prototype.remove = function (value) {
    this.value = this.value
      .split('')
      .filter((el) => el !== value)
      .join('');
    return this;
};

// leaves substring starting from and with length n:
StringBuilder.prototype.sub = function (from, n) {
    this.value = this.value.substr(from, n);
    return this;
};

// add to string additional str
StringBuilder.prototype.concat = function (...value) {
    this.value = this.value.concat(value);
    return this;
};

// torn string to loweccase
StringBuilder.prototype.toLowerCase = function () {
    this.value = this.value.toLowerCase();
    return this;
};

// EXAMPLE:
let strBuilder = new StringBuilder('Hello'); // 'Hello';

// chein methods
strBuilder
    .plus(' all', '!')
    .minus(4)
    .multiply(3)
    .divide(4)
    .remove('l')
    .sub(1, 1)
    .concat('lepHanT')
    .toLowerCase()
    .get();

console.log('strBuilder value: ', strBuilder.value); // elephant

// TESTS:
let basicBuilder = new Builder('some');

try {
    basicBuilder.divide('a');
  } catch(e) {
    console.error(e);
}; // Error: Error Message: Hey geek, Error is working all fine.. Something went wrong!

try {
    strBuilder.sayError();
  } catch (e) {
    console.error(e);
}

// catch error when value is not a number
 try {
    strBuilder.minus('a');
  } catch (e) {
    console.error(e);
}