'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface RevealOnScrollProps {
    children: ReactNode
    delay?: number
}

const RevealOnScroll = ({ children, delay = 0 }: RevealOnScrollProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay,
            }}
            className='grid'
        >
            {children}
        </motion.div>
    )
}

export default RevealOnScroll
