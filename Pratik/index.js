// DOM yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('list');
    const toastSuccess = document.querySelector('.toast.success');
    const toastError = document.querySelector('.toast.error');

    // Sayfa yüklendiğinde Local Storage'dan görevleri yükle
    loadTasks();

    // Yeni görev ekleme fonksiyonu
    window.newElement = function() {
        const taskText = taskInput.value.trim();

        // Boş görev kontrolü
        if (taskText === '') {
            showToast(toastError); // Hata mesajı göster
            return;
        }

        // Yeni görev ekle
        addTask(taskText);
        taskInput.value = ''; // Giriş alanını temizle
        showToast(toastSuccess); // Başarılı ekleme mesajı göster
    };

    // Görev ekleme fonksiyonu
    function addTask(taskText) {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-between', 'align-items-center');
        li.textContent = taskText;

        // Tamamlandı butonu
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Tamamlandı';
        completeButton.classList.add('btn', 'btn-success', 'btn-sm', 'ml-2');
        completeButton.addEventListener('click', function() {
            li.classList.toggle('checked');
            saveTasks(); // Görev durumu değiştiğinde güncelle
        });

        // Silme butonu
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Sil';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Görev tıklama olayını durdur
            taskList.removeChild(li); // Görevi listeden kaldır
            saveTasks(); // Görev silindiğinde güncelle
        });

        // Butonları liste öğesine ekle
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        saveTasks(); // Yeni görev eklendiğinde güncelle
    }

    // Görevleri Local Storage'a kaydet
    function saveTasks() {
        const tasks = [];
        const items = taskList.querySelectorAll('li');
        items.forEach(item => {
            tasks.push({
                text: item.childNodes[0].textContent,
                completed: item.classList.contains('checked')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Local Storage'dan görevleri yükle
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('checked');
            }

            // Tamamlandı butonu
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Tamamlandı';
            completeButton.classList.add('btn', 'btn-success', 'btn-sm', 'ml-2');
            completeButton.addEventListener('click', function() {
                li.classList.toggle('checked');
                saveTasks(); // Görev durumu değiştiğinde güncelle
            });

            // Silme butonu
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Sil';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Görev tıklama olayını durdur
                taskList.removeChild(li); // Görevi listeden kaldır
                saveTasks(); // Görev silindiğinde güncelle
            });

            // Butonları liste öğesine ekle
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    // Toast mesajını gösteren fonksiyon
    function showToast(toast) {
        toast.classList.remove('hide');
        $(toast).toast('show');
    }
});
