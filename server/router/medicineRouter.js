const express = require('express');
const router = express.Router();
const Prescription = require('../model/prescriptionModel');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Resend } = require('resend');
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate unique Group ID
const generateGroupId = () => uuidv4();

router.post('/add-all-details', async (req, res) => {
  try {
    console.log("Prescription API hit");

    const { name, email, symptoms: rawSymptoms, medicines, groupId } = req.body;

    if (!name || !email || !rawSymptoms || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ error: 'Invalid request.' });
    }

    const newGroupId = groupId || generateGroupId();
    const symptoms = rawSymptoms.split(',').map(s => s.trim());

    if (!medicines.every(med => /^\d+$/.test(med.quantity))) {
      return res.status(400).json({ error: 'Medicine quantity must be numeric.' });
    }

    // QR code
    const qrData = JSON.stringify(medicines);
    const qrDataUrl = await QRCode.toDataURL(qrData);
    const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");

    console.log("3. QR Generated");

    // Save to database
    const savedDetails = await Prescription.create({
      patientDetails: { name, email, symptoms, groupId: newGroupId },
      medicines,
      qrCode: qrBuffer
    });

    // PDF Path (Render-safe temp dir)
    const pdfPath = `/tmp/prescription_${newGroupId}.pdf`;

    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfPath);

    pdfDoc.pipe(pdfStream);

    pdfDoc.fontSize(20).text('Prescription Details', { align: 'center', underline: true }).moveDown();
    pdfDoc.fontSize(14);
    pdfDoc.text(`Patient Name: ${name}`).moveDown();
    pdfDoc.text(`Email: ${email}`).moveDown();
    pdfDoc.text(`Symptoms: ${symptoms.join(', ')}`).moveDown();
    pdfDoc.text(`Group ID: ${newGroupId}`).moveDown();
    pdfDoc.text('Medicines:').moveDown();
    medicines.forEach(m => pdfDoc.text(`${m.medicine}: ${m.quantity}`).moveDown());

    pdfDoc.image(qrBuffer, { fit: [180, 180], align: 'center' }).moveDown();

    pdfDoc.end();
    console.log("4. PDF writing started");

    pdfStream.on("finish", async () => {
      console.log("5. PDF finished — sending email with Resend...");

      try {
        const attachmentFile = fs.readFileSync(pdfPath);

        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: "Your Prescription Details",
          text: "Please find your prescription PDF attached.",
          attachments: [
            {
              filename: `prescription_${newGroupId}.pdf`,
              content: attachmentFile.toString("base64"),
              contentType: "application/pdf"
            }
          ]
        });

        console.log("Email sent successfully via Resend");

        fs.unlinkSync(pdfPath); // cleanup

        return res.status(201).json({
          message: "Prescription saved and email sent successfully via Resend.",
          details: savedDetails,
          groupId: newGroupId,
        });

      } catch (emailErr) {
        console.error("Email error:", emailErr);
        return res.status(500).json({ error: "Failed to send email using Resend." });
      }
    });

  } catch (err) {
    console.error("Route error:", err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
