import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PlayerService } from 'src/app/modules/shared/services/player/player.service';
import { JugadorModel } from '../../models/jugador.model';

@Component({
  selector: 'app-scoreview',
  templateUrl: './scoreview.component.html',
  styleUrls: ['./scoreview.component.css'],
})
export class ScoreviewComponent implements OnInit {

  playersLog!: JugadorModel[];
  actualPlayer!: any;
  userId!: string | undefined;

  constructor(
    private playerService$: PlayerService,
    private authService$: AuthService
  ) {
    this.authService$.getUserAuth().then((res) => (this.userId = res?.uid));

    this.playerService$.getAllGamers().subscribe({
      next: (data) => {
        
        this.actualPlayer = data.find(
          (player: any) => player.uid === this.userId
        );
        console.log('Estos son los datos: ', data);
      },
    });
  }

  ngOnInit(): void {


  }
}

