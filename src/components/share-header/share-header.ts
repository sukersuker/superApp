import {Component, Input, OnInit, Output} from '@angular/core';
import {EventEmitter} from "@angular/core";
import { NavController, NavParams} from "ionic-angular";
import { PopProvider } from "../../providers/pop";
import {TongxinProvider} from "../../providers/tongxin";

/**
 * Generated class for the ShareHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'share-header',
    templateUrl: 'share-header.html'
})
export class ShareHeaderComponent implements OnInit{
    @Input() headerTitle: string = '';
    @Input() shareLink: string = '';
    @Input() commentPage: string = '';
    @Input() cart: string = '';
    @Input() shareGood: string = '';
    @Input() collect: string = '';
    @Input() concern: string = '';
    @Input() buy: string = '';
    @Input() goodId: number = 0;
    @Input() all: string = '';
    //声明事件发射器
    @Output() checkEmitter = new EventEmitter<boolean>();
    private isLogin:boolean = false;
    public goodSku:Object = {};
    constructor(public Pop:PopProvider,
                public navCtrl:NavController,
                public navParams:NavParams,
                public TongXin:TongxinProvider) {
        console.log('Hello ShareHeaderComponent Component');
    }
    ngOnInit(): void {
        this.TongXin.obSku.subscribe(res=>{
            console.log(33333)
            console.log(res)
            this.goodSku  = res;
        })
    }
    // 点击分享
    public share() {
        console.log("您已点击了分享按钮！");
    }

    // 点击评论
    public comment() {
        console.log("您点击了评论按钮！")
    }

    // 打开性别选择框
    public sexAlert() {
        this.checkEmitter.emit(true);
    }

    // 点击购买商品
    public buyGood(id) {
        // if(!this.isLogin){
        //     this.Pop.confirm().subscribe(data=>{
        //         if(data['is_login']){
        //             this.navCtrl.push("OrderDetailPage",{id:id});
        //         }
        //     });
        // }
        console.log(this.goodSku)

    }

    // 点击添加购物车
    public addCart() {
        if(!this.isLogin){
            this.Pop.confirm().subscribe(data=>{
                if(data['is_login']){
                    console.log('去登陆');
                }
            });
        }

    }

    // 点击分享
    public addShare() {
        if(!this.isLogin){
            this.Pop.confirm().subscribe(data=>{
                if(data['is_login']){
                    console.log('去登陆');
                }
            });
        }
    }

    // 点击收藏
    public addCollect() {
        if(!this.isLogin){
            this.Pop.confirm().subscribe(data=>{
                if(data['is_login']){
                    console.log('去登陆');
                }
            });
        }
    }


}
