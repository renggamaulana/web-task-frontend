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
import MainContainer from '../components/MainContainer';
import { useNavigate } from 'react-router-dom';
// import Swal from "sweetalert2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [salesData, setSalesData] = useState({ categories: [] });
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSales();
    }, []);

    const formatDateToLocal = (date) => {
        if (!date) return null;
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];
    };

    const fetchSales = async () => {
        setLoading(true);
        const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8000/api/sales"}/summary`;
        try {
            const params = {};
            if (startDate && endDate) {
                console.log("Start Date:", formatDateToLocal(startDate));
                console.log("End Date:", formatDateToLocal(endDate));
                params.start_date = formatDateToLocal(startDate);
                params.end_date = formatDateToLocal(endDate);
            }
            const response = await axios.get(API_URL, { params });
            if (response.data.error) {
                setError(true);
                setSalesData({ categories: [] }); // Reset data jika error
            } else {
                setSalesData(response.data.data || { categories: [] }); // Pastikan categories tidak undefined
            }
        } catch (error) {
            setError(true);
            setSalesData({ categories: [] }); // Reset data jika terjadi error
            console.error('Error fetching sales data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 50%)`;

    // Pastikan categories selalu array kosong jika `salesData.categories` tidak ada
    const categories = salesData.categories?.map(item => item.category) ?? [];
    const colors = categories.map(() => getRandomColor());

    const chartData = {
        labels: categories,
        datasets: [{
            label: 'Total Terjual',
            data: salesData.categories?.map(item => item.total_sold) ?? [],
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('50%', '40%')), 
            borderWidth: 1,
        }]
    };

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <MainContainer>
                {loading ? (
                    <p className='text-white'>Loading...</p>
                ) : (
                    <div className="mt-8 bg-black/30 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-center">Grafik Penjualan Berdasarkan Jenis Barang</h2>
                        {chartData.labels.length > 0 ? (
                            <>
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
                                        className="p-2 bg-blue-500/20 hover:bg-blue-600/50 text-white rounded-lg cursor-pointer font-semibold"
                                    >
                                        Filter
                                    </button>
                                </div>
                                {startDate && endDate && (
                                    <p className="text-gray-300 mb-4 text-sm">
                                        Periode: {startDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })} - {endDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                )}
                                <Bar data={chartData} />
                            </>
                        ) : (
                            <p className="text-gray-300 text-center">Data penjualan tidak tersedia</p>
                        )}
                    </div>
                )}
            </MainContainer>
        </div>
    );
}

export default Dashboard;
