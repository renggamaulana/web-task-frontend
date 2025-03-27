import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        fetchSales();
    }, []);
    const fetchSales = async () => {
        setLoading(true);
        try {
            const params = {};
            if (startDate && endDate) {
                params.start_date = startDate.toISOString().split('T')[0];
                params.end_date = endDate.toISOString().split('T')[0];
            }
            const response = await axios.get('http://localhost:8000/api/sales/comparison', { params });
            setSalesData(response.data.data);
        } catch (error) {
            console.error('Error fetching sales data:', error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <p>Loading...</p>;

    const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 50%)`;

    const categories = salesData.categories.map(item => item.category);
    const colors = categories.map(() => getRandomColor());

    const chartData = {
        labels: categories,
        datasets: [{
            label: 'Total Terjual',
            data: salesData.categories.map(item => item.total_sold),
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('50%', '40%')), // Buat border lebih gelap
            borderWidth: 1,
        }]
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="mb-4 flex gap-4">
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Bulan/Tanggal/Tahun"
                    className="p-2 bg-white text-black rounded"
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Bulan/Tanggal/Tahun"
                    className="p-2 bg-white text-black rounded"
                />
                <button
                    onClick={fetchSales}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Filter
                </button>
            </div>

            <div className="mt-8 bg-black/30 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Grafik Penjualan Berdasarkan Jenis Barang</h2>
                <Bar data={chartData} />
            </div>
        </div>
    );
}

export default Dashboard;
