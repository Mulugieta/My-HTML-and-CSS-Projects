document.addEventListener('DOMContentLoaded', function() {
    const galleryLinks = document.querySelectorAll('[data-lightbox="e36-gallery"]');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const prevBtn = document.getElementsByClassName('prev')[0];
    const nextBtn = document.getElementsByClassName('next')[0];

    let currentImageIndex = 0;
    let images = []; // To store full image paths and titles

    // Populate images array and add click listeners to thumbnails
    galleryLinks.forEach((link, index) => {
        images.push({
            src: link.href,
            title: link.dataset.title
        });

        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            currentImageIndex = index;
            openLightbox(currentImageIndex);
        });
    });

    // Function to open the lightbox
    function openLightbox(index) {
        modal.style.display = 'block';
        modalImg.src = images[index].src;
        captionText.innerHTML = images[index].title;
    }

    // Close the lightbox
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Next image
    nextBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent modal from closing when clicking next/prev buttons
        currentImageIndex = (currentImageIndex + 1) % images.length;
        openLightbox(currentImageIndex);
    });

    // Previous image
    prevBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent modal from closing
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        openLightbox(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowRight') {
                nextBtn.click();
            } else if (event.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (event.key === 'Escape') {
                closeBtn.click();
            }
        }
    });
});