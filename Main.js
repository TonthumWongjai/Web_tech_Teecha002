const sliderData = [
    {
        titleImg: "https://i02.appmifile.com/404_operator_th/31/03/2026/cf8bf6d87cf5cfe3af351dde6c39d14a.svg",
        subtitle: "ขีดสุดของพลังในมือคุณ",
        desc: "นิยามใหม่ของประสิทธิภาพด้วยชิปเซ็ต Snapdragon® 8 Elite<br>หน้าจอใหญ่สะใจ ตอบโจทย์ทั้งการทำงานและความบันเทิง",
        price: "เริ่มต้นที่ ฿11,990.00"
    },
    {
        titleImg: "https://i02.appmifile.com/404_operator_th/31/03/2026/cf8bf6d87cf5cfe3af351dde6c39d14a.svg",
        subtitle: "หน้าจอ 144Hz ลื่นไหลทุกสัมผัส",
        desc: "ดื่มด่ำกับสีสันสมจริงด้วยเทคโนโลยี Dolby Vision®<br>พร้อมระบบถนอมสายตาที่ผ่านการรับรองระดับโลก",
        price: "เริ่มต้นที่ ฿13,990.00"
    },
    {
        titleImg: "https://i02.appmifile.com/418_operator_th/07/04/2026/92343c233e0dfcc4694bbf81419346b2.svg",
        subtitle: "บันทึกทุกโมเมนต์ด้วยเลนส์ Leica",
        desc: "สัมผัสความคมชัดระดับออปติคัลและสไตล์ภาพอันเป็นเอกลักษณ์<br>เปลี่ยนสมาร์ทโฟนของคุณให้เป็นกล้องระดับมืออาชีพ",
        price: "เริ่มต้นที่ ฿44,990.00"
    },
    {
        titleImg: "https://i02.appmifile.com/404_operator_th/31/03/2026/cf8bf6d87cf5cfe3af351dde6c39d14a.svg",
        subtitle: "ก้าวสู่อนาคตกับ Xiaomi HyperOS",
        desc: "ระบบปฏิบัติการที่เชื่อมต่อทุกไลฟ์สไตล์เข้าด้วยกันอย่างไร้รอยต่อ<br>ให้ทุกอุปกรณ์ในบ้านฉลาดขึ้นในพริบตา",
        price: "เริ่มต้นที่ ฿1,290.00"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. หาตัวละครทั้งหมด
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.slider-indicators .line');
    
    const track = document.getElementById('slider-track');
    const heroContent = document.getElementById('hero-content');
    const heroTitleImg = document.querySelector('.hero-title-img');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroDesc = document.querySelector('.hero-content p');
    const heroPrice = document.querySelector('.price');

    let currentIndex = 0;
    let slideInterval;

    // 2. ฟังก์ชันหลัก เลื่อนราง + อัปเดตข้อมูล
    function updateSlider(newIndex) {
        // อัปเดตเส้นสีส้ม
        indicators.forEach(line => line.classList.remove('active'));
        if(indicators[newIndex]) indicators[newIndex].classList.add('active');
        
        // 🚨 สั่งเลื่อนราง! (เลื่อนทีละ 25% เพราะมี 4 รูป)
        if(track) {
            track.style.transform = `translateX(-${newIndex * 25}%)`;
        }
        
        // 🚨 อัปเดตข้อความแบบสมูท (เฟดออก -> เปลี่ยนคำ -> เฟดเข้า)
        const data = sliderData[newIndex];
        if(data && heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(15px)';

            setTimeout(() => {
                if(heroTitleImg) heroTitleImg.src = data.titleImg;
                if(heroSubtitle) heroSubtitle.innerText = data.subtitle;
                if(heroDesc) heroDesc.innerHTML = data.desc;
                if(heroPrice) heroPrice.innerText = data.price;
                
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300); 
        }

        currentIndex = newIndex;
    }

    // 3. ระบบ Auto-play (ไหลเองทุก 5 วิ)
    function startAutoPlay() {
        slideInterval = setInterval(() => {
            let index = (currentIndex + 1 >= sliderData.length) ? 0 : currentIndex + 1;
            updateSlider(index);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // สั่งเริ่มทำงาน
    startAutoPlay();

    // 4. สั่งงานปุ่มกด
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = (currentIndex + 1 >= sliderData.length) ? 0 : currentIndex + 1;
            updateSlider(index);
            resetTimer();
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = (currentIndex - 1 < 0) ? sliderData.length - 1 : currentIndex - 1;
            updateSlider(index);
            resetTimer();
        });
    }

    indicators.forEach((line, index) => {
        line.addEventListener('click', () => {
            updateSlider(index);
            resetTimer();
        });
    });
});
// ==========================================
    // 🛒 ระบบ Product Tabs (กรองสินค้า)
    // ==========================================
    
    // 1. ดึงปุ่มและกล่องเนื้อหาทั้งหมดมา
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 2. สั่งงานปุ่มแต่ละปุ่ม
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // ป้องกันไม่ให้หน้าเว็บกระตุกเวลาคลิก <a>

            // 2.1 ลบสีส้ม (active) ออกจากทุกปุ่มก่อน
            tabBtns.forEach(t => t.classList.remove('active'));
            
            // 2.2 ซ่อนกระดานสินค้าทุกอันให้หมด
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0'; // ใส่จางๆ ไว้รอ
            });

            // 2.3 เติมสีส้มให้ปุ่มที่เราเพิ่งคลิก
            btn.classList.add('active');

            // 2.4 หาว่าปุ่มนี้สั่งให้เปิดกระดานไหน (ดึงค่าจาก data-tab)
            const targetId = btn.getAttribute('data-tab');
            const targetGrid = document.getElementById(`tab-${targetId}`);

            // 2.5 สั่งเปิดกระดานนั้น
            if (targetGrid) {
                targetGrid.style.display = 'grid'; // โชว์กลับมาเป็นตาราง (grid)
                
                // ค่อยๆ เฟดภาพเข้ามาให้นุ่มนวล
                setTimeout(() => {
                    targetGrid.style.transition = 'opacity 0.4s ease';
                    targetGrid.style.opacity = '1';
                }, 50);
            }
        });
    });