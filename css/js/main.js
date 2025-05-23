// Мобильное меню
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('active');
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Закрываем мобильное меню после клика
            document.querySelector('.nav').classList.remove('active');
        }
    });
});

// Форма бронирования
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь должна быть логика отправки формы на сервер
        // Для демонстрации просто покажем сообщение об успехе
        
        this.style.display = 'none';
        document.getElementById('booking-success').style.display = 'block';
        
        // Можно добавить AJAX-запрос:
        /*
        const formData = new FormData(this);
        
        fetch('booking.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.style.display = 'none';
                document.getElementById('booking-success').style.display = 'block';
            } else {
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке формы');
        });
        */
    });
}

// Инициализация даты в форме бронирования
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

document.getElementById('check-in')?.setAttribute('min', today.toISOString().split('T')[0]);
document.getElementById('check-out')?.setAttribute('min', tomorrow.toISOString().split('T')[0]);

// Изменение даты выезда при выборе даты заезда
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

if (checkInInput && checkOutInput) {
    checkInInput.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
        
        checkOutInput.setAttribute('min', minCheckOutDate.toISOString().split('T')[0]);
        
        if (new Date(checkOutInput.value) < minCheckOutDate) {
            checkOutInput.value = minCheckOutDate.toISOString().split('T')[0];
        }
    });
}

// Маска для телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });
}