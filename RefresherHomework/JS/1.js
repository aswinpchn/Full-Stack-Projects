'use strict';
const itemDisplay = menu => {   // To display items for each day.
    console.log('\n\nMenu each day is');
    for(let i = 0; i < menu.length; i++) {
        let day = menu[i].day;
        let todaysMenu = menu[i].food.split(' ');
        console.log(day);
        console.log(todaysMenu);
    }
}

const counter = (menu, param) => {    // To count occurence of a specific item.
    console.log('\n\nTotal number of ' + param + ' in the menu is ');
    let count = 0;
    for(let i = 0; i < menu.length; i++) {
        let daysMenu = menu[i].food;
        
        console.log(typeof daysMenu);
        
        if(daysMenu.includes(param))
            count++;
    }

    console.log(count);
} 

const shortHand = menu => {     // To display shortHand of each days name.
    console.log('\n\nThe shorthand of each day as follows');
    for(let i = 0; i < menu.length; i++) {
        var shortHandName = menu[i].day.slice(0,3);
        console.log(shortHandName);
    }
}

var JSONString = '[{"day" : "monday","food" : "cereal rice dosa"}, \
 {"day" : "tuesday","food" : "oats sambar idli"},\
 {"day" : "wednesday","food" : "porridge rasam fish"},\
 {"day" : "thursday","food" : "egg burrito taco"},\
 {"day" : "friday","food" : "bread pizza burger"}]';

var menu = JSON.parse(JSONString); // Converting JSON string to object.
console.log('Menu as JSON object is');
console.log(menu);

itemDisplay(menu);

console.log(counter(menu, 'bread'));

shortHand(menu);
console.log(JSON.stringify(menu));    // back again as JSON string.
