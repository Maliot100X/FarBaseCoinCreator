import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;

    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "New Token";
    const symbol = searchParams.get("symbol") || "TOKEN";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#0A0F1C",
                    backgroundImage: "linear-gradient(135deg, #0A0F1C 0%, #101A2D 100%)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px",
                    }}
                >
                    {/* Celebration Emoji */}
                    <div
                        style={{
                            fontSize: "80px",
                            marginBottom: "24px",
                        }}
                    >
                        🎉
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #60A5FA 0%, #A78BFA 50%, #F472B6 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            marginBottom: "32px",
                        }}
                    >
                        New Token Created!
                    </div>

                    {/* Token Card */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "24px",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            padding: "32px 48px",
                            borderRadius: "24px",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                    >
                        {/* Token Icon */}
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "20px",
                                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "36px",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            {symbol[0]}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{
                                    fontSize: "40px",
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {name}
                            </div>
                            <div
                                style={{
                                    fontSize: "28px",
                                    color: "#9CA3AF",
                                }}
                            >
                                ${symbol}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div
                        style={{
                            marginTop: "24px",
                            fontSize: "16px",
                            color: "#6B7280",
                            fontFamily: "monospace",
                        }}
                    >
                        {address}
                    </div>

                    {/* Branding */}
                    <div
                        style={{
                            marginTop: "40px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "6px",
                                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            }}
                        />
                        <div
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#9CA3AF",
                            }}
                        >
                            Created on FarBase
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
