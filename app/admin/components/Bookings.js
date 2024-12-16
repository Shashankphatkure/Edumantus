// app/admin/components/Bookings.js
'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const supabase = createClientComponentClient();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            let { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('*')
                .order('booking_date', { ascending: false });

            if (bookingsError) throw bookingsError;

            // Fetch user and expert details for each booking
            const bookingsWithDetails = await Promise.all(
                bookingsData.map(async (booking) => {
                    // Fetch user details
                    const { data: userData, error: userError } = await supabase
                        .from('users')
                        .select('first_name, last_name, email')
                        .eq('id', booking.user_id)
                        .single();

                    if (userError) throw userError;

                    // Fetch expert details
                    const { data: expertData, error: expertError } = await supabase
                        .from('experts')
                        .select('name')
                        .eq('id', booking.expert_id)
                        .single();

                    if (expertError) throw expertError;

                    return {
                        ...booking,
                        users: userData,
                        experts: expertData
                    };
                })
            );

            setBookings(bookingsWithDetails);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', bookingId);

            if (error) throw error;
            
            // Update local state
            setBookings(bookings.map(booking => 
                booking.id === bookingId ? { ...booking, status: newStatus } : booking
            ));
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const filteredBookings = statusFilter === 'all' 
        ? bookings 
        : bookings.filter(booking => booking.status === statusFilter);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Booking Management</h2>
                <div className="flex space-x-4">
                    <select 
                        className="px-4 py-2 border rounded-lg"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Export Bookings
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-4">Loading bookings...</div>
            ) : (
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
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        #{booking.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.users?.first_name} {booking.users?.last_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.experts?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(booking.booking_date).toLocaleDateString()} {booking.booking_time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                            booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {booking.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className="mr-2 border rounded p-1"
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        <button className="text-blue-600 hover:text-blue-900">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}