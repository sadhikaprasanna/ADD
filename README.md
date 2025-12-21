# ADD
💊 Automatic Drug Dispenser System

An Automatic Drug Dispenser is a smart healthcare application designed to automate the medicine dispensing process using QR codes, email notifications, and a full-stack web system integrated with hardware. The system reduces manual errors, pharmacy queue time, and ensures accurate medication delivery to patients.

🚀 Project Overview

The system allows doctors to generate digital prescriptions, which are converted into QR codes and sent to the patient’s email. The patient scans the QR code at the dispenser, and the required medicines are automatically dispensed using a Raspberry Pi–controlled mechanism.

🎯 Key Objectives

Eliminate manual prescription handling

Reduce waiting time in pharmacies

Prevent incorrect medicine dispensing

Enable secure and contactless medicine delivery

Digitize healthcare workflows

🛠️ Tech Stack
Frontend

React.js

HTML, CSS, JavaScript

Bootstrap

Backend

Node.js

Express.js

Database

MongoDB (Atlas)

Hardware

Raspberry Pi

Motor drivers

Sensors for dispensing control

Other Tools & Technologies

QR Code Generation

Email Service (SMTP / Resend)

REST APIs

⚙️ System Workflow

Doctor logs into the web application

Prescription is created digitally

System generates a QR code for the prescription

QR code is emailed to the patient

Patient scans QR code at the dispenser

Raspberry Pi validates the prescription

Medicines are dispensed automatically
