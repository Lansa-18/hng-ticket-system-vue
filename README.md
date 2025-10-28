# TrackiT - Ticket Management System (Vue Version)

TrackiT is a modern, responsive ticket management system built with Vue 3 and TypeScript. It provides a clean and intuitive interface for managing support tickets, with features like responsive design, real-time updates, and a smooth user experience.

**LIVE URL:**  
[Live - URL]

---

## 🛠️ Technologies and Libraries

### Core Framework & Tooling

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Typed JavaScript at scale
- **Vite** - Fast build tool and dev server
- **Pinia** - State management for Vue
- **Vue Router** - Client-side routing

### UI and Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-vue** & **Radix Vue** - Accessible UI components
- **Lucide Vue** - Icon library

### Data Handling & Storage

- **LocalStorage** - Client-side data persistence
- **Zod** - Schema validation for forms

---

## 🚀 Setup and Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Lansa-18/hng-ticket-system-vue.git
   cd ticket-system-vue
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Run the development server**
   ```sh
   npm run dev
   ```

---

## 🏗️ Project Structure

```
ticket-system-vue/
├── public/                # Static assets
├── src/
│   ├── app/               # App entry and routing
│   ├── components/        # Vue components (auth, dashboard, ui, etc.)
│   ├── lib/               # Utility and service files (auth, tickets, types)
│   ├── stores/            # Pinia stores
│   └── views/             # Page-level views
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

---

## 🎯 Features and Components

### Authentication

- **Login/Signup Forms:** Secure authentication with form validation
- **Protected Routes:** Route protection for authenticated users
- **Persistent Sessions:** LocalStorage-based session management

### Dashboard

- **Overview Stats:** Quick view of ticket statistics
- **Ticket Management:** Create, read, update, and delete tickets
- **Status Tracking:** Visual status indicators (Open, In Progress, Closed)
- **Responsive Layout:** Mobile-first design

### Components Structure

- **Base Layout:** Common layout and navigation
- **Auth Components:** Login and signup forms
- **Ticket Components:** Ticket listing, dialogs, and forms
- **Dashboard Components:** Stats and recent activity

---

## 🔐 Authentication and State

### Client-side Authentication

- Manages user authentication state in LocalStorage
- Provides login, signup, and logout functionality
- Session persistence using LocalStorage

### Ticket State Management

- LocalStorage-based ticket data persistence
- Real-time updates using Vue reactivity
- Optimistic UI updates for better UX

---

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management in modals
- Screen reader friendly status messages

---

## 🧪 Test User Credentials

- **Email:** demo@example.com
- **Password:** password123

> Demo user gets pre-populated with sample tickets for testing.

---

## 💻 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📝 Development Notes

- Uses Vue 3 + TypeScript for SPA development
- Pinia for state management
- Tailwind CSS for styling
- Form validation with Zod
- Modal dialogs for ticket operations
- Responsive and accessible UI

---

## 📄 License

This project is licensed under the MIT License.

---

**Built with Vue 3, TypeScript, Pinia, and TailwindCSS**
