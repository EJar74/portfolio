// pages/index.tsx

import Head from 'next/head'
import Header from './components/Header'
import Main from './components/Main'
import Background from './components/Background'
import AboutSection from './components/About'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Eli Jaramillo</title>
        <meta name="description" content="Portfolio of a Software Engineer & Product Manager" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" sizes="16x16" href="/favicon.ico" />
      </Head>
      <div className="relative min-h-screen">
        <Background /> {/* This should come first to be under other elements */}
        <Header />
        <Main />
        <AboutSection/>
        <ExperienceSection/>
        <ProjectsSection/>
        <ContactSection/>
      </div>
    </>
  )
}