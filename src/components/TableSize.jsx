import React from "react";
import { Box, Typography } from "@mui/material";
import Image1 from "../../src/assets/table/image1.png";
import Image2 from "../../src/assets/table/image2.png";
import Image3 from "../../src/assets/table/image3.png";
import Image4 from "../../src/assets/table/image4.png";

function TableSize() {
  return (
    <Box
      width="80%"
      m="80px auto"
      flexWrap="wrap"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb="10px">
        <Typography
          variant="h3"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Таблиця розмірів одягу
        </Typography>
        <Box>
          <img alt="table" width="100%" height="100%" src={Image1} />
        </Box>
      </Box>
      <Box mb="10px">
        <Typography
          variant="h3"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Таблиця розмірів футболки
        </Typography>
        <Box>
          <img alt="table" width="100%" height="100%" src={Image2} />
        </Box>
      </Box>
      <Box mb="10px">
        <Typography
          variant="h3"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Таблиця розмірів худі
        </Typography>
        <Box>
          <img alt="table" width="100%" height="100%" src={Image3} />
        </Box>
      </Box>
      <Box mb="10px">
        <Typography
          variant="h3"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Таблиця розмірів штани
        </Typography>
        <Box>
          <img alt="table" width="100%" height="100%" src={Image4} />
        </Box>
      </Box>
    </Box>
  );
}

export default TableSize;
