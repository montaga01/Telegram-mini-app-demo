// تهيئة كائن Telegram WebApp
const tg = window.Telegram.WebApp;

// توسيع التطبيق لملء الشاشة عند الفتح (إن أمكن)
if (tg.isExpanded) {
    tg.expand();
}

// إظهار المعلومات عن المستخدم
const userInfoElement = document.getElementById('user-info');
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    userInfoElement.textContent = `مرحباً يا ${user.first_name || 'مستخدم'}!`;
    if (user.last_name) {
        userInfoElement.textContent += ` ${user.last_name}`;
    }
    console.log('بيانات المستخدم:', user);
} else {
    userInfoElement.textContent = 'لا يمكن الحصول على بيانات المستخدم في وضع المعاينة.';
    console.log('Telegram WebApp not initialized or user data not available.');
}

// إضافة وظيفة لزر الإغلاق
document.getElementById('close-button').addEventListener('click', () => {
    if (tg.isExpanded) { // فقط إذا كان يعمل داخل تيليجرام
        tg.close();
    } else {
        alert('هذا الزر يعمل فقط داخل تطبيق تيليجرام!');
    }
});

// إضافة وظيفة لزر إرسال البيانات
document.getElementById('send-data-button').addEventListener('click', () => {
    if (tg.isExpanded) { // فقط إذا كان يعمل داخل تيليجرام
        const dataToSend = `رسالة من التطبيق المصغر في تاريخ: ${new Date().toLocaleString()}`;
        tg.sendData(dataToSend); // إرسال البيانات إلى البوت
        tg.close(); // إغلاق التطبيق بعد الإرسال
    } else {
        alert('هذا الزر يعمل فقط داخل تطبيق تيليجرام لإرسال البيانات للبوت!');
    }
});
