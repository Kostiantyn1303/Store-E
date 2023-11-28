import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import NovaPoshtaForm from "./Delivery";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate = useNavigate();

  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Способи оплати
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: shades.primary[200],
              boxShadow: "none",
              color: "white",
              borderRadius: 0,
              padding: "15px 40px",
            }}
          >
            Оплатити в один клік
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: shades.primary[200],
              boxShadow: "none",
              color: "white",
              borderRadius: 0,
              padding: "15px 40px",
            }}
            onClick={() => navigate(`delivery`)}
          >
            Оплата наложеним платижем
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
