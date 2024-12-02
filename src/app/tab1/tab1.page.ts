import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private navController: NavController 
  ) {}

  async login() {
    if (this.email === '' || this.password === '') {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.email === 'teste@teste.com' && this.password === '123456') {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Login realizado com sucesso!',
        buttons: ['OK'],
      });
      await alert.present();

     
      this.navController.navigateRoot('/tabs/tab2');
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Credenciais inválidas.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  register() {
    console.log('Redirecionar para tela de registro');
  }
}
