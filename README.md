# HI Delivery

HI Delivery is a demo front-end web application designed to allow users in North Shore, Oahu, to place their grocery orders online and have them delivered to their homes. This project won "The Best Booth Showcase Award" at BYU-Hawaii's Empower Your Dreams 2024 semifinals.

## Features

- **User-Friendly Interface:** A clean and intuitive design powered by React.js and MUI.
- **Location Integration:** Integrated with Google Maps API to provide location services for delivery.
- **Secure Payments:** Uses Stripe API for demonstrating secure online payments.

## Demo

A website demo can be viewed at [https://hidelivery.app](https://hidelivery.app).

## Technologies

- **Frontend Framework:** React.js
- **UI Library:** MUI (Material-UI)
- **APIs:**
  - Google Maps API (for location and directions)
  - Stripe API (for payment processing)

## Installation

Follow these steps to run the application locally:

1. Clone the repository.
2. Navigate to the project directory:

   ```bash
   cd hi-delivery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## How It Works

1. **Browse Stores:** Users can view preselected grocery stores on Oahu.
2. **Checkout:** Enter order and delivery details and pay securely using the Stripe payment gateway.

## LICENSE

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](https://github.com/Tidbit0519/hi-delivery/blob/main/LICENSE) file for details.
