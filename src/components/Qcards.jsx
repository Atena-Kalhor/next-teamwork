import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Scale } from "@mui/icons-material";

function Qcards() {
  const d = new Date();
  console.log(d.toJSON());
  const data = [
    {
      id: "1",
      title: "JS",
      discription: "this is a question of js",
      time: d,
    },
    {
      id: "2",
      title: "React",
      discription: "this is a question of react",
      time: d,
    },
    {
      id: "3",
      title: "Redux",
      discription:
        "this is a question of redux and i would be glad if anyone could anser me",
      time: d,
    },
    {
      id: "4",
      title: "css",
      discription:
        "this is a question of redux and i would be glad if anyone could anser me. if there is any problem pls give me some advice. thank you",
      time: d,
    },
  ];

  return (
    <div>
      <CssBaseline />
      {data.map((item) => {
        return (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "green",
              gap: "30px",
            }}
          >
            <Button
              key={item.id}
              sx={{
                width: "70%",
                minHeighteight: "100px",
                backgroundColor: "white",
                boxShadow: "0px 3px 10px gray",
                my: "15px",
                // mx: "auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                color: "black",
                transition: "transform 0.5s",
                // backgroundColor: "yellow",
                "&:hover": {
                  transform: "Scale(1.05)",
                },
              }}
              // onClick={}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  m: "10px",
                  maxWidth: "60%",
                  // backgroundColor: "green",
                  textAlign: "left",
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography>{item.discription.slice(0)}</Typography>
              </Box>
              <Box
                sx={{
                  m: "10px",
                  minWidth: "40%",
                  // height: "100%",
                  // backgroundColor: "pink",
                }}
              >
                <Typography textAlign={"end"}>
                  {item.time.toLocaleString()}
                </Typography>
              </Box>
            </Button>
            <Button
              sx={{
                width: "30%",
                maxWidth: "90px",
                minHeighteight: "100px",
                backgroundColor: "white",
                boxShadow: "0px 3px 10px gray",
                my: "15px",
                // mx: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                "&:hover": {
                  color: "red",
                },
              }}
            >
              <DeleteIcon></DeleteIcon>
            </Button>
          </Container>
        );
      })}
    </div>
  );
}

export default Qcards;
