import {
  adminCreate,
  adminLoginVerify,
} from "../../../usecases/adminUseCases/adminAuthUseCases.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await adminLoginVerify(email, password);
    if (result.status == 200) {
      return res
        .status(200)
        .json({ message: result.message, adminToken: result.adminToken });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const adminSignUp = async (req, res) => {
  try {
    const result = await adminCreate(req.body);
    if (result) {
      return res.status(200).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
