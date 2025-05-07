let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;


function showSlide(index) {
 
  slides.forEach(slide => slide.style.display = 'none');
 
 
  slides[index].style.display = 'block';
}


function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides; // Loop to the first slide
  showSlide(currentIndex);
}


function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop to the last slide
  showSlide(currentIndex);
}




showSlide(currentIndex);




document.querySelector('.carousel-next').addEventListener('click', nextSlide);
document.querySelector('.carousel-prev').addEventListener('click', prevSlide);



