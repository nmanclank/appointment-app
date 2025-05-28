import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core'; 

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{
  
  newAppointmentTitle: string = "";
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];
// Init method for lifecycle hook
  ngOnInit(): void {
    
    let savedAppointments = localStorage.getItem("appointments"); // <-------- LocalStorage for dev
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []; // <-------- LocalStorage for dev
}

  addAppointment() {

    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
      let newAppointment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
      this.appointments.push(newAppointment) // push to array
      // Clear input fields
      this.newAppointmentTitle = "";
      this.newAppointmentDate = new Date();

      localStorage.setItem("appointments", JSON.stringify(this.appointments)); // <-------- LocalStorage for dev 
      // Test only --> alert(this.appointments.length + " appointment(s) added.");
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1); // this will remove appointment from array
    localStorage.setItem("appointments", JSON.stringify(this.appointments)); // <-------- LocalStorage for dev 
  }
}
