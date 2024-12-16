// app/admin/components/Experts.js
'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Experts() {
    const [experts, setExperts] = useState([]);
    const [newExpert, setNewExpert] = useState({ name: '', specialty: '', status: 'Pending', rating: 0 });
    const [showModal, setShowModal] = useState(false);
    const supabase = createClientComponentClient();

    // Fetch experts on component mount
    useEffect(() => {
        fetchExperts();
    }, []);

    // Fetch experts from Supabase
    const fetchExperts = async () => {
        const { data, error } = await supabase
            .from('experts')
            .select('*');
        
        if (error) {
            console.error('Error fetching experts:', error);
            return;
        }
        
        setExperts(data);
    };

    // Add new expert
    const handleAddExpert = async () => {
        const { data, error } = await supabase
            .from('experts')
            .insert([newExpert])
            .select();

        if (error) {
            console.error('Error adding expert:', error);
            return;
        }

        setExperts([...experts, data[0]]);
        setShowModal(false);
        setNewExpert({ name: '', specialty: '', status: 'Pending', rating: 0 });
    };

    // Delete expert
    const handleDeleteExpert = async (id) => {
        const { error } = await supabase
            .from('experts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting expert:', error);
            return;
        }

        setExperts(experts.filter(expert => expert.id !== id));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Expert Management</h2>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowModal(true)}
                >
                    Add New Expert
                </button>
            </div>

            {/* Modal for adding new expert */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Add New Expert</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full mb-2 p-2 border rounded"
                            value={newExpert.name}
                            onChange={(e) => setNewExpert({...newExpert, name: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Specialty"
                            className="w-full mb-2 p-2 border rounded"
                            value={newExpert.specialty}
                            onChange={(e) => setNewExpert({...newExpert, specialty: e.target.value})}
                        />
                        <input
                            type="number"
                            placeholder="Rating"
                            className="w-full mb-4 p-2 border rounded"
                            value={newExpert.rating}
                            onChange={(e) => setNewExpert({...newExpert, rating: parseFloat(e.target.value)})}
                        />
                        <div className="flex justify-end gap-2">
                            <button 
                                className="bg-gray-200 px-4 py-2 rounded"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={handleAddExpert}
                            >
                                Add Expert
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                                    <button 
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDeleteExpert(expert.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}