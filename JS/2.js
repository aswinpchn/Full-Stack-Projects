'use strict';
var students = [{
    name : "aswin",
    marks : [80,90,100]
  },
  {
    name : "vikas",
    marks : [60,70,80]
  }];

function closurePrivate() {        // Have to use func declaration, as closure requires it. // Considering Professor name as private data.
    var name = 'Simon Shim';
    function displayStaffName() {
        console.log(name);
    }
    return displayStaffName;
}

const displayWithTotals = (students) => {   // Display student name, his subject marks and his total marks.
    for(let i = 0; i < students.length; i++) {
        var rest;
        console.log(students[i].name);
        [...rest] = students[i].marks;
        console.log(rest);
        console.log(students[i].marks.reduce((a, b) => a + b, 0));
    }
}

const classTotal = (students) => {    // Gives total of all students marks.
    var allMarks = [...students[0].marks, ...students[1].marks];
    console.log('Class Total is:\t' + allMarks.reduce((a, b) => a + b, 0));
}

displayWithTotals(students);

classTotal(students);

var utility = closurePrivate();   // Professor name can be retrieved by this closureMethod only.
utility();
