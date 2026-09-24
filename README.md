# Smart Grievance Redressal System

## Overview

**Smart Grievance Redressal System** is an AI-assisted grievance redressal platform designed to make the process of submitting, classifying, and managing citizen complaints more efficient.

The system allows users to submit their grievances through a web interface. The submitted complaint can then be analyzed and classified according to its category, priority, and other relevant attributes. An admin portal is provided to help authorities view and manage submitted grievances.

The project combines a modern web application with machine learning and natural language processing techniques to support automated grievance analysis.

---

## Key Features

### 👤 Citizen Portal
- Submit grievances through an easy-to-use interface.
- Enter complaint details and relevant information.
- Track submitted grievance information.
- Receive classification and recommended resolution information.

### 🤖 AI-Based Grievance Analysis
- Automatically processes the text of a grievance.
- Classifies complaints into predefined categories.
- Identifies the priority/criticality of a complaint.
- Performs text preprocessing using NLP techniques.
- Generates solution recommendations using an LLM-based approach.

### 🛠️ Admin Portal
- View submitted grievances.
- Analyze grievance categories and priorities.
- Manage complaints from a centralized dashboard.
- Take appropriate action based on the classified grievance.

### 🗄️ Database Management
- Stores grievance-related information in MongoDB.
- Maintains user and complaint data for further processing and management.

---

## System Architecture

The application consists of three major components:

```text
                ┌─────────────────────┐
                │    Citizen/User     │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    Frontend_new     │
                │   User Interface    │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Backend        │
                │ API & Application   │
                │      Logic          │
                └───────┬─────┬───────┘
                        │     │
              ┌─────────┘     └──────────┐
              ▼                          ▼
       ┌──────────────┐          ┌────────────────┐
       │   MongoDB    │          │ ML/NLP Module  │
       │   Database   │          │ Classification │
       └──────────────┘          └───────┬────────┘
                                         │
                                         ▼
                                  ┌──────────────┐
                                  │ Admin Portal │
                                  └──────────────┘

Smart Grievance Redressal System/
│
├── Frontend_new/
│   └── User-facing web application
│
├── admin_portal/
│   └── Admin dashboard and grievance management
│
├── backend/
│   └── Backend APIs and application logic
│
├── category.py
│   └── Grievance classification related logic
│
├── otp.py
│   └── OTP-related functionality
│
├── Data Cleaning.ipynb
│   └── Dataset cleaning and preprocessing
│
├── package.json
├── package-lock.json
└── README.md
