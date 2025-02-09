const axios = require("axios");
const fs = require("fs");

// Konfigurasi API
const BASE_URL = "https://gateway-run.bls.dev/api/v1"; // Base URL API Bless Network
const NODE_ID = "12D3KooWGkV18YBAKSSam7YSPhUvPixnrgNYHSebc4DX8Ki9sZ4S"; // Ganti dengan Node ID kamu
const API_ENDPOINT = `${BASE_URL}/nodes/${NODE_ID}`; // Endpoint untuk monitoring node
const REFRESH_INTERVAL = 2 * 60 * 1000; // Interval 2 menit
const LOG_FILE = "monitor_log.txt"; // Nama file log

// Fungsi untuk mengecek status node
async function checkNodeStatus() {
    try {
        const response = await axios.get(API_ENDPOINT);
        const data = response.data; // Data dari API
        const status = data.status || "unknown"; // Ambil status dari response
        const timestamp = new Date().toISOString();

        // Log ke terminal
        console.log(`[${timestamp}] Node ${NODE_ID}: ${status.toUpperCase()}`);

        // Simpan log ke file
        fs.appendFileSync(LOG_FILE, `[${timestamp}] Node ${NODE_ID}: ${status.toUpperCase()}\n`);
    } catch (error) {
        console.error(`[Error] Tidak bisa mengakses API: ${error.message}`);
    }
}

// Fungsi untuk memulai monitoring
async function startMonitoring() {
    console.log("Memulai monitoring Node ID...");
    while (true) {
        await checkNodeStatus();
        console.log("Menunggu 2 menit sebelum pengecekan ulang...\n");
        await new Promise((resolve) => setTimeout(resolve, REFRESH_INTERVAL));
    }
}

// Jalankan monitoring
startMonitoring();
