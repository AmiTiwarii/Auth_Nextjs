import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request : NextRequest){
    try {
        const userId = await getTokenData(request);
        const user = await User.findOne({username: userId}).select("-password");
        return NextResponse.json({
            message : "user found",
            data : user,
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}