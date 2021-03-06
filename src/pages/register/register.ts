import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular'
import {UserProvider} from "../../providers/user";
import {PopProvider} from "../../providers/pop";
import { ValidateProvider} from "../../providers/validate";
import { Storage } from "@ionic/storage";
import {AuthProvider} from "../../providers/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    public userInfo = {
        mobile: "",
        password: "",
        repassword: "",
        code: "",
        parent_uid:''
    };
    public codeText = "获取验证码";
    public codeStatus = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public Pop: PopProvider,
        public Auth:AuthProvider,
        public User: UserProvider,
        public Validate:ValidateProvider,
        private Storage:Storage
    ) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    // 退出注册
    public popOut() {
        this.viewCtrl.dismiss();
    }

    // 去登录
    public toLogin() {
        this.viewCtrl.dismiss();
        this.Auth.modalNoData("LoginPage");
    }

    // 新用户注册
    public register() {
        if(!this.User.validate(this.userInfo)){
            return false;
        }
        this.User.register(this.userInfo).subscribe(res => {
            this.Pop.toast(res.message);
            if (res.code == '0') {
                this.Storage.set("token",res['data']['token']);
                this.viewCtrl.dismiss();
            }
        });
    }

    // 获取短信验证码
    public getCode() {
        let that = this;
        that.User.getCode(that);
    }
}
