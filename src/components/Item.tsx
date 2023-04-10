
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type ItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

export function Item({id, name, price, imgUrl,}: ItemProps) {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getItemQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="m-5 max-w-[300px] max-h-[470px] hover:shadow-lg hover:shadow-gray-400 transition ease-in-out delay-100 duration-300 hover:cursor-pointer">
      <CardHeader className="relative h-56">
        <img
          src={imgUrl}
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {name}
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to "Naviglio" where you can enjoy the main night life in
          Barcelona.
        </Typography>
      </CardBody>
      {
        quantity > 0 ?
        <Button variant="text" size="sm" color="red" className="w-full" onClick={() => removeFromCart(id)}>
          Remove
        </Button>
        : <></>
      }
      <CardFooter divider className="py-3">
        <div className="flex items-center justify-between ">
          <Typography variant="small">{formatCurrency(price)}</Typography>
          {
            quantity > 0 ? 
            <div className="flex w-max gap-3 justify-items-center">
              <Button variant="gradient" size="sm" color="green" onClick={() => increaseCartQuantity(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </Button>
              <Typography className="pt-1">{quantity}</Typography>
              <Button variant="gradient" size="sm" color="red" onClick={() => decreaseCartQuantity(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                </svg>
              </Button>


            </div> : 
            <Button size="sm" className="flex justify-items-center" color="green" onClick={() => increaseCartQuantity(id)}>
              <p className="pr-2">Add to Cart</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-4">
                <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </Button>
          }
        </div>
      </CardFooter>
    </Card>
  )
}
