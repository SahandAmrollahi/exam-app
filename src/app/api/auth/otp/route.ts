import { NextRequest, NextResponse } from "next/server";
type Data = {
  phoneNumber: string;
  otp: string;
};
export async function POST(req: NextRequest) {
  const data: Data = await req.json();
  return NextResponse.json({
    success: true,
    phoneNumber: data.phoneNumber,
    temporaryToken: Date.now(),
    expiresIn: 300,
    message: "کد تایید صحیح است.",
  });
}
