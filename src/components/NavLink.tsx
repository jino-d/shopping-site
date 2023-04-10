import {
  Typography,
} from "@material-tailwind/react";
export default function NavLink (props:any) {
  return (
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="font-normal rounded-lg px-3 py-2"
    >
    <a href={props?.url} className="flex items-center hover:text-blue-gray-400">
      {props?.page}
    </a>
  </Typography>
  )
}