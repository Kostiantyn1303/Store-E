import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
function ShoppingList() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getItems() {
    const items = await fetch("http://localhost:3001/items", {
      method: "GET",
    });
    const itemJson = await items.json();
    dispatch(setItems(itemJson));
  }

  useEffect(() => {
    getItems();
  }, []);

  const Hudi = items?.filter((item) => item.category === "Куртки та худі");
  const Pants = items?.filter((item) => item.category === "Штани");
  const Shoze = items?.filter((item) => item.category === "Взуття");
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Наші Рекомендовані Продукти
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Все" value="all" />
        <Tab label="Штани" value="Pants" />
        <Tab label="Взуття" value="Shoze" />
        <Tab label="Куртки та худі" value="Hudi" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items?.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "Pants" &&
          Pants.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "Shoze" &&
          Shoze.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
        {value === "Hudi" &&
          Hudi.map((item) => (
            <Item item={item} key={`${item.name}-${item._id}`} />
          ))}
      </Box>
    </Box>
  );
}

export default ShoppingList;
