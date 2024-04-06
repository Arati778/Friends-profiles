import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import logo from "./image-removebg-preview.png";
import Header from "./header";

const Review = ({ reviewer, position, comment, rating }) => (
  <div style={{ overflow: "hidden" }}>
    <Typography
      variant="body2"
      style={{ fontStyle: "italic", marginBottom: "5px" }}
    >
      "{comment}" - <strong>{reviewer}</strong> ({position})
    </Typography>
    <Rating name="rating" value={rating} precision={0.5} readOnly />
    <hr style={{ margin: "10px 0" }} />
  </div>
);

const Profile = () => {
  const [data, setData] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook at the top level

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        const response = await fetch(`http://localhost:4000/user${userId}`);

        const jsonData = await response.json();
        setData(jsonData);
        setReviews(jsonData.reviews);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  const handleRatingChange = (event) => {
    setNewRating(parseFloat(event.target.value));
  };

  const handleReviewChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleSubmitReview = () => {
    if (newRating > 0 && newReview.trim() !== "") {
      const newReviewObj = {
        reviewer: "You",
        position: "Reviewer",
        comment: newReview,
        rating: newRating,
      };
      setReviews([...reviews, newReviewObj]);
      setNewRating(0);
      setNewReview("");
      setIsAddingReview(false);
    }
  };

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  if (!data) {
    return <div>Error fetching data or data not found.</div>;
  }

  const handleNavigate = () => {
    navigate("/search");
  };

  return (
    <div className="profile-container">
      <img src={logo} alt="" className="logo" />
      {/* <Search /> */}
      <div className="Profile-info">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={window.innerWidth <= 834 ? 10 : 4}>
            {data.imageURL ? (
              <img
                src={data.imageURL}
                alt={data.name}
                style={{
                  width: 250,
                  height: 250,
                  fontSize: 60,
                  marginTop: 2,
                  marginBottom: 2,
                  display: "block",
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 250,
                  height: 250,
                  fontSize: 60,
                  marginTop: 2,
                  marginBottom: 2,
                  display: "block",
                }}
                variant="square"
              >
                {data.name.charAt(0)}
              </Avatar>
            )}
            <div className="ratings">
              <h3 style={{ color: "#405659" }}>RATING</h3>
              <Rating
                name="rating"
                value={data.rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2">
                Based on {reviews.length} reviews
              </Typography>
              <Typography variant="body2">**Reviews:**</Typography>
              {reviews.map((review, index) => (
                <Review
                  key={index}
                  reviewer={review.reviewer}
                  position={review.position}
                  comment={review.comment}
                  rating={review.rating}
                />
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={8}>
            <h3 style={{ color: "#405659", marginLeft: "16px" }}>NAME</h3>
            <Typography
              variant="h5"
              style={{
                textTransform: "uppercase",
                marginLeft: "16px",
                fontWeight: "600",
                color: "#545352",
                letterSpacing: "1px",
              }}
            >
              {data.name}
            </Typography>
            <Accordion style={{ marginTop: "40px" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    marginTop: "-15px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#385e9b",
                  }}
                >
                  EDUCATION
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "lightgray" }}>
                {data.qualifications.education.map((qualification, index) => (
                  <Typography key={index} variant="body1">
                    {qualification}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#385e9b",
                  }}
                >
                  PROFESSIONAL EXPERIENCE
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "lightgray" }}>
                <Typography variant="body1">
                  Company: {data.professionalExperience.company}
                  <br />
                  Job Title: {data.professionalExperience.jobTitle}
                  <br />
                  Responsibilities:{" "}
                  {data.professionalExperience.responsibilities}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#385e9b",
                  }}
                >
                  CERTIFICATIONS
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "lightgray" }}>
                <Typography variant="body1">
                  {data.certifications.certifications}
                  <br />
                  {data.certifications.licenses}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#385e9b",
                  }}
                >
                  SKILLS
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: "lightgray" }}>
                <Typography variant="body1">
                  Technical Skills: {data.skills.technicalSkills}
                  <br />
                  Soft Skills: {data.skills.softSkills}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div style={{ marginTop: "20px" }}>
              {isAddingReview ? (
                <div>
                  <Rating
                    name="newRating"
                    value={newRating}
                    precision={0.5}
                    onChange={handleRatingChange}
                  />
                  <TextField
                    label="Your Review"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={newReview}
                    onChange={handleReviewChange}
                    style={{ margin: "10px 0" }}
                  />
                  <Button
                    variant="contained"
                    style={{ width: "130px", background: "darkslategray" }}
                    onClick={handleSubmitReview}
                  >
                    Submit
                  </Button>
                </div>
              ) : (
                <Typography
                  variant="h7"
                  className="rate-div"
                  onClick={handleNavigate}
                >
                  <div className="rate-frnd"> Rate Your Friend</div>
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
