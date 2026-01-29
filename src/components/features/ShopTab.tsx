export default function ShopTab() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-bold">Pro Plan</h3>
            <p className="text-sm text-gray-400 mb-3">Get advanced analytics</p>
            <button className="w-full bg-blue-600 py-2 rounded text-sm font-bold">Buy (0.01 ETH)</button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-bold">Boost Coin</h3>
            <p className="text-sm text-gray-400 mb-3">Feature on home</p>
            <button className="w-full bg-purple-600 py-2 rounded text-sm font-bold">Boost (0.005 ETH)</button>
        </div>
      </div>
    </div>
  )
}
