import { NextRequest, NextResponse } from "next/server";

type RegisterBody = {
  temporaryToken: number;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  password: string;
  confirmPassword: string;
  ageRangeId: number;
  email?: string;
};

export async function POST(req: NextRequest) {
  const data: RegisterBody = await req.json();
  const { username, email, phoneNumber, firstName, lastName } = data;

  const accessToken = Date.now().toString();
  const refreshToken = (Date.now() * 2).toString();

  const response = NextResponse.json({
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: "3600",
    user: {
      id: "alkfbuyvfkvsnhfskrh",
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
    },
    message: "ثبت نام با موفقیت انجام شد",
  });
  response.cookies.set("refershToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
  return response;
}
