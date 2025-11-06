import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundImage: "url('/images/gameimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
 

      {/* Main Content */}
      <Box sx={{ position: "relative", zIndex: 2, color: "#fff", p: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            mb: 2,
          }}
        >
          Memory Match Game
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 600,
            mx: "auto",
            mb: 4,
            color: "#f0f0f0",
          }}
        >
          Flip the cards, test your focus, and see how sharp your memory is!
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/game")}
          sx={{
            px: 5,
            py: 2,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "30px",
            background: "linear-gradient(90deg, #2196F3, #0D47A1)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #42A5F5, #1565C0)",
              transform: "scale(1.05)",
            },
          }}
        >
          Play Game
        </Button>
      </Box>

      {/* Floating Cartoon Images */}
      <Box
        component="img"
        src="/images/cartoon2.png"
        alt="Cartoon 1"
        sx={{
          position: "absolute",
          width: { xs: 100, sm: 220 },
          top: { xs: 20, sm: 40 },
          left: { xs: 20, sm: 60 },
          animation: "floatY 4s ease-in-out infinite",
          zIndex: 2,
        }}
      />

      <Box
        component="img"
        src="/images/cartoon1.png"
        alt="Cartoon 2"
        sx={{
          position: "absolute",
          width: {xs: 100, sm: 220  },
          bottom: { xs: 30, sm: 60 },
          right: { xs: 20, sm: 60 },
          animation: "floatYReverse 4s ease-in-out infinite",
          zIndex: 2,
        }}
      />

      {/* Floating Animation Keyframes */}
      <style>
        {`
          @keyframes floatY {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes floatYReverse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(15px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Landingpage;
