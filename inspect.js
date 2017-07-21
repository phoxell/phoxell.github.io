d0=document.getElementById("d0");
d1=document.getElementById("d1");
d2=document.getElementById("d2");
d3=document.getElementById("d3");

function go(){
    navigator.bluetooth.requestDevice({ filters: [{ services: ['00000000-0000-1000-8000-00805f9b34fb'] }] })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('00000000-0000-1000-8000-00805f9b34fb'))
    .then(service => service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
        handleCharacteristicValueChanged);
        console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });
}

function handleCharacteristicValueChanged(event) {
    var value = event.target.value;
    d0.innerHTML='[0] '+value[0];
    d1.innerHTML='[1] '+value[1];
    d2.innerHTML='[2] '+value[2];
    d3.innerHTML='[3] '+value[3];
}

function search(){
	document.getElementById("demo").innerHTML="My First JavaScript";
	let options = {
	optionalServices:['00000000-0000-1000-8000-00805f9b34fb']
	};
	let filters = [];
	let filterName = document.querySelector('#name').value;
    if (filterName) {
    filters.push({name: filterName});
	 options.filters = filters;
    }else{
     options.acceptAllDevices = true;
    }
  
	navigator.bluetooth.requestDevice(options).then(device => {
	return	device.gatt.connect();
	
		       }).then(server => {		
			 return server.getPrimaryService('00000000-0000-1000-8000-00805f9b34fb');
			}).then(service => {
			 chosenHeartRateService = service;
			return Promise.all([
			      service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb').then(Notifications),
				  service.getCharacteristic('00000001-0000-1000-8000-00805f9b34fb').then(w),
				  service.getCharacteristic('00000003-0000-1000-8000-00805f9b34fb').then(read)
			]);
	
             }).catch(error => {
			document.getElementById("demo").innerHTML=error;
			});
}

function Notifications(characteristic){
	 characteristic.startNotifications();
}

function read(characteristic){
   
	return characteristic.readValue().then(sensorLocationData => {
		
		let sensorLocation = sensorLocationData.getUint8(1);
			document.getElementById("data").innerHTML="sensorLocation"+sensorLocation;
		
	});
	
}

function w(characteristic){

    let resetEnergyExpended = new Uint8Array.of(65,75);
    controlPoint.writeValue(resetEnergyExpended);
}




