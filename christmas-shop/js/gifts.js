//Gifts functional-----------------------------------------------------------------------------------------------
//Create modal window function
function create_cards_and_modal_window(json_object) {
    const modal = document.getElementsByClassName('gift_modal')[0];
    const div = document.createElement('div');
    const img = document.createElement('img');
    let color_text = '';

    //Defining type of card
    switch (json_object.category) {
        case 'For Work': 
            div.className = 'best_gifts_card_for_work';
            img.src = './image/gift-for-work.png';
            img.alt = 'gift-for-work';
            color_text = '#4361ff';
            break;
        case 'For Health': 
            div.className = 'best_gifts_card_for_health';
            img.src = './image/gift-for-health.png';
            img.alt = 'gift-for-health';
            color_text = '#06a44f';
            break;
        case 'For Harmony': 
            div.className = 'best_gifts_card_for_harmony';
            img.src = './image/gift-for-harmony.png';
            img.alt = 'gift-for-harmony';
            color_text = '#ff43f7';
            break;
    };

    //Adding elements
    div.append(img);
    const inner_div = document.createElement('div');
    div.append(inner_div);
    const span1 = document.createElement('span');
        span1.className = 'Montserrat-Header4';
    inner_div.append(span1);
    const span2 = document.createElement('span');
        span2.className = 'Montserrat-Header3';
        span2.innerHTML = json_object.name;
    inner_div.append(span2);

    //Describing modal-window functional
    div.addEventListener('click', () => {
        //Fill headers of the modal window: img, name, description
        document.querySelector('.img_div > img').src = img.src;
        document.querySelector('.img_div > img').alt = img.alt;
        document.querySelector('.modal_description_div > div > span:nth-child(1)').textContent = json_object.category;
        document.querySelector('.modal_description_div > div > span:nth-child(1)').style.color = color_text;
        document.querySelector('.modal_description_div > div > span:nth-child(2)').textContent = json_object.name;
        document.querySelector('.modal_description_div > div > p').textContent = json_object.description;

        //Get attributes (name and value)
        const superpowers_names = [];
        Object.entries(json_object.superpowers).forEach(el => {superpowers_names.push(el)});

        //Get container
        const attributes_div = document.querySelector('.modal_description_div > div:nth-child(2) > div');

        //Start creating attribute div
        for(n = 0; n < superpowers_names.length; n++) {
            const modal_indicators_div = document.createElement('div');
                modal_indicators_div.className = 'modal_indicators_div';
            attributes_div.append(modal_indicators_div);

            const name_paragraph = document.createElement('p');
                name_paragraph.className = 'Montserrat-Paragraph';
                name_paragraph.textContent = superpowers_names[n][0];
            modal_indicators_div.append(name_paragraph);

            const number_paragraph = document.createElement('p');
                number_paragraph.className = 'Montserrat-Paragraph';
                number_paragraph.textContent = superpowers_names[n][1];
            modal_indicators_div.append(number_paragraph);

            const modal_snowflakes_div = document.createElement('div');
                modal_snowflakes_div.className = 'modal_snowflakes_div';
            modal_indicators_div.append(modal_snowflakes_div);
                
            //Adding snowflakes and check for attribute value (it is necessary to put the element in a div because it is impossible to customize svg with js)
            for(s = 0; s < 5; s++) {
                const snowflake = document.createElement('div');
                    snowflake.style.backgroundImage = 'url(./image/snowflake.svg)';
                    snowflake.style.width = '16px';
                    snowflake.style.height = '16px';
                if(s < Number(superpowers_names[n][1].slice(1,2))) {
                    snowflake.style.opacity = '1';
                }
                else {
                    snowflake.style.opacity = '0.3';
                };
                modal_snowflakes_div.append(snowflake);
            };
        };

        modal.showModal();
        document.body.classList.toggle('body_fixed');
    });

    return div;
};


//Close modal function for modal cross
function close_modal_window() {
    document.querySelectorAll('.modal_indicators_div').forEach(el => {el.remove();});
    document.body.classList.toggle('body_fixed');
    document.getElementsByClassName('gift_modal')[0].close();
}


//Adding close function on backdrop click
function add_close_on_backdrop(modal_class_name) {
    const modal = document.getElementsByClassName(modal_class_name)[0];
    modal.addEventListener('click', (event) => {
        const check_click_on_backdrop = event.target === event.currentTarget;
        if(check_click_on_backdrop) modal.close();
    });
};

// Adding gifts cards from the gifts.json on js API
function parsing_json_data(json_file_name) {
    fetch(json_file_name, {   
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        //,mode: 'no-cors'
    })
        .then(response => response.json())
        .then(json_data => {
            if(window.location.pathname == '/christmas-shop/index.html' || window.location.pathname == '/christmas-shop/') {  
                const numbers_mas = [];
                while(numbers_mas.length < 4) {
                    const el_number = Math.floor(Math.random() * (json_data.length - 1));
                    if(numbers_mas.includes(el_number)) continue;
                    else numbers_mas.push(el_number);
                };
                for(i = 0; i < 4; i++) {
                    const el_data = json_data[numbers_mas[i]];
                    document.getElementsByClassName('best_gifts_cards_div')[0].append(create_cards_and_modal_window(el_data));
                };
            }
            else if(window.location.pathname == '/christmas-shop/gifts.html') {
                json_data.forEach(el_data => {
                    document.getElementsByClassName('best_gifts_cards_div')[0].append(create_cards_and_modal_window(el_data));
                });
            };
        })
        .catch(err => console.log(err));
};


//Filters gifts cards on gifts page
function filtered_gifts_card() {
    const filter_buttons = document.querySelectorAll('.gifts_section_menu > li > a');
    const gifts_for_work = document.getElementsByClassName('best_gifts_card_for_work');
    const gifts_for_health = document.getElementsByClassName('best_gifts_card_for_health');
    const gifts_for_harmony = document.getElementsByClassName('best_gifts_card_for_harmony');
    filter_buttons.forEach(el => {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            filter_buttons.forEach(el => {
                if(el.classList.contains('gifts_section_menu_item_active')) el.classList.remove('gifts_section_menu_item_active');
            });
            el.classList.add('gifts_section_menu_item_active');
            switch (el.textContent) {
                case 'All':
                    for(let i = 0; i < gifts_for_work.length; i++) {gifts_for_work[i].style.display = 'flex';};
                    for(let i = 0; i < gifts_for_health.length; i++) {gifts_for_health[i].style.display = 'flex';};
                    for(let i = 0; i < gifts_for_harmony.length; i++) {gifts_for_harmony[i].style.display = 'flex';};
                    break;
                case 'For work':
                    for(let i = 0; i < gifts_for_work.length; i++) {gifts_for_work[i].style.display = 'flex';};
                    for(let i = 0; i < gifts_for_health.length; i++) {gifts_for_health[i].style.display = 'none';};
                    for(let i = 0; i < gifts_for_harmony.length; i++) {gifts_for_harmony[i].style.display = 'none';};
                    break;
                case 'For health':
                    for(let i = 0; i < gifts_for_work.length; i++) {gifts_for_work[i].style.display = 'none';};
                    for(let i = 0; i < gifts_for_health.length; i++) {gifts_for_health[i].style.display = 'flex';};
                    for(let i = 0; i < gifts_for_harmony.length; i++) {gifts_for_harmony[i].style.display = 'none';};
                    break;
                case 'For harmony':
                    for(let i = 0; i < gifts_for_work.length; i++) {gifts_for_work[i].style.display = 'none';};
                    for(let i = 0; i < gifts_for_health.length; i++) {gifts_for_health[i].style.display = 'none';};
                    for(let i = 0; i < gifts_for_harmony.length; i++) {gifts_for_harmony[i].style.display = 'flex';};
                    break;
            };
        });
    });
};


add_close_on_backdrop('gift_modal');
parsing_json_data('gifts.json');
filtered_gifts_card();