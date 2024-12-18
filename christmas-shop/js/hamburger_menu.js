// Animate hamburger menu item and menu block with delay------------------------------------------------------------
function open_hamburger_menu() {
    document.getElementsByClassName('hamburger_menu_button')[0].classList.toggle('hamburger_menu_cross');
    document.getElementsByClassName('hamburger_menu_button')[0].classList.toggle('hamburger_menu_view');
    document.getElementsByClassName('hamburger_menu_pop_up')[0].classList.toggle('hamburger_menu_pop_up_active');
    document.body.classList.toggle('body_fixed');
};

document.querySelectorAll('div.hamburger_menu_pop_up_div > a').forEach(el => {
    el.addEventListener('click', (event) => {
        event.preventDefault();
        setTimeout(function(){window.location = el.href}, 1000);
    });
});