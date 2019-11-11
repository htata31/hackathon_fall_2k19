import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  coursesData = [];
  mailId = '';
  index = 0;
  userName = '';
  searchDestination = '';
  days = '';
  interest = '';
  url1 = '';
  list = [];
  placeidUrl = '';
  description = '';
  currentLat ;
  currentLong ;
  geolocationPosition ;


  constructor(private route: ActivatedRoute, private http1: HttpClient, private router: Router, private http2: HttpClient) { }
  url = 'https://api.mlab.com/api/1/databases/htata/collections/travelguide?apiKey=bSL6owZlWxFJFxmKC-o3eL92NCtIS04Z';

  ngOnInit() {

    this.mailId = this.route.snapshot.params['id'];
    this.http1.get(this.url).subscribe((res: any) => {
      this.index = res.findIndex(e => e.email === this.mailId);

      this.userName = 'Welcome ' + res[this.index].firstName ;

      console.log(this.userName);

    });
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getSearchResult = function() {
    let that = this;
    this.url1 = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + this.searchDestination
            + '+point+of+interest' + this.interest + '&language=en&key=AIzaSyCvnpFKAcsp9bg94zysoNY7QLv-P3SghJ8';
    this.http1.get(this.url1).subscribe((res: any) => {
      console.log(res);
      this.list = Object.keys(res.results).map(function(k) {
        const i = res.results[k];
        // let descriptiondata = '';
        const placeName = 'https://kgsearch.googleapis.com/v1/entities:search?query=' +
                          i.name + '&key=AIzaSyCZbMz2VUDfsNIawl7W9W64FpZp8gsoh10&limit=1&indent=True';
        // that.get(placeName).subscribe((res1: any) => {
        //   console.log('des', res1);
        //   if (res1.itemListElement[0].result.detailedDescription.articleBody !== undefined) {
        //   // console.log('des', res1.itemListElement[0].result.detailedDescription.articleBody);
        //   descriptiondata = res1.itemListElement[0].result.detailedDescription.articleBody;
        //   }
        // });
        const image = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference='
        + i.photos[0].photo_reference + '&key=AIzaSyCvnpFKAcsp9bg94zysoNY7QLv-P3SghJ8';
        console.log(image);

        return {imageurl: image, name: i.name, rating: i.rating , address : i.formatted_address, location: i.geometry.location,
                currentLatitude: that.currentLat, currentLongitude : that.currentLong};
      });

      console.log(this.list);
      // this.list = res.results;
    });
  };

}
