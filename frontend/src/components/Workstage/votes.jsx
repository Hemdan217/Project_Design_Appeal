import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThumbUp } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const VotingPage = () => {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [project, setProject] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/cart/new_project/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get("/api/votes/g");
        setVotes(response.data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVotes();
  }, []);

  const handleVote = async (imageURL) => {
    try {
      await axios.post("/api/votes/v", { imageURL });
      // Refresh votes after voting
      const response = await axios.get("/api/votes/g");
      setVotes(response.data);
    } catch (error) {
      console.error("Error voting for design:", error);
    }
  };
  const handleVoteProject = async () => {
    try {
      const newItem = {
        ...project,
        _id: project._id,
        vote: project.vote + 1,
      };
      await axios.patch(`/api/cart/new_project/${id}`, newItem);
      setProject(newItem);
      // Refresh votes after voting
    } catch (error) {
      console.error("Error voting for design:", error);
    }
  };

  const handleClickImage = (imageURL) => {
    setSelectedImage(imageURL);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Voting Results
        </Typography>
        {!id && votes.length === 0 ? (
          <Typography variant="body1">No votes yet.</Typography>
        ) : (
          !id && (
            <Box>
              {votes.map((vote) => (
                <Card key={vote._id} sx={{ display: "flex", mb: 2, p: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, mr: 2 }}
                    image={vote.imageURL}
                    alt="Apparel Design"
                    onClick={() => handleClickImage(vote.imageURL)}
                  />
                  <CardContent>
                    <Typography variant="h6">
                      Votes: {vote.votes}
                      <IconButton
                        color="primary"
                        onClick={() => handleVote(vote.imageURL)}
                        sx={{ ml: 1 }}
                      >
                        <ThumbUp />
                      </IconButton>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )
        )}
      </Box>
      {id && (
        <Box sx={{ py: 4 }}>
          <Card sx={{ display: "flex", mb: 2, p: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, mr: 2 }}
              image={project.imageDataURL}
              alt="Apparel Design"
              onClick={() => handleClickImage(project.imageDataURL)}
            />
            <CardContent>
              <Typography variant="h6">
                Votes: {project.vote}
                <IconButton
                  color="primary"
                  onClick={() => handleVoteProject(project.imageDataURL)}
                  sx={{ ml: 1 }}
                >
                  <ThumbUp />
                </IconButton>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Design</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Design"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VotingPage;
