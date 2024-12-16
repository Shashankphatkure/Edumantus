// app/admin/components/Overview.js
export default function Overview({ stats, recentActivities }) {
    return (
      <div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            <span className="text-green-600 text-sm">↑ 12% from last month</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
            <span className="text-green-600 text-sm">↑ 8% from last month</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            <span className="text-blue-600 text-sm">Currently Online</span>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
            <span className="text-orange-600 text-sm">Requires Action</span>
          </div>
        </div>
  
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.name}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }