import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // ConvertKit API details
    const apiSecret = process.env.CONVERTKIT_SECRET;
    const formId = process.env.FORM_ID;

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_secret: apiSecret,
          email: email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to subscribe");
    }

    const data = await response.json();

    if (data.subscription) {
      return NextResponse.json(
        { message: "Successfully subscribed" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to subscribe" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
