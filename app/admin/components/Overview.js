// app/admin/components/Overview.js
'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function Overview() {
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeUsers: 0,
        pendingApprovals: 0
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();

    useEffect(() => {
        fetchStats();
        fetchRecentActivities();
    }, []);

    const fetchStats = async () => {
        try {
            // Get total bookings
            const { count: totalBookings } = await supabase
                .from('bookings')
                .select('*', { count: 'exact' });

            // Get total revenue
            const { data: revenueData } = await supabase
                .from('bookings')
                .select('amount')
                .eq('payment_status', 'paid');
            
            const totalRevenue = revenueData?.reduce((sum, booking) => sum + (booking.amount || 0), 0) || 0;

            // Get active users count (users who have logged in within last 24 hours)
            const { count: activeUsers } = await supabase
                .from('users')
                .select('*', { count: 'exact' })
                .gte('last_login', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

            // Get pending approvals (experts with pending status)
            const { count: pendingApprovals } = await supabase
                .from('experts')
                .select('*', { count: 'exact' })
                .eq('status', 'Pending');

            setStats({
                totalBookings: totalBookings || 0,
                totalRevenue: totalRevenue,
                activeUsers: activeUsers || 0,
                pendingApprovals: pendingApprovals || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchRecentActivities = async () => {
        try {
            // Fetch recent bookings with user and expert details
            const { data: recentBookings, error } = await supabase
                .from('bookings')
                .select(`
                    id,
                    status,
                    created_at,
                    users:user_id (first_name, last_name),
                    experts:expert_id (name)
                `)
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;

            // Transform bookings into activity format
            const activities = recentBookings.map(booking => ({
                id: booking.id,
                type: `New Booking - ${booking.status}`,
                name: `${booking.users.first_name} ${booking.users.last_name} with ${booking.experts.name}`,
                time: new Date(booking.created_at).toLocaleString()
            }));

            setRecentActivities(activities);
        } catch (error) {
            console.error('Error fetching recent activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    if (loading) {
        return <div className="text-center py-4">Loading dashboard data...</div>;
    }

    return (
        <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm">Total Bookings</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                    <span className="text-green-600 text-sm">↑ This Month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                    <span className="text-green-600 text-sm">↑ This Month</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 text-sm">Active Users</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                    <span className="text-blue-600 text-sm">Last 24 Hours</span>
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