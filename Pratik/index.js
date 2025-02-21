let userName = prompt("Lütfen bir isim giriniz: ");
let greeting = document.querySelector("#greeting");
greeting.innerHTML = `Merhaba, ${userName} "Hoş Geldiniz!"`;

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    setTimeout(startTime, 1000);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " Cuma tarihinde Kodluyoruz FrontEnd Web Development Patikası'nın Javascript bölümü 1.ödevindesiniz";  
    
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}
startTime();