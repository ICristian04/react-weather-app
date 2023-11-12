# React Weather Application

A simple and responsive weather application built with React for learning purposes. This application leverages the AccuWeather API for weather data and the Google Places API for location information.

## Features

- **Accurate Weather Information:** Utilizes the AccuWeather API to provide reliable and up-to-date weather data.
- **Location Autocomplete:** Incorporates the Google Places API for a seamless and user-friendly location search experience.
- **Responsive Design:** Ensures a consistent and user-friendly experience across both desktop and mobile devices.
- **Easy to Use:** Intuitive interface for users to quickly check the weather for any location.

## Technologies Used

- **React:** Frontend framework for building a dynamic and interactive user interface.
- **AccuWeather API:** Integration for fetching real-time weather data.
- **Google Places API:** Enables location autocomplete for easy search functionality.

## Getting Started

1. **Clone the repository.**
    ```bash
    git clone https://github.com/your-username/react-weather-app.git
    ```

2. **Install dependencies using npm.**
    ```bash
    npm install
    ```

3. **Get API keys from AccuWeather and Google Places API.**
   - Obtain API keys from [AccuWeather](https://developer.accuweather.com/apis) and [Google Cloud Console](https://console.cloud.google.com/).
   
4. **Set up environment variables for API keys.**
    - Create a `.env` file in the root directory and add your API keys.
    ```env
    REACT_APP_ACCUWEATHER_API_KEY=your-accuweather-api-key
    REACT_APP_GOOGLE_API_KEY=your-google-places-api-key
    ```

5. **Run the application using npm.**
    ```bash
    npm start
    ```
