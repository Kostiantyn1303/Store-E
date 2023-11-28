import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";
const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [sizes, setSizes] = useState("");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeSelect = (event) => {
    setSizes(event.target.value);
  };

  async function getItem() {
    const item = await fetch(`http://localhost:3001/items/${itemId}`, {
      method: "GET",
    });
    const itemJson = await item.json();
    setItem(itemJson);
  }

  async function getItems() {
    const items = await fetch(`http://localhost:3001/items`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    setItems(itemsJson);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={item?.image}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>{item?.price} грн</Typography>
            <Typography sx={{ mt: "20px" }}>{item?.description}</Typography>
          </Box>
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "gray",
                },
              }}
              onClick={() => {
                if (sizes) {
                  dispatch(addToCart({ item: { ...item, count, sizes } }));
                } else {
                  Notiflix.Notify.info("Оберіть розмір!");
                }
              }}
            >
              ДОБАВИТИ В КОРЗИНУ
            </Button>
          </Box>
          <Typography mt="20px" mb="20px">
            Оберіть розмір
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Розмір</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sizes}
                label="Age"
                onChange={handleChangeSelect}
              >
                <MenuItem value={"S"}>S</MenuItem>
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"XL"}>XL</MenuItem>
                <MenuItem value={"XXL"}>XXL</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography mt="25px">КАТЕГОРІЇ: {item?.category}</Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: "#222222",
              color: "white",
              borderRadius: 0,
              minWidth: "150px",
              padding: "10px 40px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={() => navigate(`/client/table`)}
          >
            Сітка розмірів
          </Button>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="ОПИС" value="description" />
          <Tab label="ВІДГУКИ" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && <div>{item?.description}</div>}
        {value === "reviews" && <div>Огляд</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          РЕКОМЕНДОВАНІ ПРОДУКТИ
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
