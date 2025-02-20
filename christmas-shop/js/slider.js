// Slider animate---------------------------------------------------------------------------------------------------
function get_shifts(slider_class) {
    //Get slider elements and set their right position
    const slider = document.querySelector(slider_class);
    const slider_elements = Array.from(slider.children);
    slider_elements.forEach(el => {
        el.style.right = '0px';
    });

    //Get full width of slider
    let slider_width = 0;
    slider_elements.forEach(el => {
        slider_width += el.offsetWidth;
    });
    slider_width += getComputedStyle(slider).columnGap.slice(0,-2) * (slider_elements.length-1);

    //Calculate shifts and their numbers from the screen size
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


//Need to add global variables to respond to screen size changes  
var shift = get_shifts('.slider_row').shift;
var max_shift = get_shifts('.slider_row').max_shift;
var slider_elements = get_shifts('.slider_row').slider_elements;


//Functions have been turned into handlers variable to change them after screen size changes 
var handler_function_right = function slide_right() {
    //Get buttons
    const left_button_elem = document.querySelectorAll('.slider_arrow_button')[0];
    const right_button_elem = document.querySelectorAll('.slider_arrow_button')[1];

    //Check the location of the slider elements and the ability to move them to the right, if we can - move and update buttons
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


//Functions have been turned into handlers variable to change them after screen size changes
var handler_function_left = function slide_left() {
    //Get buttons
    const left_button_elem = document.querySelectorAll('.slider_arrow_button')[0];
    const right_button_elem = document.querySelectorAll('.slider_arrow_button')[1];

    //Check the location of the slider elements and the ability to move them to the left, if we can - move and update buttons
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
    //Get buttons
    const slider_button_left = document.querySelectorAll(button_class_name)[0];
    const slider_button_right =  document.querySelectorAll(button_class_name)[1];

    //Remove handlers if there are any (it is necessary to track the screen size) 
    slider_button_left.removeEventListener('click', handler_function_left);
    slider_button_right.removeEventListener('click', handler_function_right);

    //Reload buttons to basic view
    slider_button_right.classList.replace('slider_arrow_button_disabled', 'slider_arrow_button_active');
    slider_button_right.disabled = false;
    slider_button_left.classList.replace('slider_arrow_button_active', 'slider_arrow_button_disabled');
    slider_button_left.disabled = true;

    //Update global shift variables
    shift = get_shifts('.slider_row').shift;
    max_shift = get_shifts('.slider_row').max_shift;
    slider_elements = get_shifts('.slider_row').slider_elements;

    //Adding handlers
    slider_button_right.addEventListener('click', handler_function_right);
    slider_button_left.addEventListener('click', handler_function_left);
};


add_slider_button_functional('.slider_arrow_button');
window.addEventListener('resize', () => {
    add_slider_button_functional('.slider_arrow_button'); //If screen resize slider will be update there settings
});