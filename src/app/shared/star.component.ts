import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "star-rating",
  templateUrl: "./star.component.html",
  styleUrls:['./star.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  starWidth: number = 0;

  ngOnInit(): void {
    this.starWidth = this.rating * 75 / 5;
  }

  onclick(): void{
      this.ratingClicked.emit(`Rating is clicked`);
  }
}