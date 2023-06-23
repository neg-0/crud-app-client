import axios from 'axios';
import { useEffect, useState } from "react";
import InventoryItem, { InventoryItemData } from "./InventoryItem";

export default function InventoryList() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemData[] | null>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/items')
    .then(res => {
      console.log(res)
      return res.data;
    })
    .then(data => setInventoryItems(data as InventoryItemData[]))
  }, [])

  if (!inventoryItems) return null;
  return (
    <>
    {inventoryItems.map((item, index) => 
      <InventoryItem key={index} item={item}></InventoryItem>)
    }</>)
  
}