import User from "../models/UserModel";

export const registerUser = async (req: any, res: any) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    console.log("before creating user");
    const newUser = await User.create({
      email,
      password,
      passwordConfirm,
    });
    console.log("after creating user");

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
