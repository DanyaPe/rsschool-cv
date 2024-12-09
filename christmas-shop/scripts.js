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

// Slider animate---------------------------------------------------------------------------------------------------
const slider_buttons = document.getElementsByClassName('slider_arrow_button');
if(slider_buttons.length != 0) {
    var slider_button_left = slider_buttons[0];
    var slider_button_right =  slider_buttons[1];
    slider_button_right.addEventListener('click', () => slide_right());
    slider_button_left.addEventListener('click', () => slide_left());
    const slider = document.querySelector('.slider_row');
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
    var shift = Number.parseInt((slider_width - visible_slider_screen)/click_numbers);
    var max_shift = shift * click_numbers;
};

function slide_right() {
    slider_elements.forEach(el => {
        if(Number.parseInt(el.style.right.slice(0,-2)) <= max_shift) {
            el.style.right = `${Number.parseInt(el.style.right.slice(0, -2)) + shift}px`;
            slider_button_left.classList.replace('slider_arrow_button_disabled', 'slider_arrow_button_active');
            slider_button_left.disabled = false;
        };
        if(Number.parseInt(el.style.right.slice(0,-2)) >= max_shift) {
            slider_button_right.disabled = true;
            slider_button_right.classList.replace('slider_arrow_button_active', 'slider_arrow_button_disabled');
        };
    });
};

function slide_left() {
    slider_elements.forEach(el => {
        if(Number.parseInt(el.style.right.slice(0,-2)) >= 0) {
            el.style.right = `${Number.parseFloat(el.style.right.slice(0, -2)) - shift}px`;
            slider_button_right.classList.replace('slider_arrow_button_disabled', 'slider_arrow_button_active');
            slider_button_right.disabled = false;
        };
        if(Number.parseInt(el.style.right.slice(0,-2)) <= 0) {
            slider_button_left.disabled = true;
            slider_button_left.classList.replace('slider_arrow_button_active', 'slider_arrow_button_disabled');
        };
    });
};

//Gifts functional-----------------------------------------------------------------------------------------------
// Adding gifts cards from the gifts.json on js API
fetch('gifts.json', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    //,mode: 'no-cors'
})
    .then(response => response.json())
    .then(json_data => {
        if(window.location.pathname == '/christmas-shop/index.html') {
            for(i = 0; i < 4; i++) {
                const el_data = json_data[Math.floor(Math.random() * (json_data.length - 1))];
                const div = document.createElement('div');
                switch (el_data.category) {
                    case 'For Work': 
                        div.className = 'best_gifts_card_for_work';
                        break;
                    case 'For Health': 
                        div.className = 'best_gifts_card_for_health';
                        break;
                    case 'For Harmony': 
                        div.className = 'best_gifts_card_for_harmony';
                        break;
                }
                const span = document.createElement('span');
                div.append(span);
                const inner_div = document.createElement('div');
                div.append(inner_div);
                const h3 = document.createElement('h3');
                h3.className = 'Montserrat-Header4';
                inner_div.append(h3);
                const h4 = document.createElement('h4');
                h4.innerHTML = el_data.name;
                h4.className = 'Montserrat-Header3';
                inner_div.append(h4);
                document.getElementsByClassName('best_gifts_cards_div')[0].append(div);
            };
        }
        else if(window.location.pathname == '/christmas-shop/gifts.html') {
            json_data.forEach(el => {
                const div = document.createElement('div');
                switch (el.category) {
                    case 'For Work': 
                        div.className = 'best_gifts_card_for_work';
                        break;
                    case 'For Health': 
                        div.className = 'best_gifts_card_for_health';
                        break;
                    case 'For Harmony': 
                        div.className = 'best_gifts_card_for_harmony';
                        break;
                }
                const span = document.createElement('span');
                div.append(span);
                const inner_div = document.createElement('div');
                div.append(inner_div);
                const h3 = document.createElement('h3');
                h3.className = 'Montserrat-Header4';
                inner_div.append(h3);
                const h4 = document.createElement('h4');
                h4.innerHTML = el.name;
                h4.className = 'Montserrat-Header3';
                inner_div.append(h4);
                document.getElementsByClassName('best_gifts_cards_div')[0].append(div);
            });
        };
    });

//Filters gifts cards on gifts page


//CTA Timer functional-------------------------------------------------------------------------------------------
function timer() {  
    const new_year_date = new Date(2025, 0, 0, 0, 0, 0);
    const delta = new_year_date - new Date();
    const days = Math.floor((delta/(1000*60*60*24))%30);
    const hours = Math.floor((delta/(1000*60*60))%24);
    const minutes = Math.floor((delta/(1000*60))%60);
    const seconds = Math.floor((delta/(1000))%60);
    document.getElementsByClassName('CTA_timer_block_number')[0].textContent = days;
    document.getElementsByClassName('CTA_timer_block_number')[1].textContent = hours;
    document.getElementsByClassName('CTA_timer_block_number')[2].textContent = minutes;
    document.getElementsByClassName('CTA_timer_block_number')[3].textContent = seconds;
};
if(window.location.pathname == '/christmas-shop/index.html') setInterval(function() {timer()}, 1000);

//Arrow up button functional----------------------------------------------------------------------------------------
document.addEventListener('scroll', function() {
    if(window.pageYOffset > 300) document.getElementsByClassName('up_arrow_button')[0].classList.add('up_arrow_button_active');
    if(window.pageYOffset < 300) document.getElementsByClassName('up_arrow_button')[0].classList.remove('up_arrow_button_active');
});

document.getElementsByClassName('up_arrow_button')[0].addEventListener('click', () => {window.scrollTo({top: 0});});