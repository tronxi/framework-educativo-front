import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';

@Component({
  selector: 'app-homepage-content',
  templateUrl: './homepage-content.component.html',
  styleUrls: ['./homepage-content.component.css']
})
export class HomepageContentComponent implements OnInit {

  constructor(private jwt: JwtService) { }

  ngOnInit() {
  }

}
