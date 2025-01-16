import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Image from "next/image";
import qaImage from "../../public/what_does_qa_stand_for.webp";

const FirstSection = () => {
  return (
    <Container sx={{ display: "flex" }}>
      <Box sx={{ mx: 5 }}>
        <Typography sx={{ letterSpacing: 6 }}>Find your Answers</Typography>
        <Typography variant="h3">Questions and Answers</Typography>
        <Typography sx={{ my: 2 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ipsum,
          consequuntur voluptatibus ad soluta, excepturi, error totam nam beatae
          alias vitae velit possimus natus quod doloribus tempora repellat unde
          blanditiis.
        </Typography>
        <Button variant="contained">GO TO QUESTIONS</Button>
      </Box>
      <Box>
        <Image src={qaImage} width={400} height={200} />
      </Box>
    </Container>
  );
};

export default FirstSection;
