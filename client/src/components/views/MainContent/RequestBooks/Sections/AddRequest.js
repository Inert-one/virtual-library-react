import React, { useEffect, useState } from "react";
import requestAPI from "utils/requestAPI";
// import { Chip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3em",
    [theme.breakpoints.down("md")]: {
      padding: "0.1em",
    },
  },
  txtField: {
    width: "100%",
  },
}));
const exampleRequest = {
  bookName: "",
  author : ""
};
export default function RequestBooks() {
  const classes = useStyles();  
  const [request, setRequest] = useState(exampleRequest);


//   const handleDelete = (id) => {
//     requestAPI.remove(id, (res) => {
//       alert(res.message);
//       loadCategories();
//     });
//   };
const handleRequestInput = ({ target: { name, value } }) => {
  setRequest({ ...request, [name]: value });
};
  // const handleRequestInput = (e) => {
  //   setRequest(e.target.value);
  // };
  // const handleAuthorInput = (e) => {
  //   setAuthor(e.target.value);
  // };

  const handleSave = (request) => {
    requestAPI.setRequest(request, (res) => {
      alert(res.message);
    //   loadCategories();
    });
  };
  
  return (
    <>
      <h1>Request Book:</h1>
      <Grid
      alignContent="center"
      container
      className={classes.root}
      spacing={1}
    >
      <Grid container item xs={12} md={6} spacing={2}>
      <Grid item md={5} xs={6}>
      <TextField
        onChange={handleRequestInput}
        value={request.bookName}
        width="200px"
        id="standard-basic"
        label="Book Name"
        inputProps={{ name: "bookName" }}
      />
      </Grid>
      <Grid item md={5} xs={6}>
      <TextField
        onChange={handleRequestInput}
        value={request.author}
        width="200px"
        id="standard-basic"
        label="Author"
        inputProps={{ name: "author" }}
      />
      </Grid>
      <Grid item xs={12}>
      <Button
      variant="contained"
      color="primary"
      onClick={() => handleSave(request)}
      >
      Save
      </Button></Grid>
    </Grid>
    </Grid>
      </>
  );
}
