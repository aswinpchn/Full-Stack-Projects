'use strict';
const Square = require ('./exportingExample').Square

var isAreaDecimal = (sq) => {
    var area = sq.area();

    var pattern = /(\d)*\.(\d)*/g;    // Pattern for decimal number.

    return pattern.test(area);
}

var sq1 = new Square(5.16);

var sq2 = new Square();

console.log(`${sq1.area()} is the area and [If the area is decimal : ${isAreaDecimal(sq1)}]`);
console.log(`${sq2.area()} is the area and [If the area is decimal : ${isAreaDecimal(sq2)}]`);
console.log(Square.nameDisplay());

