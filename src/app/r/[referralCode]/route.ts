import { NextResponse } from "next/server";

import { db } from "@/db";

export async function GET(req: Request, context: any) {
  const { params } = context;

  const user = await db.user.findFirst({
    where: {
      referralCode: params.referralCode,
    },
  });

  const host = req.headers.get("host");
  const protocol = req.headers.get("x-forwarded-proto") || "http";

  if (!user) {
    return NextResponse.redirect(`${protocol}://${host}/`);
  }

  return NextResponse.redirect(
    `${protocol}://${host}/?referrer=${user.referralCode}`,
  );
}
