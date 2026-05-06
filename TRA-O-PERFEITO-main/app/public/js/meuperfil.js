'use strict'

let photo = document.getElementById('imgFoto');
let file = document.getElementById('fImage');

photo.addEventListener('click', () => {
    file.click()
})

file.addEventListener('change', (event) => {
    let reader = new FileReader();

    reader.onload = () => {
        photo.src = reader.result;
    }
    reader.readAsDataURL(file.files[0]);
})