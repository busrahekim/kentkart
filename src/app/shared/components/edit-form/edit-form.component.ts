import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Company, Employee } from '../../../core/models/dbSchema.model';

@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnInit {
  @Input() entity: Employee | Company | null = null;
  @Input() isEmployee: boolean = true;
  @Output() formSubmit = new EventEmitter<Employee | Company>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      companyId: [''],
    });
  }

  ngOnInit(): void {
    if (this.entity) {
      this.form.patchValue(this.entity);

      if (!this.isEmployee) {
        this.form.removeControl('companyId');
      }
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedEntity = { ...this.entity, ...this.form.value };
      this.formSubmit.emit(updatedEntity);
    }
  }
}
