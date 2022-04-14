
//Kullanıcının adını alıp, ekrana bastırmak
let name = prompt("Adınızı girin: ", "");
document.getElementById("myName").innerHTML = name;

//saat bilgisini alalım
function showTime(){

let date = new Date(); // Date() objesi içerisinde tarih ve saati tutar. Date().toLocaleString() ile hepsini bastırabilirsin.

//date içinden sadece ihtiyacımız olanları seçiyoruz 
let hour = date.getHours(); 
let minute = date.getMinutes();
let second = date.getSeconds();

//günleri array'e atarak getDay() fonksiyonundan gün bilgisini alacağız
const dayNames = ["Pazar", "Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]; 
let day = dayNames[date.getDay()]; //getDay() fonksiyonu 0-6 arası sonuç verir ve 0 olarak Pazar gününden başlar.

document.getElementById("myClock").innerHTML = hour + ":" + minute + ":" + second + " " + day; 
}

//her 1 saniyede showTime fonskiyonunu yeniden çalıştır
setInterval(showTime,1000);



