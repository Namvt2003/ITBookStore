import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contactinfo } from '../../models/contactinfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactpopup',
  templateUrl: './contactpopup.component.html',
  styleUrls: ['./contactpopup.component.css']
})
export class ContactpopupComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      const contactData: Contactinfo = this.contactForm.value;
  
      // Ensure all required fields are populated
      if (!contactData.message) {
        console.error('Message field is required');
        return;
      }

      this.contactService.saveContact(contactData).subscribe(response => {
        console.log('Contact saved successfully', response);
      }, error => {
        console.error('Error saving contact', error);
      });
      this.router.navigateByUrl('/main-page');
    }
  }
}