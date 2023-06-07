import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { AesCrypto } from 'src/app/_core/client/utils/AesCrypto';
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

    encryptedText: string;
    decryptedText: string;

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private smartContractService: SmartContractService,
        private userManagementService: UserManagementService,
        private router: Router
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

    public toggleCollapseSidebar(): void {
        this.besafeGlobalService.toggleCollapseSidebar();
    }

    public signOut(): void {
        localStorage.removeItem(UserManagementService.AUTH_USER);
        this.router.navigate([`${APP_ROUTES.auth._}`]);
    }

    connect() {
        const res = this.smartContractService.connectToMetamask();
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })

    }

    add() {
        const res = this.smartContractService.addFile("45", "ok eissa besafe it is");
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })
    }

    get() {
        const res = this.smartContractService.getFile("45");
        res.subscribe((res) => {
            console.log(res);

        }, err => {
            console.log(err);

        })
    }
}


