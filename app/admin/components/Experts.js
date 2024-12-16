// app/admin/components/Experts.js
export default function Experts() {
    const experts = [
      { id: 1, name: 'Dr. Sharma', specialty: 'Cardiologist', status: 'Active', rating: 4.8 },
      { id: 2, name: 'Dr. Patel', specialty: 'Neurologist', status: 'Pending', rating: 4.5 },
      // Add more expert data
    ];
  
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Expert Management</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add New Expert
          </button>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {experts.map((expert) => (
                <tr key={expert.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.specialty}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      expert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{expert.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }