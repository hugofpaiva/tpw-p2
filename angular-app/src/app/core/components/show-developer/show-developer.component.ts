import {Component, Input, OnInit} from '@angular/core';
import {Developer} from '../../models/developer';
import {ActivatedRoute} from '@angular/router';
import {DeveloperService} from '../../services/developer/developer.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-developer',
  templateUrl: './show-developer.component.html',
  styleUrls: ['./show-developer.component.css']
})
export class ShowDeveloperComponent implements OnInit {
  devid = 0;
  developer: Developer;

  constructor(private developerService: DeveloperService, private activeroute: ActivatedRoute, private location: Location) {
    this.devid = Number(this.activeroute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    console.log(this.developer);
    this.developerService.getDeveloper(this.devid).subscribe(developer => this.developer = developer);
  }

  goBack(): void {
    this.location.back();
  }

}
