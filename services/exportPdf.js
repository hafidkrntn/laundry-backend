import express from "express";
import PDFDocument from "pdfkit-table";
import fs from "fs";
import Transaksi from "../models/transaksiModel.js";

const router = express.Router();

router.get("/pdf/:id", async (req, res) => {
  const data = await Transaksi.findById(req.params.id);
  const date = new Date(data.createdAt).toLocaleDateString();
  const doc = new PDFDocument({ size: "A4" });

  doc.pipe(fs.createWriteStream("invoice.pdf"));

  // Embed a font, set the font size, and render some text
  doc
    .fillColor("#000000")
    .fontSize(18)
    .text("Laundry Express", { width: 410, align: "center" })
    .moveDown()
    .fontSize(10)
    .text("Laundry Express Poris Indah", { width: 410, align: "left" })
    .text("Telepon: 0895-0264-4988", { width: 410, align: "left" })
    .text(
      "Alamat: Jl. Maulana Hasanudin, RT.005/RW.007, Poris Jaya, Kec. Batuceper, Kota Tangerang, Banten 15122",
      { width: 410, align: "left" }
    )
    .moveDown()
    .fontSize(10)
    .text("Customer :")
    .text(`${data.customer}`)
    .text(`${date}`)
    .moveDown();

  const table = {
    headers: [
      { label: "Nama Paket", property: "paket", width: 100 },
      { label: "Berat", property: "berat", width: 100 },
      { label: "Pembayaran", property: "harga", width: 100 },
      { label: "Total", property: "total", width: 100 },
    ],
    rows: [],
    options: {
      width: 1200,
    },
  };

  table.rows.push([data.paket, data.berat, data.harga, data.total]);

  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
  });

  doc
    .moveDown()
    .fontSize(10)
    .text("Keterangan")
    .text("- Pengambilan cucian harus membawa nota")
    .text("- Cuci luntur bukan tanggung jawab kami")
    .text("- Hitung dan periksa sebelum pergi")
    .text(
      "- Klaim kekurangan/kehilangan cucian setelah meninggalkan laundry tidak dilayani"
    );

  // Finalize the PDF and end the stream
  doc.end();

  res.download(`${process.cwd()}/invoice.pdf`);
});

export default router;
