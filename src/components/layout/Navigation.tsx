import { Home, PlusCircle, Repeat, User, Trophy, ShoppingBag } from "lucide-react";

type Tab = "home" | "create" | "swap" | "profile" | "leaderboard" | "shop";

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "create", icon: PlusCircle, label: "Create" },
    { id: "swap", icon: Repeat, label: "Swap" },
    { id: "leaderboard", icon: Trophy, label: "Rank" },
    { id: "shop", icon: ShoppingBag, label: "Shop" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-blue-500" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
