import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(null);
  const [cardSize, setCardSize] = useState(100);
  const flipSound = useRef(null);
  const matchSound = useRef(null);
  const winSound = useRef(null);

  // Load best score for selected grid size
  useEffect(() => {
    const savedBest = localStorage.getItem(`bestScore_${gridSize}`);
    setBestScore(savedBest ? parseInt(savedBest) : null);
  }, [gridSize]);

  const playSound = (soundRef) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }
  };

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 6) setGridSize(size);
  };

  const initializeGame = () => {
    const total = gridSize * gridSize;
    const pairCount = Math.floor(total / 2);
    const nums = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffled = [...nums, ...nums]
      .sort(() => Math.random() - 0.5)
      .slice(0, total)
      .map((num, i) => ({ id: i, num }));

    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].num === cards[secondId].num) {
      playSound(matchSound);
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;
    playSound(flipSound);

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        setMoves((m) => m + 1);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

  //  Check win condition + save per-grid best score
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      playSound(winSound);

      const key = `bestScore_${gridSize}`;
      if (!bestScore || moves < bestScore) {
        localStorage.setItem(key, moves);
        setBestScore(moves);
      }
    }
  }, [solved]);

  const comparisonMessage =
    bestScore && !won
      ? moves < bestScore
        ? ` You're ${bestScore - moves} moves ahead of your best for ${gridSize}*${gridSize}!`
        : moves > bestScore
        ? ` You're ${moves - bestScore} moves behind your best for ${gridSize}*${gridSize}.`
        : ` You're matching your best score for ${gridSize}*${gridSize}!`
      : "";
  const navigate = useNavigate();
 

useEffect(() => {
  const updateCardSize = () => {
    const size = Math.min(
      window.innerHeight / gridSize - 20,
      window.innerWidth / gridSize - 20,
      120
    );
    setCardSize(size);
  };

  updateCardSize();
  window.addEventListener("resize", updateCardSize);

  return () => window.removeEventListener("resize", updateCardSize);
}, [gridSize]);


  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f1fd50ff 0%, #eaf02cff 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },

        alignItems: "center",
        justifyContent: "center",
        // p: 3,
        gap: 4,
      }}
    >
      {/* Info Section */}
      <Box textAlign="center">

        <Typography
  variant="h3"
  sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
>
  Memory Game
</Typography>


        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
          <Typography variant="body1">Grid Size:</Typography>
         <TextField
  select
  value={gridSize}
  onChange={handleGridSizeChange}
  size="small"
>
  {[2,3,4,5,6].map(size => (
    <MenuItem key={size} value={size}>
      {size} × {size}
    </MenuItem>
  ))}
</TextField>
        </Stack>

        <Typography variant="h6" color="#2196f3">
          Moves: {moves}
        </Typography>
        <Typography variant="h6" color="#4caf50" mb={1}>
          Best {bestScore ?? ":"}
        </Typography>

        {comparisonMessage && (
          <Typography variant="body2" color="#555" mb={2} fontStyle="italic">
            {comparisonMessage}
          </Typography>
        )}

        {won && (
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: moves <= bestScore ? "#2e7d32" : "#ff5722",
              animation: "bounce 1s infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-8px)" },
              },
            }}
          >
            {moves <= bestScore
              ? " New High Score!"
              : " You Won! Try Again!"}
          </Typography>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={initializeGame}
          sx={{
            px: 4,
            py: 1,
            fontWeight: "bold",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
            color: "#333",
            "&:hover": {
              background: "linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)",
            },
          }}
        >
          {won ? "Play Again" : "Reset"}
        </Button>
                <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)} 
          sx={{
            ml: 2,
            px: 4,
            py: 1,
            fontWeight: "bold",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
            color: "#333",
            "&:hover": {
              background: "linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)",
            },
          }}
        >
          Back
        </Button>

      </Box>

      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, ${cardSize}px)`,
    gap: "10px",
    justifyContent: "center",
    alignContent: "center",
    maxWidth: "100vw",
    overflowX: "auto",
    pb: 2,
  }}
>

        {cards.map((card) => {
          const flippedOrSolved = isFlipped(card.id);
          const solvedFlag = solved.includes(card.id);
          return (
<Paper
  key={card.id}
  onClick={() => handleClick(card.id)}
  elevation={4}
  sx={{
    width: `${cardSize}px`,
    height: `${cardSize}px`,
    position: "relative",
    borderRadius: 1.2,
    cursor: disabled || solvedFlag ? "default" : "pointer",
    transformStyle: "preserve-3d",
    transform: flippedOrSolved ? "rotateY(-180deg)" : "rotateY(0deg)",
    transition: "transform 0.4s ease",
  }}
>
  {/* Front Face */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
      borderRadius: 1.2,
      fontSize: Math.max(18, Math.floor(cardSize * 0.3)),
      fontWeight: "bold",
      color: "#fff",
      background: "linear-gradient(135deg, #bbb 0%, #999 100%)",
    }}
  >
    ?
  </Box>

  {/* Back Face */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)", // counter-rotate text
      borderRadius: 1.2,
      fontSize: Math.max(18, Math.floor(cardSize * 0.3)),
      fontWeight: "bold",
      color: "#fff",
      background: solvedFlag
        ? "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)"
        : "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
    }}
  >
    {card.num}
  </Box>
</Paper>

          );
        })}
      </Box>



      {/* Sounds */}
      <audio ref={flipSound} src="/sounds/flip.mp3" />
      <audio ref={matchSound} src="/sounds/match.mp3" />
      <audio ref={winSound} src="/sounds/win.mp3" />
    </Box>
  );
};

export default MemoryGame;
