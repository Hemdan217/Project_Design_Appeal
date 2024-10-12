import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Card,
  CardActions,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  PhotoCamera,
  Edit,
  LockReset,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ResponsiveAppBar from "./HomeAppbar";

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#4B001E",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});

const Root = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const ProfileHeader = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  textAlign: "center",
  flexDirection: "column",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginBottom: theme.spacing(2),
}));

const StyledPaper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password1: false,
    password2: false,
    password3: false,
  });
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    bio: "",
    mobileNo: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setProfile(userInfo);
      setFormValues({
        name: userInfo.name,
        lastName: userInfo.lastName,
        email: userInfo.email,
        bio: userInfo.bio || "",
        mobileNo: userInfo.mobileNo || "",
        address: userInfo.address || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } else {
      console.error("No userInfo found");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = { ...formValues, pic: profile.pic }; // Add pic to the updated profile
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setProfile(data);
        setIsEditing(false);
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile" });
        console.error("Failed to save profile", data);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
      console.error("Failed to save profile", error);
    }
  };

  // ... rest of the code

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (formValues.newPassword !== formValues.confirmNewPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
        body: JSON.stringify({
          currentPassword: formValues.currentPassword,
          newPassword: formValues.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password reset successfully!" });
        setIsResettingPassword(false);
      } else {
        setMessage({ type: "error", text: "Failed to reset password" });
        console.error("Failed to reset password", data);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to reset password" });
      console.error("Error resetting password", error);
    }
  };

  // ... rest of the JSX

  const handleEditProfile = () => {
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleResetPassword = () => {
    setIsResettingPassword(true);
    setMessage({ type: "", text: "" });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/cloudinary/uploadimage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          pic: data.imageUrl,
        }));
      } else {
        console.error("Failed to upload image", data);
      }
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const toggleShowPassword = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  if (loading) {
    return (
      <Container component={Root} maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container component={Root} maxWidth="md">
        {message.text && (
          <Alert
            severity={message.type}
            onClose={() => setMessage({ type: "", text: "" })}
          >
            {message.text}
          </Alert>
        )}
        <ProfileHeader>
          <StyledAvatar alt="Profile Picture" src={profile?.pic || ""} />
          <div>
            <Typography variant="h4">
              {profile?.name || "Name"}
              {profile?.lastName && ` ${profile?.lastName}`}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {profile?.email || "Email"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {profile?.bio || "Bio"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Contact: {profile?.mobileNo || "Contact Number"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Address: {profile?.address || "Address"}
            </Typography>
          </div>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditProfile}
              startIcon={<Edit />}
              style={{ marginRight: "8px" }}
            >
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              startIcon={<LockReset />}
            >
              Reset Password
            </Button>
          </CardActions>
        </ProfileHeader>
        {isEditing && (
          <StyledPaper>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Edit Profile
            </Typography>
            <form onSubmit={handleProfileSave}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="First Name"
                    autoFocus
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="bio"
                    label="Bio"
                    name="bio"
                    value={formValues.bio}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="mobileNo"
                    label="Contact Number"
                    name="mobileNo"
                    value={formValues.mobileNo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    value={formValues.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Upload Profile Picture
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Save Changes
              </Button>
            </form>
          </StyledPaper>
        )}
        {isResettingPassword && (
          <StyledPaper>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              Reset Password
            </Typography>
            <form onSubmit={handlePasswordReset}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="currentPassword"
                    label="Current Password"
                    type={showPassword?.password1 ? "text" : "password"}
                    id="currentPassword"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShowPassword("password1")}
                          >
                            {showPassword?.password1 ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type={showPassword?.password2 ? "text" : "password"}
                    id="newPassword"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShowPassword("password2")}
                          >
                            {showPassword?.password2 ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type={showPassword?.password3 ? "text" : "password"}
                    id="confirmNewPassword"
                    value={formValues.confirmNewPassword}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => toggleShowPassword("password3")}
                          >
                            {showPassword?.password3 ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Reset Password
              </Button>
            </form>
          </StyledPaper>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ProfilePage;
