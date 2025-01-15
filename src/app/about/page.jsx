import { Typography, Container } from "@mui/material";

export const metadata = {
  title: "about us",
  description: "This is a about us page",
};

export default function About() {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        mb: 8,
        textAlign: "left", 
      }}
    >
      <Typography
        variant="h3"
        component="h1"
      
        sx={{ fontWeight: "bold" }}
      >
        About us
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ lineHeight: 1.8, mt: 2 }}
      >
        Welcome to Q & A—where knowledge meets curiosity! We are a
        community-driven platform designed to bring together people seeking
        answers with those who have the expertise to help. Our mission is to
        make information accessible, accurate, and helpful to everyone, from
        experts in specialized fields to everyday users with unique
        experiences. By fostering an open space for questions and solutions, we
        aim to empower users to share their knowledge, learn new things, and
        make informed decisions. Join us and become part of a supportive
        community that values collaboration, respect, and the pursuit of
        understanding.
      </Typography>
    </Container>
  );
}