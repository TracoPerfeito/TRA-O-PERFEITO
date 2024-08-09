
document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.like-button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
           
            button.classList.toggle('liked');
            
            
            var icon = button.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
});
