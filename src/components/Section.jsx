import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import qaImage from "../../public/what_does_qa_stand_for.webp";

const FirstSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for medium and up
        justifyContent: "center",
        alignItems: "center",
        textAlign: { xs: "center", md: "left" }, // Center text for small screens
      }}
    >
      <Box sx={{ mx: { xs: 2, md: 5 }, my: { xs: 2, md: 0 } }}>
        <Typography sx={{ letterSpacing: 6, mt: 4 }}>
          Find your Answers
        </Typography>
        <Typography variant="h3">Questions and Answers</Typography>
        <Typography sx={{ my: 2 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ipsum,
          consequuntur voluptatibus ad soluta, excepturi, error totam nam beatae
          alias vitae velit possimus natus quod doloribus tempora repellat unde
          blanditiis.
        </Typography>
        <Button variant="contained" href="/question">
          GO TO QUESTIONS
        </Button>
      </Box>
      <Box sx={{ mx: { xs: 2, md: 5 }, my: { xs: 2, md: 0 } }}>
        <Image
          src={qaImage}
          width={700}
          height={400}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
    </Container>
  );
};

export default FirstSection;
