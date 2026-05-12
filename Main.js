// 1. ลองพิมพ์ข้อความนี้ส่งไปที่ Console เพื่อเช็กว่าไฟล์เชื่อมสำเร็จไหม!
console.log("🚀 ไฟล์ Main.js เชื่อมต่อสำเร็จเว้ยเห้ย!");

// 2. 🚨 คำสั่งกันเหนียว: รอให้ HTML โหลดเสร็จ 100% ก่อน ค่อยเริ่มอ่าน JS
document.addEventListener('DOMContentLoaded', () => {
    
    // ดึงปุ่มต่างๆ มา
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.slider-indicators .line');

    // 💡 เช็กดูใน Console ว่าหาปุ่มเจอไหม? (ถ้าหาไม่เจอ มันจะขึ้น null หรือ 0)
    console.log("เจอขีดสถานะทั้งหมด:", indicators.length, "ขีด");

    // ถ้าหาปุ่มไม่เจอ ให้หยุดทำงานและแจ้งเตือนสีแดง!
    if (!prevBtn || !nextBtn || indicators.length === 0) {
        console.error("❌ ชิบหายแล้ว! หาปุ่มไม่เจอ เช็กการวาง Script ด่วน!");
        return; 
    }

    // --- เริ่มการทำงานของ Slider ---
    let currentIndex = 0;

    function updateSlider(newIndex) {
        // ลบ active ออกให้หมดก่อน
        indicators.forEach(line => {
            line.classList.remove('active');
        });
        
        // เติม active ให้ตัวที่เลือก
        indicators[newIndex].classList.add('active');
        currentIndex = newIndex;

        console.log("✅ เลื่อนมาที่สไลด์หน้า: " + (currentIndex + 1));
    }

    nextBtn.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= indicators.length) {
            nextIndex = 0; 
        }
        updateSlider(nextIndex);
    });

    prevBtn.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = indicators.length - 1; 
        }
        updateSlider(prevIndex);
    });

    indicators.forEach((line, index) => {
        line.addEventListener('click', () => {
            updateSlider(index);
        });
    });

});