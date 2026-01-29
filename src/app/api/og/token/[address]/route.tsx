import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;

    // Try to get token info from query params or use defaults
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "Token";
    const symbol = searchParams.get("symbol") || "???";

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
                    {/* Token Icon */}
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "24px",
                            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "32px",
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        {symbol[0]}
                    </div>

                    {/* Token Name */}
                    <div
                        style={{
                            fontSize: "56px",
                            fontWeight: "bold",
                            color: "white",
                            marginBottom: "12px",
                        }}
                    >
                        {name}
                    </div>

                    {/* Symbol */}
                    <div
                        style={{
                            fontSize: "32px",
                            color: "#9CA3AF",
                            marginBottom: "24px",
                        }}
                    >
                        ${symbol}
                    </div>

                    {/* Address */}
                    <div
                        style={{
                            fontSize: "18px",
                            color: "#6B7280",
                            fontFamily: "monospace",
                            backgroundColor: "rgba(0,0,0,0.3)",
                            padding: "12px 24px",
                            borderRadius: "12px",
                        }}
                    >
                        {address.slice(0, 12)}...{address.slice(-10)}
                    </div>

                    {/* Branding */}
                    <div
                        style={{
                            marginTop: "48px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            }}
                        />
                        <div
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                background: "linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            FarBase Creator
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
