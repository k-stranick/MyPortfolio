import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  currentYear!: number;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
