// General Types (For better managment of common elements)
type Coordinates = [number, number]; // [latitude, longitude]

// API Request Tyes
type DirectionRequest = {
    origin: Coordinates;
    destination: Coordinates;
    waypoints?: Coordinates[]; // Optional, array of lattitude and longtuce pairs
    instruction?: 0 | 1; // Optional, include turn-by-turn instration or not
}

type MatrixRequest = {
    json: Coordinates[]; // Array of coordinates for the marrix (NxM)
}

type RouteOptimizationRequest = {
    json: Coordinates[]; // Array of coordinates for the optimization
}

type OneToManyRequest = {
    origin: Coordinates; // Origin point
    json: Coordinates[]; // Array of destination points 
}

type ReverseGeocodingRequest = {
    name: string;
}

type ForwardGeocodingRequest = {
    coordniates: Coordinates;
}

// API Response Types
type DirectionResponse = {
    totalDisatance: number;
    msg: string;
    direction: Coordinates[]; // Array of coordinates for the route
}

type MatrixResponse = {
    msg: string;
    durations: Array<{
        duration: [number, number]; // Duration between points, [from, to]
    }>;
    distances: Array<{
        duration: [number, number]; // Distances between points, [from, to]
    }>;
    origins: Array<{
        location: Coordinates; // Origin point coordinates
    }>;
    destinations: Array<{
        location: Coordinates; // Destination point coordinates
    }>;
};


type RouteOptimizationResponse = {
    msg: string;
    bestorder: number[]; // Order of the optimized route
    timetaken: number; // Time taken for the optimization in seconds
    totalDistance: number; // Total distance in meters
    originalorder: number[]; // Original order of the route
    direction: Coordinates[]; // Array of coordinates for the optimized route
};


type OneToManyResponse = {
    msg: string;
    directions: Array<{
        msg: string; // Response message for each direction (e.g., "Ok")
        timetaken: number; // Time taken for the route in seconds
        totalDistance: number; // Total distance in meters
        direction: Coordinates[]; // Array of coordinates for the route
    }>;
};

type ForwardGeocodingResponse = {
    msg: string;
    data: Array<{
        city: string;
        country: string;
        lat: number;  // Latitude of the location
        lng: number;  // Longitude of the location
        name: string; // Name of the place
        type: string; // Type of place (e.g., neighborhood, park)
    }>;
};

type ReverseGeocodingResponse = {
    msg: string;
    data: Array<{
        name: string;      // Name of the place
        latitude: number;  // Latitude of the place
        longitude: number; // Longitude of the place
        country: string;   // Country name
        city: string;      // City name
        type: string;      // Type of place (e.g., store, building, etc.)
        duration: number;  // Duration or distance from the input coordinates (could be in meters or seconds)
        distance: number;  // Distance from the input coordinates
    }>;
    count: number; // Total number of results found
};


// For error handling
type APIError = {
    code: number; // HTTP status code (200, 404, 401, 422, 500)
    message: string; // Error message
}

type Config = {
    apiKey: string;
    // baseURL: string; // the gebetamaps api url 
}


export type {
    DirectionRequest,
    MatrixRequest,
    RouteOptimizationRequest,
    OneToManyRequest,
    DirectionResponse,
    MatrixResponse,
    RouteOptimizationResponse,
    OneToManyResponse,
    Coordinates,
    APIError,
    Config,
    ForwardGeocodingRequest,
    ForwardGeocodingResponse,
    ReverseGeocodingRequest,
    ReverseGeocodingResponse,
};
