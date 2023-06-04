import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
providedIn: 'root',
})
export class EncodingService {
    private eventSource: EventSource | null = null;

    constructor() {}

    encode(text: string): Observable<string> {
        return new Observable((observer) => {
            // Send a POST request with axios
            axios.post('https://localhost:7183/Encoding', { text }, { headers: { 'Content-Type': 'application/json' } })
                .then((response) => {
                // Create an event source from the response url
                this.eventSource = new EventSource(response.request.responseURL);

                // Listen for messages from the event source and emit each encoded character
                this.eventSource.onmessage = (event) => {
                observer.next(event.data);
            };

            // Listen for errors from the event source and handle them
                this.eventSource.onerror = (error) => {
                observer.error(error);
                this.eventSource?.close();
                this.eventSource = null;
            };
        })
        .catch((error) => {
            // Handle any errors from axios
            observer.error(error);
            });
        });
    }

    cancel() {
    // Close the event source and cancel the encoding process
    this.eventSource?.close();
    this.eventSource = null;
    }
}