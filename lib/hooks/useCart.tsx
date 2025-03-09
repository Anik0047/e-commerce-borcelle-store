import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
    item: ProductType;
    quantity: number;
    color?: string; // ? means optional
    size?: string; // ? means optional
}

interface CartStore {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (idToRemove: string) => void;
    increaseQuantity: (idToIncrease: string) => void;
    decreaseQuantity: (idToDecrease: string) => void;
    updateQuantity: (idToUpdate: string, newQuantity: number) => void; // ✅ Add this
    clearCart: () => void;
}


const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            cartItems: [],
            addItem: (data: CartItem) => {
                const { item, quantity, color, size } = data;
                const currentItems = get().cartItems; // all the items already in cart
                const isExisting = currentItems.find(
                    (cartItem) => cartItem.item._id === item._id
                );

                if (isExisting) {
                    return toast("Item already in cart");
                }

                set({ cartItems: [...currentItems, { item, quantity, color, size }] });
                toast.success("Item added to cart", { icon: "🛒" });
            },
            removeItem: (idToRemove: String) => {
                const newCartItems = get().cartItems.filter(
                    (cartItem) => cartItem.item._id !== idToRemove
                );
                set({ cartItems: newCartItems });
                toast.success("Item removed from cart");
            },
            increaseQuantity: (idToIncrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === idToIncrease
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity increased");
            },
            decreaseQuantity: (idToDecrease: String) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === idToDecrease
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
                set({ cartItems: newCartItems });
                toast.success("Item quantity decreased");
            },
            updateQuantity: (idToUpdate: string, newQuantity: number) => {
                const newCartItems = get().cartItems.map((cartItem) =>
                    cartItem.item._id === idToUpdate
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                );
                set({ cartItems: newCartItems });
            },

            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;