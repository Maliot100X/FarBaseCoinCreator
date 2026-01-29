export default function LeaderboardTab() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-900 text-gray-400 text-sm">
                <tr>
                    <th className="p-3">Rank</th>
                    <th className="p-3">User</th>
                    <th className="p-3 text-right">Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-3 text-center text-gray-500" colSpan={3}>No data yet</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
