//Gifts functional-----------------------------------------------------------------------------------------------
//Create list of all gifts
function gift_cards_list(json_data_mas, cards_div_class_name) {
    const modal = document.getElementsByClassName('gift_modal')[0];
    json_data_mas.forEach(el => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        switch (el.category) {
            case 'For Work': 
                div.className = 'best_gifts_card_for_work';
                img.src = './image/gift-for-work.png';
                img.alt = 'gift-for-work';
                break;
            case 'For Health': 
                div.className = 'best_gifts_card_for_health';
                img.src = './image/gift-for-health.png';
                img.alt = 'gift-for-health';
                break;
            case 'For Harmony': 
                div.className = 'best_gifts_card_for_harmony';
                img.src = './image/gift-for-harmony.png';
                img.alt = 'gift-for-harmony';
                break;
        };
        div.append(img);
        const inner_div = document.createElement('div');
        div.append(inner_div);
        const span1 = document.createElement('span');
        span1.className = 'Montserrat-Header4';
        inner_div.append(span1);
        const span2 = document.createElement('span');
        span2.className = 'Montserrat-Header3';
        span2.innerHTML = el.name;
        inner_div.append(span2);
        /*div.addEventListener('click', () => {
            document.querySelector('.modal_div > span').style.backgroundImage = window.getComputedStyle(span).getPropertyValue('background-image');
            document.querySelector('.modal_description_div > div > h4').textContent = el.category;
            document.querySelector('.modal_description_div > div > h3').textContent = el.name;
            document.querySelector('.modal_description_div > div > p').textContent = el.description;
            document.querySelectorAll('.modal_indicators_div > p:nth-child(2)')[0].textContent = el.superpowers.live;
            document.querySelectorAll('.modal_indicators_div > p:nth-child(2)')[1].textContent = el.superpowers.create;
            document.querySelectorAll('.modal_indicators_div > p:nth-child(2)')[2].textContent = el.superpowers.love;
            document.querySelectorAll('.modal_indicators_div > p:nth-child(2)')[3].textContent = el.superpowers.dream;
            modal.showModal();
            //document.body.classList.toggle('body_fixed');
        });*/
        document.getElementsByClassName(cards_div_class_name)[0].append(div);
    });
};

//Close modal function for modal cross
function close_modal_window() {
    document.getElementsByClassName('gift_modal')[0].close();
}

//Add random gifts on index.html
function random_gifts(json_data_mas, amount, div_class_name) {
    const numbers_mas = [];
    while(numbers_mas.length < 4) {
        const el_number = Math.floor(Math.random() * (json_data_mas.length - 1));
        if(numbers_mas.includes(el_number)) continue;
        else numbers_mas.push(el_number);
    };
    for(i = 0; i < amount; i++) {
        const el_data = json_data_mas[numbers_mas[i]];
        const div = document.createElement('div');
        const img = document.createElement('img');
        switch (el_data.category) {
            case 'For Work': 
                div.className = 'best_gifts_card_for_work';
                img.src = './image/gift-for-work.png';
                img.alt = 'gift-for-work';
                break;
            case 'For Health': 
                div.className = 'best_gifts_card_for_health';
                img.src = './image/gift-for-health.png';
                img.alt = 'gift-for-health';
                break;
            case 'For Harmony': 
                div.className = 'best_gifts_card_for_harmony';
                img.src = './image/gift-for-harmony.png';
                img.alt = 'gift-for-harmony';
                break;
        };
        div.append(img);
        const inner_div = document.createElement('div');
        div.append(inner_div);
        const span1 = document.createElement('span');
        span1.className = 'Montserrat-Header4';
        inner_div.append(span1);
        const span2 = document.createElement('span');
        span2.className = 'Montserrat-Header3';
        span2.innerHTML = el_data.name;
        inner_div.append(span2);
        document.getElementsByClassName(div_class_name)[0].append(div);
    };
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
            if(window.location.pathname == '/christmas-shop/index.html') {  
                random_gifts(json_data, 4, 'best_gifts_cards_div');
            }
            else if(window.location.pathname == '/christmas-shop/gifts.html') {
                gift_cards_list(json_data , 'best_gifts_cards_div');
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


window.onload = () => {
    parsing_json_data('gifts.json');
    filtered_gifts_card();
}