import React, { useState } from "react";
import Input from "../../CoreComponent/Input";
import httpServices from "../../common/httpServices";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/reducer/auth";
import { LoginIcon } from "../../icons";
import SVG from "react-inlinesvg";
import OTPInput from "../../CoreComponent/OTPInput";
import { useNavigate } from "react-router-dom";
import { t } from "../../localization/index";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    mobileNumber: "",
    otp: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const dispatch = useDispatch();

  const validateMobileNumber = (number) => {
    const mobileRegex = /^(9627|9628|9629)\d{8}$/;
    return mobileRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      mobileNumber: "",
      otp: "",
      general: "",
    });

    if (!validateMobileNumber(mobileNumber)) {
      setError((prevState) => ({
        ...prevState,
        mobileNumber: t("invalid_mobile"),
      }));
      return;
    }

    if (!isOtpSent) {
      setLoading(true);
      try {
        const response = await httpServices.post(
          "http://localhost:8000/api/generate-otp",
          {
            mobile_no: mobileNumber,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
            },
          }
        );

        if (response?.data?.success) {
          setIsOtpSent(true);
        } else {
          setError((prevState) => ({
            ...prevState,
            general: response?.data?.message || t("failed_send_otp"),
          }));
        }
      } catch (err) {
        setError((prevState) => ({
          ...prevState,
          general: err?.response?.data?.message || t("failed_send_otp"),
        }));
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await httpServices.post(
          "http://localhost:8000/api/verify-otp",
          {
            mobile_no: mobileNumber,
            otp: otp,
          }
        );
        if (response?.data?.success) {
          const userId = response?.data?.user?.id;
          const token = response?.data?.token;
          dispatch(loginAction({ token, userId }));
          navigate("/");
        }
      } catch (err) {
        setError((prevState) => ({
          ...prevState,
          otp: t("invalid_otp"),
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page container my-3 py-3">
        <div className="login-icon-container">
          <SVG src={LoginIcon} />
        </div>
        <div className="otp-title">
          {isOtpSent ? t("verification_code") : t("otp_verification")}
        </div>
        <div className="otp-note">
          {isOtpSent
            ? t("enter_verification_code")
            : t("enter_phone_number")}
        </div>

        <div className="row mobile-number-container">
          <div className="inputs-container col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              {!isOtpSent && (
                <div className="my-3">
                  <Input
                    label={t("mobile_number")}
                    placeholder="+962 7XXXXXXXX"
                    inputValue={mobileNumber}
                    setInputValue={setMobileNumber}
                    errorMsg={error.mobileNumber}
                    type="tel"
                    required={false}
                  />
                </div>
              )}
              {isOtpSent && (
                <div className="my-3">
                  <OTPInput onChange={setOtp} />
                </div>
              )}
              {error.general && (
                <div className="alert alert-danger">{error.general}</div>
              )}
              <div className="text-center">
                <button
                  className="my-2 mx-auto btn login-button"
                  type="submit"
                  disabled={loading || !mobileNumber || (isOtpSent && !otp)}
                >
                  {loading
                    ? isOtpSent
                      ? t("verifying_otp")
                      : t("sending_otp")
                    : isOtpSent
                    ? t("submit_otp")
                    : t("send_otp")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
