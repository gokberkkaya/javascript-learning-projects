//form submit olduğunda formHandler fonksiyonunu çalıştırsın
let userFormDOM = document.querySelector("#userForm");
userFormDOM.addEventListener("submit",formHandler);

let alertDOM = document.querySelector("#alert");

//alert içeriğini yazıyoruz
const ALERT = (title, message, color) => `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
<strong>${title}</strong> ${message}
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

function formHandler(e) {
    //default get methodunu kaldıralım data url de gözükmesin
    e.preventDefault();

    const USER_NAME = document.querySelector("#userName");
    const SCORE = document.querySelector("#score");

    if(USER_NAME.value && SCORE.value){

        // girilen notun 0-100 arasında olmasının kontrolü
        if(SCORE.value >= 0 && SCORE.value <= 100){
            addItem(USER_NAME.value,SCORE.value);
            
            //iş bitince inputları resetleyelim
            USER_NAME.value = "";
            SCORE.value = "";

            alertDOM.innerHTML = ALERT("SUCCESSFUL!", "You entered data.", "success");
        }
        else{
            alertDOM.innerHTML = ALERT("ERROR!", "You should enter between 0-100 score.", "danger");
        }
    }
    else {
        alertDOM.innerHTML = ALERT("ERROR!", "You should enter information.", "danger");
    }


}

let userListDOM = document.querySelector("#userList");

//ul'ye formda girilen dataları ekleyen fonksiyon
const addItem = (userName, score) => {

    let liDOM = document.createElement("li");

    //li nin içeriğini belirliyoruz
    liDOM.innerHTML = `
        ${userName}
        <span class="badge bg-primary rounded-pill"> ${score} </span>`

    // liye class belirliyoruz
    liDOM.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // ul içerisine li'yi ekliyoruz
    userListDOM.append(liDOM);

}