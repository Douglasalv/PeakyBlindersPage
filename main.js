var scaling = 1.20;
//count
var currentSliderCount = 0;

//quantidade de videos
var videoCount = document.querySelectorAll(".slide").length;


//quantidade de videos que serão exibidos no slide
var showCount = 5;


var sliderCount = videoCount / showCount;
var scollWidth = 0;

var seasons = document.querySelectorAll(".season-item");
seasons.forEach(item => {
    item.addEventListener("click", function () {
        removeSeasonsClass(seasons);
        item.classList.add("active");
    })
})

window.onload = function () {
    init();
};

//função para ajustar a exibição dos videos caso a tela sofra uma mudança de tamanho
window.onresize = function (event) {
    init();
};

function init() {
    //elementos
    var win = document.querySelector(".episodes");
    var episodesContainer = document.querySelector(".episodes-container");
    var sliderContainer = document.querySelector(".slider-container");
    var slide = new Array();

    document.querySelectorAll(".slide").forEach(item => {
        slide.push(item);
    });

    //windowWidth = tamanho da DIV EPISODES
    var windowWidth = win.clientWidth;
    var frameWidth = win.clientWidth - 180;

    //Ajustes da qtd de videos que serão exibidos de acordo com o tamanho da DIV EPISODES
    if (windowWidth >= 0 && windowWidth <= 414) {
        showCount = 3;
    } else if (windowWidth >= 414 && windowWidth <= 768) {
        showCount = 4;
    } else {
        showCount = 5;
    }

    //TAMANHO DO VIDEO = Tamanho da DIV EPISODES dividido pela quantidade de videos a serem exibidos
    var videoWidth = windowWidth / showCount;
    var videoHeight = Math.round(videoWidth / (16 / 9));

    //Diferença do tamanho do video quando ocorrer um scaling
    var videoWidthDiff = (videoWidth * scaling) - videoWidth;
    var videoHeightDiff = (videoHeight * scaling) - videoHeight;

    //set sizes
    //Tamanho DIV EPISODES menos TAMANHO DA DIV BTNS e considerando que o video ser aumentando no scaling
    episodesContainer.style.width = (windowWidth - 180) / 10 + "rem";
    episodesContainer.style.height = (videoHeight * scaling) / 10 + "rem";


    sliderContainer.style.height = (videoHeight * scaling) / 10 + "rem";
    sliderContainer.style.width = ((videoWidth * videoCount) + videoWidthDiff) / 10 + "rem";
    sliderContainer.style.top = (videoHeightDiff / 2) / 10 + "rem";

    slide.forEach(slide => {
        slide.style.height = videoHeight / 10 + "rem";
        slide.style.width = videoWidth / 10 + "rem";
    });

    //counts
    var scollWidth = 0;

    slide.forEach((item, index) => {
        item.addEventListener("mouseover", function () {
            this.style.width = videoWidth * scaling / 10 + "rem";
            this.style.height = videoHeight * scaling / 10 + "rem";
            this.style.top = -(videoHeightDiff / 2) / 10 + "rem";
            this.style.opacity = 1;
            this.style.cursor = "pointer";
            this.childNodes[1].style.opacity = 1;

            if (index == 0 || index % 5 == 0) {
                // do nothing
            }
            else if (index + 1 % 5 == 0 && index != 0) {
                this.parentElement.style.marginLeft = -(videoWidthDiff - controlsWidth);
            }
            else {
                this.parentElement.style.marginLeft = - (videoWidthDiff / 2);
            }

        });
        item.addEventListener("mouseout", function () {
            this.style.width = videoWidth * 1 / 10 + "rem";
            this.style.height = videoHeight * 1 / 10 + "rem";
            this.style.top = 0;
            this.style.opacity = 0.5;
            this.childNodes[1].style.opacity = 0;
        });
    })

    // controls
    controls();
}

function controls() {
    var sliderContainer = document.querySelector(".slider-container");
    var slide = document.querySelector('.slide');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');


    next.addEventListener("click", function () {
        sliderContainer.style.transform = "translateX(-55rem)";
        next.style.opacity = 0.5;
        prev.style.opacity = 1;
    });

    prev.addEventListener("click", function () {
        sliderContainer.style.transform = "translateX(0)";
        next.style.opacity = 1;
        prev.style.opacity = 0.5;
    });

};

function removeSeasonsClass(seasons) {
    seasons.forEach(item => {
        item.classList.remove("active");
    })
}