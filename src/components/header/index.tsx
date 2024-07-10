"use client"

import style from './style.module.scss'
import { Cart } from '../cart'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useCartStore } from '@/store/useCartStore'

export default function Header() {
    const [isVisible, setisVisible] = useState(false)
    const cart = useCartStore(state => state.cart)

    const toggleCart = () => {
        setisVisible(!isVisible)
    }

    const cartVariants = {
        hidden: {x: '100%'},
        visible: {x: 0}
    }

    return<>
        <div className={style.header}>
            <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                <h1 style={{fontSize: '45px'}}>MKS</h1>
                <span style={{paddingLeft: '10px', fontSize: '20px'}}>Sistemas</span>
            </div>
            <div>
                <button className={style.btnCart} onClick={toggleCart}>
                    <FaCartShopping className={style.iconCart}/> <p style={{fontSize: '20px', paddingLeft: '15px'}}>{cart.length}</p>
                </button>
            </div>
        </div>
        <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={cartVariants}
        transition={{ type: 'spring', stiffness: 100 }}
        className={style.cartContainer}
        >
            {isVisible && <Cart onClose={toggleCart}/>}
        </motion.div>
    </>
}