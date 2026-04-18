// script.js
// Project data
const projectsData = [
    {id:1, type:"residential", title:"4-Storey Luxury Villa", location:"Budhanilkantha, Kathmandu", year:"2025", img:"https://picsum.photos/id/1015/600/400"},
    {id:2, type:"residential", title:"Modern Duplex House", location:"Lakeside, Pokhara", year:"2024", img:"https://picsum.photos/id/1005/600/400"},
    {id:3, type:"commercial", title:"G+7 Corporate Tower", location:"New Baneshwor, Kathmandu", year:"2025", img:"https://picsum.photos/id/1016/600/400"},
    {id:4, type:"commercial", title:"Shopping Complex", location:"Bharatpur, Chitwan", year:"2023", img:"https://picsum.photos/id/133/600/400"},
    {id:5, type:"infrastructure", title:"Community Health Center", location:"Dharan, Sunsari", year:"2024", img:"https://picsum.photos/id/160/600/400"},
    {id:6, type:"infrastructure", title:"Bridge Rehabilitation", location:"Trishuli River", year:"2025", img:"https://picsum.photos/id/201/600/400"}
];

// Render projects
function renderProjects(filtered) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = '';
    filtered.forEach(p => {
        container.innerHTML += `
        <div class="project-card bg-white rounded-3xl overflow-hidden">
            <img src="${p.img}" alt="${p.title}" class="w-full h-64 object-cover">
            <div class="p-6">
                <div class="uppercase text-xs text-[#166534]">${p.type}</div>
                <h4 class="font-semibold text-xl mt-1">${p.title}</h4>
                <p class="text-sm text-[#2c3e50]">${p.location} • ${p.year}</p>
            </div>
        </div>`;
    });
}

// Filter projects
window.filterProjects = function(category) {
    document.querySelectorAll('.project-filter').forEach(b => b.classList.remove('active'));
    if (category === 'all') {
        document.querySelectorAll('.project-filter')[0].classList.add('active');
        renderProjects(projectsData);
    } else {
        const btn = Array.from(document.querySelectorAll('.project-filter')).find(b => b.textContent.toLowerCase() === category);
        if (btn) btn.classList.add('active');
        const filtered = projectsData.filter(p => p.type === category);
        renderProjects(filtered);
    }
};

// Mobile menu
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-icon');
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
};

// Animated counters
function animateCounter(id, target, duration = 1800) {
    const el = document.getElementById(id);
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    function update() {
        start += step;
        if (start >= target) { el.textContent = target + (id === 'years' || id === 'projects' || id === 'clients' ? '+' : ''); return; }
        el.textContent = start;
        requestAnimationFrame(update);
    }
    update();
}

// Intersection observer for counters
function startCounters() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounter('years', 6);
            animateCounter('projects', 100);
            animateCounter('clients', 50);
            animateCounter('services-count', 8);
            observer.disconnect();
        }
    });
    observer.observe(document.getElementById('years'));
}

// Contact form
function initForm() {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button');
        const original = btn.innerHTML;
        btn.innerHTML = 'SENDING...';
        setTimeout(() => {
            btn.innerHTML = '✅ MESSAGE SENT!';
            setTimeout(() => {
                this.reset();
                btn.innerHTML = original;
                alert('Thank you! Er. Tapendra Baduwal will contact you within 2 hours.');
            }, 2000);
        }, 1500);
    });
}

// Active nav highlighting
function highlightNav() {
    const sections = ['home','about','services','projects','whyus','testimonials','contact'];
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const el = document.getElementById(sec);
            if (el && scrollY >= el.offsetTop - 150) current = sec;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    });
}

// Initialize everything
function initialize() {
    renderProjects(projectsData);
    startCounters();
    initForm();
    highlightNav();
    console.log('%c✅ Tapendra Design & Construction – Full custom website ready', 'background:#0a3d62;color:#d4af77;padding:4px 8px;border-radius:4px');
}

window.onload = initialize;
