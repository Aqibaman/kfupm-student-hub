# KFUPM Student Hub

KFUPM Student Hub is a polished student-services prototype designed to bring essential campus utilities into one unified digital platform. Instead of treating emergency support, laundry booking, transportation visibility, marketplace activity, rewards, and student community tools as separate experiences, this project connects them into one product with a shared design system, shared navigation, and shared student context.

The result is a responsive web application that works across desktop and mobile, supports live demo flows, and demonstrates how a single university platform can improve everyday student life at KFUPM.

## Project Vision

The project is built around one core idea:

**One place, one flow - everything students need in one go.**

The platform aims to reduce fragmentation in student services by giving students one entry point for:

- urgent support,
- campus facility reservations,
- transportation visibility,
- buying and selling,
- academic and community services,
- and engagement through rewards.

## Core Modules

### Dashboard

The dashboard acts as the main control center of the app. It gives the student a campus snapshot, quick access to major services, and a consistent starting point for all flows.

### Medical Emergency

This is the strongest and most complete module in the prototype. It supports:

- instant emergency request,
- manual emergency request form,
- medical profile storage,
- emergency contacts,
- student-facing request tracking,
- dispatch-side case management,
- and hospital-side monitoring.

The emergency workflow uses a shared stage model across all views:

1. Request Received
2. Help Assigned
3. On the Way
4. On Site
5. Complete

### Laundry Queue

Laundry Queue is designed as a realistic campus reservation system with:

- separate washer and dryer booking flows,
- building and machine selection,
- time slot booking,
- 15-minute booking buffer logic,
- check-in deadline rules,
- credit rewards and penalties,
- live machine status,
- booking history,
- and rules pages.

### Bus Services

Bus Services demonstrates a live shuttle-tracking concept using the provided KFUPM route image. It includes:

- route stop overlays,
- animated bus movement,
- station waiting behavior,
- live bus status indicators,
- and a KFUPM route monitoring interface.

For the prototype, the movement is simulated in the front end using route logic and timed state updates.

### Marketplace

Marketplace provides a campus buying and selling experience with:

- listing cards,
- search and filtering,
- save / unsave actions,
- create-listing flow,
- item detail modal,
- saved items,
- and personal listings.

### Rewards and Leaderboard

Rewards and Leaderboard connect the platform into one ecosystem by making student activity visible and motivating. These pages include:

- total points,
- rank and progress,
- badge achievements,
- points breakdown,
- weekly momentum,
- and leaderboard comparison.

### Additional Student Services

The platform also includes supporting services grouped under **Others**, such as:

- Study Groups,
- Course Reviews,
- Campus Food,
- and Lost & Found.

## User Experience and Design

KFUPM Student Hub was designed to feel like a premium, unified university product rather than a group of unrelated pages.

Key UI/UX principles used in the project:

- consistent KFUPM-inspired visual language,
- soft white cards and clean shadows,
- responsive layouts for desktop and mobile,
- reusable button and card systems,
- one shared application shell,
- and clear action-first flows for important tasks.

The application is also mobile-friendly and can be used as a Progressive Web App (PWA), allowing it to be opened on a phone and added to the home screen.

## Technology Stack

This project was developed using:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** for icons
- **Local storage** for prototype persistence
- **Vercel** for deployment

## Backend / Data Approach

This prototype does not use a full production backend. Instead, it uses:

- mock data,
- local state,
- and browser local storage

to simulate realistic application behavior.

This allows the prototype to demonstrate persistent flows such as:

- emergency request creation,
- dispatcher and hospital updates,
- laundry bookings and credit changes,
- marketplace saved items and created listings,
- and rewards activity.

## Bus Tracking Prototype Logic

The Bus Services module is currently implemented as a front-end simulation rather than a live GPS hardware integration.

It uses:

- a fixed stop list,
- route coordinates mapped onto the provided bus route image,
- local state for active buses,
- and timed updates to simulate bus motion and waiting at stops.

This makes it suitable for demonstration while still showing how a future real-time tracking system could be integrated later.

## Deployment

The project is deployed on **Vercel**, which makes it easy to:

- host the app online,
- test it on desktop and mobile,
- and use it as a shareable demo prototype.

## Running Locally

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open:

```bash
http://localhost:3000
```

## Production Build

To test the production build locally:

```bash
npm run build
npm start
```

## Why This Project Matters

KFUPM Student Hub is more than a UI concept. It demonstrates a practical, scalable direction for how student-facing services at KFUPM could be unified into one coherent digital platform.

It combines:

- practical value,
- strong UI/UX,
- technical completeness for a prototype,
- and realistic campus adoption potential.

## Repository Note

This repository contains a prototype version of the platform intended for demonstration, evaluation, and further extension. Some services use simulated behavior and mock data, but the structure is intentionally built to support future integration with real systems.
