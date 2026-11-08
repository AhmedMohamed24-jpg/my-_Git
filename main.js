document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================== */
    /* 1. تبديل المظهر (Light / Dark Mode)                        */
    /* ========================================================== */
    const themeBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    const readTheme = () => {
        try { return localStorage.getItem('site-theme') || 'dark'; }
        catch (e) { return 'dark'; }
    };
    const saveTheme = (theme) => {
        try { localStorage.setItem('site-theme', theme); } catch (e) { /* تجاهل */ }
    };

    htmlElement.setAttribute('data-theme', readTheme());

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', next);
            saveTheme(next);
        });
    }

    /* ========================================================== */
    /* 0. الترجمة (عربي / English)                                 */
    /*    العربي هو الأساس وبيتقرأ من الـ HTML نفسه،               */
    /*    والإنجليزي متخزن هنا. عدّل أي ترجمة من القوائم دي.       */
    /* ========================================================== */
    const SVG_FIRST = (el) => el.querySelector(':scope > svg');

    const lastTextNode = (el) => {
        const nodes = Array.from(el.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim());
        return nodes[nodes.length - 1] || null;
    };

    const getValue = (el, attr) => {
        if (attr) return el.getAttribute(attr);
        if (SVG_FIRST(el)) {
            const tn = lastTextNode(el);
            return tn ? tn.textContent.trim() : '';
        }
        return el.innerHTML;
    };

    const setValue = (el, attr, value) => {
        if (attr) { el.setAttribute(attr, value); return; }
        if (SVG_FIRST(el)) {
            const tn = lastTextNode(el);
            if (tn) tn.textContent = ` ${value} `;
            return;
        }
        el.innerHTML = value;
    };

    // [selector, attribute أو null, الترجمة الإنجليزية (قائمة بنفس ترتيب العناصر أو نص واحد للكل)]
    const I18N = [
        // --- Navbar ---
        ['.nav-links a', null, ['Home', 'Services', 'Pricing', 'About Us', 'Reviews', 'Contact']],
        ['.btn-primary-outline', null, 'Book Now'],
        ['#themeToggleBtn', 'aria-label', 'Toggle theme'],
        ['#mobileMenuBtn', 'aria-label', 'Menu'],
        ['.logo-img', 'alt', 'Dr. Tecany'],

        // --- Hero ---
        ['.hero-content .badge-blue', null, 'Free device checkup'],
        ['.hero-title', null, 'Your Laptop’s <span class="text-gold">Doctor</span>..<br><span class="text-cyan">Professional</span> repair that revives your device!'],
        ['.hero-desc', null, 'Fast, comprehensive solutions for hardware repair, SSD & RAM upgrades, and software troubleshooting, backed by a real warranty.'],
        ['.hero-buttons .btn-primary', null, 'Book your repair now'],
        ['.hero-buttons .btn-secondary', null, 'Browse our services'],
        ['.stat-text', null, ['Days warranty', 'Years of experience', 'Devices repaired']],
        ['.main-laptop', 'alt', 'Laptop repair'],
        ['.float-card-1 span', null, 'Repaired ✓'],
        ['.float-card-2 .card-text strong', null, 'Faster performance ⚡'],
        ['.float-card-2 .card-text small', null, 'Ready for work again'],

        // --- Services ---
        ['#services .badge-blue', null, 'Complete solutions for your device'],
        ['#services .section-title', null, 'Our <span class="text-gold">Professional</span> Services'],
        ['#services .section-desc', null, 'Everything your laptop needs to get back to peak performance, with guaranteed quality and speed.'],
        ['.popular-badge', null, 'Most popular'],
        ['.service-card h3', null, ['Hardware repair', 'Windows & software installation', 'Virus removal', 'Performance tuning', 'RAM & SSD upgrade']],
        ['.service-card p', null, [
            'Accurate diagnosis and full repair of motherboard and internal component faults, done professionally.',
            'Genuine Windows copies and complete drivers, so your device is ready to work.',
            'Thorough cleaning that protects your data from malware safely.',
            'Complete solutions for slowness, freezing, and overheating.',
            'Double your boot speed and performance in a few simple steps.'
        ]],

        // --- Pricing ---
        ['#pricing .badge-blue', null, 'Pricing plans'],
        ['#pricing .section-title', null, 'Maintenance <span class="text-gold">Packages</span>'],
        ['#pricing .section-desc', null, 'Choose the package that suits your device and save with our complete bundles.'],
        ['.package-name', null, ['Basic Package', 'Professional Package', 'Complete Package']],
        ['.currency', null, 'EGP'],
        ['.package-desc', null, [
            'The quick fix for simple problems and factory resets.',
            'The perfect balance to keep your device performing well and prevent overheating.',
            'A full VIP service that makes your laptop like new, inside and out.'
        ]],
        ['.package-features li', null, [
            'Windows installation', 'Full format', 'Basic device drivers',
            'Full thermal inspection', 'Thermal paste replacement', 'Windows installation & drivers',
            'Complete, thorough maintenance', 'Full device cleaning', 'Full checkup + Windows'
        ]],
        ['.select-package-btn', null, ['Choose package', 'Book package now', 'Choose package']],

        // --- About ---
        ['#about .badge-blue', null, 'About us'],
        ['#about .section-title', null, 'Experts at giving your laptop a <span class="text-gold">new life</span>'],
        ['.about-desc', null, 'At “Dr. Tecany”, our first goal is your peace of mind and getting your device back to its best. We treat every laptop as if it were our own, to ensure top quality at the best price.'],
        ['.badge-content .text', null, 'Years of experience'],
        ['.about-points p', null, [
            '<strong>Certified technicians:</strong> experienced with the most complex motherboard and hardware faults.',
            '<strong>Fair prices:</strong> clear, transparent pricing before we start, with no surprises.',
            '<strong>Over 8 years of experience:</strong> the trust of thousands of customers is our capital.'
        ]],
        ['.about-img', 'alt', 'Dr. Tecany repair team'],

        // --- Reviews ---
        ['#reviews .badge-blue', null, 'Reviews & experiences'],
        ['#reviews .section-title', null, 'What our <span class="text-gold">customers say</span>'],
        ['#reviews .section-desc', null, 'The trust of thousands of customers is the real foundation of our continued success.'],
        ['#prevReview', 'aria-label', 'Previous'],
        ['#nextReview', 'aria-label', 'Next'],
        ['.review-text', null, [
            '"Excellent and very fast service. My laptop kept shutting down from heat, and it came back better than before. Their prices are very clear."',
            '"Engineers who really know their stuff. I upgraded the RAM and SSD and the device is flying now. Thank you Dr. Tecany."',
            '"What I liked most was the transparency. They explain the fault and the cost before touching anything. Honestly trustworthy, and I recommend them."',
            '"Very respectful treatment and fast service. I got my laptop back the same day with high-quality work."',
            '"The best repair center I have dealt with. Their prices are very reasonable compared to the quality and the real warranty they offer."'
        ]],
        ['.client-avatar', null, ['A', 'M', 'M', 'O', 'K']],
        ['.client-name', null, ['Ahmed Mahmoud', 'Mostafa Gamal', 'Mohamed Saeed', 'Omar Abdullah', 'Khaled Ibrahim']],
        ['.client-service', null, ['Checkup package', 'RAM upgrade', 'Hardware repair', 'Windows & software installation', 'Complete package']],

        // --- Contact ---
        ['#contact .badge-blue', null, 'The first step to a better device'],
        ['#contact .section-header .section-title', null, 'Contact <span class="text-gold">us</span>'],
        ['#contact .section-header .section-desc', null, 'Tell us about your device and we’ll take care of the rest.'],
        ['.form-header h3', null, 'Book your repair now'],
        ['.form-header p', null, 'Leave your details and describe the problem, and we’ll get back to you to confirm.'],
        ['.form-group label', null, ['Name', 'Phone number', 'Service type', 'Your message']],
        ['#clientName', 'placeholder', 'Enter your full name'],
        ['#clientPhone', 'placeholder', '01XXXXXXXXX'],
        ['#serviceType option', null, ['Choose service type', 'Hardware repair', 'Package 150', 'Package 250', 'Package 350']],
        ['#clientMessage', 'placeholder', 'Tell us about your device’s problem...'],
        ['.field-error', null, [
            'Please enter your name (at least 2 letters).',
            'Enter a valid Egyptian mobile number, e.g. 01012345678',
            'Please choose a service type.',
            'Please describe the problem.'
        ]],
        ['#submitBookingBtn', null, 'Send request'],
        ['.info-header h3', null, 'Let’s bring your device back to life'],
        ['.info-header p', null, 'Have a question before booking? Reach us whichever way suits you.'],
        ['.method-text h4', null, ['Phone', 'WhatsApp', 'Email', 'Facebook', 'Telegram']],
        ['.method-icon.facebook-icon + .method-text span', null, 'Our Facebook page'],
        ['.dark-map', 'title', 'Our location'],
        ['.map-overlay-text', null, 'Our location on the map'],
        ['.float-whatsapp', 'aria-label', 'Contact on WhatsApp'],
        ['#scrollTopBtn', 'aria-label', 'Back to top'],

        // --- Footer ---
        ['.footer-desc', null, 'Laptop repair with expertise and care. From diagnosis to delivery, we’re with you step by step.'],
        ['.footer-col h4', null, ['Quick links', 'Our services']],
        ['.footer-links a', null, ['Home', 'Services', 'Pricing', 'About us', 'Hardware repair', 'Windows installation', 'RAM & SSD upgrade']],
        ['.footer-bottom p', null, '&copy; <span id="currentYear"></span> Dr. Tecany - All rights reserved.'],
        ['.social-btn.facebook-icon', 'aria-label', 'Facebook'],
        ['.social-btn.telegram-icon', 'aria-label', 'Telegram'],
        ['.social-btn.whatsapp-icon', 'aria-label', 'WhatsApp'],
        ['.social-btn.mail-icon', 'aria-label', 'Email']
    ];

    // نصوص بتظهر للعميل أثناء الإرسال
    const STR = {
        ar: {
            sending: 'جاري الإرسال...',
            sent: 'تم الإرسال بنجاح ✓',
            ok: 'وصلنا طلبك، وهنتواصل معاك على رقمك في أقرب وقت.',
            failPre: 'تعذر الإرسال دلوقتي. جرّب تاني أو ',
            failLink: 'ابعت الطلب بالإيميل مباشرة',
            docTitle: 'دكتور تقني - صيانة احترافية للابتوب'
        },
        en: {
            sending: 'Sending...',
            sent: 'Sent successfully ✓',
            ok: 'We received your request and will contact you on your number shortly.',
            failPre: 'We couldn’t send it right now. Please try again or ',
            failLink: 'send the request by email directly',
            docTitle: 'Dr. Tecany - Professional Laptop Repair'
        }
    };

    // نلتقط النص العربي الأصلي من الصفحة مرة واحدة
    const i18nItems = [];
    I18N.forEach(([selector, attr, en]) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            const value = Array.isArray(en) ? en[i] : en;
            if (value === undefined) return;
            i18nItems.push({ el, attr, ar: getValue(el, attr), en: value });
        });
    });

    let currentLang = 'ar';
    const langBtn = document.getElementById('langToggleBtn');
    const t = (key) => STR[currentLang][key];

    const applyLang = (lang) => {
        currentLang = lang === 'en' ? 'en' : 'ar';
        i18nItems.forEach(item => setValue(item.el, item.attr, item[currentLang]));

        htmlElement.setAttribute('lang', currentLang);
        htmlElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        document.title = STR[currentLang].docTitle;

        if (langBtn) {
            langBtn.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
            langBtn.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التبديل للعربية');
        }

        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        try { localStorage.setItem('site-lang', currentLang); } catch (e) { /* تجاهل */ }
    };

    let savedLang = 'ar';
    try { savedLang = localStorage.getItem('site-lang') || 'ar'; } catch (e) { /* تجاهل */ }
    if (savedLang === 'en') applyLang('en');

    if (langBtn) {
        langBtn.addEventListener('click', () => applyLang(currentLang === 'ar' ? 'en' : 'ar'));
    }

    /* ========================================================== */
    /* 2. شريط التنقل + تحديد الرابط النشط أثناء التمرير          */
    /* ========================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    const onScroll = () => {
        const y = window.scrollY;

        if (navbar) navbar.classList.toggle('scrolled', y > 50);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);

        let current = '';
        sections.forEach(section => {
            if (y >= section.offsetTop - 150) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ========================================================== */
    /* 3. قائمة الموبايل                                          */
    /* ========================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => navLinksContainer.classList.remove('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target)) navLinksContainer.classList.remove('active');
        });
    }

    /* ========================================================== */
    /* 4. زر الصعود لأعلى                                         */
    /* ========================================================== */
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ========================================================== */
    /* 5. اختيار الباقة + نموذج الحجز                             */
    /* ========================================================== */
    const serviceSelect = document.getElementById('serviceType');

    document.querySelectorAll('.select-package-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (serviceSelect) serviceSelect.value = btn.getAttribute('data-package');
        });
    });

    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBookingBtn');
    const formStatus = document.getElementById('formStatus');
    const phoneInput = document.getElementById('clientPhone');

    const CONTACT_EMAIL = 'mohamed47231555@gmail.com';
    const FORM_ENDPOINT = 'https://formspree.io/f/mrppvlow';

    // تحويل الأرقام العربية/الهندية (٠١٢...) لأرقام إنجليزية
    const toEnglishDigits = (str) => str
        .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
        .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

    // رقم موبايل مصري: 010 / 011 / 012 / 015 + 8 أرقام (ويقبل +20 أو 0020 في الأول)
    const normalizeEgPhone = (value) => {
        let v = toEnglishDigits(value).replace(/[\s\-()]/g, '');
        if (v.startsWith('+20')) v = '0' + v.slice(3);
        else if (v.startsWith('0020')) v = '0' + v.slice(4);
        else if (/^20\d{10}$/.test(v)) v = '0' + v.slice(2);
        return v;
    };
    const isValidEgPhone = (value) => /^01[0125]\d{8}$/.test(normalizeEgPhone(value));

    const setState = (input, ok) => {
        const group = input.closest('.form-group');
        if (!group) return;
        group.classList.toggle('invalid', !ok);
        group.classList.toggle('valid', ok);
    };

    const validators = {
        clientName: (el) => el.value.trim().length >= 2,
        clientPhone: (el) => isValidEgPhone(el.value),
        serviceType: (el) => el.value !== '',
        clientMessage: (el) => el.value.trim().length >= 3
    };

    const validateField = (el) => {
        const check = validators[el.id];
        if (!check) return true;
        const ok = check(el);
        setState(el, ok);
        return ok;
    };

    if (bookingForm) {
        const fields = Object.keys(validators).map(id => document.getElementById(id)).filter(Boolean);

        // منع الحروف والرموز في خانة التليفون أثناء الكتابة
        if (phoneInput) {
            phoneInput.addEventListener('input', () => {
                const cleaned = toEnglishDigits(phoneInput.value).replace(/(?!^\+)[^\d]/g, '');
                if (cleaned !== phoneInput.value) phoneInput.value = cleaned;
                if (phoneInput.value.length > 0) validateField(phoneInput);
                else phoneInput.closest('.form-group').classList.remove('invalid', 'valid');
            });
        }

        fields.forEach(el => {
            el.addEventListener('blur', () => validateField(el));
            el.addEventListener('input', () => {
                if (el.closest('.form-group').classList.contains('invalid')) validateField(el);
            });
            el.addEventListener('change', () => validateField(el));
        });

        const showStatus = (html, type) => {
            formStatus.className = `form-status ${type}`;
            formStatus.innerHTML = html;
        };

        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formStatus.textContent = '';
            formStatus.className = 'form-status';

            // تحقق من كل الخانات
            let firstInvalid = null;
            fields.forEach(el => {
                if (!validateField(el) && !firstInvalid) firstInvalid = el;
            });
            if (firstInvalid) {
                firstInvalid.focus();
                return;
            }

            const name = document.getElementById('clientName').value.trim();
            const phone = normalizeEgPhone(phoneInput.value);
            const serviceEl = document.getElementById('serviceType');
            const selectedOpt = serviceEl.options[serviceEl.selectedIndex];
            const arOpt = i18nItems.find(item => item.el === selectedOpt);
            const service = arOpt ? arOpt.ar : selectedOpt.text; // الإيميل دايماً بالعربي
            const message = document.getElementById('clientMessage').value.trim();

            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = t('sending');

            try {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        _subject: `طلب صيانة جديد من ${name} - دكتور تقني`,
                        'الاسم': name,
                        'رقم الهاتف': phone,
                        'نوع الخدمة': service,
                        'الرسالة': message,
                        'لغة الموقع': currentLang === 'ar' ? 'العربية' : 'English'
                    })
                });
                const result = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error((result.errors && result.errors[0] && result.errors[0].message) || 'send failed');
                }

                submitBtn.innerText = t('sent');
                submitBtn.style.background = '#16a34a';
                showStatus(t('ok'), 'success');
                bookingForm.reset();
                fields.forEach(el => el.closest('.form-group').classList.remove('invalid', 'valid'));

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3500);
            } catch (err) {
                // لو الإرسال فشل: نعرض خطأ ونوفر إرسال بالإيميل مباشرة كحل بديل
                const body = `الاسم: ${name}\nرقم الهاتف: ${phone}\nنوع الخدمة: ${service}\nالرسالة: ${message}`;
                const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('طلب صيانة جديد - دكتور تقني')}&body=${encodeURIComponent(body)}`;
                showStatus(`${t('failPre')}<a href="${mailto}">${t('failLink')}</a>.`, 'error');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    /* ========================================================== */
    /* 6. سلايدر آراء العملاء                                     */
    /* ========================================================== */
    const reviewsSlider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');

    if (reviewsSlider && prevBtn && nextBtn) {
        const step = () => {
            const card = reviewsSlider.querySelector('.review-card');
            const gap = parseInt(window.getComputedStyle(reviewsSlider).gap) || 0;
            return (card ? card.offsetWidth : 0) + gap;
        };
        // في العربي (RTL) الكارت التالي ناحية اليسار، وفي الإنجليزي ناحية اليمين
        const dirSign = () => (htmlElement.getAttribute('dir') === 'rtl' ? 1 : -1);
        prevBtn.addEventListener('click', () => reviewsSlider.scrollBy({ left: dirSign() * step(), behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => reviewsSlider.scrollBy({ left: -dirSign() * step(), behavior: 'smooth' }));
    }

    /* ========================================================== */
    /* 7. ظهور العناصر من الأسفل لأعلى (Staggered Scroll Reveal)  */
    /*    - في الهيرو: العناصر تظهر ورا بعض أول ما الصفحة تفتح     */
    /*    - باقي الأقسام: كل عنصر يظهر لما توصله بالسكرول         */
    /* ========================================================== */
    const revealTargets = [];

    // step: الفرق الزمني بين كل عنصر والتاني (بالثانية)
    // cycle: لو العناصر في شبكة (Grid) نعيد الترتيب كل كام عنصر
    // base: تأخير ابتدائي للمجموعة
    const addReveal = (selector, { step = 0.12, cycle = 0, base = 0 } = {}) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            const index = cycle ? i % cycle : i;
            el.classList.add('reveal');
            el.style.setProperty('--d', `${(base + index * step).toFixed(2)}s`);
            revealTargets.push(el);
        });
    };

    // --- الهيرو ---
    addReveal('.hero-content > *', { step: 0.12 });
    addReveal('.hero-image-wrapper', { base: 0.35 });
    addReveal('.hero-image-wrapper .float-card-1', { base: 1.0 });
    addReveal('.hero-image-wrapper .float-card-2', { base: 1.2 });

    // --- عناوين الأقسام ---
    addReveal('.section-header > *', { step: 0.12 });
    addReveal('.reviews-title-wrapper > *', { step: 0.12 });
    addReveal('.slider-controls');

    // --- الخدمات والباقات ---
    addReveal('.services-grid > *', { step: 0.12, cycle: 3 });
    addReveal('.pricing-grid > *', { step: 0.15, cycle: 3 });

    // --- من نحن ---
    addReveal('.about-image-wrapper');
    addReveal('.about-text-content > *', { step: 0.12 });
    addReveal('.about-points li', { step: 0.12, base: 0.2 });

    // --- آراء العملاء ---
    addReveal('.reviews-slider', { base: 0.15 });

    // --- التواصل ---
    addReveal('.contact-form-box');
    addReveal('.contact-info-box', { base: 0.15 });

    // --- التذييل ---
    addReveal('.footer-col', { step: 0.12, cycle: 3 });
    addReveal('.footer-bottom', { base: 0.2 });

    const show = (el) => el.classList.add('active');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    show(entry.target);
                    observer.unobserve(entry.target); // الظهور مرة واحدة فقط
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        // تأخير بسيط علشان المتصفح يرسم الحالة المخفية الأول وبعدين يبدأ الأنيميشن
        requestAnimationFrame(() => {
            requestAnimationFrame(() => revealTargets.forEach(el => observer.observe(el)));
        });
    } else {
        revealTargets.forEach(show);
    }

    /* ========================================================== */
    /* 8. تحديث سنة التذييل تلقائياً                              */
    /* ========================================================== */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});