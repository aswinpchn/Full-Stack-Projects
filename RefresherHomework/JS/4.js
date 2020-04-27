'use strict';
class Electronics {
    constructor(name, purpose) {
        this.name = name;
        this.purpose = purpose;
    }

    codeNameRetrieval () {
        return `${this.name}NA${this.purpose}`;
    }
}

class PC extends Electronics {
    constructor(name, purpose, category) {
        super(name, purpose);
        this.category = category;
    }

    codeNameRetrieval () {
        return `${this.name}${this.category}${this.purpose}`;
    }
}

var Device1 = new Electronics('NewDevice', 'NA');
var HP = new PC('HewlettPackard', 'TakeItWithYou', 'Laptop');

console.log(Device1.codeNameRetrieval());
console.log(HP.codeNameRetrieval());


var HPProtoType = Object.assign({}, HP);
console.log(HPProtoType);






// https://stackoverflow.com/questions/6885404/javascript-override-methods
// https://stackoverflow.com/questions/42922596/javascript-override-parent-method-with-child-method



// get name () {
//     console.log('came in get');
//     return this._name;
// }

// set name (name) {
//     console.log('came in set');
//     this._name = name;
// }