import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/images/gameimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 2, sm: 4 },
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          maxWidth: 700,
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
            mb: 2,
            textShadow: "2px 4px 10px rgba(0,0,0,0.6)",
          }}
        >
          Memory Match Game
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            mb: 4,
            color: "#eaeaea",
            px: { xs: 1, sm: 0 },
          }}
        >
          Flip the cards, test your focus, and see how sharp your memory is!
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/game")}
          sx={{
            px: { xs: 4, sm: 6 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: "1rem", sm: "1.2rem" },
            fontWeight: "bold",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #2196F3, #0D47A1)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #42A5F5, #1565C0)",
              transform: "scale(1.06)",
            },
          }}
        >
          Play Game
        </Button>
      </Box>

      {/* Floating Cartoon Left */}
      <Box
        component="img"
        src="/images/cartoon2.png"
        alt="cartoon"
        sx={{
          position: "absolute",
          width: { xs: 90, sm: 160, md: 220 },
          top: { xs: 20, sm: 50 },
          left: { xs: 10, sm: 40 },
          animation: "floatUp 4s ease-in-out infinite",
          zIndex: 2,
          opacity: 0.95,
        }}
      />

      {/* Floating Cartoon Right */}
      <Box
        component="img"
        src="/images/cartoon1.png"
        alt="cartoon"
        sx={{
          position: "absolute",
          width: { xs: 90, sm: 160, md: 220 },
          bottom: { xs: 30, sm: 60 },
          right: { xs: 10, sm: 40 },
          animation: "floatDown 4s ease-in-out infinite",
          zIndex: 2,
          opacity: 0.95,
        }}
      />

      {/* Animations */}
      <style>
        {`
          @keyframes floatUp {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
          }
          @keyframes floatDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(14px); }
          }
        `}
      </style>
    </Box>
  );
};

export default Landingpage;
