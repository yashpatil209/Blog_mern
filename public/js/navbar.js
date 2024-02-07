let toggle = document.getElementById('nav_bars');

function showmain(){
    let container = document.querySelector("main");
    if(toggle.classList.contains('fa-bars')){
        container.style.display = "block";
        toggle.classList.remove("fa-bars");
        toggle.classList.add("fa-xmark");
    }
    else{
        container.style.display = "none";
        toggle.classList.remove("fa-xmark");
        toggle.classList.add("fa-bars");
    }
};

function showsearch(){
    let navcontainer = document.querySelector("header");
    let navsearch = document.querySelector("#main_cont");
    navcontainer.style.display = "none";
    navsearch.style.display = "block";
};

