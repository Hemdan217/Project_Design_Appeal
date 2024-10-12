import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(0); // Page state for pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page state for pagination

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("/api/feedback");
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page change
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Feedback Submissions</h2>
      {feedbacks.length > 0 ? (
        <>
          {feedbacks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((feedback) => (
              <div
                key={feedback._id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Name:</strong> {feedback.name}
                </p>
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Message:</strong> {feedback.message}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(feedback.createdAt).toLocaleString()}
                </p>
              </div>
            ))}

          {/* Pagination Component */}
          <TablePagination
            component="div"
            count={feedbacks.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );
};

export default FeedbackList;
