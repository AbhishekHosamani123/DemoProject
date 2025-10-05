# INERA BI Navigator

Welcome to INERA Navigator, an intelligent Business Intelligence (BI) platform designed to transform your business data into actionable insights. This application leverages generative AI to provide data analysis, forecasting, and automated document generation, helping you make smarter, data-driven decisions.

## Core Features

- **AI-Powered Data Analysis**: Upload your business data (CSV, XLSX) and receive high-level insights, key trends, and potential issues identified by our generative AI.
- **Advanced Analytics Suite**: Dive deep into your data with a comprehensive set of tools:
    - **Forecasting Analyst**: Predict future sales, customer behavior, and inventory needs.
    - **Problem & Suggestion Engine**: Automatically identifies business problems from your data and provides AI-powered solutions.
    - **Visuals & Dashboards**: Create custom charts, KPIs, and interactive dashboards to monitor performance.
    - **Audit Zone**: Access a tailored compliance dashboard with company-specific rules, laws, and regulatory updates.
- **Automated Document Generation**: Create professionally formatted documents like Business Requirement Documents (BRDs) and presentations (PPTs) directly from your data and analyses.
- **Collaboration & Sharing**: Securely share insights, reports, and daily updates with your team.
- **Multi-faceted Signup Flow**: A guided, multi-step onboarding process for both Admins and Employees, featuring manual and AI-assisted setup options.
- **Cloud Integration**: Connect to cloud data sources to streamline your data pipeline (feature in development).

## Tech Stack & Design

INERA Navigator is built with a modern, scalable, and performant technology stack.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme. The design is guided by a specific style palette:
    - **Primary Color**: Deep Blue (`#293462`)
    - **Background Color**: Very Dark Blue (`#0A1128`)
    - **Accent Color**: Bright Yellow (`#FFC857`)
    - **Fonts**: `Space Grotesk` for headlines and `Inter` for body text.
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
- **Charting**: [Recharts](https://recharts.org/)

## How to Operate the Application

1.  **Sign Up**:
    - The application provides two distinct sign-up paths: **Industrialist & Admins** and **Employees & Workers**.
    - **Admins** go through a detailed, multi-step setup process to configure the company profile, including personal, existence, and financial information. This can be done manually or with the help of an AI assistant.
    - **Employees** have a simpler sign-up process requiring a User ID and password.

2.  **Main Dashboard**:
    - After signing in, you land on the main dashboard.
    - Here, you can **upload your business data files**.
    - Once uploaded, you can **generate AI insights** to get a quick summary of your data.
    - From the dashboard, you can **proceed to the detailed analytics suite** to explore the data further.

3.  **Analytics Suite**:
    - Navigate through the various analytics tools from the sidebar or the main analytics page.
    - Use the **Forecasting Analyst** to predict future trends, or the **Problem & Suggestion** tool to identify and solve business challenges.
    - Create documents, presentations, and custom dashboards based on your analysis.

This README should provide a clear and helpful guide for anyone interacting with the INERA Navigator application.
