import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const validationSchema = yup.object({
  website: yup.string().url().required().default(""),
});
const initValues = validationSchema.cast();

const useStyles = makeStyles((theme) => ({
  websiteInputDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40vh",
  },
  formDiv: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
  },
  label: {
    margin: ".5rem",
    fontSize: "1rem",
    flex: "0 0 100%",
  },
  inputField: {
    flexGrow: "2",
    border: " 3px solid #3f51b5",
    borderRight: "none",
  },
  submitBtn: {
    border: "2px solid #3f51b5",
    borderRadius: "0 5px 5x 0",
    background: "#3f51b5",
    fontSize: "1rem",
  },
  errorMsgDiv: {
    color: "red",
    margin: "1rem",
    flex: "0 0 100%",
  },
}));

const WebsiteInput = ({ setFetchedData }) => {
  const classes = useStyles();

  return (
    <div className={classes.websiteInputDiv}>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values, action) => {
          console.log(values);
          axios
            .post("/", values)
            .then((data) => {
              console.log("hey", data.data);
              setFetchedData(data.data);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
          action.resetForm();
        }}
      >
        {(formik) => {
          return (
            <Form className={classes.formDiv}>
              <label htmlFor="website" className={classes.label}>
                website
              </label>
              <Field
                name="website"
                type="text"
                className={classes.inputField}
              />

              <Button
                variant="contained"
                className={classes.submitBtn}
                size="small"
                type="submit"
              >
                <SearchIcon fontSize="large" style={{ color: "white" }} />
              </Button>
              <div className={classes.errorMsgDiv}>
                <ErrorMessage name="website" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default WebsiteInput;
