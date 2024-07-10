"use client"

import style from './style.module.scss'
import { FaCartShopping } from 'react-icons/fa6'

export default function Header() {
    return<>
        <div className={style.header}>
            <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                <h1 style={{fontSize: '45px'}}>MKS</h1>
                <span style={{paddingLeft: '10px', fontSize: '20px'}}>Sistemas</span>
            </div>
            <div>
                <button className={style.btnCart}>
                    <FaCartShopping className={style.iconCart}/> <p style={{fontSize: '20px', paddingLeft: '15px'}}>0</p>
                </button>
            </div>
        </div>
    </>
}