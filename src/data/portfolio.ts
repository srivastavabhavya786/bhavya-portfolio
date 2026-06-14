export const portfolioData = {
  identity: {
    name: 'Bhavya Srivastava',
    displayName: 'BHAVYA SRIVASTAVA',
    roles: ['Full-Stack Developer', 'AI Engineer'],
    status: 'B.Tech Computer Science Undergraduate',
    email: 'srivastavabhavya786@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bhavya-srivastava-0a8784286/',
    github: null, // intentionally null — do NOT add a GitHub link
    location: 'India',
    coordinates: { lat: '26.8467°N', lng: '80.9462°E' }, // Lucknow
    tagline:
      'Crafting intelligent systems and immersive digital experiences — from neural architectures to pixel-perfect interfaces.',
  },

  about: [
    "I'm a Computer Science undergraduate with a deep focus on full-stack engineering and artificial intelligence.",
    'I build at the intersection of intelligent systems and thoughtful design — combining robust backend architecture with fluid, immersive front-end experiences.',
    'I believe great software should be both functionally powerful and aesthetically precise. Every system I build is treated as both an engineering challenge and a design opportunity.',
  ],

  seeking:
    'Currently seeking opportunities where I can build things that matter at scale.',

  stats: [
    { number: '3+', label: 'Years Coding' },
    { number: '15+', label: 'Technologies' },
    { number: '10+', label: 'Projects Built' },
    { number: '∞', label: 'Problems to Solve' },
  ],

  skills: [
    {
      category: 'Languages',
      icon: 'code',
      technologies: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java'],
    },
    {
      category: 'Frontend',
      icon: 'layout',
      technologies: [
        'React.js',
        'Next.js',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'Framer Motion',
        'GSAP',
        'Three.js',
      ],
    },
    {
      category: 'Backend',
      icon: 'server',
      technologies: [
        'Node.js',
        'Express.js',
        'FastAPI',
        'REST APIs',
        'WebSockets',
        'GraphQL',
      ],
    },
    {
      category: 'AI / ML',
      icon: 'cpu',
      technologies: [
        'TensorFlow',
        'PyTorch',
        'Scikit-learn',
        'Pandas',
        'NumPy',
        'OpenCV',
        'Jupyter Notebook',
      ],
    },
    {
      category: 'Databases',
      icon: 'database',
      technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis'],
    },
    {
      category: 'Tools & Platforms',
      icon: 'tool',
      technologies: [
        'Git',
        'GitHub',
        'VS Code',
        'Figma',
        'Vercel',
        'Netlify',
        'Docker',
        'Postman',
      ],
    },
  ],

  proficiency: [
    { name: 'Python', level: 90 },
    { name: 'React.js', level: 88 },
    { name: 'Next.js', level: 86 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 85 },
    { name: 'MongoDB / SQL', level: 82 },
    { name: 'FastAPI', level: 80 },
    { name: 'TensorFlow', level: 78 },
  ],

  projects: [
    {
      title: 'Neural Architecture Visualizer',
      description: 'A 3D interactive web application for visualizing complex neural network architectures in real-time using WebGL and TensorFlow.js.',
      technologies: ['React Three Fiber', 'TensorFlow.js', 'Next.js', 'Tailwind CSS'],
      link: '#',
      github: '#',
    },
    {
      title: 'Decentralized Finance Dashboard',
      description: 'A full-stack dashboard for monitoring DeFi liquidity pools across multiple chains with real-time WebSocket integrations and predictive analytics.',
      technologies: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Framer Motion'],
      link: '#',
      github: '#',
    },
    {
      title: 'AI Code Assistant CLI',
      description: 'A terminal-based AI assistant built in Rust and Python that integrates with local LLMs to provide context-aware code generation and refactoring.',
      technologies: ['Python', 'Rust', 'LangChain', 'CLI'],
      github: '#',
    },
  ],


  // TODO: Replace with real certificate data
  // Each certificate requires: title, organization, date, credentialId, skills[], verifyUrl
  certificates: [
    {
      title: 'Programming in Python with AI Training',
      organization: 'Training Institute',
      date: 'Completed',
      credentialId: 'CERT-PYTHON-AI',
      skills: ['Python', 'Artificial Intelligence', 'Programming'],
      verifyUrl: '/certificates/Programming in Python with AI Training - Certificate of Completion.pdf',
    },
    {
      title: 'AI Tools Mastery Workshop',
      organization: 'Clapingo',
      date: '15 April 2026',
      credentialId: 'CERT-AI-TOOLS',
      skills: ['AI Tools', 'Prompt Engineering', 'Productivity'],
      verifyUrl: '/certificates/0869F919_certificate.pdf',
    },
    {
      title: 'Build, Launch & Grow: Entrepreneurship Bootcamp',
      organization: 'Maharishi University of Information Technology (MUIT), Lucknow',
      date: '07-09 May 2026',
      credentialId: 'CERT-BOOTCAMP',
      skills: ['Entrepreneurship', 'Startups', 'Innovation'],
      verifyUrl: '/certificates/BHAVYA-SRIVASTAVA-Participant-Certificate.pdf',
    },
    {
      title: '5 Days Workshop on AR/VR & Startups Development',
      organization: 'Maharishi University of Information Technology (MUIT), Lucknow',
      date: 'Completed',
      credentialId: 'CERT-ARVR',
      skills: ['AR/VR', 'Startups Development', 'Technology'],
      verifyUrl: '#',
    },
    {
      title: 'Tech Revolutions (Robo Race) – AWSAR 2K24',
      organization: 'Shri Ramswaroop Memorial University (SRMU), Lucknow',
      date: '12-13 April 2024',
      credentialId: 'CERT-ROBORACE',
      skills: ['Robotics', 'Robo Race', 'Tech Revolutions'],
      verifyUrl: '#',
    },
  ],
}
