"use client";

import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { getData, deleteQuestion } from "@/utils/actions";

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
      {questions.map((item) => (
        <Container
          key={item._id}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button
            sx={{
              width: "60%",
              minHeight: "80px",
              backgroundColor: "white",
              boxShadow: "0px 2px 8px gray",
              my: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              color: "black",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "Scale(1.02)", 
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                m: "8px", 
                maxWidth: "55%",
                textAlign: "left",
              }}
            >
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
