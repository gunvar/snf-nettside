import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Ugyldig token" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const type = body?._type;

    if (type === "nyhet") {
      revalidateTag("nyhet", { expire: 0 });
    } else if (type === "arrangement") {
      revalidateTag("arrangement", { expire: 0 });
    }

    return NextResponse.json({
      revalidated: true,
      type,
      now: Date.now(),
    });
  } catch {
    return NextResponse.json(
      { message: "Feil ved revalidering" },
      { status: 500 }
    );
  }
}
