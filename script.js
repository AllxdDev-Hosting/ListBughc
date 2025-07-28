document.addEventListener('DOMContentLoaded', () => {
    const totalBugsEl = document.getElementById('total-bugs');
    const bugListEl = document.getElementById('bug-list');

    // Mengambil data dari file data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 1. Update Dashboard
            totalBugsEl.textContent = data.length;

            // 2. Tampilkan semua bug
            if (data.length === 0) {
                bugListEl.innerHTML = '<p>Belum ada bug yang terdaftar.</p>';
                return;
            }

            // Kosongkan daftar sebelum mengisi
            bugListEl.innerHTML = '';

            data.forEach(bug => {
                const card = document.createElement('div');
                card.className = 'bug-card';

                // Tentukan kelas untuk warna teks wildcard
                const wildcardClass = bug.wildcard.toLowerCase() === 'ya' ? 'wildcard-yes' : 'wildcard-no';

                card.innerHTML = `
                    <h3>${bug.provider} - ${bug.namaKouta}</h3>
                    <p><strong>Mode:</strong> ${bug.mode}</p>
                    <p><strong>Port:</strong> ${bug.port}</p>
                    <p><strong>Payload:</strong> ${bug.payload}</p>
                    <p><strong>Proxy:</strong> ${bug.proxy}</p>
                    <p><strong>SSL/SNI:</strong> ${bug.ssl}</p>
                    <p><strong>Wildcard:</strong> <span class="${wildcardClass}">${bug.wildcard}</span></p>
                `;
                bugListEl.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching bug data:', error);
            bugListEl.innerHTML = '<p>Gagal memuat data bug. Silakan coba lagi nanti.</p>';
        });
});
