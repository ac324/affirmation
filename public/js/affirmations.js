/*global $*/

$('.carousel').carousel({
  interval: 5000
})


$(document).ready(function () {
    $('#carouselExampleFade').find('.carousel-item').first().addClass('active');
});