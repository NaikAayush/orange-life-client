import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-pw-mn-form',
  templateUrl: './auth-pw-mn-form.component.html',
  styleUrls: ['./auth-pw-mn-form.component.css'],
})
export class AuthPwMnFormComponent implements OnInit {
  new: boolean = true;
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('type') == 'old') {
      this.new = false;
    }
  }

  newAccount(newForm: NgForm) {
    console.log(newForm.value);
  }
  oldAccount(oldForm: NgForm) {
    console.log(oldForm.value);
  }
}
