"use client";

import React, { FormEvent } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  PaletteMode,
  TextField
} from "@mui/material";

import Link from "next/link";
import lang from "../lang/en.json";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { hasCookie, setCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Turnstile } from "@marsidev/react-turnstile";

export default function UserLogin() {
  const ref = React.useRef<TurnstileInstance | null>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<
    "error" | "warning" | "success"
  >("error");

  const [token, setToken] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [twoFactor, setTwoFactor] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [mode, setMode] = React.useState<PaletteMode | undefined>();

  React.useEffect(() => {
    if (hasCookie("access_token")) {
      window.location.href = "/";
    } else {
      setMode(localStorage.getItem("theme") == "dark" ? "dark" : "light");
    }
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    // Clear previous errors when a new request starts
    setError("");
    setSeverity("error");
    try {
      if (token == "") {
        setError(lang["captchaRequired"]);
        setSeverity("error");
        setIsLoading(false);
        return;
      }
      const formData = new FormData(event.currentTarget);
      await fetch("/api/users/loginUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          cfTurnstileResponse: token,
          emailOrPhone: formData.get("emailOrPhone"),
          password: formData.get("password"),
          code: formData.get("code")
        })
      })
        .then(async (res) => {
          ref.current?.reset();
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          if (res.status == 401) {
            console.log("401");
          } else {
            const json = await res.json();
            console.log(json);
            if (json["error"]) {
              var errorMsg = json["error"]["detail"];

              if (errorMsg == "Captcha solution required") {
                errorMsg = lang["captchaRequired"];
              }

              if (errorMsg == "Non-matching code") {
                errorMsg = lang["nonmatchingCode"];
              }

              if (errorMsg == "Authentication failed, data is invalid.") {
                errorMsg = lang["authenticationFailed"];
              }

              throw new Error(errorMsg);
            } else {
              if (json["ok"] == 0) {
                if (json["twoFactor"] == 1) {
                  setToken("");
                  setTwoFactor(true);
                  setError(
                    lang["codeSented"] +
                    "  ( " +
                    formData.get("emailOrPhone") +
                    " )"
                  );
                  setSeverity("success");
                } else {
                  throw new Error(lang["somethingWentWrong"]);
                }
              } else {
                if (json["ok"] == 1) {
                  const access_token = json["access_token"];
                  const role = json["role"];
                  setCookie(
                    "access_token",
                    JSON.stringify({
                      access_token: access_token,
                      role: role,
                      time: Date.now()
                    })
                  );
                  window.location.href = "/user";
                }
              }
            }
          }
        })
        .catch((e: any) => {
          setError(e.message);
          setSeverity("error");
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      setError(error.message);
      setSeverity("error");
      console.error(error);
      setIsLoading(false);
    }
  }

  if (mode != undefined)
    // Color paltte https://colorhunt.co/palette/3674b5578fcaa1e3f9d1f8ef
    return (
      <>
        <div className="h-screen md:bg-[url('/logo.svg')] bg-left bg-no-repeat bg-[auto_100px] ">
          <div className="flex flex-col justify-center items-center w-full backdrop-blur-[3px]">
            <div className="w-full max-w-[512px] md:mt-32 p-3 ">

              <form onSubmit={onSubmit}>
                <Card
                  className="p-3 md:p-9"
                  sx={{
                    margin: 1,
                    background: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
                    backdropFilter: 'blur(50px)', // Apply blur effect
                    border: '1px solid rgba(255, 255, 255, 0.3)', // Light border
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    marginTop: '50px',
                  }}
                >
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  mt-5 mb-6 ">
                      <p className="text-xl sm:text-2xl font-bold grow">
                        {lang["login"]}
                      </p>
                      <Link
                        className="text-blue-500  text-sm sm:text-base mt-2 sm:mt-0"
                        href="/signUp/userProfile"
                        style={{
                          pointerEvents: isLoading ? "none" : "auto",
                          display: twoFactor ? "none" : ""
                        }}
                      >
                        {lang["dontHaveAccount"]}
                      </Link>
                    </div>

                    <Alert
                      sx={{ marginBottom: 4 }}
                      severity={severity}
                      style={{ display: error == "" ? "none" : "" }}
                    >
                      {error}
                    </Alert>

                    <TextField
                      sx={{
                        marginBottom: 4,
                        display: twoFactor ? "none" : ""
                      }}
                      required
                      name="emailOrPhone"
                      disabled={isLoading}
                      fullWidth
                      autoComplete="email|phone"
                      type="email|phone"
                      variant="outlined"
                      label={lang["emailOrPhone"]}
                    />

                    <FormControl
                      sx={{
                        marginBottom: 2,
                        display: twoFactor ? "none" : ""
                      }}
                      fullWidth
                      required
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        {lang["password"]}
                      </InputLabel>
                      <OutlinedInput
                        name="password"
                        disabled={isLoading}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={lang["password"]}
                      />
                    </FormControl>

                    <TextField
                      name="code"
                      fullWidth
                      type="text"
                      variant="outlined"
                      disabled={isLoading}
                      label={lang["code"]}
                      sx={{
                        display: twoFactor ? "" : "none"
                      }}
                    />

                    <Link
                      className="text-blue-500"
                      href="/accountRecovery/userProfile"
                      style={{
                        pointerEvents: isLoading ? "none" : "auto",
                        display: twoFactor ? "none" : ""
                      }}
                    >
                      {lang["forgotPassword"]}
                    </Link>
                    <div className="w-full flex items-center justify-center mt-6">
                      <Turnstile
                        ref={ref}
                        siteKey={siteConfig.turnstileSitekey}
                        onSuccess={setToken}
                      />
                    </div>
                  </CardContent>
                  <CardActions>
                    <div className="flex flex-col w-full">
                      <LoadingButton
                        type="submit"
                        style={{ fontWeight: "bold", textTransform: "none" }}
                        disabled={isLoading}
                        sx={{ marginTop: 1, marginBottom: 2 }}
                        fullWidth
                        loading={isLoading}
                        variant="contained"
                      >
                        {lang["login"]}
                      </LoadingButton>

                    </div>
                  </CardActions>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </>
    );

  return <></>;
}
