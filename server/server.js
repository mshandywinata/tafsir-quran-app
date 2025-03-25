const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/:surat/:ayat", async (req, res) => {
    try {
        let surat = req.params.surat;
        let ayat = req.params.ayat;
        
        // Fetch ayat details
        let ayatResponse = await axios.get(`https://quran-api-id.vercel.app/surahs/${surat}/ayahs/${ayat}`);
        
        // Fetch surat title
        let suratResponse = await axios.get(`https://quran-api-id.vercel.app/surahs/${surat}`);

        res.json({
            surat: suratResponse.data.name,
            ayat: ayatResponse.data.arab,
            terjemahan: ayatResponse.data.translation,
            tafsirKemenag: ayatResponse.data.tafsir.kemenag.short,
            tafsirQuraish: ayatResponse.data.tafsir.quraish
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil tafsir" });
    }
});

app.listen(3000, () => console.log("Server berjalan di port 3000"));
