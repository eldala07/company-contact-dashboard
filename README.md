# **Company-Contact Dashboard**

A Next.js application that displays a mixed list of companies and contacts. The app leverages modern web technologies including **GraphQL**, **TailwindCSS**, **Headless UI**, **shadcnUI**, **React Hook Form (RHF)**, and **AgGrid** for a smooth and efficient user experience.

![laptop](https://github.com/user-attachments/assets/9c702868-5326-45ae-be56-4462b8f80721)

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## **Features**

- Fetches and displays a mixed list of companies and contacts
- Allows users to create, update, and delete entities (companies and contacts)
- Provides a search bar for filtering entities by name
- Filter and group entities by category (companies or contacts)
- Displays entity details when clicked on
- Implements a responsive design for optimal user experience on different devices
- Optimized rerendering for better performance
- Optimized cache handling or a smoother user experience


![iPhone (3)](https://github.com/user-attachments/assets/30c62079-7d43-4907-acb4-07f2508f4bfe)
![iPhone (4)](https://github.com/user-attachments/assets/53f95873-cd5d-457f-b711-fd1e72782f70)


## **To improve**
- Supports pagination for handling large datasets
- Better use of Server-side rendering

## **Technologies Used**

- **Next.js** – Server-side rendering and routing
- **React** – Component-based architecture
- **GraphQL** – Data querying and manipulation
- **TailwindCSS** – Utility-first CSS framework for custom designs
- **shadcnUI** – Pre-styled component library based on TailwindCSS
- ~~**Headless UI** – Accessible UI primitives~~
- **React Hook Form** – Form management with hooks
- **AgGrid** – Advanced data grid for handling complex tables

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18.18+)
- **npm** or **yarn**

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/eldala07/company-contact-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd company-contact-dashboard
   ```

3. Install the dependencies:

   Using npm:
   ```bash
    npm install
   ```

   Using yarn:
   ```bash
    yarn install
   ```

### **Running the App**

1. Start the development server:

   Using npm:
   ```bash
    npm run dev
   ```

   Using yarn:
   ```bash
    yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the app.

## **Folder structure**
Overview of the main folders and files in the project:

```
├── app
│   ├── (dashboard)
│   │   ├── components (folder for components related to the dashboard)
│   │   ├── handlers (folder for handlers related to the dashboard)
│   │   ├── page.tsx (dashboard page)
│   │   └── page-content.tsx (dashboard page content)
│   ├── api (folder for API related files, mocked route)
│   ├── entity (route to display entity details)
│   ├── ag-grid-theme-builder.css
│   ├── layout.tsx
│   ├── ...
│   └── not-found.tsx
├── components
│   ├── providers
│   │   └── apollo-wrapper.tsx
│   ├── shared (folder for shared components with logic)
│   │   └── not-found.tsx
│   ├── ui (folder for reusable components) (mainly shadcnUI)
├── lib (folder for utility functions)
│   ├── apollo (folder for apollo related files)
│   │   ├── client.ts
│   │   └── cache.ts
│   ├── hooks (folder for reusable and shared hooks)
│   ├── mockServer (folder containing mock server)
│   ├── ...
│   ├── constants.ts 
│   └── utils.ts (shadcnUI/tailwindCSS related functions)
├── schema.graphql (GraphQL schema)
├── codegen.ts (GraphQL codegen)
├── ...
├── jest.config.js (Jest configuration file)
```


## **Contributing**
Contributions are welcome! Follow these steps to contribute:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## **Licence**
This project is licensed under the MIT License. See the [LICENCE](https://github.com/eldala07/company-contact-dashboard/new/main?filename=README.md#license) file for details.
