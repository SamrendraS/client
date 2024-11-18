import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  const { params } = context;

  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") || "http";

  if (!params.referralCode) {
    return NextResponse.redirect(`${protocol}://${host}/`);
  }

  return NextResponse.redirect(
    `${protocol}://${host}/?referrer=${params.referralCode}`,
  );
}
