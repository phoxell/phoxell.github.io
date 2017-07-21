var d00, d01, d02, d03, d04, d05, d06, d07, d08, d09;
var d10, d11, d12, d13, d14, d15, d16, d17, d18, d19;

function go(){
    d00=document.getElementById('c00');
    d01=document.getElementById('c01');
    d02=document.getElementById('c02');
    d03=document.getElementById('c03');
    d04=document.getElementById('c04');
    d05=document.getElementById('c05');
    d06=document.getElementById('c06');
    d07=document.getElementById('c07');
    d08=document.getElementById('c08');
    d09=document.getElementById('c09');
    d10=document.getElementById('c10');
    d11=document.getElementById('c11');
    d12=document.getElementById('c12');
    d13=document.getElementById('c13');
    d14=document.getElementById('c14');
    d15=document.getElementById('c15');
    d16=document.getElementById('c16');
    d17=document.getElementById('c17');
    d18=document.getElementById('c18');
    d19=document.getElementById('c19');
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
    d00.innerHTML='[00] '+d.getInt8(0);
    d01.innerHTML='[01] '+d.getInt8(1);
    d02.innerHTML='[02] '+d.getInt8(2);
    d03.innerHTML='[03] '+d.getInt8(3);
    d04.innerHTML='[04] '+d.getInt8(4);
    d05.innerHTML='[05] '+d.getInt8(5);
    d06.innerHTML='[06] '+d.getInt8(6);
    d07.innerHTML='[07] '+d.getInt8(7);
    d08.innerHTML='[08] '+d.getInt8(8);
    d09.innerHTML='[09] '+d.getInt8(9);
    d10.innerHTML='[10] '+d.getInt8(10);
    d11.innerHTML='[11] '+d.getInt8(11);
    d12.innerHTML='[12] '+d.getInt8(12);
    d13.innerHTML='[13] '+d.getInt8(13);
    d14.innerHTML='[14] '+d.getInt8(14);
    d15.innerHTML='[15] '+d.getInt8(15);
    d16.innerHTML='[16] '+d.getInt8(16);
    d17.innerHTML='[17] '+d.getInt8(17);
    d18.innerHTML='[18] '+d.getInt8(18);
    d19.innerHTML='[19] '+d.getInt8(19);
}
