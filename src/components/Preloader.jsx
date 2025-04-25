import { useEffect, useState } from "react"

/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
/* eslint-enable no-unused-vars */

function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0)

  const greetings = [
    "ආයුබෝවන්", // Ayubowan in Sinhala (Sri Lanka)
    "• Hello",
    "• Hola",
    "• Bonjour",
    "• こんにちは",
    "• 你好",
    "• Ciao",
    "• Olá",
  ]

  // Add a fixed 3-second timer to close the splash screen
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        onComplete()
      }
    }, 4000) // 4 seconds

    return () => clearTimeout(splashTimer)
  }, [onComplete])

  useEffect(() => {
    // If we've shown all greetings, complete the splash screen
    if (currentGreetingIndex >= greetings.length) {
      setIsVisible(false)
      if (onComplete) {
        onComplete()
      }
      return
    }

    // Move to next greeting after delay
    const timer = setTimeout(() => {
      setCurrentGreetingIndex((prevIndex) => prevIndex + 1)
    }, 400)

    return () => clearTimeout(timer)
  }, [currentGreetingIndex, greetings.length, onComplete])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <AnimatePresence mode="wait">
          {currentGreetingIndex < greetings.length && (
            <motion.div
              key={currentGreetingIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute'
              }}
            >
              <h1 style={{ 
                color: 'yellow', 
                fontSize: '4rem', 
                fontWeight: 'bold',
                margin: 0,
                padding: 0,
                textAlign: 'center'
              }}>
                {greetings[currentGreetingIndex]}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SplashScreen