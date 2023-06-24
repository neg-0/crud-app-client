import { useParams } from "react-router-dom";

export default function ViewItem() {

  const { itemId } = useParams();

  return (<>{itemId}</>)
}