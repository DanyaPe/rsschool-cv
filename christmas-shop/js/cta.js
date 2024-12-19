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

setInterval(function() {timer()}, 1000);