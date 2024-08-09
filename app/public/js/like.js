var btn = document.getElementById("coracao");

function colorir() {
    if(btn.classList.contains("normal")){
        btn.classList.remove("normal");
        btn.classList.add("colorido");

    } else {
        btn.classList.remove("colorido");
        btn.classList.add("normal");
    }
}

function likebtn(icon){
    colorir(icon);
}

document.addEventListener('DOMContentLoaded', function() {
    var icons = document.querySelectorAll(".coracao");
    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            likeBtn(icon);
        });
    });
});