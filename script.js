// script.js
// TailwindCSS initialization
function initializeTailwind() {
    return {
        config(userConfig = {}) {
            return {
                content: [],
                theme: {
                    extend: {
                        colors: {
                            primary: '#0a3d62',
                            accent: '#166534',
                            gold: '#d4af77',
                            charcoal: '#2c3e50'
                        }
                    }
                },
                plugins: [],
                ...userConfig,
            }
        },
        theme(userConfig = {}) {
            return this.defaultTheme ? this.defaultTheme : this.config(userConfig)
        },
    }
}

// Run Tailwind
document.addEventListener('DOMContentLoaded', () => {
    const config = initializeTailwind().theme()
    return {
        configUser: () => config,
    }
})

// Global smooth scroll helper
function smoothScrollTo(section) {
    const el = document.getElementById(section)
    if (el) {
        const navOffset = 80
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = el.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - navOffset
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })
    }
}

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu')
    const icon = document.getElementById('mobile-menu-icon')
    menu.classList.toggle('hidden')
    if (menu.classList.contains('hidden')) {
        icon.classList.replace('fa-xmark', 'fa-bars')
    } else {
        icon.classList.replace('fa-bars', 'fa-xmark')
    }
}

// Animated counters
function animateCounter(id, target, duration = 2000, prefix = '', suffix = '') {
    const counter = document.getElementById(id)
    let start = 0
    const increment = Math.ceil(target / (duration / 16))
    
    function update() {
        start += increment
        if (start >= target) {
            counter.textContent = prefix + target + suffix
            return
        }
        counter.textContent = prefix + Math.floor(start) + suffix
        requestAnimationFrame(update)
    }
    update()
}

// Trigger counters when in viewport
function observeCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Years
                animateCounter('years-counter', 6, 1200, '', '+')
                // Projects
                animateCounter('projects-counter', 100, 1800, '', '+')
                // Clients
                animateCounter('clients-counter', 50, 1500, '', '+')
                // Services
                animateCounter('services-counter', 8, 800, '', '')
                observer.disconnect()
            }
        })
    }, { threshold: 0.5 })
    
    const statsSection = document.querySelector('#years-counter').closest('section')
    if (statsSection) observer.observe(statsSection)
}

// Project data
const projectsData = [
    {
        id: 1,
        title: "4-Storey Residential Villa",
        location: "Budhanilkantha, Kathmandu",
        type: "residential",
        year: "2025",
        img: "https://picsum.photos/id/1015/600/400",
        desc: "Complete structural & architectural design with modern Nepali aesthetics."
    },
    {
        id: 2,
        title: "Luxury Duplex House",
        location: "Lakeside, Pokhara",
        type: "residential",
        year: "2024",
        img: "https://picsum.photos/id/1005/600/400",
        desc: "Seismic-resistant RCC structure with panoramic lake views."
    },
    {
        id: 3,
        title: "Corporate Office Building",
        location: "New Baneshwor, Kathmandu",
        type: "commercial",
        year: "2025",
        img: "https://picsum.photos/id/1016/600/400",
        desc: "G+7 commercial tower with underground parking and green terraces."
    },
    {
        id: 4,
        title: "Shopping Complex",
        location: "Bharatpur, Chitwan",
        type: "commercial",
        year: "2023",
        img: "https://picsum.photos/id/133/600/400",
        desc: "Mixed-use commercial development with 45 shops and food court."
    },
    {
        id: 5,
        title: "Community Health Center",
        location: "Dharan, Sunsari",
        type: "infrastructure",
        year: "2024",
        img: "https://picsum.photos/id/160/600/400",
        desc: "Institutional building with full MEP and sustainable design."
    },
    {
        id: 6,
        title: "Bridge Rehabilitation",
        location: "Trishuli River Corridor",
        type: "infrastructure",
        year: "2025",
        img: "https://picsum.photos/id/201/600/400",
        desc: "Structural assessment and retrofitting of 120m span bridge."
    }
]

// Render projects
function renderProjects(filteredProjects) {
    const grid = document.getElementById('projects-grid')
    grid.innerHTML = ''
    
    filteredProjects.forEach((project, index) => {
        const cardHTML = `
        <div class="project-card bg-white rounded-3xl overflow-hidden shadow-sm border border-transparent hover:border-[#d4af77]/30 group">
            <div class="relative">
                <img src="${project.img}" alt="${project.title}" class="w-full h-64 object-cover">
                <div class="absolute top-4 right-4 bg-white text-[#0a3d62] text-xs font-semibold px-4 py-1 rounded-3xl shadow">
                    ${project.year}
                </div>
            </div>
            <div class="p-6">
                <div class="uppercase text-xs tracking-widest text-[#166534]">${project.type.toUpperCase()}</div>
                <h4 class="text-xl font-semibold mt-1 mb-1">${project.title}</h4>
                <p class="text-[#2c3e50] text-sm">${project.location}</p>
                <p class="mt-4 text-sm line-clamp-3">${project.desc}</p>
                <div class="mt-6 text-[#d4af77] text-xs flex items-center justify-between">
                    <span>VIEW FULL CASE STUDY</span>
                    <i class="fa-solid fa-arrow-right group-hover:translate-x-1"></i>
                </div>
            </div>
        </div>`
        grid.innerHTML += cardHTML
    })
    
    // If no results
    if (filteredProjects.length === 0) {
        grid.innerHTML = `<div class="col-span-3 text-center py-12 text-gray-400">No projects found in this category yet.</div>`
    }
}

// Filter function
function filterProjects(category) {
    // Remove active from all
    document.querySelectorAll('.project-filter').forEach(btn => btn.classList.remove('active'))
    
    // Add active to clicked
    const buttons = document.querySelectorAll('.project-filter')
    for (let btn of buttons) {
        if ((category === 'all' && btn.textContent === 'ALL PROJECTS') ||
            (category === 'residential' && btn.textContent === 'RESIDENTIAL') ||
            (category === 'commercial' && btn.textContent === 'COMMERCIAL') ||
            (category === 'infrastructure' && btn.textContent === 'INFRASTRUCTURE')) {
            btn.classList.add('active')
            break
        }
    }
    
    let filtered = projectsData
    if (category !== 'all') {
        filtered = projectsData.filter(p => p.type === category)
    }
    renderProjects(filtered)
}

// Form handling
function handleContactForm() {
    const form = document.getElementById('contact-form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        
        // Simulate API call
        const btn = form.querySelector('button[type="submit"]')
        const originalText = btn.innerHTML
        
        btn.innerHTML = `
            <svg class="animate-spin h-6 w-6 text-[#0a3d62]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
        `
        setTimeout(() => {
            btn.innerHTML = `✅ MESSAGE SENT!`
            btn.style.backgroundColor = '#166534'
            btn.style.color = 'white'
            
            // Reset form
            form.reset()
            
            // Show success toast
            const toast = document.createElement('div')
            toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#166534] text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-x-3 z-[999]'
            toast.innerHTML = `
                Thank you! Er. Tapendra will contact you within 2 hours.
                <i onclick="this.parentElement.remove()" class="fa-solid fa-xmark cursor-pointer"></i>
            `
            document.body.appendChild(toast)
            
            setTimeout(() => {
                if (toast.parentElement) toast.remove()
                // Reset button
                btn.innerHTML = originalText
                btn.style.backgroundColor = ''
                btn.style.color = ''
            }, 4500)
        }, 1650)
    })
}

// Active nav link highlighting on scroll
function highlightActiveNav() {
    const sections = ['home', 'about', 'services', 'projects', 'whyus', 'testimonials', 'contact']
    const navLinks = document.querySelectorAll('.nav-link')
    
    window.addEventListener('scroll', () => {
        let current = ''
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId)
            if (!section) return
            const sectionTop = section.offsetTop
            if (scrollY >= sectionTop - 200) {
                current = sectionId
            }
        })
        
        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('onclick').includes(current)) {
                link.classList.add('active')
            }
        })
    })
}

// Scroll reveal animations
function scrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1
                entry.target.style.transform = 'translateY(0)'
            }
        })
    }, { threshold: 0.1 })
    
    // Add reveal to major cards & sections
    document.querySelectorAll('.card-hover, .project-card, section > div').forEach(el => {
        if (el.classList.contains('card-hover') || el.classList.contains('project-card')) {
            el.style.opacity = 0
            el.style.transform = 'translateY(30px)'
            observer.observe(el)
        }
    })
}

// Initialize everything
function initializeWebsite() {
    initializeTailwind()
    observeCounters()
    renderProjects(projectsData)
    handleContactForm()
    highlightActiveNav()
    scrollReveal()
    
    console.log('%c✅ Tapendra Design & Construction website ready! Professional, premium & fully functional.', 'background:#0a3d62;color:#d4af77;font-size:13px;padding:2px 6px;border-radius:2px')
}

// Launch
window.onload = initializeWebsite
