import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userdata: any = [];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.userdata = JSON.parse(localStorage.getItem('userlogin')) || [];
    console.log(this.userdata);
  }

  logOut() {
		let alert = this.alertCtrl.create({
			title: 'Logout',
			message: 'Are you sure to logout?',
			buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			},
			{
				text: 'Yes',
				handler: () => {
 					this.myToast("You're successfully logged out!");
 					this.navCtrl.push(LoginPage);
 					localStorage.removeItem('userlogin');
 				}
 			}
 			]
 		});
		alert.present();
  }
  
  myToast(text){
		let toast = this.toastCtrl.create({
			message: text,
			duration: 3000,
			position: 'bottom',
			showCloseButton: true,
			closeButtonText: 'Close'
		});
		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

}
