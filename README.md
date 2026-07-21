# E-Commerce Microservices Platform

A full-stack e-commerce application built using a microservices architecture. The system includes separate services for authentication, products, orders, payments, and email notifications, along with a client and admin application.

---

## Features

- User authentication and authorization
- Product listing and management
- Shopping cart functionality
- Order processing system
- Stripe payment integration
- Real-time payment confirmation (WebSockets)
- Email notifications for orders
- Admin dashboard for managing products and orders

---

## Architecture

- auth-service
- product-service
- order-service
- payment-service
- email-service
- client (Next.js)
- admin panel
- shared packages (types, kafka, logger)

---

## Tech Stack

- Node.js
- Next.js
- React.js
- Express.js / Fastify / Hono
- PostgreSQL
- MongoDB
- Kafka
- Prisma
- Docker
- Stripe
- Clerk
- WebSockets

---

## Shared Packages

- Kafka utilities
- Type definitions
- Logger system

---

## Deployment

- Client: Vercel
- Backend Services: Render
- Containerized using Docker

---

## Live Demo

https://ecom-client-xi.vercel.app/

---

## Notes

This project demonstrates microservices architecture, event-driven communication, and scalable backend design.
