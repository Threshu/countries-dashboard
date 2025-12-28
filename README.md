# 🌍 Countries Dashboard

> Modern web application for browsing and exploring information about countries worldwide using GraphQL API

A portfolio project showcasing **Vue 3 Composition API**, **TypeScript**, **Apollo Client**, and **Vuetify 3** best practices. Built with performance, accessibility, and clean code architecture in mind.

![Vue 3](https://img.shields.io/badge/Vue.js-3.5.26-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.11.4-1867C0?logo=vuetify&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo_Client-4.0-311C87?logo=apollographql&logoColor=white)

---

## ✨ Features

### 🗺️ Countries Explorer

- **Virtual scroll** with 250+ countries - optimized performance with `v-memo`
- **Advanced search** - filter by name, code, capital, or continent
- **High-quality flag images** from flagcdn.com with lazy loading and fallbacks
- **Keyboard navigation** and full accessibility (ARIA labels, focus management)
- **Responsive grid** - 6 columns on desktop, stacks on mobile

### 📊 Country Details

- Comprehensive information: capital, currency, languages, phone codes
- Administrative divisions (states/subdivisions)
- AWS region identifier
- RTL language detection with badges
- 2-column layout for better information density

### ⭐ Favorites System

- Add/remove countries to favorites with heart button
- Persistent storage using localStorage via Pinia
- Featured countries section on dashboard
- Optimized re-renders with computed Set for favorite lookups

### 💱 Currency Converter

- Convert between 15+ major world currencies
- Real-time validation with custom composable
- Mock exchange rates with extensible architecture for real API integration
- Clear conversion display with formatted amounts and exchange rates

### 🎨 Theming

- **Light/Dark mode** toggle with smooth transitions
- Vuetify Material Design 3 theme system
- Persistent theme preference in localStorage
- WCAG AA compliant color contrast

---

## 🛠️ Tech Stack

### Frontend Core

- **Vue 3.5.26** - Progressive JavaScript framework with Composition API
- **TypeScript 5.9.3** - Type-safe development
- **Vuetify 3.11.4** - Material Design component library
- **SCSS/Sass 1.97.1** - Advanced styling with variables and mixins

### Data Layer

- **Apollo Client 3.14.0** - GraphQL state management with `cache-first` policy
- **@vue/apollo-composable 4.2.2** - Vue 3 Apollo integration
- **GraphQL 16.12.0** - Query language for APIs
- **Countries GraphQL API** - Public API by Trevor Blades

### State Management

- **Pinia 3.0.4** - Vue official state management with TypeScript support
- **localStorage** persistence for user preferences

### Build Tools

- **Vite 7.3.0** - Next-generation frontend tooling
- **Vue Router 4** - Official routing with lazy-loaded routes

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd countries-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── apollo/              # Apollo Client configuration
│   ├── client.ts        # Apollo setup with error handling, cache-first policy
│   └── queries/         # GraphQL queries (GET_COUNTRIES, GET_COUNTRY_DETAIL)
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── BaseCard.vue
│   │   ├── LoadingState.vue
│   │   ├── ErrorState.vue
│   │   ├── EmptyState.vue
│   │   └── StatCard.vue
│   └── features/        # Feature-specific components
│       ├── CountryCard.vue           # Country display with flags, favorites
│       ├── CountryFilters.vue        # Search and continent filter
│       ├── CurrencyConverterForm.vue # Currency conversion form
│       ├── FeaturedCountries.vue     # Randomized country showcase
│       └── TheNavbar.vue             # App navigation bar
├── composables/         # Vue composables (business logic)
│   ├── useCountries.ts       # Fetch all countries with Apollo
│   ├── useCountryDetail.ts   # Fetch single country details
│   └── useValidation.ts      # Form validation rules
├── constants/           # App-wide constants
│   ├── exchangeRates.ts # Mock currency exchange rates
│   └── stores.ts        # Pinia store IDs and localStorage keys
├── router/              # Vue Router configuration
│   └── index.ts         # Routes with lazy loading and meta titles
├── stores/              # Pinia stores
│   └── userPreferences.ts # Theme and favorites persistence
├── styles/              # Global styles
│   ├── global.scss      # Global CSS, transitions, utilities
│   └── variables.scss   # SCSS variables (currently unused - future)
├── types/               # TypeScript type definitions
│   └── index.ts         # Country, Continent, Language interfaces
├── utils/               # Utility functions
│   └── formatters.ts    # Currency and number formatting
├── views/               # Page components
│   ├── DashboardView.vue         # Home page with stats and featured
│   ├── CountriesView.vue         # Countries list with filters
│   ├── CountryDetailView.vue     # Individual country details
│   └── CurrencyConverterView.vue # Currency conversion tool
├── plugins/
│   └── vuetify.ts       # Vuetify configuration and theme setup
├── App.vue              # Root component with v-app layout
└── main.ts              # App entry point
```

---

## 📝 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Run type-checking only
npm run type-check
```

---

## 🌐 API Reference

This project uses the free **Countries GraphQL API**:

- **Endpoint**: `https://countries.trevorblades.com/`
- **Documentation**: [Countries API Docs](https://github.com/trevorblades/countries)
- **Data source**: Public domain country data

```

---

## 🙏 Credits & Licenses

- **Country data**: [Countries GraphQL API](https://countries.trevorblades.com/) by Trevor Blades (MIT License)
- **Flag images**: [Flagpedia.net](https://flagpedia.net) via [flagcdn.com](https://flagcdn.com/) (Free for non-commercial use)
- **Flag sources**: [Wikipedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_flags_by_country) (Public Domain / Open License)
- **Icons**: [Material Design Icons](https://materialdesignicons.com/) via Vuetify

---

## 📄 License

This project is open source and available for educational and portfolio purposes.

---

## 👤 Author

**Portfolio Project** - Vue 3 + Apollo GraphQL + TypeScript

Built to demonstrate modern Vue 3 development practices, GraphQL integration, and production-ready code architecture.

---

_⭐ If you found this project helpful, consider giving it a star!_
```
