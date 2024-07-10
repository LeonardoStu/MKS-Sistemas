"use client"

import style from './style.module.scss'
import { api } from "@/api"
import { useQuery } from "@tanstack/react-query"
import Image from 'next/image'

export default function Products() {
    const fetchProduct = async() => {
        const response = await api.get('/products?page=1&rows=8&sortBy=id&orderBy=ASC')
        return response.data.products
    } 
    
    const { data: products, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProduct
    })

    if(isLoading) return <p>Carregando...</p>
    if(error) return <p>Erro ao carregar produtos: {error.message}</p>

    return<>
        <div>
            {
                products.length > 0 ? (
                    products.map((product: any) => (
                        <div key={product.id} className={style.container}>
                            <div className={style.imgProduct}>
                                <Image width={100} height={100} src={product.photo} alt={product.name} />
                            </div>

                            <div className={style.textProduct}>
                                <p className={style.name}>{product.name}</p>
                                <p className={style.price}>R${product.price}</p>
                            </div>

                            <div className={style.descriptionProduct}>
                                <p className={style.description}>{product.description}</p>
                            </div>
                            <button>COMPRAR</button>
                        </div>
                    ))
                ) : (
                    <p>Sem produtos adicionados</p>
                )
            }
        </div>
    </>
}