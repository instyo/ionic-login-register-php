import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions }  from "@angular/http";
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild("username") username;
	@ViewChild("password") password;
	public loginForm: any;
	public backgroundImage = './assets/imgs/background.jpg';
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public app: App,
		public menuCtrl: MenuController, 
    public navParams: NavParams,
    private http: Http
		) {
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
	}
	
	ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);
	}
	
	ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  Login(){
		if(this.username.value=="" ){
			let alert = this.alertCtrl.create({
				title:"Caution",
				subTitle:"Username must be filled",
				buttons: ['OK']
			});
			alert.present();

		} else if(this.password.value==""){

			let alert = this.alertCtrl.create({
				title:"Caution",
				subTitle:"Password must be filled",
				buttons: ['OK']
			});
			alert.present();

		} else {
			var headers = new Headers();
			headers.append("Accept", 'application/json');
			headers.append('Content-Type', 'application/json' );
			let options = new RequestOptions({ headers: headers });
			let data = {
				username: this.username.value,
				password: this.password.value,
			};

			let loader = this.loadingCtrl.create({
				content: 'Processing please wait…',
			});

			loader.present().then(() => {
				this.http.post('http://localhost:8080/ionlogin/login.php',data, options)
				.map(res => res.json())
				.subscribe(res => {
					loader.dismiss()
					if(res['status']=="true"){
						// console.log(res.userdata[0]);
						let alert = this.alertCtrl.create({
							title:"Alert",
							subTitle:('You have logged in!'),
							buttons: ['OK']
						});
						// create variable to store userdata into localstorage
						var logindata = JSON.parse(localStorage.getItem('userlogin')) || [];
						logindata.push(res.userdata[0]);
						localStorage.setItem('userlogin', JSON.stringify(logindata));
						alert.present();
						this.navCtrl.setRoot(HomePage);
					} else {
						let alert = this.alertCtrl.create({
							title:"ERROR",
							subTitle:(res.message),
							buttons: ['OK']
						});
						alert.present();
					}
				});
			});
		}
	}

  toSignup(){
    this.navCtrl.push(
      RegisterPage
    );
  }
}
