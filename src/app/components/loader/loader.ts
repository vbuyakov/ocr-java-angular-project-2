import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {

}
