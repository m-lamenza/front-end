import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule],
  providers: [HttpClient],
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sfe-icons',
  template: `<mat-icon 
                [ngStyle]="{
                  'width.px': scale, 
                  'height.px': scale, 
                  'transform': 'rotate(' + rotate + 'deg)',
                  'overflow': 'initial',
                  'color': color || '#777E90'
                }"
                [class.scale-icon]="scale!==0" 
                [class.spinner]="spinner" 
                class="rotate-icon {{class}}"
                [svgIcon]="icon">
            </mat-icon>`,
  styleUrls: ['./app-sfe-icons.component.scss']
})
export class AppSfeIconsComponent implements OnInit {

  @Input("icon") icon: string = "";
  @Input("scale") scale: number = 16; //default pixel
  @Input("spinner") spinner: boolean = false;
  @Input("rotate") rotate: number = 0;
  @Input("class") class: string = "";
  @Input("color") color: string = "#777E90"; // Color por defecto


  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    console.log('Registrando icono:', this.icon);
    // Registrar el icono svg cuando el componente se inicializa
    this.matIconRegistry.addSvgIcon('ic-user', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/user.svg'));
  }
} 