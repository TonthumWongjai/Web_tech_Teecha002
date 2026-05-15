// 1. คลังข้อมูลตัวตนของนาย (ใส่ข้อมูลที่นายต้องการโชว์ที่นี่!)
const sliderData = [
    {
        mainTitle: "Teecha002",
        titleImg: "", 
        subtitle: "Tonthum Wongjai",
        desc: "ผ่านมือมาแล้ว 30 เครื่อง++ <br>รู้ลึกถึงข้อดี-ข้อด้อย<br> เจาะสเปกแบบคนใช้จริง ❗",
        price: " Tiktok : Teecha002 📍",
        link: "https://www.tiktok.com/@teecha_002" // 🚨 ลิ้งก์ไป TikTok
    },
    {
        mainTitle: "Anime", 
        titleImg: "",
        subtitle: "Best Character i like  ",
        desc: "Astra from Black clover <br>เพราะเวทมนต์ของฉันน่ะ คือการไม่ยอมเเพ้ ยังไงล่ะ🔥 <br> เป็น anime character คนนึงที่ไม่ว่าจะมีอุปสรรคมากมายเเค่ไหน<br>เขาก็ไม่เคยที่จะยอมเเพ้<br> เพื่อที่จะได้เป็นจักรพรรดิเวทย์มนต์👑",
        price: "Magic❌ Sword✅",
        link: "https://blackclover.fandom.com/wiki/Asta" // 🚨 ลิ้งก์ไปประวัติ Asta
    },
    {
        mainTitle: "Game 🎮", 
        titleImg: "",
        subtitle: "Gaming is my life🤗",
        desc: "เวลาว่างจากการโค้ดดิ้ง <br>คือการดำดิ่งลงไปในโลกของเกมอินดี้...<br>หลงใหลในการเล่าเรื่องแนว Psychological <br>(ตกลงเราเล่นเกม หรือเกมเล่นเรากันแน่? 🔪)",
        price: "Miside 🤫",
        link: "https://store.steampowered.com/app/2527500/MiSide/" // 🚨 ลิ้งก์ไปเกม Steam
    },
    {
        mainTitle: "Story + Song", 
        titleImg: "",
        subtitle: "Stronger Than You 🎶",
        desc: "เสพติดการเล่าเรื่องที่ลึกซึ้งและบีบหัวใจ...<br> เบื้องหลังรอยยิ้มคือความเสียสละที่ยิ่งใหญ่<br>เรื่องราวของ Furina <br>คือนิยามของความเข้มแข็งที่แท้จริง 💙",
        price: "Genshin Impact Lore 📖",
        link: "https://genshin-impact.fandom.com/wiki/Furina/Storyline" // 🚨 ลิ้งก์ไปประวัติ Furina
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- ดึง Elements ของ Slider ---
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.slider-indicators .line');
    const track = document.getElementById('slider-track');
    const heroContent = document.getElementById('hero-content');
    
    const heroMainTitle = document.querySelector('.hero-content h1'); 
    const heroTitleImg = document.querySelector('.hero-title-img');
    const heroSubtitle = document.querySelector('.hero-content h2');
    const heroDesc = document.querySelector('.hero-content p');
    const heroPrice = document.querySelector('.price');
    
    // 🚨 ดึงปุ่ม "เรียนรู้เพิ่มเติม" มารอไว้เปลี่ยนลิ้งก์
    const heroLearnBtn = document.getElementById('hero-learn-btn'); 

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
                if(heroMainTitle) heroMainTitle.innerText = data.mainTitle;

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
                
                // 🚨 เปลี่ยนลิ้งก์ href ของปุ่มตามข้อมูลใน JS
                if(heroLearnBtn && data.link) heroLearnBtn.href = data.link;

                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300); 
        }
        currentIndex = newIndex;
    }

    // สั่งให้มันรันหน้าแรก (Index 0) ทันทีที่โหลดเสร็จ
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
    // 🛒 ระบบ Product Tabs (กรองสินค้า)
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