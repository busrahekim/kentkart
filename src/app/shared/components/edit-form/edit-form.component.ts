import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Company, Employee } from '../../../core/models/dbSchema.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnInit {
  @Input() entity: Employee | Company | null = null;
  @Input() isEmployee: boolean = true;
  @Input() companies: Company[] = [];
  @Output() formSubmit = new EventEmitter<Employee | Company>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      companyId: [null],
    });
  }

  ngOnInit(): void {
    if (this.entity) {
      this.form.patchValue(this.entity);

      if (this.isEmployee && (this.entity as Employee).companyId === -1) {
        this.form.get('companyId')?.setValue(-1);
      }
      if (!this.isEmployee) {
        this.form.removeControl('companyId');
      }
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedEntity = { ...this.entity, ...this.form.value };
      this.formSubmit.emit(updatedEntity);
    } else {
      console.error('Form is invalid');
      this.form.get('name')?.markAsTouched();
    }
  }
}
