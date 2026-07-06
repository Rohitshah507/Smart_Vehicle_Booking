import User from "../Models/User.js";
import {createUser} from "../Service/authService.js"

const signUP = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.name || !userData.email || !userData.password) {
      return res.status(501).json("All Fields required to signup");
    }

    const createdUser = await createUser(userData);

    res.status(201).json({
      success:true,
      message:"Signup Successfully",
      createdUser
    })

  } catch (error) {
    return res.status(501).json({
        success:false,
        message:error.message 
    })
  }
};

export default {signUP}
