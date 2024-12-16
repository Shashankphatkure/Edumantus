// app/admin/components/Bookings.js
export default function Bookings() {
    const bookings = [
      {
        id: 1,
        user: 'Rahul Kumar',
        expert: 'Dr. Sharma',
        date: '2024-01-20',
        time: '10:00 AM',
        status: 'Completed'
      },
      {
        id: 2,
        user: 'Priya Singh',
        expert: 'Dr. Patel',
        date: '2024-01-21',
        time: '2:30 PM',
        status: 'Upcoming'
      },
      // Add more booking data
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Booking Management</h2>
          <div className="flex space-x-4">
            <select className="px-4 py-2 border rounded-lg">
              <option>All Status</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Export Bookings
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expert
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">#{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.expert}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.date} {booking.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }