# GebetaMaps

![GebetaMaps Logo](./assets/g-wide.svg)

This is a TypeScript API wrapper for the GebetaMaps API. It provides an abstraction layer over raw HTTP requests, with built-in error handling and convenience methods for interacting with the GebetaMaps services, including **_Directions, Matrix, One-to-Many, Route Optimization_**, and **_Geocoding APIs._**

---

## Installation

To install **GebetaMaps**, run the following command in your project:

```bash
npm i gebeta-maps
```

After installation, you can use the wrapper by importing and initializing it with your **API key**.

---

## Setup and Initialization

### Initialize GebetaMaps

```typescript
import { GebetaMaps } from 'gebeta-maps'

const gebetamaps = new GebetaMaps({ apiKey: 'your-api-key' })
```

Replace `'your-api-key'` with your actual key from [GebetaMaps](https://gebeta.app/). You can signup for free [here](https://gebeta.app/).

---

## API Functions

The **GebetaMaps** wrapper exposes six main functions, each corresponding to a specific API endpoint. These functions are:

1. `getDirections`: To retrieve directions between two locations.
2. `getMatrix`: To calculate distance and duration between multiple origins and destinations.
3. `getOneToMany`: To handle one-to-many requests (useful for batch geocoding).
4. `optimizeRoute`: To find the most efficient route based on several locations.
5. `forwardGeocode`: To convert place names to geographic coordinates.
6. `reverseGeocode`: To convert geographic coordinates to place names.

---

### 1. **`getDirections`** – Get Directions from One Location to Another

This function retrieves the directions between two specified points.

#### Example:

```typescript
import { DirectionRequest, DirectionResponse } from 'gebeta-maps'

const directionReq: DirectionRequest = {
  origin: [12.9716, 77.5946], // Origin coordinates; [lat, lon] (e.g., Bangalore)
  destination: [13.0827, 80.2707] // Destination coordinates; [lat, lon] (e.g., Chennai)
}

const directions: DirectionResponse = await gebetamaps.getDirections(
  directionReq
)

console.log(directions)
```

#### Response:

```json
{
  "msg": "ok",
  "directions": [
    {
      "msg": "Ok",
      "totalDistance": 2000, // in meters
      "direction": [
        [12.9716, 77.5946],
        [12.978, 77.615],
        [12.9823, 77.629]
      ]
    }
  ]
}
```

---

### 2. **`getMatrix`** – Calculate Distance and Duration Between Multiple Points

This function retrieves the distance and duration matrix for multiple origin and destination pairs.

#### Example:

```typescript
import { MatrixRequest } from 'gebeta-maps'

const matrixReq: MatrixRequest = {
  origins: [
    [12.9716, 77.5946], // Origin 1
    [13.0827, 80.2707] // Origin 2
  ],
  destinations: [
    [12.9352, 77.6245], // Destination 1
    [13.0878, 80.2785] // Destination 2
  ]
}

const matrix = await gebetamaps.getMatrix(matrixReq)

console.log(matrix)
```

#### Response:

```json
{
  "data": [
    {
      "origin": [12.9716, 77.5946],
      "destination": [12.9352, 77.6245],
      "duration": 15, // in minutes
      "distance": 1200 // in meters
    },
    {
      "origin": [13.0827, 80.2707],
      "destination": [13.0878, 80.2785],
      "duration": 20,
      "distance": 1500
    }
  ]
}
```

---

### 3. **`getOneToMany`** – One-to-Many Route Requests

This function is used to send a request for multiple locations at once, useful for batch processing (e.g., geocoding or reverse geocoding).

#### Example:

```typescript
import { OneToManyRequest } from 'gebeta-maps'

const oneToManyReq: OneToManyRequest = {
  locations: [
    { lat: 12.9716, lng: 77.5946 },
    { lat: 13.0827, lng: 80.2707 }
  ]
}

const oneToManyResponse = await gebetamaps.getOneToMany(oneToManyReq)

console.log(oneToManyResponse)
```

#### Response:

```json
{
  "msg": "ok",
  "data": [
    {
      "lat": 12.9716,
      "lng": 77.5946,
      "name": "Bangalore"
    },
    {
      "lat": 13.0827,
      "lng": 80.2707,
      "name": "Chennai"
    }
  ]
}
```

---

### 4. **`optimizeRoute`** – Optimize a Route for Multiple Locations

This function is used to find the most optimal route when there are multiple locations to visit.

#### Example:

```typescript
import { RouteOptimizationRequest } from 'gebeta-maps'

const optimizationReq: RouteOptimizationRequest = {
  waypoints: [
    [12.9716, 77.5946],
    [13.0827, 80.2707]
  ]
}

const optimizedRoute = await gebetamaps.optimizeRoute(optimizationReq)

console.log(optimizedRoute)
```

#### Response:

```json
{
  "msg": "ok",
  "optimizedRoute": [
    [12.9716, 77.5946],
    [13.0827, 80.2707]
  ]
}
```

---

### 5. **`forwardGeocode`** – Convert Place Names to Coordinates

This function allows you to search for a location by name and retrieve its geographic coordinates.

#### Example:

```typescript
import { GeocodingRequest } from 'gebeta-maps'

const geocodeReq: GeocodingRequest = {
  name: 'Bole'
}

const geocodeResponse = await gebetamaps.getForwardGeocoding(geocodeReq)

console.log(geocodeResponse)
```

#### Response:

```json
{
  "msg": "ok",
  "data": [
    {
      "name": "Bole Arabsa",
      "lat": 8.978027,
      "lng": 38.884797,
      "type": "neighborhood",
      "city": "Addis Ababa",
      "country": "Ethiopia"
    }
  ]
}
```

---

### 6. **`reverseGeocode`** – Convert Coordinates to Place Names

This function allows you to convert latitude and longitude coordinates to a physical address or place name.

#### Example:

```typescript
import { ReverseGeocodingRequest } from 'gebeta-maps'

const reverseGeocodeReq: ReverseGeocodingRequest = {
  lat: 8.989022,
  lon: 38.79036
}

const reverseGeocodeResponse = await gebetamaps.getReverseGeocoding(
  reverseGeocodeReq
)

console.log(reverseGeocodeResponse)
```

#### Response:

```json
{
  "msg": "ok",
  "data": [
    {
      "name": "Haji Suktala Building Materials",
      "latitude": 9.05559,
      "longitude": 38.705503,
      "country": "Ethiopia",
      "city": "Addis Ababa",
      "type": "Building"
    }
  ]
}
```

---

## Local Setup

To set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/gebeta-maps.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

---

## Contribution

We welcome contributions! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request.

---

## License

This project is licensed under the MIT License. See [LICENSE](/LICENSE) for more details.
