import { Box } from "@mui/material";

interface InventoryItemProps {
  item: InventoryItemData
}

export declare interface InventoryItemData {
  id: number,
  item_name: string,
  description: string,
  quantity: number,
  user_id: number
}

export default function InventoryItem({item}: InventoryItemProps) {
  return (
    <><Box>{item.item_name}</Box></>
  )
}