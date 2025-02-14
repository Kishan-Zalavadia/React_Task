import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import coverImage from "./../../assets/coverImage/cover1.png";
import profileImage from "./../../assets/profileImage/profile1.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Divider, Link, Typography } from "@mui/material";

export default function card({ name, email }) {
  return (
    <>
      <Card
        sx={{
          width: "300px",
          margin: 0,
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardMedia
          image={coverImage}
          sx={{
            width: "100%",
            paddingBottom: "min(56.25%, 200px)",
            bgcolor: "rgba(0, 0, 0, 0.08)",
          }}
        />
        <Avatar
          src={profileImage}
          sx={{
            width: 100,
            height: 100,
            border: "3px solid #fff",
            margin: "-50px auto",
            "& > img": {
              margin: 0,
            },
          }}
        />
        <CardContent
          sx={{
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            color="black"
            marginTop={"25px"}
            fontWeight="bold"
            variant="h5"
          >
            {name}
          </Typography>
          <Typography color="gray" variant="h7" marginBottom={2}>
            {email}
          </Typography>
          <Divider color="gray" width="100%" />
          <Box
            marginTop={"15px"}
            display={""}
            sx={{ mt: 2, display: "flex", gap: 2 }}
          >
            <Link href="#" color="#d62976">
              <InstagramIcon fontSize="large" />
            </Link>
            <Link href="#" color="#4267B2">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href="#" color="#075E54">
              <WhatsAppIcon fontSize="large" />
            </Link>
            <Link href="#" color="#0077B5">
              <LinkedInIcon fontSize="large" />
            </Link>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
