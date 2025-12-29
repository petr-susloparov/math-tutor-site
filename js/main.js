// Основной скрипт для сайта репетитора

document.addEventListener('DOMContentLoaded', function() {
    
    // Устанавливаем текущий год в футере
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Обработка формы
    const contactForm = document.getElementById('tutor-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // В реальном проекте здесь будет отправка на сервер
            // Например, через fetch() или Formspree
            
            // Покажем имитацию успешной отправки
            alert(`Спасибо, ${data.name}! Заявка получена.\nЯ свяжусь с вами в течение 24 часов.`);
            
            // Очищаем форму
            this.reset();
            
            // Можно добавить отправку в Telegram через бота:
            // sendToTelegram(data);
        });
    }
    
    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7 (';
                
                if (value.length > 0) formatted += value.substring(0, 3);
                if (value.length > 3) formatted += ') ' + value.substring(3, 6);
                if (value.length > 6) formatted += '-' + value.substring(6, 8);
                if (value.length > 8) formatted += '-' + value.substring(8, 10);
                
                e.target.value = formatted.substring(0, 18);
            }
        });
    }
});

// Функция для отправки в Telegram (опционально)
function sendToTelegram(data) {
    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';
    
    const message = `📚 Новая заявка на занятия:
👤 Имя: ${data.name}
🏫 Класс: ${data.grade}
📱 Телефон: ${data.phone}
🎯 Цель: ${data.goal}
💬 Комментарий: ${data.message || 'нет'}`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    });
}