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
    removeFromCart: (productId: number) => void,
    increaseQuantity: (productId: number) => void,
    decreaseQuantity: (productId: number) => void
    getTotalPrice: () => number,
}

export const useCartStore = create<CartStore>((set, get) => ({
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
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((product) => product.id !== productId)
    })),
    increaseQuantity: (productId) => set((state) => ({
        cart: state.cart.map((product) => 
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        )
    })),
    decreaseQuantity: (productId) => set((state) => {
            const updatedCart = state.cart.map((product) => {
                if (product.id === productId) {
                    const newQuantity = product.quantity - 1;
                    if (newQuantity > 0) {
                        return { ...product, quantity: newQuantity };
                    } else {
                        return null;
                    }
                }
                return product;
            }).filter((product) => product !== null);
    
            return { cart: updatedCart };
    }),
    getTotalPrice: () => {
        const { cart } = get()
        return cart.reduce((total, product) => total + product.price * product.quantity, 0)
    }
}))