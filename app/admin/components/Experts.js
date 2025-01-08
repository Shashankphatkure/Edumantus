// app/admin/components/Experts.js
'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Experts() {
    const [experts, setExperts] = useState([]);
    const [newExpert, setNewExpert] = useState({
        name: '',
        role: '',
        image: '',
        specialties: [],
        experience: '',
        education: '',
        languages: [],
        price: 0,
        about: '',
        status: 'pending'
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editingExpertId, setEditingExpertId] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchExperts();
    }, []);

    const fetchExperts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('experts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setExperts(data);
        } catch (error) {
            console.error('Error fetching experts:', error);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('expert-images')
                .upload(fileName, file);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('expert-images')
                .getPublicUrl(fileName);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleAddExpert = async () => {
        try {
            let imageUrl = newExpert.image;
            
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { data, error } = await supabase
                .from('experts')
                .insert([{
                    ...newExpert,
                    image: imageUrl,
                    specialties: newExpert.specialties.split(',').map(s => s.trim()),
                    languages: newExpert.languages.split(',').map(l => l.trim()),
                    availability: {}
                }])
                .select();

            if (error) throw error;

            setExperts([data[0], ...experts]);
            setShowModal(false);
            setImageFile(null);
            setNewExpert({
                name: '',
                role: '',
                image: '',
                specialties: [],
                experience: '',
                education: '',
                languages: [],
                price: 0,
                about: '',
                status: 'pending'
            });
        } catch (error) {
            console.error('Error adding expert:', error);
        }
    };

    const handleStatusChange = async (expertId, newStatus) => {
        try {
            const { error } = await supabase
                .from('experts')
                .update({ status: newStatus })
                .eq('id', expertId);

            if (error) throw error;
            
            setExperts(experts.map(expert => 
                expert.id === expertId ? { ...expert, status: newStatus } : expert
            ));
        } catch (error) {
            console.error('Error updating expert status:', error);
        }
    };

    const handleDeleteExpert = async (id) => {
        try {
            const { error } = await supabase
                .from('experts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setExperts(experts.filter(expert => expert.id !== id));
        } catch (error) {
            console.error('Error deleting expert:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleEditExpert = async () => {
        try {
            let imageUrl = newExpert.image;
            
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { data, error } = await supabase
                .from('experts')
                .update({
                    ...newExpert,
                    image: imageUrl,
                    specialties: typeof newExpert.specialties === 'string' 
                        ? newExpert.specialties.split(',').map(s => s.trim())
                        : newExpert.specialties,
                    languages: typeof newExpert.languages === 'string'
                        ? newExpert.languages.split(',').map(l => l.trim())
                        : newExpert.languages
                })
                .eq('id', editingExpertId)
                .select();

            if (error) throw error;

            setExperts(experts.map(expert => 
                expert.id === editingExpertId ? data[0] : expert
            ));
            setShowModal(false);
            setIsEditing(false);
            setEditingExpertId(null);
            setNewExpert({
                name: '',
                role: '',
                image: '',
                specialties: [],
                experience: '',
                education: '',
                languages: [],
                price: 0,
                about: '',
                status: 'pending'
            });
        } catch (error) {
            console.error('Error updating expert:', error);
        }
    };

    const handleEditClick = (expert) => {
        setIsEditing(true);
        setEditingExpertId(expert.id);
        setNewExpert({
            ...expert,
            specialties: Array.isArray(expert.specialties) ? expert.specialties.join(', ') : expert.specialties,
            languages: Array.isArray(expert.languages) ? expert.languages.join(', ') : expert.languages
        });
        setShowModal(true);
    };

    if (loading) {
        return <div className="text-center py-4">Loading experts...</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Expert Management</h2>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setShowModal(true)}
                >
                    Add New Expert
                </button>
            </div>

            {/* Modal for adding new expert */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">
                            {isEditing ? 'Edit Expert' : 'Add New Expert'}
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-2 border rounded"
                                value={newExpert.name}
                                onChange={(e) => setNewExpert({...newExpert, name: e.target.value})}
                            />
                            <select
                                className="w-full p-2 border rounded"
                                value={newExpert.role}
                                onChange={(e) => setNewExpert({...newExpert, role: e.target.value})}
                            >
                                <option value="">Select Role</option>
                                <option value="Clinical Psychologist">Clinical Psychologist</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Relationship Counselor">Relationship Counselor</option>
                                <option value="Child Psychologist">Child Psychologist</option>
                                <option value="Addiction Specialist">Addiction Specialist</option>
                                <option value="Stress Management Expert">Stress Management Expert</option>
                            </select>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Expert Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImageFile(file);
                                        setNewExpert({
                                            ...newExpert,
                                            image: file ? URL.createObjectURL(file) : ''
                                        });
                                    }}
                                    className="w-full p-2 border rounded"
                                />
                                {newExpert.image && (
                                    <div className="mt-2">
                                        <img
                                            src={newExpert.image}
                                            alt="Preview"
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                placeholder="Specialties (comma-separated)"
                                className="w-full p-2 border rounded"
                                value={newExpert.specialties}
                                onChange={(e) => setNewExpert({...newExpert, specialties: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Experience (e.g., 10+ Years)"
                                className="w-full p-2 border rounded"
                                value={newExpert.experience}
                                onChange={(e) => setNewExpert({...newExpert, experience: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Education"
                                className="w-full p-2 border rounded"
                                value={newExpert.education}
                                onChange={(e) => setNewExpert({...newExpert, education: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Languages (comma-separated)"
                                className="w-full p-2 border rounded"
                                value={newExpert.languages}
                                onChange={(e) => setNewExpert({...newExpert, languages: e.target.value})}
                            />
                            <input
                                type="number"
                                placeholder="Consultation Price"
                                className="w-full p-2 border rounded"
                                value={newExpert.price}
                                onChange={(e) => setNewExpert({...newExpert, price: parseFloat(e.target.value)})}
                            />
                            <textarea
                                placeholder="About"
                                className="w-full p-2 border rounded"
                                rows="4"
                                value={newExpert.about}
                                onChange={(e) => setNewExpert({...newExpert, about: e.target.value})}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                onClick={() => {
                                    setShowModal(false);
                                    setIsEditing(false);
                                    setEditingExpertId(null);
                                    setNewExpert({
                                        name: '',
                                        role: '',
                                        image: '',
                                        specialties: [],
                                        experience: '',
                                        education: '',
                                        languages: [],
                                        price: 0,
                                        about: '',
                                        status: 'pending'
                                    });
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={isEditing ? handleEditExpert : handleAddExpert}
                            >
                                {isEditing ? 'Save Changes' : 'Add Expert'}
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
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Specialties
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
                                <td className="px-6 py-4 whitespace-nowrap">{expert.role}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {expert.specialties.map((specialty, index) => (
                                            <span 
                                                key={index}
                                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(expert.status)}`}
                                        value={expert.status}
                                        onChange={(e) => handleStatusChange(expert.id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{expert.rating}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button 
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        onClick={() => handleEditClick(expert)}
                                    >
                                        Edit
                                    </button>
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