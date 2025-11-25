import { NextRequest, NextResponse } from "next/server";

type LoginBody = {
  phone_number: string;
  password: string;
  otp: string;
};

export async function POST(req: NextRequest) {
  const data: LoginBody = await req.json();
  const { phone_number } = data;
  const accessToken = Date.now().toString();
  const refreshToken = (Date.now() * 2).toString();
  const response = NextResponse.json({
    success: true,
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: "300",
    user: {
      id: 1,
      username: "username",
      phoneNumber: phone_number,
      firstName: "first_name",
      lastName: "last_name",
    },
    message: "ورود با موفقیت انجام شد",
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
  return response;
}

