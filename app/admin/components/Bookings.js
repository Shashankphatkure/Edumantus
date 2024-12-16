// app/admin/components/Bookings.js
'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

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
                                        <button 
                                            onClick={() => handleViewDetails(booking)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Booking Details</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Booking ID</p>
                                <p className="font-medium">#{selectedBooking.id}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Status</p>
                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(selectedBooking.status)}`}>
                                    {selectedBooking.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-600">User</p>
                                <p className="font-medium">
                                    {selectedBooking.users?.first_name} {selectedBooking.users?.last_name}
                                </p>
                                <p className="text-sm text-gray-500">{selectedBooking.users?.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Expert</p>
                                <p className="font-medium">{selectedBooking.experts?.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Date & Time</p>
                                <p className="font-medium">
                                    {new Date(selectedBooking.booking_date).toLocaleDateString()} {selectedBooking.booking_time}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600">Payment Status</p>
                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                    selectedBooking.payment_status === 'paid' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {selectedBooking.payment_status}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-600">Amount</p>
                                <p className="font-medium">₹{selectedBooking.amount}</p>
                            </div>
                            {selectedBooking.meeting_link && (
                                <div className="col-span-2">
                                    <p className="text-gray-600">Meeting Link</p>
                                    <a 
                                        href={selectedBooking.meeting_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {selectedBooking.meeting_link}
                                    </a>
                                </div>
                            )}
                            {selectedBooking.notes && (
                                <div className="col-span-2">
                                    <p className="text-gray-600">Notes</p>
                                    <p className="font-medium">{selectedBooking.notes}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <select
                                className="px-4 py-2 border rounded-lg"
                                value={selectedBooking.status}
                                onChange={(e) => {
                                    handleStatusChange(selectedBooking.id, e.target.value);
                                    setSelectedBooking({
                                        ...selectedBooking,
                                        status: e.target.value
                                    });
                                }}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}