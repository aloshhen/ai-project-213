import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Layers, Maximize, Zap, Mail } from 'lucide-react'

// SafeIcon Component - maps kebab-case names to Lucide icons
const SafeIcon = ({ name, size = 24, className = '' }) => {
  const icons = {
    'arrow-up-right': ArrowUpRight,
    'layers': Layers,
    'maximize': Maximize,
    'zap': Zap,
    'mail': Mail,
  }
  
  const IconComponent = icons[name] || ArrowUpRight
  
  return <IconComponent size={size} className={className} />
}

// Custom Cursor with Blend Mode
const CursorDot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove)
      document.body.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice, isVisible])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999]"
      style={{
        mixBlendMode: 'difference',
      }}
      animate={{
        x: position.x - 6,
        y: position.y - 6,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      }}
    />
  )
}

// Hero Section (Dark Theme)
const HeroSection = () => {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.9])

  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 md:px-6 text-center"
        style={{ opacity, scale }}
      >
        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          VOID <span className="text-outline">/</span> STRUCTURE
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Radical architecture for a post-digital world.
        </motion.p>
        
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-xs text-gray-600 font-mono hidden md:block">
        EST. 2024
      </div>
      <div className="absolute top-8 right-8 text-xs text-gray-600 font-mono hidden md:block">
        40°42'46"N 74°00'21"W
      </div>
      <div className="absolute bottom-8 left-8 text-xs text-gray-600 font-mono hidden md:block">
        ARCHITECTURE BUREAU
      </div>
      <div className="absolute bottom-8 right-8 text-xs text-gray-600 font-mono hidden md:block">
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}

// Project Card Component
const ProjectCard = ({ title, category, image, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale-img"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <SafeIcon name="arrow-up-right" size={24} className="text-black" />
          </motion.div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{category}</p>
        </div>
        <span className="text-sm text-gray-400 font-mono">0{index + 1}</span>
      </div>
    </motion.div>
  )
}

// Featured Projects Section (Light Theme)
const FeaturedProjects = () => {
  const projects = [
    {
      title: 'Monolith Tower',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    },
    {
      title: 'Void Gallery',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80',
    },
    {
      title: 'Brutalist Residence',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    },
    {
      title: 'Concrete Cathedral',
      category: 'Institutional',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    },
  ]

  return (
    <section className="min-h-screen bg-white text-black py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter">
            SELECTED WORKS
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl">
            A curated selection of our most ambitious projects, pushing the boundaries of form and function.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Philosophy Section (Dark Theme)
const PhilosophySection = () => {
  const principles = [
    {
      icon: 'layers',
      title: 'Materiality',
      description: 'Raw concrete, exposed steel, and honest materials that age with grace and tell the story of time.',
    },
    {
      icon: 'maximize',
      title: 'Scale',
      description: 'Monumental proportions that challenge human perception and create spaces of contemplation.',
    },
    {
      icon: 'zap',
      title: 'Impact',
      description: 'Architecture that commands attention and reshapes the urban landscape with uncompromising vision.',
    },
  ]

  return (
    <section className="min-h-screen bg-black text-white py-20 md:py-32 flex items-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-8">
              PHILOSOPHY
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-gray-400 leading-relaxed">
              <p>
                We reject the superfluous. In an age of digital excess, we return to the elemental — 
                mass, void, light, and shadow. Our architecture is a manifesto written in concrete and steel.
              </p>
              <p>
                Every structure we conceive is a dialogue between permanence and transience, 
                between the weight of history and the possibilities of tomorrow.
              </p>
            </div>
          </motion.div>
          
          <div className="space-y-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="group flex gap-6 p-6 border border-gray-900 hover:border-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white text-black flex items-center justify-center">
                  <SafeIcon name={principle.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{principle.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section (Light Theme)
const ContactSection = () => {
  return (
    <section className="min-h-[70vh] bg-white text-black py-20 md:py-32 flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-8">
            Start a Project
          </p>
          
          <a 
            href="mailto:hello@voidstructure.com" 
            className="group inline-block"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter break-all"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              HELLO@VOIDSTRUCTURE.COM
            </motion.h2>
          </a>
          
          <div className="mt-16 pt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-sm text-gray-500">
              © 2024 VOID / STRUCTURE. All rights reserved.
            </div>
            
            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-gray-500 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gray-500 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Behance</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main App Component
function App() {
  return (
    <div className="relative">
      <CursorDot />
      
      <main>
        <HeroSection />
        <FeaturedProjects />
        <PhilosophySection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App