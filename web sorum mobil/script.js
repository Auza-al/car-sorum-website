const cars = [
    { id: 1, name: "Porsche 911 Carrera S", cat: "Sport", price: "Rp 4.5B", year: 2024, km: "0", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800" },
    { id: 2, name: "Range Rover Autobiography", cat: "SUV", price: "Rp 5.2B", year: 2023, km: "1.200", img: "https://images.unsplash.com/photo-1563720223185-11003d516905?w=800" },
    { id: 3, name: "Lamborghini Huracan EVO", cat: "Sport", price: "Rp 8.9B", year: 2024, km: "0", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800" },
    { id: 4, name: "BMW M8 Competition", cat: "Sport", price: "Rp 3.8B", year: 2023, km: "500", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800" },
    { id: 5, name: "Mercedes S-Class Maybach", cat: "Sedan", price: "Rp 6.1B", year: 2024, km: "0", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800" },
    { id: 6, name: "Tesla Model X Plaid", cat: "SUV", price: "Rp 2.8B", year: 2023, km: "150", img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800" }
];

const testimonials = [
    { id: 1, name: "Agus Santoso", title: "Pengusaha", review: "Pelayanan sangat profesional dan unit yang ditawarkan selalu dalam kondisi prima. LUXE AUTO pilihan terbaik!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Siti Rahayu", title: "Arsitek", review: "Saya sangat puas dengan mobil yang saya beli. Prosesnya cepat dan transparan. Rekomendasi!", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Budi Dharma", title: "Dokter", review: "LUXE AUTO benar-benar mengerti kebutuhan saya. Mobil impian saya akhirnya terwujud. Terima kasih!", avatar: "https://randomuser.me/api/portraits/men/78.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const loader = document.getElementById('loader');
    const reveals = document.querySelectorAll('.reveal');
    const themeToggle = document.getElementById('themeToggle');
    const navbar = document.getElementById('navbar');

    // --- 1. Page Loader & Reveal Animation (Perbaikan Line 16) ---
    const hideLoader = () => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                reveals.forEach(el => el.classList.add('visible'));
            }, 500);
        }
    };

    // Pastikan loader hilang meskipun event load sudah lewat
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 1500);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 1500));
    }

    // --- 2. Dark Mode Toggle ---
    if (themeToggle) {
        themeToggle.onclick = () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            icon.style.transform = 'scale(0)';
            setTimeout(() => {
                icon.classList.toggle('fa-circle-half-stroke');
                icon.classList.toggle('fa-sun');
                icon.style.transform = 'scale(1)';
            }, 200);
        };
    }

    // --- 3. Hero Slider & Parallax Effect ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function activateSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.style.transform = 'scale(1.1) translateY(0px)';
        });
        if(slides[index]) slides[index].classList.add('active');
    }

    if (slides.length > 0) {
        activateSlide(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            activateSlide(currentSlide);
        }, 7000);
    }

    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);
        
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) {
            activeSlide.style.transform = `scale(1.1) translateY(${window.scrollY * 0.2}px)`;
        }
    });

    // --- 4. Smooth Scroll ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 5. Render Cars ---
    const carGrid = document.getElementById('carGrid');
    function renderCars(data) {
        if (!carGrid) return;
        carGrid.innerHTML = data.map(car => `
            <div class="car-card reveal visible">
                <div class="car-img-box"><img src="${car.img}" alt="${car.name}"></div>
                <div class="car-content">
                    <p style="color:var(--gold); font-size:11px; letter-spacing:2px;">${car.cat.toUpperCase()}</p>
                    <h3>${car.name}</h3>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                        <span class="car-price">${car.price}</span>
                        <button onclick="viewDetail(${car.id})" style="background:none; border:none; color:inherit; cursor:pointer; font-size:12px; font-weight:600;">DETAILS <i class="fas fa-arrow-right" style="color:var(--gold); margin-left:5px;"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    renderCars(cars);

    // --- 6. Filter Logic ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if(activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderCars(filter === 'all' ? cars : cars.filter(c => c.cat === filter));
        };
    });

    // --- 7. Modal View Detail ---
    const carModal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');

   window.viewDetail = (id) => {
    const car = cars.find(c => c.id === id);
    if (!car) return;

    // Bersihkan angka harga (misal "Rp 4.5B" jadi 4500000000)
    const priceNum = parseFloat(car.price.replace(/[Rp B]/g, '')) * 1000000000;

    modalBody.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; color:#fff;">
            <div>
                <img src="${car.img}" style="width:100%; border-radius:15px; margin-bottom:20px;">
                
                <div class="glass" style="padding:20px; border-radius:15px;">
                    <h4 style="color:var(--gold); margin-bottom:15px;"><i class="fas fa-calculator"></i> Loan Calculator</h4>
                    <div class="calc-grid">
                        <div>
                            <label style="font-size:10px;">DP (20%)</label>
                            <input type="text" value="Rp ${(priceNum * 0.2).toLocaleString()}" disabled>
                        </div>
                        <div>
                            <label style="font-size:10px;">Tenor (Years)</label>
                            <select id="tenor" onchange="updateLoan(${priceNum})">
                                <option value="1">1 Year</option>
                                <option value="3">3 Years</option>
                                <option value="5" selected>5 Years</option>
                            </select>
                        </div>
                    </div>
                    <div class="result-box">
                        <h4>Monthly Installment</h4>
                        <p id="monthlyResult">Calculating...</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 style="font-family:'Playfair Display', serif; font-size:32px; margin-bottom:10px;">${car.name}</h2>
                <p style="font-size:22px; color:var(--gold); margin-bottom:20px;">${car.price}</p>
                
                <div class="booking-form">
                    <h4 style="margin-bottom:15px;">Book a Test Drive</h4>
                    <input type="text" id="bookName" placeholder="Your Full Name">
                    <input type="date" id="bookDate">
                    <button onclick="sendBooking('${car.name}')" class="btn-contact" style="width:100%; background:var(--gold); color:#000; font-weight:700; padding:15px;">CONFIRM BOOKING</button>
                </div>

                <div style="margin-top:20px; font-size:13px; opacity:0.6;">
                    <p><i class="fas fa-check-circle"></i> Instant approval for selected banks</p>
                    <p><i class="fas fa-check-circle"></i> Free insurance for the 1st year</p>
                </div>
            </div>
        </div>
    `;
    carModal.style.display = 'block';
    updateLoan(priceNum); // Hitung otomatis saat modal buka
};

// Fungsi Hitung Cicilan
window.updateLoan = (price) => {
    const tenor = document.getElementById('tenor').value;
    const dp = price * 0.2;
    const loanAmount = price - dp;
    const interest = 0.05; // Bunga 5% per tahun
    const totalWithInterest = loanAmount + (loanAmount * interest * tenor);
    const monthly = totalWithInterest / (tenor * 12);
    
    document.getElementById('monthlyResult').innerText = `Rp ${Math.round(monthly).toLocaleString()}`;
};

// Fungsi Booking via WhatsApp
window.sendBooking = (carName) => {
    const name = document.getElementById('bookName').value;
    const date = document.getElementById('bookDate').value;
    
    if(!name || !date) {
        alert("Please fill in your name and preferred date.");
        return;
    }

    const message = `Hello LUXE AUTO, I would like to book a Test Drive.%0A%0A*Car:* ${carName}%0A*Name:* ${name}%0A*Date:* ${date}`;
    window.open(`https://wa.me/62812345678?text=${message}`, '_blank');
};

    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) closeBtn.onclick = () => carModal.style.display = 'none';
    window.onclick = (e) => { if(e.target === carModal) carModal.style.display = 'none'; };

    // --- 8. Testimonial Slider (FULL FIXED) ---
    const testimonialWrapper = document.getElementById('testimonialWrapper');
    const prevTestiBtn = document.querySelector('.prev-testi');
    const nextTestiBtn = document.querySelector('.next-testi');
    let testimonialIndex = 0;

    function renderTestimonials() {
        if (!testimonialWrapper) return;
        testimonialWrapper.innerHTML = testimonials.map(testi => `
            <div class="testimonial-item">
                <img src="${testi.avatar}" alt="${testi.name}">
                <p>"${testi.review}"</p>
                <h4>${testi.name}</h4>
                <span>${testi.title}</span>
            </div>
        `).join('');
    }

    function showTestimonial(index) {
        testimonialWrapper.style.transform = `translateX(${-index * 100}%)`;
    }

    if (prevTestiBtn && nextTestiBtn) {
        nextTestiBtn.onclick = () => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        };

        prevTestiBtn.onclick = () => {
            testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(testimonialIndex);
        };
    }

    renderTestimonials();
});
// Pastikan video mulai diputar saat halaman terbuka
const video = document.getElementById('heroVideo');
if (video) {
    video.play().catch(error => {
        console.log("Autoplay dicegah oleh browser, mencoba play manual...");
        // Browser terkadang memblokir autoplay jika belum ada interaksi user
    });
}