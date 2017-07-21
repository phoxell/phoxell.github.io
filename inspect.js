var d0, d1, d2, d3;

function go(){
    d0=document.getElementById('d0');
    d1=document.getElementById('d1');
    d2=document.getElementById('d2');
    d3=document.getElementById('d3');
    d0.innerHTML='0]';
    d1.innerHTML='1]';
    d2.innerHTML='2]';
    d3.innerHTML='3]';
    navigator.bluetooth.requestDevice({filters:[{services: ['00000000-0000-1000-8000-00805f9b34fb']}]})
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('00000000-0000-1000-8000-00805f9b34fb'))
    .then(service => service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb'))
    .then(characteristic => characteristic.startNotifications())
    .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
        console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });
}

function handleCharacteristicValueChanged(event) {
    var d = event.target.value;
    d0.innerHTML='[0] '+d[0];
    d1.innerHTML='[1] '+d[1];
    d2.innerHTML='[2] '+d[2];
    d3.innerHTML='[3] '+d[3];
}
