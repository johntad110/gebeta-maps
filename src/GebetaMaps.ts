import axios from 'axios';
import { HTTPClient } from './HTTPClient';
import {
    DirectionRequest,
    DirectionResponse,
    MatrixRequest,
    MatrixResponse,
    RouteOptimizationRequest,
    RouteOptimizationResponse,
    OneToManyRequest,
    OneToManyResponse,
    Config,
    APIError,
    ForwardGeocodingResponse,
    ReverseGeocodingResponse,
} from './types';

export class GebetaMaps {
    private client: HTTPClient;
    private apiKey: string;
    private baseURL: string;

    constructor(config: Config) {
        this.apiKey = config.apiKey;
        this.baseURL = 'https://mapapi.gebeta.app';
        this.client = new HTTPClient(this.baseURL)
    }

    public async getDirections(request: DirectionRequest): Promise<DirectionResponse | APIError> {
        const { origin, destination, waypoints = [], instruction = 0 } = request;

        const originStr = `{${origin[0]},${origin[1]}}`;
        const destinationStr = `{${destination[0]},${destination[1]}}`;
        const waypointsStr = waypoints.map(coord => `{${coord[0]},${coord[1]}}`).join(';');

        const url = `/api/route/direction/?origin=${originStr}&destination=${destinationStr}&waypoints=[${waypointsStr}]&instruction=${instruction}&apiKey=${this.apiKey}`;

        try {
            const response = await this.client.get<DirectionResponse>(url);
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async getMatrix(request: MatrixRequest): Promise<MatrixResponse | APIError> {
        const coordinates = request.json.map(coord => `{${coord[0]},${coord[1]}}`);
        const url = `/api/route/matrix/?json=[${coordinates.join(',')}]&apiKey=${this.apiKey}`;

        try {
            const response = await this.client.get<MatrixResponse>(url);
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async getOneToMany(request: OneToManyRequest): Promise<OneToManyResponse | APIError> {
        const { origin, json } = request;
        const originStr = `{${origin[0]},${origin[1]}}`;
        const destinationsStr = json.map(coord => `${coord[0]},${coord[1]}`).join(';');
        const url = `/api/route/onm/?json=[${destinationsStr}]&origin=${originStr}&apiKey=${this.apiKey}`;

        try {
            const response = await this.client.get<OneToManyResponse>(url);
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async optimizeRoute(request: RouteOptimizationRequest): Promise<RouteOptimizationResponse | APIError> {
        const { json } = request;
        const coordinatesStr = json.map(coord => `{${coord[0]},${coord[1]}}`).join(',');
        const url = `/api/route/tss/?json=[${coordinatesStr}]&apiKey=${this.apiKey}`;

        try {
            const response = await this.client.get<RouteOptimizationResponse>(url);
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async forwardGeocode(name: string): Promise<ForwardGeocodingResponse | APIError> {
        try {
            const response = await this.client.get<ForwardGeocodingResponse>('/api/v1/route/geocoding', {
                params: {
                    name,
                    apiKey: this.apiKey,
                },
            });
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async reverseGeocode(lat: number, lon: number): Promise<ReverseGeocodingResponse | APIError> {
        try {
            const response = await this.client.get<ReverseGeocodingResponse>('/api/v1/route/revgeocoding', {
                params: {
                    lat: lat.toString(),
                    lon: lon.toString(),
                    apiKey: this.apiKey,
                },
            });
            return response;
        } catch (error) {
            return this.handleError(error);
        }
    }


    private handleError(error: any): APIError {
        if (axios.isAxiosError(error)) {
            return {
                code: error.response?.status || 500, // Default to 500 if status code is missing.
                message: error.message || 'Unknown error occurred',
            };
        } else {
            return {
                code: 500,
                message: error.message || 'Unexpected error occured',
            }
        }
    }
}
