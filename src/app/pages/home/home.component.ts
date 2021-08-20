import { Component, OnInit } from '@angular/core';

// 1
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // 2
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any>;

  constructor(

    // 3
    private afs: AngularFirestore
  ) {

// 4
this.itemsCollection = afs.collection<any>('articles');
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });

  }

  ngOnInit(): void {
  }

}
