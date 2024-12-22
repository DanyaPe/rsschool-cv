//Arrow up button functional----------------------------------------------------------------------------------------
document.addEventListener('scroll', function() {
    if(window.pageYOffset > 300) document.getElementsByClassName('up_arrow_button')[0].classList.add('up_arrow_button_active');
    if(window.pageYOffset < 300) document.getElementsByClassName('up_arrow_button')[0].classList.remove('up_arrow_button_active');
});


document.getElementsByClassName('up_arrow_button')[0].addEventListener('click', () => {window.scrollTo({top: 0});});