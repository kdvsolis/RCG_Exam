import { Component } from "@angular/core";
import axios, { CancelTokenSource } from "axios";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // The input text
  inputText: string;

  // The output text
  outputText: string;

  // The encoding status
  encoding: boolean;

  // The cancel token source
  cancelTokenSource: CancelTokenSource;

  constructor() {
    this.inputText = "";
    this.outputText = "";
    this.encoding = false;
    this.cancelTokenSource = axios.CancelToken.source();
  }

  // The convert button handler
  convert() {
    // Check if the input text is not empty and the encoding is not in progress
    if (this.inputText && !this.encoding) {
      // Set the encoding status to true
      this.encoding = true;

      // Reset the output text
      this.outputText = "";

      // Make a GET request to the backend API with the input text as a parameter and the cancel token as an option
      axios
        .get(`https://localhost:7183/Encoding/${this.inputText}`, {
          cancelToken: this.cancelTokenSource.token,
        })
        .then((response) => {
          // Append the response data to the output text
          this.outputText += response.data;
        })
        .catch((error) => {
          // Handle any error
          console.error(error);
        })
        .finally(() => {
          // Set the encoding status to false when the request is completed
          this.encoding = false;
        });
    }
  }

  // The cancel button handler
  onCancel() {
    // Check if the encoding is in progress
    if (this.encoding) {
      // Call the cancel method on the cancel token source
      this.cancelTokenSource.cancel();
    }
  }
}
