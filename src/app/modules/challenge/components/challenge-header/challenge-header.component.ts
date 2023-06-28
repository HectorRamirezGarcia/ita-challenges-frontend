import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from './../../../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-challenge-header',
  templateUrl: './challenge-header.component.html',
  styleUrls: ['./challenge-header.component.scss'],
})
export class ChallengeHeaderComponent {


  @Input() title = "";
  @Input() creation_date!: Date;
  @Input() level = "";

  challenge_title: string | undefined
  challenge_date: Date | undefined
  challenge_level: string | undefined
  
  ngOnInit(){
    this.challenge_title = this.title;
    this.challenge_date = this.creation_date
    this.challenge_level = this.level
  }

  constructor(private modalService: NgbModal) {}

  openRegisterModal(){
    this.modalService.open(RegisterModalComponent, { centered : true, size : 'lg' })
  }
}