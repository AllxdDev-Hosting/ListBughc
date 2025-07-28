// Konfigurasi Supabase
const SUPABASE_URL = 'https://niwrvjxaweawlrjjnlll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pd3J2anhhd2Vhd2xyampubGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTEzMzgsImV4cCI6MjA2OTI4NzMzOH0.mfkSh0m2zVAAMJEr6EXPJThdpYjfRISZ9vSM_DcuxyA';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Elemen Konten Utama
const contentArea = document.getElementById('content-area');

// Konten Halaman Dashboard
const dashboardHTML = `
<div class="dashboard-content">
🔥 DOR KUOTA XL OTOMATIS 24 JAM 🔥
📲 Tanpa nunggu admin, langsung masuk!

🌐 Website:
<a href="https://xl-didor.allxddev.my.id" target="_blank">https://xl-didor.allxddev.my.id</a>
📢 Notifikasi pembelian:
<a href="https://t.me/allxdinfo" target="_blank">https://t.me/allxdinfo</a>

〽️ LIST KUOTA:
• 🎥 VIDIO — 29.5K
• 🚀 XUTS — 20–25K
• 📱 XUTP — 25–30K
• 🌐 XUT Campuran — 30–40K
• 👥 Anggota Akrab — 30–100K
• 🕐 Bekas Akrab (5–19 Hari) — 5–35K

💳 Topup via QRIS Otomatis
✅ Full Otomatis, 24 Jam Online

📌 Metode Beli XUT & Addon:
<a href="https://xl-didor.allxddev.my.id/Metode-BuyKouta" target="_blank">https://xl-didor.allxddev.my.id/Metode-BuyKouta</a>

🛡️ VPN / CONFIG SINGAPORE:
• 7 Hari = 3K
• 15 Hari = 5K
• 30 Hari = 10K

🛡️ VPN / CONFIG INDONESIA:
• 7 Hari = 5K
• 15 Hari = 7K
• 30 Hari = 13K

🔗 Tersedia: SSH, Vmess, Vless, Trojan
🌍 Support: Wildcard

💬 Butuh bantuan?
Chat Admin 👉 <a href="https://wa.me/6288297793616" target="_blank">https://wa.me/6288297793616</a>

👥 Join Grup Diskusi:
📌 Grup 1: <a href="https://chat.whatsapp.com/GMlMlZHaAXM7lproXEPdSU" target="_blank">Join Grup 1</a>
📌 Grup 2: <a href="https://chat.whatsapp.com/HDSKZLKwVLy2LpFGNRfzoY" target="_blank">Join Grup 2</a>
📌 Testimoni Vpn Dll:
<a href="https://whatsapp.com/channel/0029Vb5ZH4MC1Fu7CM3opE3e" target="_blank">Lihat Testimoni VPN</a>
📌 Testimoni Website:
<a href="https://t.me/allxdinfo" target="_blank">Lihat Testimoni Website</a>

_Semua transaksi tanpa ribet, tinggal klik, bayar, langsung aktif! 🚀_
🔥 ALLXDDEV SYSTEM — CEPAT & OTOMATIS 🔥
</div>
`;

// Fungsi untuk menampilkan halaman
function showPage(pageName) {
    if (pageName === 'dashboard') {
        contentArea.innerHTML = dashboardHTML;
    }
    // Update link aktif di navigasi
    updateActiveLink(pageName);
}

// Fungsi untuk menampilkan data bug dari Supabase
async function showBugs(provider) {
    contentArea.innerHTML = `<h2>Loading data untuk ${provider}...</h2>`;
    
    const { data, error } = await supabase
        .from('bugs')
        .select('*')
        .eq('provider', provider)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bugs:', error);
        contentArea.innerHTML = `<p>Gagal memuat data. Coba lagi nanti.</p>`;
        return;
    }

    if (data.length === 0) {
        contentArea.innerHTML = `<h2>Belum ada bug terdaftar untuk ${provider}</h2>`;
        return;
    }

    let bugHTML = `<div id="bug-list">`;
    data.forEach(bug => {
        bugHTML += `
            <div class="bug-card">
                <h3>${bug.provider} - ${bug.nama_kouta}</h3>
                <p><strong>Mode:</strong> ${bug.mode}</p>
                <p><strong>Port:</strong> ${bug.port}</p>
                <p><strong>Payload:</strong> ${bug.payload}</p>
                <p><strong>Proxy:</strong> ${bug.proxy}</p>
                <p><strong>SSL/SNI:</strong> ${bug.ssl}</p>
                <p><strong>Wildcard:</strong> ${bug.wildcard}</p>
            </div>
        `;
    });
    bugHTML += `</div>`;

    contentArea.innerHTML = bugHTML;
    updateActiveLink(provider);
}

// Fungsi untuk menandai link navigasi yang aktif
function updateActiveLink(pageIdentifier) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Cocokkan teks link (case-insensitive) dengan identifier halaman
        if (link.textContent.toLowerCase() === pageIdentifier.toLowerCase()) {
            link.classList.add('active');
        }
    });
}


// Tampilkan halaman dashboard saat pertama kali web dibuka
document.addEventListener('DOMContentLoaded', () => {
    showPage('dashboard');
});
