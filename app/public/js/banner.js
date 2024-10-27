// var temp = 1;
// function Carrossel(){
//     document.getElementById('slide'+temp).checked = false;
//     temp +=1;
//     if(document.getElementById('slide'+temp)==null){
//         temp=1;
//     }
//     document.getElementById('slide'+temp).checked = true;
// }
// let passar;
// function PassarProLado() {if(!passar){
//     passar =setInterval(Carrossel, 2000);
// }}


var temp = 1;
var interval = 9000; 

function Carrossel() {

    var slides = document.querySelectorAll('.slider li');
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

   
    if (document.getElementById('slide' + temp)) {
        document.getElementById('slide' + temp).checked = true;
        slides[temp - 1].style.display = 'block'; 
    }

    temp++;
    if (temp > slides.length) {
        temp = 1; 
    }
}

function iniciarCarrossel() {
    Carrossel(); 
    passar = setInterval(Carrossel, interval);
}


window.onload = iniciarCarrossel;
