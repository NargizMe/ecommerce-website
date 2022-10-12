import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import LayoutSite from "../../../layout/LatoutSite";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Row, Col } from "react-grid-system";
import styles from "./index.module.css";
import axios from "axios";

const SiteSignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleMouseUpPassword = () => setShowPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      address: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "name must be at least 3 characters"),
      surname: Yup.string().min(3, "surname must be at least 3 characters"),
      email: Yup.string()
        .email("invalid email format")
        .min(3, "surname must be at least 3 characters")
        .required("Required"),
      username: Yup.string()
        .min(3, "username must be at least 3 characters")
        .required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "must contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Case Character"
        )
        .required("Required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const captchaRef = useRef(null);
 
  const handleSubmit = async(e) =>{
    
    e.preventDefault();
    const token = captchaRef.current.getValue();
    console.log("token: ", token);
    captchaRef.current.reset();

    await axios.post(process.env.REACT_APP_API_URL, {token})
    .then(res =>  console.log(res))
    .catch((error) => {
    console.log(error);
    })
  };
  return (
    <LayoutSite>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& > :not(style)": { m: 1, width: "25%" },
          marginTop: "100px",
          marginBottom:'33px'
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className={styles.registerForm}
        >
          <h2 style={{ fontSize: "40px", fontFamily: "sans-serif" }}>
            Sign Up
          </h2>
          <Row>
            <Col lg={6} sm={12}>
              {/* name */}
              <FormControl
                fullWidth
                style={{ height: "50px" }}
                sx={{ mt: 4 }}
                variant="standard"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  label="name"
                  id="standard-adornment-amount"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.name}
                  </p>
                ) : null}
              </FormControl>
              {/* surname */}
              <FormControl
                fullWidth
                style={{ height: "60px" }}
                sx={{ mt: 4 }}
                variant="standard"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  label="surname"
                  id="standard-adornment-amount"
                  {...formik.getFieldProps("surname")}
                />
                {formik.touched.surname && formik.errors.surname ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.surname}
                  </p>
                ) : null}
              </FormControl>
              {/* username */}
              <FormControl
                fullWidth
                style={{ height: "50px" }}
                sx={{ mt: 4 }}
                variant="standard"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  label="username"
                  id="standard-adornment-amount"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.username}
                  </p>
                ) : null}
              </FormControl>

              {/* email */}
              <FormControl
                fullWidth
                style={{ height: "60px" }}
                sx={{ mt: 4 }}
                variant="standard"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  label="email"
                  id="standard-adornment-amount"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.email}
                  </p>
                ) : null}
              </FormControl>
            </Col>
            <Col lg={6} sm={12}>
              {/* address */}
              <FormControl
                fullWidth
                style={{ height: "50px" }}
                sx={{ mt: 4 }}
                variant="standard"
                onSubmit={formik.handleSubmit}
              >
                <TextField
                  label="address"
                  id="standard-adornment-amount"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.username}
                  </p>
                ) : null}
              </FormControl>
              {/* password */}
              <FormControl
                fullWidth
                style={{ height: "60px" }}
                sx={{ mt: 4 }}
                variant="standard"
              >
                <TextField
                  label="password"
                  id="standard-adornment-amount"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p style={{ color: "red", fontSize: "11px" }}>
                    {formik.errors.password}
                  </p>
                ) : null}
              </FormControl>
              {/* confirm password */}
              <FormControl
                fullWidth
                style={{ height: "60px" }}
                sx={{ mt: 4 }}
                variant="standard"
              >
                <TextField
                  label="confirm password"
                  id="standard-adornment-amount"
                  name="passwordConfirm"
                  type="password"
                  {...formik.getFieldProps("passwordConfirm")}
                />
                {formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm ? (
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {formik.errors.passwordConfirm}
                  </p>
                ) : null}
              </FormControl>
             
            </Col>
          </Row>
          <ReCAPTCHA style={{display:'flex',justifyContent:'center',marginTop:'10px'}} sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef}/>
          <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
            <Button sx={{background:'darkgreen'}} variant="contained" type="submit">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </LayoutSite>
  );
};

export default SiteSignUpPage;
