let titleDOM = document.querySelector(".title");
let descriptionDOM = document.querySelector(".description");
let cardDOM = document.querySelector(".card");
let uilDOM = document.querySelector(".uil");
let removeIconDOM = document.querySelector(".remove");

window.onload = () => {
    function refresh() {
        let xhttp = new XMLHttpRequest(); // XML Objesi oluşturuyoruz
        xhttp.open("GET", "https://jsonplaceholder.typicode.com/posts"); // API'a atılacak request içeriğini yazıyoruz
        xhttp.onload = () => {
            if(xhttp.status == 200 && xhttp.status < 300){  // atılan request başarılı sonuç verirse 
                if(cardDOM.className == "card off hide"){
                    cardDOM.classList.remove("hide");
                }
                uilDOM.classList.remove("uil-wifi-slash");
                uilDOM.classList.add("uil-wifi");
                titleDOM.innerHTML = "You're online now!";
                descriptionDOM.innerHTML = "Yepp! Internet is connected.";
                cardDOM.classList.remove("off");
                uilDOM.classList.remove("wifi-off");

                // kapatma butonuna tıklayınca bildirimi yok ediyoruz
                removeIconDOM.onclick = () => { 
                    cardDOM.classList.add("hide");
                }

                // internet bağlıyken 4 sn sonra bildirimin kaybolmasını sağlıyoruz
                setTimeout(()=>{ 
                    cardDOM.classList.add("hide");
                }, 4000);
            }
            else { // atılan request başarılı sonuç vermezse 
                offMode ();

            }
        }
        xhttp.onerror = () => { 
            offMode (); // error verdiği takdirde de offmode'a geçmesini istiyoruz

        }
        xhttp.send(); // API'a request atıyoruz
    }

    // internet bağlantısı yokken olacak durumlar
    function offMode (){
        if(cardDOM.className == "card hide"){
            cardDOM.classList.remove("hide");
        }
        uilDOM.classList.remove("uil-wifi");
        uilDOM.classList.add("uil-wifi-slash");
        titleDOM.innerHTML = "You're offline now!";
        descriptionDOM.innerHTML = "Opps! Internet is disconnected.";
        cardDOM.classList.add("off");
        uilDOM.classList.add("wifi-off");

        // kapatma butonuna tıklayınca bildirimi yok ediyoruz
        removeIconDOM.onclick = () => {
            cardDOM.classList.add("hide");
        }

    }

    //100ms'de bir request atıp internet bağlantısını kontrol ediyoruz
    setInterval(() => {
        refresh();
    }, 100);
}

