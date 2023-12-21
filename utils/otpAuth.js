const axios = require("axios");
const STATUS_CODE = require("../config/errors");

exports.otpAuth = async (req, res) => {
  const { session_id, otp } = req.body;
  try {
    const result = await axios.get(
      `https://2factor.in/API/V1/${process.env.API_KEY}/SMS/VERIFY/${session_id}/${otp}`
    );
    if (result.data.Status !== "Success")
      return res
        .status(STATUS_CODE.SERVER_BAD_REQUEST)
        .json({ error: true, message: "Something went wrong" });
    return res
      .status(STATUS_CODE.SERVER_SUCESS)
      .json({ error: false, message: "Successfull", data: result.data });
  } catch (err) {
    return res
      .status(STATUS_CODE.SERVER_INTERNAL_ERROR_CODE)
      .json({ error: true, message: "Invalid otp" });
  }
};
