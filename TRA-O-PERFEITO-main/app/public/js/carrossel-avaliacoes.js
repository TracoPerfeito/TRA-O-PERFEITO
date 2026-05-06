
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides next to each other
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    let currentSlideIndex = 0;

    nextButton.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            track.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
        }
    });
});

const carousel = document.querySelector('.carousel');
const container = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentScrollPosition = 0;
const scrollAmount = container.clientWidth; // A largura do container visível

// Calcula a largura total do conteúdo dentro do carrossel
const maxScroll = carousel.scrollWidth - container.clientWidth;

// Botão "Próximo"
nextButton.addEventListener('click', () => {
    currentScrollPosition = Math.min(currentScrollPosition + scrollAmount, maxScroll);
    carousel.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
    });
});

// Botão "Anterior"
prevButton.addEventListener('click', () => {
    currentScrollPosition = Math.max(currentScrollPosition - scrollAmount, 0);
    carousel.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
    });
});
