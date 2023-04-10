import { createContext, ReactNode, useContext, useState, useMemo, useCallback } from "react";
import ShoppingCart from "../components/ShoppingCart";
import storeItems from '../data/data.json'
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number,
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartSubTotal: number;
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const cartQuantity = useMemo(() => {
    return cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
  },[cartItems])

  const cartSubTotal = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      const item = (storeItems.items.find(i => i.id == cartItem.id))
      return total + (item?.price || 0) * cartItem.quantity
    }, 0)
  },[cartItems])


  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = useCallback((id) => {
    return cartItems.find(item=> item.id === id)?.quantity || 0
  }, [cartItems])

  function increaseCartQuantity(id: number) {
    setCartItems(currentItems => {
      const currentItem = currentItems.find(item=> item.id === id)
      if (!currentItem) {
        return [...currentItems, {id, quantity: 1}]
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }
          else{
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currentItems => {
      const currentItem = currentItems.find(item=> item.id === id)
      if (currentItem?.quantity === 1) {
        return currentItems.filter(item=> item.id !== id)
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          else{
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currentItems => {
      return currentItems.filter(item=> item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        cartSubTotal,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} setIsOpen={setIsOpen} />
    </ShoppingCartContext.Provider>
  )
}
