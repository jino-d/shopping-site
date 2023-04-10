import { useMemo } from 'react';
import storeItems from '../data/data.json'
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type CartItemProps = {
  id: number;
  quantity: number;
}

export function CartItem({id, quantity}: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = useMemo(() => {
    return storeItems.items.find(i => i.id === id);
  }, [])
  const totalPrice = useMemo(() => {
    return (item?.price || 0) * quantity
  }, [quantity])
  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item?.imgUrl}
          alt={''}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{item?.name}</a>
            </h3>
            <p className="ml-4">{formatCurrency(totalPrice)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{formatCurrency(item?.price || 0)}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}