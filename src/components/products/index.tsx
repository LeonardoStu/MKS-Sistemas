"use client"

import style from './style.module.scss'
import Image from 'next/image'
import Toast from '../toast'
import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from 'react'
import { FaBagShopping } from 'react-icons/fa6'
import { Product, useCartStore } from '@/store/useCartStore'

export default function Products() {
    const [toast, setToast] = useState(false)

    const fetchProduct = async() => {
        const response = await api.get('/products?page=1&rows=8&sortBy=id&orderBy=ASC')
        return response.data.products
    } 
    
    const { data: products, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProduct
    })

    const addToCart = useCartStore((state) => state.addToCart)

    const handleAddToCart = (products: Product) => {
        addToCart(products)
        setToast(true)
    }

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(false)
            }, 3000) 
            return () => clearTimeout(timer)
        }
    }, [toast])

    if(isLoading) return <p>Carregando...</p> 
    if(error) return <p>Erro ao carregar produtos: {error.message}</p>

    return<>
        <div className={style.main}>
            <div className={style.container}>
                {
                    products.length > 0 ? (
                        products.map((product: any) => (
                            <div key={product.id} className={style.containerProduct}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                    <Image width={200} height={200} src={product.photo} alt={product.name} className={style.imgProduct}/>
                                </div>

                                <div className={style.textProduct}>
                                    <p style={{fontSize: '20.5px'}}>{product.name}</p>
                                    <p className={style.price}>R${product.price}</p>
                                </div>

                                <div className={style.descriptionProduct}>
                                    <p>{product.description}</p>
                                </div>
                                <button className={style.btnBuy} onClick={() => handleAddToCart(product)}>
                                    <FaBagShopping style={{width: '15px', height: '15px'}} /> <span style={{paddingLeft:'5px'}}>COMPRAR</span>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Sem produtos adicionados</p>
                    )
                }
            </div>
            <Toast message='Adicionado ao Carrinho' show={toast} />
        </div>
    </>
}