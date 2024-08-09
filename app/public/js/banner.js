var temp = 1;
function Carrossel(){
    document.getElementById('slide'+temp).checked = false;
    temp +=1;
    if(document.getElementById('slide'+temp)==null){
        temp=1;
    }
    document.getElementById('slide'+temp).checked = true;
}
let passar;
function PassarProLado() {if(!passar){
    passar =setInterval(Carrossel, 2000);
}}