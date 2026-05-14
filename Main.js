// 1. คลังข้อมูลตัวตนของนาย (ใส่ข้อมูลที่นายต้องการโชว์ที่นี่!)
const sliderData = [
    {
        mainTitle: "Teecha002", // 🚨 เพิ่มหัวข้อใหญ่หน้า 1
        titleImg: "", // ถ้าไม่มีรูปโลโก้ส่วนตัว ปล่อยว่างไว้ได้ครับ
        subtitle: "Tonthum Wongjai",
        desc: "ผ่านมือมาแล้ว 30 เครื่อง++ <br>รู้ลึกถึงข้อดี-ข้อด้อย<br> เจาะสเปกแบบคนใช้จริง ❗",
        price: " Tiktok : Teecha002 📍"
    },
    {
        mainTitle: "Anime", // 🚨 เพิ่มหัวข้อใหญ่หน้า 2
        titleImg: "",
        subtitle: "Best Character i like  ",
        desc: "Astra from Black clover <br>เพราะเวทมนต์ของฉันน่ะ คือการไม่ยอมเเพ้ ยังไงล่ะ🔥 <br> เป็น anime character คนนึงที่ไม่ว่าจะมีอุปสรรคมากมายเเค่ไหน<br>เขาก็ไม่เคยที่จะยอมเเพ้<br> เพื่อที่จะได้เป็นจักรพรรดิเวทย์มนต์👑",
        price: "Magic❌ Sword✅"
    },
    {
        mainTitle: "Game 🎮", // 🚨 เพิ่มหัวข้อใหญ่หน้า 3
        titleImg: "",
        subtitle: "Gaming is my life🤗",
        desc: "เวลาว่างจากการโค้ดดิ้ง <br>คือการดำดิ่งลงไปในโลกของเกมอินดี้...<br>หลงใหลในการเล่าเรื่องแนว Psychological <br>(ตกลงเราเล่นเกม หรือเกมเล่นเรากันแน่? 🔪)",
        price: "Miside 🤫"
    },
    {
        mainTitle: "Story + Song", // 🚨 เพิ่มหัวข้อใหญ่หน้า 4
        titleImg: "",
        subtitle: "Stronger Than You 🎶",
        desc: "เสพติดการเล่าเรื่องที่ลึกซึ้งและบีบหัวใจ...<br> เบื้องหลังรอยยิ้มคือความเสียสละที่ยิ่งใหญ่<br>เรื่องราวของ Furina <br>คือนิยามของความเข้มแข็งที่แท้จริง 💙",
        price: "Genshin Impact Lore 📖"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- ดึง Elements ของ Slider ---
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.slider-indicators .line');
    const track = document.getElementById('slider-track');
    const heroContent = document.getElementById('hero-content');
    
    // 🚨 ดึงแท็ก h1 (หัวข้อใหญ่) มารอไว้
    const heroMainTitle = document.querySelector('.hero-content h1'); 
    
    const heroTitleImg = document.querySelector('.hero-title-img');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroDesc = document.querySelector('.hero-content p');
    const heroPrice = document.querySelector('.price');

    let currentIndex = 0;
    let slideInterval;

    // --- ฟังก์ชันอัปเดตสไลด์ ---
    function updateSlider(newIndex) {
        // อัปเดตขีดสถานะ
        indicators.forEach(line => line.classList.remove('active'));
        if(indicators[newIndex]) indicators[newIndex].classList.add('active');
        
        // เลื่อนรางรูปภาพ
        if(track) {
            track.style.transform = `translateX(-${newIndex * 25}%)`;
        }
        
        // อัปเดตข้อความจาก JS sliderData
        const data = sliderData[newIndex];
        if(data && heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(15px)';

            setTimeout(() => {
                // 🚨 สั่งอัปเดตข้อความ h1 ให้ตรงกับ mainTitle
                if(heroMainTitle) heroMainTitle.innerText = data.mainTitle;

                // ถ้าใน JS ไม่มีรูป titleImg ให้ซ่อนตัวแปรนี้ไป
                if(heroTitleImg) {
                    if(data.titleImg) {
                        heroTitleImg.src = data.titleImg;
                        heroTitleImg.style.display = "block";
                    } else {
                        heroTitleImg.style.display = "none";
                    }
                }
                if(heroSubtitle) heroSubtitle.innerText = data.subtitle;
                if(heroDesc) heroDesc.innerHTML = data.desc;
                if(heroPrice) heroPrice.innerText = data.price;
                
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300); 
        }
        currentIndex = newIndex;
    }

    // 🚨 หัวใจสำคัญ: สั่งให้มันรันหน้าแรก (Index 0) ทันทีที่โหลดเสร็จ!
    // ข้อความใน HTML จะถูกแทนที่ด้วยข้อมูลใน JS ทันที
    updateSlider(0);

    // --- ระบบ Auto-play ---
    function startAutoPlay() {
        slideInterval = setInterval(() => {
            let index = (currentIndex + 1 >= sliderData.length) ? 0 : currentIndex + 1;
            updateSlider(index);
        }, 7000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // --- Event Listeners ปุ่มกดต่างๆ ---
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

    // ==========================================
    // 🛒 ระบบ Product Tabs (กรองสินค้า) - ย้ายมาไว้ข้างในนี้เพื่อความปลอดภัย
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            tabBtns.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0';
            });

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetGrid = document.getElementById(`tab-${targetId}`);

            if (targetGrid) {
                targetGrid.style.display = 'grid';
                setTimeout(() => {
                    targetGrid.style.transition = 'opacity 0.4s ease';
                    targetGrid.style.opacity = '1';
                }, 50);
            }
        });
    });
});
// ==========================================
    // 📱 ระบบเปลี่ยนรูปภาพหน้าแรกอัตโนมัติเมื่อเป็นจอมือถือ
    // ==========================================
    const slide1 = document.getElementById('slide-img-1');
    
    // สร้างฟังก์ชันเช็คขนาดจอ
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            // ถ้าจอเล็กกว่าหรือเท่ากับ 768px (มือถือ) ให้ใช้รูปแนวตั้ง
            slide1.src = "./Picture/Moblieอ.jpg";
        } else {
            // ถ้าจอคอมปกติ ให้ใช้รูปแนวนอน
            slide1.src = "./Picture/Phone04.png";
        }
    }

    // 1. สั่งให้ทำงานทันทีตอนโหลดเว็บครั้งแรก
    if (slide1) {
        checkScreenSize();
    }

    // 2. สั่งให้คอยจับตาดูเผื่อมีการยืด-หดหน้าต่างเบราว์เซอร์
    window.addEventListener('resize', checkScreenSize);