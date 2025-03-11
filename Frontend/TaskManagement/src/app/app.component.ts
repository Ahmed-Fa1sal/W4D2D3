import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appConfig } from './app.config';  // Import the configuration

@Component({
  selector: 'app-root',
  standalone: true,  // Specify this component as standalone
  imports: [RouterOutlet],  // Only RouterOutlet in imports
 // Use the configuration in the providers
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManagement';
}
