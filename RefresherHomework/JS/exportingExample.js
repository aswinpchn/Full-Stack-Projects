'use strict';
class Square {
    
    constructor(side = 4) {     // If we dont mention the side when create, it will default to 4.
        this.side = side;
    }

    area () {
        return this.side*this.side;
    }
}

Square.nameDisplay = () => {    // Static function, accessed using class name.
    console.log('My Name is Square Class');       
}

module.exports = {Square};





//module.exports.Square = Square; // is same a previous line.
// module.exports is an object.
// within that Object, Square is a functionwrapper(Node style of handing modules).
//Object.values() - we can see what's inside Object.
// function().toString() will give what's inside a function.
