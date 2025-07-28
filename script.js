// تهيئة كائن Telegram WebApp
const tg = window.Telegram.WebApp;

// توسيع التطبيق لملء الشاشة عند الفتح (إن أمكن)
if (tg.isExpanded) {
    tg.expand();
}

// عناصر الشاشات
const roleSelectionScreen = document.getElementById('role-selection-screen');
const studentMenuScreen = document.getElementById('student-menu-screen');
const supervisorMenuScreen = document.getElementById('supervisor-menu-screen');
const selectAssignmentMaterialScreen = document.getElementById('select-assignment-material-screen');
const addAssignmentFormScreen = document.getElementById('add-assignment-form-screen');

// زر معلومات المستخدم
const userInfoElement = document.getElementById('user-info');

// دالة لإظهار شاشة معينة وإخفاء البقية
function showScreen(screenToShow) {
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
    screenToShow.classList.add('active');
}

// عرض معلومات المستخدم (مثل السابق)
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    userInfoElement.textContent = `مرحباً يا ${user.first_name || 'مستخدم'}!`;
    if (user.last_name) {
        userInfoElement.textContent += ` ${user.last_name}`;
    }
} else {
    userInfoElement.textContent = 'لا يمكن الحصول على بيانات المستخدم في وضع المعاينة.';
}

// زر إغلاق التطبيق العام
document.getElementById('close-app-button').addEventListener('click', () => {
    if (tg.isExpanded) {
        tg.close();
    } else {
        alert('هذا الزر يعمل فقط داخل تطبيق تيليجرام!');
    }
});

// *************** أحداث الأزرار ***************

// أزرار اختيار الدور
document.getElementById('student-button').addEventListener('click', () => {
    showScreen(studentMenuScreen);
});

document.getElementById('supervisor-button').addEventListener('click', () => {
    showScreen(supervisorMenuScreen);
});

// أزرار قائمة الطالب
document.getElementById('view-assignments-button').addEventListener('click', () => {
    showScreen(selectAssignmentMaterialScreen); // الانتقال لاختيار مادة الواجب
});

document.getElementById('browse-materials-button').addEventListener('click', () => {
    alert('تصفح المواد الدراسية: هذه وظيفة قيد التطوير!');
    // هنا يمكن عرض شاشة جديدة لاختيار المواد الدراسية
});

document.getElementById('contact-supervisor-button').addEventListener('click', () => {
    alert('التواصل مع مشرف: سيتم فتح نموذج اتصال أو إرسال رسالة للمشرف.');
    // هنا يمكن عرض شاشة لنموذج اتصال أو إرسال بيانات للبوت
});

// أزرار قائمة المشرف
document.getElementById('review-progress-button').addEventListener('click', () => {
    alert('مراجعة تقدم الطلاب: هذه وظيفة قيد التطوير!');
    // هنا يمكن عرض شاشة لاختيار الصفوف ومراجعة التقدم
});

document.getElementById('add-assignment-button').addEventListener('click', () => {
    showScreen(addAssignmentFormScreen); // الانتقال لنموذج إضافة واجب
});

document.getElementById('send-announcement-button').addEventListener('click', () => {
    // يمكن هنا فتح حقل نص لإدخال الإعلان ثم إرساله
    const announcementText = prompt('الرجاء كتابة نص الإعلان العام:');
    if (announcementText) {
        if (tg.isExpanded) {
            // هنا نرسل البيانات إلى البوت، يجب أن يكون البوت مبرمجًا لاستقبالها
            tg.sendData(JSON.stringify({ type: 'announcement', text: announcementText }));
            alert('تم إرسال الإعلان إلى البوت!');
            // tg.close(); // يمكن إغلاق التطبيق بعد الإرسال
        } else {
            alert('تم الإعلان: ' + announcementText + '\n(الإرسال الفعلي يتطلب تشغيل التطبيق داخل تيليجرام)');
        }
    }
});


// أزرار اختيار المادة (للواجبات)
document.querySelectorAll('.material-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const material = event.target.dataset.material;
        alert(`تم اختيار مادة: ${material} لعرض الواجبات.\n(هنا سيتم عرض الواجبات الفعلية للمادة)`);
        // يمكن هنا إرسال طلب إلى البوت لجلب الواجبات الخاصة بالمادة
    });
});

// زر إرسال الواجب (للمشرف)
document.getElementById('submit-assignment-button').addEventListener('click', () => {
    const title = document.getElementById('assignment-title').value;
    const dueDate = document.getElementById('due-date').value;
    const material = document.getElementById('assignment-material').value;

    if (title && dueDate && material) {
        const assignmentData = {
            type: 'new_assignment',
            title: title,
            dueDate: dueDate,
            material: material
        };
        if (tg.isExpanded) {
            tg.sendData(JSON.stringify(assignmentData)); // إرسال البيانات كـ JSON
            alert('تم إرسال بيانات الواجب إلى البوت!');
            // tg.close(); // يمكن إغلاق التطبيق بعد الإرسال
        } else {
            alert(`بيانات الواجب:\nالعنوان: ${title}\nالتاريخ: ${dueDate}\nالمادة: ${material}\n(الإرسال الفعلي يتطلب تشغيل التطبيق داخل تيليجرام)`);
        }
        // يمكن مسح الحقول بعد الإرسال
        document.getElementById('assignment-title').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('assignment-material').value = '';
        showScreen(supervisorMenuScreen); // العودة لقائمة المشرف
    } else {
        alert('الرجاء ملء جميع حقول الواجب.');
    }
});


// أزرار الرجوع (عامة لكل الشاشات)
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetScreenId = event.target.dataset.targetScreen;
        const targetScreen = document.getElementById(targetScreenId);
        if (targetScreen) {
            showScreen(targetScreen);
        }
    });
});
