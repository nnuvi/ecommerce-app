import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log(`[${data.level}]`, data.message, data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Logger error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
