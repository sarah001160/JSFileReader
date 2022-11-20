let input = document.querySelector('input[type="file"]');
input.addEventListener('change', function(e){
	console.log(input.files)
	const reader = new FileReader();

	reader.onload = function(){
		const img = new Image();
		img.onload = function(){
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			context.drawImage(img, 0, 0)

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			const data = imageData.data
			for(var i =0; i<=data.length; i+=4){
				const avg = (data[i] + data[i+1] + data[i+2])/3;
				data[i]=avg
				data[i+1]=avg
				data[i+2]=avg
			}	//end of for		
			context.putImageData(imageData, 0, 0)
			document.body.appendChild(canvas) //black&white
			//canvas.toDataURL()
			//canvas.toBlob(function(blob){ //24~30會跳錯
			//	const form = new FormData()
			//	form.append('image',blob, 'moody.jpg')
			//	const xhr = new XMLHttpRequest()
			//	xhr.open('POST', '/imageupload', true) //send form to server at location imageupload
			//	xhr.send(form)
			//})

		}
		img.src= reader.result
		//document.body.appendChild(img)//colorful

	//this callback herer to get the result
	//console.log(reader.result);
	//	const lines = reader.result.split('\n').map(function(line){
	//		return line.split(',')
	//		})
	//	console.log(lines);

	//split by criteria return array and use map to return new array
	} //end of reader.onload
	
	//	reader.readAsText(input.files[0]) //specify the file that we want to read, we're just grab the first file
	reader.readAsDataURL(input.files[0])


},false)


//dragover
//input.addEventListener('change', function(e){
//	handleFiles(input.files)
//}, false)