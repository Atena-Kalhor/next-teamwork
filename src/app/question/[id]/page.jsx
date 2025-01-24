// "use client";

// import { deleteAnswer, getData } from "@/utils/actions";
// import { Box, Button } from "@mui/material";
// import { useEffect, useState } from "react";

// function page({ params }) {
//   const { id } = params;
//   const [answers, setAnswers] = useState([]);

//   const fetchAnswers = async () => {
//     try {
//       const data = await getData(`http://localhost:3000/api/v1/question/${id}`);
//       setAnswers(data.answer);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };
//   useEffect(() => {
//     fetchAnswers();
//   }, []);

//   const handleDeleteAnswer = async (index) => {
//     try {
//       await deleteAnswer(id, index);
//       console.log("deleted");
//       answers.splice(index, 1);
//       setAnswers(answers);
//     } catch (error) {
//       console.error("Error deleting answer:", error);
//       alert("Failed to delete answer. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginTop: "100px",
//         gap: "20px",
//       }}
//     >
//       {answers.map((item, index) => {
//         return (
//           <Button
//             key={index}
//             sx={{
//               width: "100px",
//               height: "50px",
//               backgroundColor: "green",
//               color: "black",
//             }}
//             onClick={() => handleDeleteAnswer(index)}
//           >
//             {item}
//           </Button>
//         );
//       })}
//     </div>
//   );
// }

// export default page;

"use client";

import { deleteAnswer, getData, patchAnswer } from "@/utils/actions";
import {
  Box,
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Page({ params }) {
  const { id } = params;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      const data = await getData(`http://localhost:3000/api/v1/question/${id}`);
      setQuestion(data);
      setAnswers(data.answer || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const newAnswer = data.description;
      await patchAnswer(id, newAnswer);
      setAnswers([...answers, newAnswer]);
      reset();
    } catch (error) {
      console.error("Error adding answer:", error);
      alert("Failed to add answer. Please try again.");
    }
  };

  const handleDeleteAnswer = async (index) => {
    try {
      await deleteAnswer(id, index);
      const updatedAnswers = [...answers];
      updatedAnswers.splice(index, 1);
      setAnswers(updatedAnswers);
    } catch (error) {
      console.error("Error deleting answer:", error);
      alert("Failed to delete answer. Please try again.");
    }
  };

  if (!question) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        gap: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "left",
          width: "70%",
          marginBottom: "-10px",
        }}
      >
        {question.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          width: "70%",
          borderBottom: "1px solid #ccc",
          // paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        {question.description}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "left",
          width: "70%",
        }}
      >
        Answers:
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ flexGrow: 1, width: "70%" }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              id="filled-basic"
              label="answer"
              variant="filled"
              multiline
              rows={2}
              sx={{
                width: "100%",
              }}
              {...register("answer", {
                required: "answer is required",
              })}
              error={!!errors.answer}
            />
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      {answers.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "70%",
            border: "1px solid #ccc",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginBottom: "10px",
          }}
        >
          <Typography
            style={{
              color: "#333",
              fontSize: "14px",
              width: "100%",
              border: "1px solid #ccc",
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
            }}
          >
            {item}
          </Typography>

          <Button
            sx={{
              width: "20%",
              maxWidth: "70px",
              minHeight: "80px",
              my: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              "&:hover": {
                color: "red",
              },
            }}
            onClick={() => handleDeleteAnswer(index)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Page;

// "use client";

// import { deleteAnswer, getData, addAnswer } from "@/utils/actions";
// import { Button, Grid, TextField, Typography, Box } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// function Page({ params }) {
//   const { id } = params;
//   const [question, setQuestion] = useState(null);
//   const [answers, setAnswers] = useState([]);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const fetchData = async () => {
//     try {
//       const data = await getData(`http://localhost:3000/api/v1/question/${id}`);
//       setQuestion(data);
//       setAnswers(data.answer || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const newAnswer = data.description;
//       await addAnswer(id, newAnswer);
//       setAnswers([...answers, newAnswer]);
//       reset();
//     } catch (error) {
//       console.error("Error adding answer:", error);
//       alert("Failed to add answer. Please try again.");
//     }
//   };

//   const handleDeleteAnswer = async (index) => {
//     try {
//       await deleteAnswer(id, index);
//       const updatedAnswers = [...answers];
//       updatedAnswers.splice(index, 1);
//       setAnswers(updatedAnswers);
//     } catch (error) {
//       console.error("Error deleting answer:", error);
//       alert("Failed to delete answer. Please try again.");
//     }
//   };

//   if (!question) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginTop: "50px",
//         padding: "20px",
//         gap: "20px",
//         width: "80%",
//         marginX: "auto",
//       }}
//     >
//       {/* عنوان و توضیحات */}
//       <Typography variant="h4" fontWeight="bold">
//         {question.title}
//       </Typography>
//       <Typography variant="h6" color="gray">
//         {question.description}
//       </Typography>

//       {/* فرم پاسخ */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{
//           width: "100%",
//           backgroundColor: "#f9f9f9",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <Typography variant="h6" marginBottom="10px">
//           Write your answer:
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               id="filled-basic"
//               label="Your Answer"
//               variant="outlined"
//               multiline
//               rows={4}
//               sx={{
//                 width: "100%",
//                 borderRadius: "8px",
//               }}
//               {...register("description", {
//                 required: "Answer is required",
//               })}
//               error={!!errors.description}
//               helperText={errors.description?.message}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{
//                 width: "100%",
//                 height: "50px",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//               }}
//               type="submit"
//             >
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       {/* پاسخ‌ها */}
//       <Box
//         sx={{
//           width: "100%",
//           marginTop: "20px",
//         }}
//       >
//         <Typography variant="h5" marginBottom="10px">
//           Answers:
//         </Typography>
//         {answers.map((item, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               backgroundColor: "#fff",
//               padding: "15px",
//               marginBottom: "10px",
//               borderRadius: "8px",
//               boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Typography sx={{ flexGrow: 1 }}>{item}</Typography>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => handleDeleteAnswer(index)}
//               sx={{
//                 marginLeft: "10px",
//               }}
//             >
//               Delete
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default Page;
