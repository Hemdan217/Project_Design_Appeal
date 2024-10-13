import { Global, css } from "@emotion/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import ApparelSelector from "../components/ApparelSelector/ApparelSelector";
import DesignNavBar from "../components/DesignNavBar/DesignNavBar";
import ItemsBar from "../components/ItemsBar/ItemsBar";
import Workstage from "../components/Workstage/Workstage";
import "./EditSpace.css";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.primary,
  boxShadow: "none",
}));

const EditSpace = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [imageDataURL, setImageDataURL] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [selectedApparel, setSelectedApparel] = useState({
    type: "Tshirt",
    size: "",
  });
  const [color, setColor] = useState("#ffffff");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [materialPrice, setMaterialPrice] = useState(0);
  const [materialName, setMaterialName] = useState("");

  // Undo/Redo history management
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const navbarRef = useRef(null);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, [navbarRef]);

  const handleApparelSelect = (apparel) => {
    pushToUndoStack();
    setSelectedApparel(apparel);
  };

  const handleMaterialSelect = (material) => {
    pushToUndoStack();
    setMaterialPrice(material.price);
    setMaterialName(material.name);
  };

  const handleFinalImageReady = (dataUrl) => {
    setImageDataURL(dataUrl);
    const newItem = {
      selectedApparel,
      color,
      text,
      image,
      materialPrice,
      materialName,
    };
    setCartItem(newItem);
  };

  // Push current state to the undo stack
  const pushToUndoStack = () => {
    const currentState = {
      selectedApparel,
      color,
      text,
      image,
      materialPrice,
      materialName,
    };
    setUndoStack((prev) => [...prev, currentState]);
    setRedoStack([]); // Clear redo stack on new action
  };

  // Undo action
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setRedoStack((prev) => [
        ...prev,
        { selectedApparel, color, text, image, materialPrice, materialName },
      ]);
      setSelectedApparel(previousState.selectedApparel);
      setColor(previousState.color);
      setText(previousState.text);
      setImage(previousState.image);
      setMaterialPrice(previousState.materialPrice);
      setMaterialName(previousState.materialName);
      setUndoStack((prev) => prev.slice(0, -1));
    }
  };

  // Redo action
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack((prev) => [
        ...prev,
        { selectedApparel, color, text, image, materialPrice, materialName },
      ]);
      setSelectedApparel(nextState.selectedApparel);
      setColor(nextState.color);
      setText(nextState.text);
      setImage(nextState.image);
      setMaterialPrice(nextState.materialPrice);
      setMaterialName(nextState.materialName);
      setRedoStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      <div className="editspace">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} ref={navbarRef}>
              <Item>
                <DesignNavBar />
                <div className="history-controls">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, me: 1 }}
                    onClick={handleUndo}
                    disabled={undoStack.length === 0}
                    style={{ marginRight: "10px" }}
                  >
                    Undo
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleRedo}
                    disabled={redoStack.length === 0}
                  >
                    Redo
                  </Button>
                </div>
              </Item>
            </Grid>
            <Grid item xs={isSidebarOpen ? 4 : 1}>
              <Item>
                <ItemsBar
                  onToggleSidebar={toggleSidebar}
                  onColorChange={(newColor) => {
                    pushToUndoStack();
                    setColor(newColor);
                  }}
                  onTextChange={(newText) => {
                    pushToUndoStack();
                    setText(newText);
                  }}
                  onImageUpload={(newImage) => {
                    pushToUndoStack();
                    setImage(newImage);
                  }}
                  onMaterialSelect={handleMaterialSelect}
                />
              </Item>
            </Grid>
            <Grid item xs={isSidebarOpen ? 6 : 11}>
              <Item>
                <Workstage
                  selectedApparel={selectedApparel}
                  setSelectedApparel={setSelectedApparel}
                  color={color}
                  setColor={setColor}
                  text={text}
                  setText={setText}
                  image={image}
                  setImage={setImage}
                  materialPrice={materialPrice}
                  setMaterialPrice={setMaterialPrice}
                  materialName={materialName}
                  setMaterialName={setMaterialName}
                  onFinalImageReady={handleFinalImageReady}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <ApparelSelector
        onApparelSelect={handleApparelSelect}
        selectedOptions={selectedApparel}
        setSelectedOptions={setSelectedApparel}
        handleConfirm={handleApparelSelect}
      />
      <Global
        styles={css`
          .sidebar {
            height: calc(100vh - ${navbarHeight}px);
            overflow-y: auto;
            background-color: ${grey[300]};
          }
        `}
      />
    </>
  );
};

export default EditSpace;
