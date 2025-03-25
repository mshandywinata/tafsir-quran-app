async function cariTafsir() {
    let inputAyat = document.getElementById("inputAyat").value;
    let inputSurat = document.getElementById("inputSurat").value;
    let hasilTafsir = document.getElementById("hasilTafsir");

    if (!inputAyat || !inputSurat) {
        hasilTafsir.innerHTML = "<p class='text-red-500'>Masukkan nomor surat dan ayat!</p>";
        return;
    }

    try {
        let baseUrl = window.location.origin;
        let response = await fetch(`${baseUrl}/${inputSurat}/${inputAyat}`);
        let data = await response.json();

        if (data.ayat) {
            hasilTafsir.innerHTML = `
                <div class="text-left card bg-base-100 w-250 shadow-sm">
                    <div class="card-body">
                        <h1 class="text-center font-bold text-2xl mb-5">${data.surat}</h1>
                        <h2 class="text-right font-bold text-2xl mb-5">
                        ${data.ayat}
                            <div class="badge badge-primary">${inputAyat}</div>
                        </h2>
                    </div>
                </div>

                <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
                    <input type="radio" name="my-accordion-2" checked="checked" />
                    <div class="collapse-title font-semibold">Terjemahan</div>
                    <div class="collapse-content text-sm italic">"${data.terjemahan}"</div>
                </div>

                <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
                    <input type="radio" name="my-accordion-2" />
                    <div class="collapse-title font-semibold">Tafsir Kemenag RI</div>
                    <div class="collapse-content text-sm">${data.tafsirKemenag}</div>
                </div>

                <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
                    <input type="radio" name="my-accordion-2" />
                    <div class="collapse-title font-semibold">Tafsir Quraish</div>
                    <div class="collapse-content text-sm">${data.tafsirQuraish}</div>
                </div>
            `;
        } else {
            hasilTafsir.innerHTML = "<p class='text-red-500 text-center'>Tafsir tidak ditemukan.</p>";
        }
    } catch (error) {
        hasilTafsir.innerHTML = "<p class='text-red-500 text-center'>Terjadi kesalahan!</p>";
    }
}
