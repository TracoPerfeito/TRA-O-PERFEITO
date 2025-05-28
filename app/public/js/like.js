
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


// // Estrela do filtro


        document.addEventListener('DOMContentLoaded', function() {

         var estrelas = document.querySelectorAll('.estrela');

            estrelas.forEach(function(estrela, index){

                estrela.addEventListener('click', function(){
                    estrelas.forEach(function(e) {
                        e.classList.remove('selecionado');
                    });

                    for(var i = 0; i<= index; i++){
                        estrelas[i].classList.add('selecionado');
                    }
                });

               
            });
         


});
           
    //     document.addEventListener('DOMContentLoaded', function() {
    //         var estrelas = document.querySelectorAll('.estrela');

    //         estrelas.forEach((estrela, index) => {
    //             estrela.addEventListener('click', () => {
    //                 estrelas.forEach(estrela => estrela.classList.remove('selected'));
                    
    //                 estrelas.forEach((estrela, i) => {
    //                     estrela.classList.add('selected');
    //                 })
    //             });
    //         });

    // });
