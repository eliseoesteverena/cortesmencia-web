
const carousels = document.querySelectorAll('.carousel');
const loopInterval = 3000;
carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-images img');
    const thumbnails = carousel.querySelectorAll('.carousel-thumbnails img');
    const descriptions = carousel.querySelectorAll('.carousel-descriptions div');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    const thumbnailsWrapper = carousel.querySelector('.carousel-thumbnails-wrapper');
    let currentIndex = 0;

    function updateCarousel(index) {
        images.forEach(img => img.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active-thumbnail'));
        descriptions.forEach(desc => desc.classList.remove('active'));

        images[index].classList.add('active');
        thumbnails[index].classList.add('active-thumbnail');
        descriptions[index].classList.add('active');

        scrollToThumbnail(index);
    }

    function scrollToThumbnail(index) {
        const thumbnail = thumbnails[index];
        const thumbnailsWrapperRect = thumbnailsWrapper.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
    
        if (thumbnailRect.left < thumbnailsWrapperRect.left) {
            thumbnailsWrapper.scrollLeft += thumbnailRect.left - thumbnailsWrapperRect.left - 90;
        } else if (thumbnailRect.right > thumbnailsWrapperRect.right || index === thumbnails.length - 1) {
            thumbnailsWrapper.scrollLeft += thumbnailRect.right - thumbnailsWrapperRect.right + 90;
        }
    }

    function nextImage() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel(currentIndex);
    }

    function startAutoScroll() {
        autoScroll = setInterval(nextImage, loopInterval);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Inicializar auto-scroll
    startAutoScroll();

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(index);
            stopAutoScroll();
            startAutoScroll();
        });
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel(currentIndex);
        stopAutoScroll();
        startAutoScroll();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel(currentIndex);
        stopAutoScroll();
        startAutoScroll();
    });
});



