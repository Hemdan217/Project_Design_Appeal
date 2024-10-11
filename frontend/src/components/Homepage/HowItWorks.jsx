import React from "react";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush, // Design Creation
  faUsers, // Community Voting
  faCheckCircle, // Finalize Design Based on Votes
  faShoppingCart, // Order Placement
  faTruck, // Production and Delivery
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <FontAwesomeIcon icon={faPaintBrush} />,
    2: <FontAwesomeIcon icon={faUsers} />,
    3: <FontAwesomeIcon icon={faCheckCircle} />,
    4: <FontAwesomeIcon icon={faShoppingCart} />,
    5: <FontAwesomeIcon icon={faTruck} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Design Creation",
  "Community Voting",
  "Finalize Design Based on Votes",
  "Order Placement",
  "Production and Delivery",
];

const descriptions = [
  "Create designs using customization tools.",
  "Share voting link with community.",
  "Select design based on votes.",
  "Members order and pay online.",
  "Produce and deliver final apparel",
];

function HowWeWorkSection() {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff", // Changed background color to white
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, color: "#333", fontWeight: "bold" }}
        >
          How We Work
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={4}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {descriptions[index]}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
}

export default HowWeWorkSection;
