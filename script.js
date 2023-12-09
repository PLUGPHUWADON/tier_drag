//var additems
let outitems = document.getElementById("outitems");
let textinput = document.querySelector(".textinput");
let colorinput = document.querySelector(".colorinput");
let renameinput = document.querySelector(".renameinput");
let btnok = document.querySelector(".btnok");
let boxset = document.querySelector(".boxset");
let btnset = document.querySelectorAll(".set");
let btnclose = document.querySelectorAll(".close");
let items = document.querySelectorAll(".item"); 
let bgcolor = document.querySelectorAll(".item .title");
let title = document.querySelectorAll(".item .title > h2");
let tier_list = document.querySelectorAll(".tier_list");
//var dragdrop
let boximg = document.querySelector(".boximg");
let outimage = document.querySelector(".outimage");
let btnaddimg = document.querySelector(".btnaddimg > input");
let image = document.querySelectorAll(".outimage > img");
let tierimage = document.querySelectorAll(".tier_list > img");


let credivitem = document.createElement("div");
let crdivtitle = document.createElement("div");
let creh2title = document.createElement("h2");
let credivtier_list = document.createElement("div");
let credivtier = document.createElement("div");
let crespan = document.createElement("span");
let creiset = document.createElement("i");
let creiclose = document.createElement("i");
let credivimage = document.createElement("div");
let creimg = document.createElement("img");

let index = 0;
let x = 0;
let y = 0;
let intest = 0;
let checkstartdrop = 0;
let indexdragstart = 0;
let indextierliststart = 0;
let indextierlistmove = 0;
let indexdrag = 0;
let indexmove = -1;

btnok.addEventListener("click",() => {
    //create items
    if (textinput.value != "") {
        credivitem = document.createElement("div");
        crdivtitle = document.createElement("div");
        creh2title = document.createElement("h2");
        credivtier_list = document.createElement("div");
        crespan = document.createElement("span");
        creiset = document.createElement("i");
        creiclose = document.createElement("i");
        
        credivitem.classList.add("item");
        crdivtitle.classList.add("title");
        creh2title.innerHTML = textinput.value;
        credivtier_list.classList.add("tier_list");
        creiset.className = "fa-solid fa-gear set";
        creiclose.className = "fa-solid fa-xmark close";

        credivitem.appendChild(crdivtitle);
        crdivtitle.appendChild(creh2title);
        credivitem.appendChild(credivtier_list);
        credivitem.appendChild(crespan);
        crespan.appendChild(creiset);
        crespan.appendChild(creiclose);

        outitems.appendChild(credivitem);

        items = document.querySelectorAll(".item"); 
        btnset = document.querySelectorAll(".set");
        btnclose = document.querySelectorAll(".close");
        bgcolor = document.querySelectorAll(".item .title");
        title = document.querySelectorAll(".item .title > h2");
        tier_list = document.querySelectorAll(".tier_list");
    }
});

btnaddimg.addEventListener("change",(event) => {
    let file = event.target.files[0];
    let url = URL.createObjectURL(file);
    creimg = document.createElement("img");

    creimg.src = url;

    outimage.appendChild(creimg);

    image = document.querySelectorAll(".outimage > img");
});

document.body.addEventListener("click",(event) => {
    //setting
    if (event.target.className == "fa-solid fa-gear set") {
        index = Array.from(btnset).indexOf(event.target);
        colorinput.value = "#202124";
        renameinput.value = title[index].innerHTML;

        boxset.classList.toggle("addshowboxset");
        colorinput.addEventListener("input",() => {
            bgcolor[index].style.backgroundColor = `${colorinput.value}`;
        });
        renameinput.addEventListener("input",() => {
            title[index].innerHTML = `${renameinput.value}`;
        });
    }
    //check del
    if (event.target.className == "fa-solid fa-xmark close") {
        index = Array.from(btnclose).indexOf(event.target);
        outitems.removeChild(outitems.children[index]);
        items = document.querySelectorAll(".item"); 
        btnset = document.querySelectorAll(".set");
        btnclose = document.querySelectorAll(".close");
        bgcolor = document.querySelectorAll(".item .title");
        title = document.querySelectorAll(".item .title > h2");
        tier_list = document.querySelectorAll(".tier_list");
        boxset.classList.remove("addshowboxset");
    }
});

document.body.addEventListener("mousedown",() => {
    for (let i = 0 ; i < image.length ; i++) {
        image[i].addEventListener("dragstart",() => {
            indexdragstart = i;
        });
    }
    for (let i = 0 ; i < tier_list.length ; i++) {
        tier_list[i].addEventListener("dragover",(event) => {
            event.preventDefault();
            x = event.clientX;
            y = event.clientY;
            for (let j = 0 ; j < tier_list[i].children.length ; j++) {
                let po1 = tier_list[i].children[j].getBoundingClientRect();
                if (po1.top < y &&
                    po1.bottom > y &&
                    po1.left < x &&
                    po1.right > x) {
                        indexmove = j;
                }
            }
            for (let j = 0 ; j < tier_list.length ; j++) {
                let po1 = tier_list[j].getBoundingClientRect();
                if (po1.top < y &&
                    po1.bottom > y &&
                    po1.left < x &&
                    po1.right > x) {
                        indextierlistmove = j;

                }
            }
            if (event.target.tagName != "IMG") {
                indexmove = -1;
            }
        });
    }
    for (let i = 0 ; i < tier_list.length ; i++) {
        if (tier_list[i].haselement != true) {
            tier_list[i].addEventListener("drop",() => {
                //drop image to tier_list
                if (checkstartdrop == 1 && indexmove == -1) {
                    tier_list[i].appendChild(image[indexdragstart]);
                    tier_list = document.querySelectorAll(".tier_list");
                    checkstartdrop = 0;
                }
                //drop image to tier_list and overlap
                else if (checkstartdrop == 1 && indexmove != -1) {
                    tier_list[i].insertBefore(image[indexdragstart],tier_list[indextierlistmove].children[indexmove]);
                    tier_list = document.querySelectorAll(".tier_list");
                    checkstartdrop = 0;
                }
                //drop in 1 tier_list and overlap
                else if (checkstartdrop == 0 && indextierliststart == i) {
                    if (indexdrag >= 0 && (indexdrag < indexmove)) {
                        let img = tier_list[indextierliststart].children[indexmove].src;
                        tier_list[indextierliststart].children[indexmove].src = tier_list[indextierliststart].children[indexdrag].src
                        for (let i = indexdrag ; i < indexmove ; i++) {
                            for (let j = i + 1 ; j < indexmove ; j++) {
                                tier_list[indextierliststart].children[i].src = tier_list[indextierliststart].children[j].src;
                            }
                            if (i == indexmove - 1) {
                                tier_list[indextierliststart].children[i].src = img;
                            }
                        }
                    }
                    else if (indexdrag > indexmove && (indexmove >= 0)) {
                        let img = tier_list[indextierliststart].children[indexmove].src;
                        tier_list[indextierliststart].children[indexmove].src = tier_list[indextierliststart].children[indexdrag].src;
                        for (let i = indexdrag ; i > indexmove ; i--) {
                            for (let j = i - 1 ; j > indexmove ; j--) {
                                tier_list[indextierliststart].children[i].src = tier_list[indextierliststart].children[j].src;
                            }
                            if (i == indexmove + 1) {
                                tier_list[indextierliststart].children[i].src = img;
                            }
                        }
                    }
                }
                //drop in tier_list and overlap
                else {
                    tier_list[i].insertBefore(tier_list[indextierliststart].children[indexdrag],tier_list[indextierlistmove].children[indexmove]);
                }
            });
            tier_list[i].haselement = true;
        }
    }
    for (let i = 0 ; i < tier_list.length ; i++) {
        tier_list[i].addEventListener("mousedown",(event) => {
            intest = Array.from(tier_list[i].children).indexOf(event.target)
            indexdrag = intest;
        }); 
    }
    for (let i = 0 ; i < tier_list.length ; i++) {
        if (tier_list[i].haselement2 != true) {
            tier_list[i].addEventListener("mousedown",() => {
                indextierliststart = i;
            });
            tier_list[i].haselement2 = true;
        }
    }
    outimage.addEventListener("dragover",(event) => {
        event.preventDefault();
    });
    if (outimage.hasend != true) {
        outimage.addEventListener("drop",() => {
            if (tier_list[indextierliststart].children[indexdrag] != undefined && checkstartdrop != 1) {
                outimage.appendChild(tier_list[indextierliststart].children[indexdrag]);
            }
            image = document.querySelectorAll(".outimage > img");
            checkstartdrop = 0;
        });
        outimage.hasend = true;
    }
    outimage.addEventListener("mousedown",() => {
        checkstartdrop = 1;
    });
});