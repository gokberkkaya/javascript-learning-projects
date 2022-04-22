const menu = [
    {
        id: 1,
        title: "Tteokbokki",
        category: "Korea",
        price: 10.99,
        img:
            "https://twoplaidaprons.com/wp-content/uploads/2020/09/tteokbokki-top-down-view-of-tteokbokki-in-a-bowl-500x500.jpg",
        desc: `Spicy rice cakes, serving with fish cake.`,
    },
    {
        id: 2,
        title: "Chicken Ramen",
        category: "Japan",
        price: 7.99,
        img:
            "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
        desc: `Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg. `,
    },
    {
        id: 3,
        title: "Bibimbap",
        category: "Korea",
        price: 8.99,
        img:
            "https://dwellbymichelle.com/wp-content/uploads/2020/05/DWELL-bibimbap.jpg",
        desc: `Boiling vegetables, serving with special hot sauce`,
    },
    {
        id: 4,
        title: "Dan Dan Mian",
        category: "China",
        price: 5.99,
        img:
            "https://www.savingdessert.com/wp-content/uploads/2019/02/Dan-Dan-Noodles-10.jpg",
        desc: `Dan dan noodle, serving with green onion `,
    },
    {
        id: 5,
        title: "Yangzhou Fried Rice",
        category: "China",
        price: 12.99,
        img:
            "https://salu-salo.com/wp-content/uploads/2013/02/Yangzhou-Fried-Rice1.jpg",
        desc: `Yangzhou style fried rice, serving with bean and pickles `,
    },
    {
        id: 6,
        title: "Onigiri",
        category: "Japan",
        price: 9.99,
        img:
            "https://www.manusmenu.com/wp-content/uploads/2017/08/Onigiri-3-1-of-1.jpg",
        desc: `Rice Sandwich, serving with soy sauce`,
    },
    {
        id: 7,
        title: "Jajangmyeon",
        category: "Korea",
        price: 15.99,
        img:
            "https://www.curiouscuisiniere.com/wp-content/uploads/2020/04/Jajangmyeon-Korean-Noodles-in-Black-Bean-Sauce5.1200H-720x540.jpg",
        desc: `Black bean sauce noodle, serving with green onion `,
    },
    {
        id: 8,
        title: "Ma Yi Shang Shu",
        category: "China",
        price: 12.99,
        img:
            "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/F688C2F6-86EC-46C4-B9C7-A6BA01DF7437/Derivates/32E3E72A-F786-406D-AF7F-B30980A9AC6C.jpg",
        desc: `Hot pepper sauce noodle, serving with soy bean and onion`,
    },
    {
        id: 9,
        title: "Doroyaki",
        category: "Japan",
        price: 3.99,
        img:
            "https://www.justonecookbook.com/wp-content/uploads/2011/10/Dorayaki-New-500x400.jpg",
        desc: `Red bean paste dessert, serving with honey.`,
    },
];

// tüm kategori bilgilerini bir dizide toplayalım
const categoriesAll = menu.map((e) => {
    return e.category;
});

// unique halde kategori isimlerini alacağımız diziyi oluşturulaım
const uniqueCategories = ["All"];

for (let i = 0; i < categoriesAll.length; i++) {
    if (!(uniqueCategories.includes(categoriesAll[i]))) {
        uniqueCategories.push(categoriesAll[i]);
    }
}

// kategori butonların parentinin DOM bilgisini alalım
const menuDOM = document.querySelector(".btn-container");

// kategori butonlarını oluşturalım ve child olarak atayalım
for (let i = 0; i < uniqueCategories.length; i++) {
    let button = document.createElement("button");
    button.innerText = uniqueCategories[i];
    button.className = "btn btn-outline-dark btn-item";
    menuDOM.appendChild(button);
}

// içerikleri yerleştireceğimiz divin DOM bilgisini alalım
const contentDOM = document.querySelector(".section-center");

menuDOM.addEventListener("click", (e) => {

    // öncesinde oluşturulmuş elementler varsa onları temizlememiz lazım
    // o divi yakalamaya çalışıyoruz
    let outDivForClear = document.querySelectorAll(".menu-items");

    // varsa içindeki elementleri kaldırıyoruz
    if(outDivForClear){
        outDivForClear.forEach((e) => {
            e.remove();
        })
    }

    // butona tıklanılan kategori değişkene atanır
    let clickCategory = e.target.innerHTML;

    menu.forEach((e) => {
        
        // tıklanılan kategori ile foreachte dönen objectin kategorisi aynı ise bastırılır
        if ("All" == clickCategory) {
            createContent(e);
        }
        else if (e.category == clickCategory) {
            createContent(e);
        }
    })
})

// tıklanılan kategori sonrasında bu fonksiyon gerekli elementleri oluşturur
function createContent(e){

    let outDiv = document.createElement("div");
    outDiv.className = "menu-items col-lg-6 col-sm-12";

    let img = document.createElement("img");
    img.className = "photo";
    img.src = e.img;
    img.alt = e.title;

    let infoDiv = document.createElement("div");
    infoDiv.className = "menu-info";

    let titleDiv = document.createElement("div");
    titleDiv.className = "menu-title";
    titleDiv.innerHTML = `<h4>${e.title}</h4> <h4>${e.price}</h4>`

    let textDiv = document.createElement("div");
    textDiv.className = "menu-text";
    textDiv.innerHTML = e.desc;

    contentDOM.appendChild(outDiv);
    outDiv.appendChild(img);
    outDiv.appendChild(infoDiv);
    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(textDiv);

}





