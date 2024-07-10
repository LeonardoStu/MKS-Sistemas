"use client"

import Image from 'next/image'
import style from './style.module.scss'
import { Product, useCartStore } from '@/store/useCartStore'
import { FaCircleXmark } from 'react-icons/fa6'

interface CartProps {
    onClose: () => void
}

export function Cart({onClose}: CartProps) {
    const [cart, increaseProductQuantity, decreaseQuantity, removeFromCart, getTotalPrice] = useCartStore((state) => [state.cart, state.increaseQuantity, state.decreaseQuantity, state.removeFromCart, state.getTotalPrice()])

    return(
        <div className={style.cartContainer}>
            <div className={style.header}>
                <h1>Carrinho de Compras</h1>
                <button onClick={onClose} className={style.closeBtn}>
                    <FaCircleXmark style={{width:'100%', height:'50px', color:'black'}}/>
                </button>
            </div>
            <div className={style.content}>
                {
                    cart.length > 0 ? (
                        cart.map((product: Product) => (
                            <div key={product.id} className={style.productContainer}>
                                <div style={{width:'100px'}}>
                                    <Image width={200} height={200} src={product.photo} alt={product.name} className={style.productImg}/>
                                </div>

                                <div style={{fontSize:'20px', width:'100px'}}>
                                    <p>{product.name}</p>
                                </div>

                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <div>
                                        <p style={{fontSize:'12px'}}>Qtd</p>
                                    </div>
                                    <div className={style.btnQuantity}>
                                        <button onClick={() => decreaseQuantity(product.id)} className={style.quantityBtn}>-</button>
                                        <p style={{margin:'0 5px 0 5px'}}>{product.quantity}</p>
                                        <button onClick={() => increaseProductQuantity(product.id)} className={style.quantityBtn}>+</button>
                                    </div>
                                </div>

                                <div style={{fontSize:'25px', marginRight:'45px', fontWeight:'bold'}}>
                                    <p>R${product.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(product.id)} className={style.removeButton}>
                                    <FaCircleXmark />
                                </button>
                            </div>
                        ))
                    ) : (
                        <h1 style={{color:'white', textAlign:'center'}}>Carrinho vazio!</h1>
                    )
                }
            </div>
            <div className={style.footer}>
                <div style={{display:'flex', justifyContent:'space-between', width:'90%', color:'white', alignItems:"center", padding:'10px'}}>
                    <h1>Total:</h1>
                    <p style={{fontSize:'25px', marginRight:'45px', fontWeight:'bold'}}>R${getTotalPrice.toFixed(2)}</p>
                </div>
                <div style={{width:'100%'}}>
                    <button className={style.finishBuy}>Finalizer Compra</button>
                </div>
            </div>
        </div>
    )
}
