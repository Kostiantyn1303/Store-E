import { useState } from "react";

import { Box, Typography, useTheme, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const { category, price, name, image, imageBig, _id } = item;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={name}
          width="300px"
          height="350px"
          src={image}
          onClick={() => navigate(`/client/item/${_id}`)}
          style={{
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            borderRadius: "4px",
            boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0.2, 0.5)" : "none",
          }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="center">
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
              onClick={() => navigate(`/client/item/${_id}`)}
            >
              Деталі
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="15px">
        {" "}
        <Typography textAlign="center">{name}</Typography>
        <Typography fontWeight="bold" textAlign="center" fontSize="16px">
          {price} грн
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
