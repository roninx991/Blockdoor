
// var ipfsHash;
// var buffer;
// const ipfsAPI = require('ipfs-api');
// const ipfs = ipfsAPI('localhost','5001',{protocol:'http'});


// $(document).ready(function(){
// 	var view, buffer;
// 	const reader = new FileReader();
	
// 	$("#btn-upload").click(function(event){
// 		const url = "/upload";
// 		var data = {};
// 		data.bf = JSON.stringify(view);
// 		console.log(data);
// 		ipfs.files.add(buffer,function(err,res){
// 			if(err){
// 				console.log(err);
// 			}
// 			ipfsHash = res[0].hash;
// 			console.log('ipfsHash',ipfsHash);
// 		});
// 	});

// 	$("#file").change(function(event){
// 		console.log('capture file...');
// 		event.preventDefault();
// 		const file = event.target.files[0];
// 	    // document.getElementById("file").innerHTML = "File selected: " + file.name;		
// 		reader.readAsArrayBuffer(file);		
// 		reader.onloadend = () => {
// 			buffer = new Buffer(reader.result);
// 			//view = new Float64Array(buffer);
// 			console.log('buffer', buffer);
// 		}
// 	});	
// });



