import { LoadingService } from './../services/loading.service';
import { Observable } from 'rxjs';
 
import { ChangeDetectionStrategy, Component, Input, NgModule, OnInit } from "@angular/core";
import { User } from "../user";
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators, FormBuilder } from '@angular/forms';
import { BookListComponent } from '../main-view/book-list/book-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
declare var bootstrap: any;
@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class LoginPageComponent implements OnInit {
[x: string]: any;
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin: boolean = false;
  user: User= new User();

  modalTitle: string ='';
  modalMessage: string ='';
  constructor(private userService: LoginServiceService, private router: Router, 
    private loadingService: LoadingService,
    private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private responsive: BreakpointObserver
  ) {}
  ngOnInit(): void {
    
this.responsive.observe([
  Breakpoints.TabletPortrait,
  Breakpoints.HandsetLandscape, Breakpoints.XSmall, Breakpoints.Small,Breakpoints.Small,Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge, Breakpoints.Web, Breakpoints.WebLandscape, Breakpoints.WebPortrait])
  .subscribe(result => {

    const breakpoints = result.breakpoints;

    if (breakpoints[Breakpoints.TabletPortrait]) {
      console.log("screens matches TabletPortrait");
    }
    else if(breakpoints[Breakpoints.XSmall]){
      console.log("screens matches XSmall");
    }

    else if(breakpoints[Breakpoints.Small]){
      console.log("screens matches Small");
    }

    else if(breakpoints[Breakpoints.Medium]){
      console.log("screens matches Medium");
    }

    else if(breakpoints[Breakpoints.Large]){
      console.log("screens matches Large");
    }


    else if(breakpoints[Breakpoints.XLarge]){
      console.log("screens matches XLarge");
    }

    else if(breakpoints[Breakpoints.Web]){
      console.log("screens matches Web");
    }

    else if(breakpoints[Breakpoints.WebLandscape]){
      console.log("screens matches WebLandscape");
    }


    else if(breakpoints[Breakpoints.WebPortrait]){
      console.log("screens matches WebPortrait");
    }

    
    else if (breakpoints[Breakpoints.HandsetLandscape]) {
      console.log("screens matches HandsetLandscape");
    }

  });



     this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
     });

    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
      if (this.isLoggedin) {
        // Handle successful login here
        this.navigateToMainPage();
      }
    });


  }

  navigateToMainPage(){
    this.loadingService.loadingOn();
    this.router.navigate(['/main-page']);
    this.loadingService.loadingOff();
    
    
  }
  navigateToAdminPage(){
    this.loadingService.loadingOn();
    this.router.navigate(['/admin-view']);
    this.loadingService.loadingOff();
  }


  userLogin(){
    console.log(this.user);
    this.userService.login(this.user).subscribe(
      (data) => {
       
        if (this.user.username == "namvothien3") {
          
          this.navigateToMainPage();
          
        } else if (this.user.username == "admin") {
           
          this.navigateToAdminPage();
        }
      },
      error => {
        this.showModal('Login Failed', 'Please recheck the username or password.');
      }
    );
}



showModal(title: string, message: string) {
  this.modalTitle = title;
  this.modalMessage = message;
  const modalElement = document.getElementById('loginResultModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}
signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signInWithFacebook(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}
}
