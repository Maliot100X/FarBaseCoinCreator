export default function HomeTab() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">FarBase Coin Creator</h1>
      <div className="grid gap-4">
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-bold text-lg mb-2 text-orange-400">🔥 Trending</h3>
          <p className="text-gray-400">No trending coins yet.</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-bold text-lg mb-2 text-blue-400">🚀 New</h3>
          <p className="text-gray-400">Start by creating a coin!</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
           <h3 className="font-bold text-lg mb-2 text-purple-400">⚡ Boosting</h3>
           <p className="text-gray-400">Boost your coin to see it here.</p>
        </div>
      </div>
    </div>
  )
}
