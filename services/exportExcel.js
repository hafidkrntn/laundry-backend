import express from "express";
import Excel from "exceljs";
import DataLaundry from "../models/dataModel.js";
import Transaksi from "../models/transaksiModel.js";

const router = express.Router();

router.get("/datalaundry/excel", async (req, res) => {
  const data = await DataLaundry.find({
    attributes: ["kode", "nama_paket", "harga"],
  });
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Data Laundry", {
    headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" },
  });
  worksheet.columns = [
    { header: "Kode", key: "kode", width: 10 },
    { header: "Nama Paket", key: "nama_paket", width: 25 },
    { header: "Harga", key: "harga", width: 12 },
  ];
  data.map((value, idx) => {
    worksheet.addRow({
      kode: value.kode,
      nama_paket: value.nama_paket,
      harga: value.harga,
    });
  });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment;filename=" + "DataLaundry.xlsx"
  );
  await workbook.xlsx.write(res);
  res.send();
});

router.get("/transaksi/excel", async (req, res) => {
  const data = await Transaksi.find({
    attributes: [
      "tanggal_masuk",
      "customer",
      "paket",
      "berat",
      "harga",
      "total",
    ],
  });
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Data Transaksi");
  worksheet.columns = [
    { header: "Tanggal Masuk", key: "tanggal_masuk", width: 15 },
    { header: "Nama Customer", key: "customer", width: 18 },
    { header: "Paket", key: "paket", width: 11 },
    { header: "Harga", key: "harga", width: 12 },
    { header: "Total", key: "total", width: 12 },
    { header: "Pembayaran", key: "pembayaran", width: 20 },
    { header: "Total Keseluruhan", key: "alltotal", width: 20 },
  ];

  data.map((value, idx) => {
    worksheet.addRow({
      tanggal_masuk: value.tanggal_masuk,
      customer: value.customer,
      paket: value.paket,
      harga: value.harga,
      total: value.total,
      pembayaran: value.pembayaran ? "Lunas" : "Belum Lunas",
    });
  });

  const columnValues = worksheet.getColumn(5).values;
  let notNumber = (n) => (isNaN(n) ? 0 : n);
  const initialValues = 0;
  const alltotal = columnValues.reduce(
    (sum, value) => notNumber(sum) + notNumber(value),
    initialValues
  );
  worksheet.addRow({ alltotal: alltotal });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment;filename=" + "DataTransaksi.xlsx"
  );
  await workbook.xlsx.write(res);
  res.send();
});

export default router;
