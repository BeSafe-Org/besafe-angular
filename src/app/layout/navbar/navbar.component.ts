import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { AesCrypto } from 'src/app/_core/client/utils/AesCrypto';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';
import { File } from 'src/app/_core/models/entities/File';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { GoogleApiService } from 'src/app/_core/services/backend/google-api.service';
import { SmartContractService } from 'src/app/_core/services/backend/smart-contract.service';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isSigningOut: boolean = false;
    public currentTheme: boolean = true;

    encryptedText: string;
    decryptedText: string;

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private smartContractService: SmartContractService,
        private userManagementService: UserManagementService,
        private fileManagementService: FileManagementService,
        private router: Router,
        private googleApiService: GoogleApiService
    ) {

        const password = 'Pass123$';
        const salt = 'a1b2c3d4e5f6dsdfsdfdf';

        const userKey = new AesCrypto().generateUserKey(password, salt);
        const iv = new AesCrypto().generateRandomIV();
        console.log(userKey);

        const aes = new AesCrypto(userKey, iv);

        const plainText = 'Hello, world!';
        this.encryptedText = aes.encrypt(plainText);
        this.decryptedText = aes.decrypt(this.encryptedText);

        console.log(this.encryptedText);
        console.log(this.decryptedText);
    }

    ngOnInit(): void {
    }

    public switchTheme(): void {
        this.currentTheme = !this.currentTheme;
    }

    public toggleCollapseSidebar(): void {
        this.besafeGlobalService.toggleCollapseSidebar();
    }

    public signOut(): void {
        this.isSigningOut = true;
        setTimeout(() => {
            new LocalStorage().removeItem("userId");
            new LocalStorage().removeItem("masterKey");
            this.router.navigate([`${APP_ROUTES.auth._}`]);
        }, 3000);
    }

    public refreshGoogle(): void {
        this.googleApiService.signOut();
    }

    add() {

        // console.log("start");
        // let file = new File("wvnbrghllcrzy@internetkeno.com", "sdf", "Rizwan", "png", false, true);
        // this.fileManagementService.addFileMetaData(file).subscribe(res => {
        //     console.log(res);
        // }, err => {
        //     console.log(err);
        // })
        const res = this.smartContractService.connectToMetamask();
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })

    }

    up() {
        // console.log("start");
        // let file = new File("wvnbrghllcrzy@internetkeno.com", "sdf", "Rizwan", "png", true, true);
        // this.fileManagementService.updateFileMetaData(file).subscribe(res => {
        //     console.log(res);
        // }, err => {
        //     console.log(err);
        // })
        const res = this.smartContractService.addFile("45", "ok eissa besafe it is");
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })
    }

    de() {
        // console.log("start");
        // let file = new File("wvnbrghllcrzy@internetkeno.com", "sdf", "Rizwan", "png", true, true);
        // this.fileManagementService.deleteFileMetaData("sdf").subscribe(res => {
        //     console.log(res);
        // }, err => {
        //     console.log(err);
        // })
        const res = this.smartContractService.getFile("45");
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })
    }
}


