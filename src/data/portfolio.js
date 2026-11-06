// Replace null values only when real contact details and URLs are available.
export const profile = {
  name: 'Lemar Paras', title: 'Software Developer & Digital Builder',
  introduction: 'I build digital experiences through code, creativity, and technology.',
  email: 'paraslemar@gmail.com',
  github: 'https://github.com/Lemar-Paras',
  linkedin: 'https://www.linkedin.com/in/lemar-paras-0b924a334/',
  facebook: 'https://www.facebook.com/lemarspakatie',
  instagram: 'https://www.instagram.com/lmr_paras/',
  resume: '/LEMARPARASBSIS4A(RESUME)%20(1).pdf',
  location: 'Philippines',
  education: { degree: 'Bachelor of Science in Information Systems', shortDegree: 'BS Information Systems',
    yearLevel: 'fourth-year', school: 'Colegio de San Antonio de Padua', dates: null },
  portrait: { src: '/images/lemar.jpg', alt: 'Professional portrait of Lemar Paras wearing a dark suit and white shirt', width: 1254, height: 1254 },
  availability: { open: true, shortLabel: 'Open to opportunities', label: 'Available for internship opportunities' },
  biography: [
    'I enjoy building academic software and improving my Java, web development, database, and system design skills.',
    'I taught introductory Java and web development during student teaching/OJT and served as Innovators Club President.',
  ],
  internshipNote: 'Seeking a software development internship.',
  contactInvitation: "Have an opportunity or project in mind? I'd be happy to hear from you.",
}
// Do not enable delivery until a real same-origin server endpoint has been tested.
export const contactDelivery = { endpoint: null, verified: false }
export const seo = {
  title: `${profile.name}® — ${profile.title}`,
  description: `${profile.name} — ${profile.title}. Explore academic projects, technical skills, and a journey through code, creativity, and technology.`,
  siteUrl: null, socialImage: null, socialImageAlt: null,
}
export const navigation = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']
export const skills = [
  { id: 'programming', title: 'Programming Languages', items: [
    { name: 'Java', icon: 'java' }, { name: 'PHP', icon: 'php' },
    { name: 'JavaScript', icon: 'javascript' }, { name: 'Python', icon: 'python' }, { name: 'Dart', icon: 'dart' },
  ] },
  { id: 'web', title: 'Frontend Development', items: [
    { name: 'HTML5', icon: 'html5' }, { name: 'CSS3', icon: 'css3' }, { name: 'React', icon: 'react' },
    { name: 'Blade', monogram: 'BL' }, { name: 'Tailwind CSS', icon: 'tailwindcss' }, { name: 'Alpine.js', icon: 'alpinejs' },
  ] },
  { id: 'backend', title: 'Backend Development', items: [{ name: 'Laravel', icon: 'laravel' }] },
  { id: 'tooling', title: 'Database & Development Tools', items: [
    { name: 'MySQL', icon: 'mysql' }, { name: 'Supabase', icon: 'supabase' },
    { name: 'XAMPP', icon: 'xampp' }, { name: 'Vite', icon: 'vite' },
  ] },
  { id: 'mobile', title: 'Mobile Development', items: [{ name: 'Flutter', icon: 'flutter' }] },
]
const armsScreenshot = {
  src: '/images/projects/arms.jpg', width: 1882, height: 949,
  alt: 'ARMS landing page with research management introduction and research journey overview',
  caption: 'Supplied ARMS landing-page screenshot.',
}
const csapScreenshot = {
  src: '/images/projects/landingpage.png', width: 1899, height: 808,
  alt: 'CSAP landing-page mockup with school navigation, campus imagery, and program selection area',
  caption: 'Supplied CSAP static front-end landing-page screenshot.',
}
const seamsScreenshot = {
  src: '/images/projects/seams.png', width: 1449, height: 684,
  alt: 'Maroon-and-gold SEAMS attendance website showing an event overview, attendance information, and activity panels',
  caption: 'SEAMS website screenshot. Displayed sample figures are interface content, not verified project outcomes.',
}
const ecommerceScreenshot = {
  src: '/images/projects/e-commerce.png', width: 1909, height: 882,
  alt: 'E-commerce storefront with shopping navigation and featured laptop, smartphone, and headphone listings showing product images, descriptions, and prices',
  caption: 'Supplied storefront screenshot. Visible navigation labels do not verify the functionality behind them.',
}
const lostFoundScreenshot = {
  src: '/images/projects/lost_and_found1.png', width: 1456, height: 730,
  alt: 'School Lost and Found student dashboard with sidebar navigation, report summary cards, quick actions, recent listings, and activity',
  caption: 'Supplied School Lost and Found student-dashboard screenshot.',
}
export const projects = [
  {
    id: '01', name: 'ARMS', fullTitle: 'Automated Research Management System with AI Support',
    subtitle: 'Research, with a better flow.', category: 'Academic research management', featured: true,
    description: 'A Laravel-based research management system developed for Colegio de San Antonio de Padua.',
    details: 'ARMS supports research manuscript submission, revision workflows, research management, and defense scheduling. Its AI-related functionality assists with defense scheduling and avoiding scheduling conflicts; it is not an AI manuscript reviewer.',
    technologies: ['PHP', 'Laravel 12', 'MySQL', 'Blade', 'Tailwind CSS', 'Alpine.js', 'Vite'],
    status: 'Confirmed project', preview: 'Application screenshot', previewImage: armsScreenshot, previewStyle: 'arms',
    problem: null, purpose: 'Support academic research management processes at Colegio de San Antonio de Padua.',
    features: ['Manuscript submissions', 'Research revision workflows', 'Research management', 'Defense scheduling', 'AI-related defense scheduling support and conflict avoidance'],
    contributions: null, developmentStatus: null, screenshots: [armsScreenshot], repository: null,
    demo: 'https://arms.free.nf/?i=1',
  },
  {
    id: '02', name: 'CSAP Landing Page', fullTitle: 'Colegio de San Antonio de Padua Landing Page',
    subtitle: 'A school introduction, brought to the web.', category: 'School website front-end', featured: true,
    description: 'A responsive school website front-end showcasing information about Colegio de San Antonio de Padua.',
    details: 'The website presents school information, academic programs, institutional details, organizations, and other school-related content. The current deployed version is a static front-end mockup. A functioning admissions backend, enrollment system, or live school database is not included; official production-website status has not been confirmed.',
    technologies: [], status: 'Static front-end mockup', preview: 'Static mockup screenshot',
    previewImage: csapScreenshot, previewStyle: 'school',
    problem: null, purpose: 'Present information about Colegio de San Antonio de Padua through a responsive website front-end.',
    features: ['School information pages and sections', 'Academic program information', 'Institutional information', 'Organization information'],
    contributions: null, developmentStatus: 'Deployed version: static front-end mockup.',
    screenshots: [csapScreenshot], repository: null, demo: 'https://csap-one.vercel.app/',
  },
  {
    id: '03', name: 'School Event Attendance Management System', fullTitle: 'School Event Attendance Management System',
    subtitle: 'Attendance during school events.', category: 'Academic software project',
    description: 'A web-based system designed to organize and monitor student attendance during school events and activities.',
    details: null,
    pendingInformation: 'Confirm technical stack, attendance verification methods, personal contributions, and development status.',
    technologies: [], status: null, preview: 'SEAMS · Website screenshot', previewImage: seamsScreenshot, previewStyle: 'attendance',
    problem: null, purpose: null, features: [], contributions: null, developmentStatus: null,
    screenshots: [seamsScreenshot], repository: null, demo: null,
  },
  {
    id: '04', name: 'Simple E-Commerce Shop System', fullTitle: 'Simple E-Commerce Shop System',
    subtitle: 'Exploring an online shopping interface.', category: 'E-commerce application project',
    description: 'A simple e-commerce website project featuring an online storefront and product listings.',
    details: null,
    pendingInformation: 'Storefront screenshot supplied. Confirm functionality, technologies, personal contributions, and development status; navigation labels alone do not verify cart operations, authentication, payment processing, or order history.',
    technologies: [], status: null, preview: 'Storefront screenshot', previewImage: ecommerceScreenshot, previewStyle: 'shop',
    problem: null, purpose: null, features: [], contributions: null, developmentStatus: null,
    screenshots: [ecommerceScreenshot], repository: null, demo: null,
  },
  {
    id: '05', name: 'Lost and Found System', fullTitle: 'Lost and Found System',
    subtitle: 'Lost and Found System', category: 'System project',
    description: 'A school lost and found system project featuring a student dashboard and item listings.', details: null,
    pendingInformation: 'Student-dashboard screenshot supplied. Confirm working functionality, personal contributions, technologies, dates, status, and links.',
    technologies: [], status: null, preview: 'Student dashboard screenshot', previewImage: lostFoundScreenshot, previewStyle: 'lost',
    problem: null, purpose: null, features: [], contributions: null, developmentStatus: null,
    screenshots: [lostFoundScreenshot], repository: null, demo: null,
  },
]
export const experience = {
  development: [
    { id: 'education', type: 'Education', title: profile.education.shortDegree,
      organization: profile.education.school, date: '2023–Present',
      description: 'Software development, databases, and information systems.' },
    { id: 'capstone', type: 'Capstone Project', title: 'Project Leader & Programmer',
      organization: 'ARMS — Automated Research Management System',
      description: 'Led project coordination and contributed to system development.',
      link: { href: '#projects', label: 'Explore ARMS', accessibleLabel: 'Explore ARMS in the Projects section' } },
    { id: 'teaching', type: 'Teaching / OJT', title: 'Student Teaching / OJT',
      description: 'Taught introductory Java and web development.' },
  ],
  leadership: [
    { id: 'innovators', title: 'President', organization: 'Innovators Club', institution: profile.education.school,
      date: '2025–2026', description: 'Led academic and technical initiatives.' },
    { id: 'sbo', title: 'Public Information Officer', organization: 'SBO',
      date: '2025–2026', description: 'Managed announcements and student communications.' },
    { id: 'mayor', title: 'Class Mayor', date: '2023–Present',
      description: 'Represented classmates in academic matters.' },
    { id: 'ssc', title: 'Creative Publisher', organization: 'Supreme Student Council (SSC)',
      date: '2026–2027 term', description: 'Supports school publication and creative communications.' },
  ],
  achievements: [
    { id: 'tesda', title: 'TESDA NC II — Web Development', detail: '2025', icon: 'certificate' },
    { id: 'deans', title: "Dean's Lister", detail: 'First Year', icon: 'award' },
    { id: 'presidents', title: "President's Lister", detail: 'Second Year–Present', icon: 'award' },
    { id: 'excellence', title: 'Academic Excellence Awardee', icon: 'award' },
  ],
}

