import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if the user exists
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validatePassword = await bcryptjs.compare(password,user.password);
        if(!validatePassword) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 400})
        }

        // Create token data
        const tokenData = {
            id : user._id,
            email : user.email,
            username : user.username
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn : "1hr"});

        const response = NextResponse.json({
            message : "Login Successful",
            success : true,
        })

        response.cookies.set("token", token, {
            httpOnly : true,
        })
        return response;
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500});
    }
}
