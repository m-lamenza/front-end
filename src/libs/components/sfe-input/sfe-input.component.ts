import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppSfeIconsComponent } from '../app-sfe-icons/app-sfe-icons.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-sfe-input',
  imports: [CommonModule, AppSfeIconsComponent, ReactiveFormsModule],
  templateUrl: './sfe-input.component.html',
  styleUrl: './sfe-input.component.scss'
})
export class SfeInputComponent implements OnInit {

  @Input("icon") icon: string = "";
  @Input("width") width: string = "none";
  @Input("placeholder") placeholder: string = "";
  @Input("disabled") disabled: boolean = false;
  @Input("value") value = '';
  @Input("search") search = false;
  @Input("enterSearch") enterSearch = false;
  

  @Output() onInput = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();
  @Output() onChange = new EventEmitter();

  inptControl = new FormControl('');

  ngOnInit(): void {
    this.detectChanges();
  }

  detectChanges() {
    if(this.value) {
      this.inptControl.setValue(this.value);
    }
    if(this.search || this.enterSearch){
      this.inptControl.valueChanges.pipe( debounceTime(300),
      distinctUntilChanged()).subscribe(val => {
        if(this.enterSearch && val?.trim().length === 0){
          this.onInput.emit(val);
        }

        if(!this.enterSearch){
          this.onInput.emit(val);
        }
        
      })
    }
  }

  handleInput(e: any){
    if(!this.search && !this.enterSearch){
      this.value = e.target.value;
      this.onInput.emit(this.value);
    }
  }

  onSearchEnter() {
    if(this.enterSearch){
      this.onInput.emit(this.inptControl.value);
    }
  }

  handleBlur(){
    this.onBlur.emit();
  }

  handleFocus(){
    this.onFocus.emit();
  }

  handleChange(){
    this.onChange.emit(this.inptControl.value);
  }

  reset(){
    this.inptControl.setValue('');
  }
}
