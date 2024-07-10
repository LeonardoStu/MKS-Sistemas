"use client"

import Image from 'next/image'
import style from './style.module.scss'
import { Product, useCartStore } from '@/store/useCartStore'
import { FaCircleXmark } from 'react-icons/fa6'

export function Cart() {
    const [cart, increaseProductQuantity, decreaseQuantity, removeFromCart, getTotalPrice] = useCartStore((state) => [state.cart, state.increaseQuantity, state.decreaseQuantity, state.removeFromCart, state.getTotalPrice()])

    return<>
        <div className={style.container}>
            {
                cart.length > 0 ? (
                    cart.map((product: Product) => (
                        <div key={product.id} className={style.productContainer}>
                            <div>
                                <Image width={50} height={50} src={product.photo} alt={product.name} className={style.productImg}/>
                            </div>

                            <div>
                                <p>{product.name}</p>
                            </div>

                            <div>
                                <p>Qtd</p>
                                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                <p>{product.quantity}</p>
                                <button onClick={() => increaseProductQuantity(product.id)}>+</button>
                            </div>

                            <div>
                                <p>R${product.price}</p>
                            </div>
                            <button onClick={() => removeFromCart(product.id)}>
                                <FaCircleXmark />
                            </button>
                        </div>
                    ))
                ) : (
                    <h1>Carrinho vazio!</h1>
                )
            }

            <h1>Total do carrinho {getTotalPrice.toFixed(2)}</h1>
        </div>
    </>
}