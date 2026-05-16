// Start Slider Data 
// คลังข้อมูลของนาย เอาไว้เปลี่ยนข้อความและลิงก์บนแบนเนอร์ใหญ่
const sliderData = [
    {
        mainTitle: "Teecha002",
        titleImg: "", 
        subtitle: "Tonthum Wongjai",
        desc: "ผ่านมือมาแล้ว 30 เครื่อง++ <br>รู้ลึกถึงข้อดี-ข้อด้อย<br> เจาะสเปกแบบคนใช้จริง ❗",
        price: " Tiktok : Teecha002 📍",
        link: "https://www.tiktok.com/@teecha_002"
    },
    {
        mainTitle: "Anime", 
        titleImg: "",
        subtitle: "Best Character i like  ",
        desc: "Astra from Black clover <br>เพราะเวทมนต์ของฉันน่ะ คือการไม่ยอมเเพ้ ยังไงล่ะ🔥 <br> เป็น anime character คนนึงที่ไม่ว่าจะมีอุปสรรคมากมายเเค่ไหน<br>เขาก็ไม่เคยที่จะยอมเเพ้<br> เพื่อที่จะได้เป็นจักรพรรดิเวทย์มนต์👑",
        price: "Magic❌ Sword✅",
        link: "https://blackclover.fandom.com/wiki/Asta" 
    },
    {
        mainTitle: "Game 🎮", 
        titleImg: "",
        subtitle: "Gaming is my life🤗",
        desc: "เวลาว่างจากการโค้ดดิ้ง <br>คือการดำดิ่งลงไปในโลกของเกมอินดี้...<br>หลงใหลในการเล่าเรื่องแนว Psychological <br>(ตกลงเราเล่นเกม หรือเกมเล่นเรากันแน่? 🔪)",
        price: "Miside 🤫",
        link: "https://store.steampowered.com/app/2527500/MiSide/" 
    },
    {
        mainTitle: "Story + Song", 
        titleImg: "",
        subtitle: "Stronger Than You 🎶",
        desc: "เสพติดการเล่าเรื่องที่ลึกซึ้งและบีบหัวใจ...<br> เบื้องหลังรอยยิ้มคือความเสียสละที่ยิ่งใหญ่<br>เรื่องราวของ Furina <br>คือนิยามของความเข้มแข็งที่แท้จริง 💙",
        price: "Genshin Impact Lore 📖",
        link: "https://genshin-impact.fandom.com/wiki/Furina/Storyline"
    }
];
// End Slider Data


// บังคับให้รอ HTML โหลดเสร็จก่อน JS ถึงจะเริ่มทำงาน (กันบัคหาแท็กไม่เจอ)
document.addEventListener('DOMContentLoaded', () => {

    // Start Hero Slider Logic
    // ดึง Element จากหน้า HTML มาเก็บไว้ในตัวแปร เพื่อรอสั่งงาน
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
    const heroLearnBtn = document.getElementById('hero-learn-btn'); 

    let currentIndex = 0; // ตัวจดจำว่าตอนนี้เปิดรูปสไลด์ที่เท่าไหร่
    let slideInterval; // ตัวเก็บค่าเวลาสำหรับทำ Auto Play

    // ฟังก์ชันหลัก: เอาไว้อัปเดตเปลี่ยนรูปและข้อความบนแบนเนอร์
    function updateSlider(newIndex) {
        // ลบสถานะ active (สีส้ม) ของขีดข้างล่างออกทั้งหมด แล้วไปใส่ให้ขีดที่ถูกเลือก
        indicators.forEach(line => line.classList.remove('active'));
        if(indicators[newIndex]) indicators[newIndex].classList.add('active');
        
        // เลื่อนรางรูปภาพไปทางซ้าย ทีละ 25% (เพราะมี 4 รูป)
        if(track) {
            track.style.transform = `translateX(-${newIndex * 25}%)`;
        }
        
        // เอาข้อมูลจาก sliderData มายัดใส่ใน HTML แบบสมูทๆ
        const data = sliderData[newIndex];
        if(data && heroContent) {
            // เฟดข้อความเก่าออกก่อน (Opacity = 0)
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(15px)';

            // รอ 0.3 วินาทีแล้วค่อยยัดข้อความใหม่เข้าไป (ให้จังหวะมันดูโปร)
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
                if(heroLearnBtn && data.link) heroLearnBtn.href = data.link;

                // เฟดข้อความใหม่กลับเข้ามา (Opacity = 1)
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300); 
        }
        currentIndex = newIndex; // อัปเดตค่าให้จำว่าอยู่หน้าปัจจุบันแล้ว
    }

    updateSlider(0); // สั่งให้รันโชว์รูปแรกทันทีที่เปิดเว็บ

    // ฟังก์ชันสั่งให้สไลด์เลื่อนเองทุกๆ 7 วินาที
    function startAutoPlay() {
        slideInterval = setInterval(() => {
            let index = (currentIndex + 1 >= sliderData.length) ? 0 : currentIndex + 1;
            updateSlider(index);
        }, 7000);
    }

    // ฟังก์ชันรีเซ็ตเวลา (กันบัคเวลากดเปลี่ยนรูปเอง แล้วมันเลื่อนเบิ้ล)
    function resetTimer() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    startAutoPlay(); // เริ่มนับเวลา Auto Play ทันที

    // ระบบคลิก: กดปุ่มลูกศรขวาเพื่อไปหน้าถัดไป
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = (currentIndex + 1 >= sliderData.length) ? 0 : currentIndex + 1;
            updateSlider(index);
            resetTimer();
        });
    }

    // ระบบคลิก: กดปุ่มลูกศรซ้ายเพื่อย้อนกลับ
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = (currentIndex - 1 < 0) ? sliderData.length - 1 : currentIndex - 1;
            updateSlider(index);
            resetTimer();
        });
    }

    // ระบบคลิก: กดที่ขีดสถานะข้างล่างเพื่อข้ามไปหน้านั้นๆ เลย
    indicators.forEach((line, index) => {
        line.addEventListener('click', () => {
            updateSlider(index);
            resetTimer();
        });
    });
    // End Hero Slider Logic


    // Start Product Tabs Logic
    // ระบบกดปุ่มเมนูแท็บ เพื่อเปลี่ยนหมวดหมู่ (มือถือ, อนิเมะ, ตัวละคร)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); /* กันไม่ให้หน้าเว็บเด้งกลับไปบนสุดตอนคลิกลิงก์ */
            
            // ลบสถานะ active (สีส้ม) ของปุ่มแท็บทั้งหมดออก
            tabBtns.forEach(t => t.classList.remove('active'));
            // ซ่อนกล่องสินค้าทุกหมวดหมู่
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.style.opacity = '0';
            });

            // ไฮไลต์สีส้มให้ปุ่มที่เพิ่งกด
            btn.classList.add('active');
            
            // หากล่องสินค้าที่มี ID ตรงกับ Data-tab ที่กด แล้วโชว์มันขึ้นมา
            const targetId = btn.getAttribute('data-tab');
            const targetGrid = document.getElementById(`tab-${targetId}`);

            if (targetGrid) {
                targetGrid.style.display = 'grid'; // เปิดกล่องเป็นแบบ Grid
                setTimeout(() => {
                    targetGrid.style.transition = 'opacity 0.4s ease'; // ให้ค่อยๆ สว่างขึ้นมา
                    targetGrid.style.opacity = '1';
                }, 50);
            }
        });
    });
    // End Product Tabs Logic


    // Start Promo Carousel Logic
    // ระบบกดปุ่มลูกศรเพื่อเลื่อนการ์ด OS ในแนวนอน
    const promoGrid = document.getElementById('promo-grid');
    const promoPrev = document.getElementById('promo-prev');
    const promoNext = document.getElementById('promo-next');

    // เลื่อนขวา 400px ต่อการกด 1 ครั้งแบบสมูทๆ
    if(promoNext && promoGrid) {
        promoNext.addEventListener('click', () => {
            promoGrid.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    // เลื่อนซ้ายย้อนกลับ 400px ต่อการกด 1 ครั้งแบบสมูทๆ
    if(promoPrev && promoGrid) {
        promoPrev.addEventListener('click', () => {
            promoGrid.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }
    // End Promo Carousel Logic

});