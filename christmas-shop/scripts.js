function open_hamburger_menu(button) {
    button.classList.toggle('hamburger_menu_cross');
    document.getElementsByClassName('hamburger_menu_pop_up')[0].classList.toggle('hamburger_menu_pop_up_active');
    document.body.classList.toggle('body_fixed');
}