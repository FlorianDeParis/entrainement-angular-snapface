import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss'
})
export class TemplateFormComponent implements OnInit{
  userName: string = '';
  userEmail: string = 'lorem.ipsum@sitename.com';

  constructor(){}

  ngOnInit(): void {

  }

  onSubmitForm(form: NgForm): void{
    console.log(form.value);
  }
}
