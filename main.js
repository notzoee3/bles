const axios = require("axios");
const fs = require("fs");

// Konfigurasi
const NODES = [
    { id: "12D3KooWGkV18YBAKSSam7YSPhUvPixnrgNYHSebc4DX8Ki9sZ4S", session: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MjIyZmNkYzNiMzhiNzA1YjUyNTYiLCJwdWJsaWNBZGRyZXNzIjoiNExQM0QzeWQ5MjhYTmI2S3NGTXl1N2QyallMaGFLV0ZDZ2hIeFdYdm1Ra2MiLCJ3YWxsZXRUeXBlIjoic29sYW5hIiwiaWF0IjoxNzM3MDQxMDA5LCJleHAiOjE3Njg1OTg2MDl9.L25xEpgSQT97" },
]; // Tambahkan node ID dan session ID sesuai kebutuhan

const PING_URL = "https://google.com/ping"; // Ganti dengan endpoint ping yang sesuai
const CHECK_INTERVAL = 2 * 60 * 1000; // Interval pengecekan (120.000 ms = 2 menit)

// Fungsi untuk mengecek status node
async function checkNodeStatus(node) {
    try {
        const response = await axios.get(`${PING_URL}?node=${node.id}`);
        if (response.data.status === "online") {
            console.log(`[✓] Node ${node.id} ONLINE`);
            return "ONLINE";
        } else {
            console.log(`[X] Node ${node.id} OFFLINE`);
            return "OFFLINE";
        }
    } catch (error) {
        console.log(`[X] Node ${node.id} ERROR`);
        return "ERROR";
    }
}

// Fungsi untuk monitoring session ID
async function checkSessionStatus(node) {
    // Simulasikan pengecekan session ID (bisa disesuaikan dengan API yang tersedia)
    if (node.session.startsWith("session_")) {
        console.log(`[✓] Session ${node.session} VALID`);
        return "VALID";
    } else {
        console.log(`[X] Session ${node.session} INVALID`);
        return "INVALID";
    }
}

// Fungsi utama monitoring
async function monitor() {
    console.log("Memulai monitoring airdrop...\n");
    while (true) {
        let logData = `\n[${new Date().toISOString()}] Monitoring Airdrop:\n`;

        for (const node of NODES) {
            const nodeStatus = await checkNodeStatus(node);
            const sessionStatus = await checkSessionStatus(node);
            logData += `Node ID: ${node.id} - Status: ${nodeStatus}\n`;
            logData += `Session ID: ${node.session} - Status: ${sessionStatus}\n`;
        }

        // Simpan log ke file
        fs.appendFileSync("monitor_log.txt", logData, "utf8");

        console.log("\nMenunggu sebelum pengecekan ulang (2 menit)...\n");
        await new Promise((resolve) => setTimeout(resolve, CHECK_INTERVAL));
    }
}

// Jalankan monitoring
monitor();
