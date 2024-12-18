// Slider animate---------------------------------------------------------------------------------------------------
function get_shifts(slider_class) {
    const slider = document.querySelector(slider_class);
    var slider_elements = Array.from(slider.children);
    slider_elements.forEach(el => {
        el.style.right = getComputedStyle(el).right;
    });
    let slider_width = 0;
    slider_elements.forEach(el => {
        slider_width += el.offsetWidth;
    });
    slider_width += getComputedStyle(slider).columnGap.slice(0,-2) * (slider_elements.length-1);
    const visible_slider_screen = Number.parseInt(getComputedStyle(slider).width.slice(0,-2));
    const click_numbers = Math.ceil(slider_width/visible_slider_screen);
    const shift = Number.parseInt((slider_width - visible_slider_screen)/click_numbers);
    const max_shift = shift * click_numbers;
    return {
        slider_elements: slider_elements,
        shift: shift,
        max_shift: max_shift
    }
};

function slide_right(left_button_elem, right_button_elem) {
    const max_shift = get_shifts('.slider_row').max_shift;
    const shift = get_shifts('.slider_row').shift;
    const slider_elements = get_shifts('.slider_row').slider_elements;
    slider_elements.forEach(el => {
        if(Number.parseInt(el.style.right.slice(0,-2)) <= max_shift) {
            el.style.right = `${Number.parseInt(el.style.right.slice(0, -2)) + shift}px`;
            left_button_elem.classList.replace('slider_arrow_button_disabled', 'slider_arrow_button_active');
            left_button_elem.disabled = false;
        };
        if(Number.parseInt(el.style.right.slice(0,-2)) >= max_shift) {
            right_button_elem.disabled = true;
            right_button_elem.classList.replace('slider_arrow_button_active', 'slider_arrow_button_disabled');
        };
    });
};

function slide_left(left_button_elem, right_button_elem) {
    const shift = get_shifts('.slider_row').shift;
    const slider_elements = get_shifts('.slider_row').slider_elements;
    slider_elements.forEach(el => {
        if(Number.parseInt(el.style.right.slice(0,-2)) >= 0) {
            el.style.right = `${Number.parseFloat(el.style.right.slice(0, -2)) - shift}px`;
            right_button_elem.classList.replace('slider_arrow_button_disabled', 'slider_arrow_button_active');
            right_button_elem.disabled = false;
        };
        if(Number.parseInt(el.style.right.slice(0,-2)) <= 0) {
            left_button_elem.disabled = true;
            left_button_elem.classList.replace('slider_arrow_button_active', 'slider_arrow_button_disabled');
        };
    });
};

function add_slider_button_functional(button_class_name) {
    const slider_buttons = document.querySelectorAll(button_class_name);
    if(slider_buttons.length != 0) {
        const slider_button_left = slider_buttons[0];
        const slider_button_right =  slider_buttons[1];
        slider_button_right.addEventListener('click', () => slide_right(slider_button_left, slider_button_right));
        slider_button_left.addEventListener('click', () => slide_left(slider_button_left, slider_button_right));
    };
};

window.onload = () => {
    add_slider_button_functional('.slider_arrow_button');
}