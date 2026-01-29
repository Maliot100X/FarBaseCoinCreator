"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import HomeTab from "@/components/features/HomeTab";
import CreateCoinTab from "@/components/features/CreateCoinTab";
import SwapTab from "@/components/features/SwapTab";
import ProfileTab from "@/components/features/ProfileTab";
import LeaderboardTab from "@/components/features/LeaderboardTab";
import ShopTab from "@/components/features/ShopTab";
import AIPopup from "@/components/features/AIPopup";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "create" | "swap" | "profile" | "leaderboard" | "shop">("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "create":
        return <CreateCoinTab />;
      case "swap":
        return <SwapTab />;
      case "profile":
        return <ProfileTab />;
      case "leaderboard":
        return <LeaderboardTab />;
      case "shop":
        return <ShopTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <main className="min-h-screen pb-20 bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>
      <AIPopup />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}

