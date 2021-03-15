const axios=require('axios');
const { response } = require('express');
// database url: https://jsonblob.com/2c155f5d-7afb-11eb-8dd6-6f7957243c71 


//get request to jsonblob.com
// axios.get('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(
//     response =>{
//         console.log(response.data);
//     }
// );

//post request
// axios.post('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71').then(response => {
//     console.log(response.data);
// });

// / put request to jsonblob.com
/*
axios.put('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71 ',{
	firstname:'John',
	lastname:'Doe'
}).then(response=>{
	console.log(response.data);
});
*/

// delete request to jsonblob.com
// axios.delete('https://jsonblob.com/api/jsonBlob/2c155f5d-7afb-11eb-8dd6-6f7957243c71 ').then(response=>{
// 	console.log(response.data);
// });