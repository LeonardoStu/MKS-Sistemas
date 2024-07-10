import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import style from './style.module.scss'

interface ToastProps {
    message: string,
    show: boolean
}

export default function Toast ({ message, show }: ToastProps) {
    const [isVisible, setIsVisible] = useState(show)

    useEffect(() => {
        if (show) {
            setIsVisible(true)
            const timer = setTimeout(() => {
                setIsVisible(false)
            }, 3000) 
            return () => clearTimeout(timer)
        }
    }, [show])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className={style.toast}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
