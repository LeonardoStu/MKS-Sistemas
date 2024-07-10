import create from 'zustand'

export interface Product {
    id: number,
    name: string,
    price: number,
    photo: string,
    quantity: number
}

interface CartStore {
    cart: Product[],
    addToCart: (product: Product) => void,
    removeToCart: (productId: number) => void,
    increaseQuantity: (productId: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find(item => item.id === product.id);
        if (existingProduct) {
            return {
                cart: state.cart.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            };
        } else {
            return {
                cart: [...state.cart, { ...product, quantity: 1 }]
            };
        }
    }),
    removeToCart: (productId) => set((state) => ({
        cart: state.cart.filter((product) => product.id !== productId)
    })),
    increaseQuantity: (productId) => set((state) => ({
        cart: state.cart.map((product) => 
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        )
    }))
}))