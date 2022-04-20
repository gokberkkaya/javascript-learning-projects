const inputDOM = document.querySelector("#task");
const listDOM = document.querySelector("#list");
const toastDOM = document.querySelector(".toast-body");

// bellekte önceden kalma task varmı diye kontrol ediyoruz
let tasksStorage = localStorage.getItem("tasks");
let tasks = tasksStorage ? JSON.parse(tasksStorage) : [];

// bellekten veri aldıysak aldığımız verileri listeye aktarıyoruz
if(tasksStorage){
    for (let i = 0; i < tasks.length; i++) {
        let liDOM = document.createElement("li");
        liDOM.innerHTML = `${tasks[i].task} 
    <button type="button" class="close" data-dismiss="toast" aria-label="Close" style="height: 100%; width: 3.5rem;">
        <span aria-hidden="true">&times;</span>
    </button>`;
        liDOM.classList.value = tasks[i].class;
        listDOM.appendChild(liDOM);
    }
}

listDOM.addEventListener("click", completeOrRemoveElement);

function newElement() {
    let liDOM = document.createElement("li");

    // boş input girdi mi diye kontrol edelim , trim() sağ ve soldaki boşlukları siler
    if (inputDOM.value.trim() == "") {

        // toast bildirimini açalım ve uyarıyı yazalım
        $('#liveToast').toast('show');
        toastDOM.innerHTML = "You can't add empty task to the list!"
    }
    else {

        // girilen inputu li olarak ekleyelim
        liDOM.innerHTML = `${inputDOM.value} 
            <button type="button" class="close" data-dismiss="toast" aria-label="Close" style="height: 100%; width: 3.5rem;">
                <span aria-hidden="true">&times;</span>
            </button>`;
        listDOM.appendChild(liDOM);

        // belleğe ekleyelim
        tasks.push({
            task: inputDOM.value,
            class: ""
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // toast bildirimini açalım ve başarılı bildirimi verelim
        $('#liveToast').toast('show');
        toastDOM.innerHTML = "Added to the list!"

        inputDOM.value = "";
    }
}

// li elementinin işlemlerini içerir, e = ul'deki tıklanan  pointerEvent
function completeOrRemoveElement(e) {

    // eğer butona tıkladıysa parentini(li) sil
    if (e.target.localName == "button") {
        e.target.parentElement.remove();
        
        // burada bellekten almadığımız veriler için ilk seçeneği, 
        // bellekten aldığımız itemler için ikinci seçeneği kullanıyoruz
        let item =  e.target.parentElement.textContent.slice(0, -45) ||
                    e.target.parentElement.textContent.slice(0,-21); //sadece value kısmını alıyoruz
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task == item) {
                tasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
    }
    // eğer button'un child'ı olan spana tıkladıysa parentının(button) parentını(li) sil  
    else if (e.target.localName == "span") {
        e.target.parentElement.parentElement.remove();

        // burada bellekten almadığımız veriler için ilk seçeneği, 
        // bellekten aldığımız itemler için ikinci seçeneği kullanıyoruz
        let item =  e.target.parentElement.parentElement.textContent.slice(0, -45) || 
                    e.target.parentElement.parentElement.textContent.slice(0,-21); //sadece value kısmını alıyoruz
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task == item) {
                tasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
            }
        }
    }
    // görev tamamlama veya geri alma 
    else if (e.target.className == "" || e.target.className == "checked") {
        e.target.classList.toggle("checked");

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task == e.target.textContent.slice(0, -45) || tasks[i].task == e.target.textContent.slice(0,-21)) {
                tasks[i].class = e.target.classList.value;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                
                
            }
        }
    }
}




