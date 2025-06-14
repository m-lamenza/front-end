import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sfe-button',
  imports: [CommonModule],
  templateUrl: './app-sfe-button.component.html',
  styleUrl: './app-sfe-button.component.scss'
})
export class AppSfeButtonComponent implements OnInit {

  @Input("disabled") disabled: boolean = false;
  @Input("color") color: string = "";
  @Output("onClick") onClick = new EventEmitter();
  @Input("size") size: 'lg' | 'sm' = "lg";
  @Input("text") text: string = "button";

  ngOnInit(): void {
    this.setDefaultColor();
  }

  click(){
    if(!this.disabled) this.onClick.emit();
  }

  setDefaultColor(){
    const color_ = this.color || "";
    if(!color_.trim()){
      const rootStyles = getComputedStyle(document.documentElement);
      const colorDefault = rootStyles.getPropertyValue('--button-color').trim();
      this.color = colorDefault;
    }
  }
}
