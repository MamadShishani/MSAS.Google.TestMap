import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marker!: google.maps.Marker;
  markersArray: google.maps.Marker[] = []; 
  markersArrayLatLngList: google.maps.LatLng[] = [];
  
  constructor() { }
  
  ngOnInit(): void {
    
    this.initMap();
  }

  initMap() { 
    const myLatLng = { lat: -25.363, lng: 131.044 };
    
    const map = new google.maps.Map(
      document.getElementById("map")!,
      {
        zoom: 4,
        center: myLatLng,
      }
      );
      const GetLatLngValuesFromMarker = () => {
        let latlng: google.maps.LatLng = this.marker.getPosition()!;
        this.markersArrayLatLngList.push(latlng)
    }
    
      map.addListener('click', (e: any) => {
        
        addMarker(e.latLng);
        this.markersArray.push(this.marker);
        GetLatLngValuesFromMarker();
        AddPath();
      });
      const addMarker = (latLng: google.maps.LatLng) => {
        this.marker = new google.maps.Marker({
            map: map,
            position: latLng,
        });
        
      }
      const AddPath = () => {
      const Path = new google.maps.Polyline({
        path: this.markersArrayLatLngList,
        geodesic: true,
        strokeColor: "#5A5A5A",
        strokeOpacity: 0.5,
        strokeWeight: 2,
      });
      
      if (Path !== null) {
        Path.setMap(null)
      }
      Path.setMap(map)
      
      
    }

  }   
      
    }
  
  //ONE MARKER THING
  
  // let marker: google.maps.Marker = new google.maps.Marker({ map: map, draggable: true});

// function addMarker(latLng: google.maps.LatLng) {
//   marker.setPosition(latLng)
// }  
// map.addListener('click', function(e: any) {
  //   console.log(e);
  //   addMarker(e.latLng);
  // });