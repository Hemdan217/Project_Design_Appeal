import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "./Typography";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../store/ContextProvider";
import axios from "axios";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://5.imimg.com/data5/SELLER/Default/2020/8/ZY/RR/VR/20499095/sublimation-all-over-printed-t-shirts.jpg",
    title: "Gave",
    width: "38%",
    path: "/voting", // Path for navigation
  },
  {
    url: "https://static.vecteezy.com/system/resources/previews/025/120/446/non_2x/multi-colored-abstract-pattern-on-fashionable-t-shirt-generated-by-ai-photo.jpg",
    title: "your",
    width: "38%",
    path: "/voting", // Path for navigationurl
  },
  {
    url: "https://t4.ftcdn.net/jpg/07/13/97/53/360_F_713975382_qzXFQBWRMbn5fDJi5jMvVDyRDZA0c36U.jpg",
    title: "voting",
    width: "24%",
    path: "/voting", // Path for navigation
  },
];

export default function ProductCategories() {
  const navigate = useNavigate(); // Hook for navigation
  const { isLoggedIn, userInfo } = useStateContext();
  const [projects, setProjects] = useState([]);
  const handleClick = (path) => {
    navigate(path); // Navigate to the provided path
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `/api/cart/new_project?userId=${userInfo?._id}`
        );

        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h3"
          marked="center"
          align="center"
          component="h2"
          sx={{ textShadow: "2px 2px 4px black", mb: 5, mt: 15 }}
        >
          Your Projects
        </Typography>
        <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
          {projects.map((image) => (
            <ImageIconButton
              key={image.imageDataURL}
              style={{
                width: "24%",
              }}
              onClick={() => handleClick("/myproject/" + image._id)} // Handle click
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  backgroundImage: `url(${image.imageDataURL})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick("/voting/" + image._id); // Handle clickvoting/670f14d0142494dc3f81a82a
                  }}
                >
                  Votes
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          ))}
        </Box>
      </Container>
    </>
  ) : (
    <>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h3"
          marked="center"
          align="center"
          component="h2"
          sx={{ textShadow: "2px 2px 4px black", mb: 5, mt: 15 }}
        >
          Start To Create Own Your Projects
        </Typography>
        <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
          <img
            src="/images/apparel.jpg"
            alt="Signup illustration"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>
      </Container>
    </>
  );
}
