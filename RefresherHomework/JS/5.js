'use strict';
 require('isomorphic-fetch');
 const Url = 'https://api.nasa.gov/planetary/apod?api_key=XyM89j3OG00Jaq4bXi9hKbHwT80ZXWseiuCp1zXJ';

fetch(Url)
    .then(response => {
        if(response.status == 200) {
            return response.json();
        }else {
            console.log('Any response other than 200');
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch((response)=>{
        console.log(response);
    });








    // var promise1 = new Promise((resolve, reject) => {
    //     fetch(Url)
    //         .then(response => {
    //             if(response.status == 200) {
    //                 resolve(response.json());
    //             }else {
    //                 reject('Any response other than 200');
    //             }
    //         })
    //         .catch((response)=>{
    //             reject('Network error');
    //         });
    // });
    
    // promise1
    //     .then((data)=>{
    //         console.log(data.explanation);
    //     })
    //     .catch((response)=>{console.log(response)});