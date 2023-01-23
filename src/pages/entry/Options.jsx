import { useEffect, useState } from "react";
import axios from "axios";

import ScoopOption from "./ScoopOption";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data));
  }, [optionType]);

  // TODO: replace with 'ToppingOption' when we've created it
  const ItemComponent = optionType === 'scoops' ? ScoopOption : null

  const optionItems = items.map(item => <ItemComponent key={item.name} {...item} />)

  return <div>{optionItems}</div>;
}

export default Options;
