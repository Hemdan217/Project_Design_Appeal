import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Rating,
  Pagination,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import ResponsiveAppBar from "../Homepage/HomeAppbar";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.2)",
  },
}));

const UserNameTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

const ReviewTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const RatingTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
}));

const ApprovedReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reviews/approved"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching approved reviews:", error);
      }
    };

    fetchApprovedReviews();
  }, []);

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <ResponsiveAppBar />

      <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          align="center"
        >
          Reviews
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        {currentReviews.map((review) => (
          <StyledPaper key={review._id}>
            <UserNameTypography variant="h6">
              {review.userName}
            </UserNameTypography>
            <ReviewTypography variant="body1">{review.review}</ReviewTypography>
            <RatingTypography variant="body2">
              Rating:{" "}
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                size="small"
                sx={{ ml: 1 }}
              />
            </RatingTypography>
          </StyledPaper>
        ))}

        <Stack spacing={2} alignItems="center" sx={{ marginTop: 4 }}>
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
    </div>
  );
};

export default ApprovedReviewList;
