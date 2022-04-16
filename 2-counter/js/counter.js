// başlangıçta gösterilecek sayıyı belirliyoruz
// öncesinde bellekte tutulan bir sayı olup olmadığı kontrol ediliyor varsa yazdırılıyor
// localStorage her veriyi string olarak tuttuğu için integer'a çeviriyoruz
let counter = localStorage.getItem("counter") ? Number(localStorage.getItem("counter")) : 0;

// elementlerin DOM bilgilerini değişkenlere atıyoruz
let counterDOM = document.querySelector("#counter");
let increaseDOM = document.querySelector("#increase");
let decreaseDOM = document.querySelector("#decrease");

// counter değişkenini DOM'a yazdırıyoruz
counterDOM.innerHTML = counter;

// butonlara click olduğunda clickEvent() fonksiyonunun çalıştırılacağını söylüyoruz
increaseDOM.addEventListener('click' , clickEvent);
decreaseDOM.addEventListener('click' , clickEvent);

function clickEvent(){
    //fonksiyonun çalıştığı elemente göre işlem yap
    this.id == "increase" ? counter++ : counter--;

    //yeni sonucu bellekte tutmak için gönderiyoruz
    localStorage.setItem("counter", counter);

    //yeni sonucu DOM'a gönder
    counterDOM.innerHTML = counter;
}