/*
Author: Layla Jenkins
Date: 07/26/2026
Purpose: Performs calculations and gives user a report
*/
"use strict"

var tripInfo = {}; //empty object to hold trip info

$(function () {
    //select the form once the document is ready
    const $form = $('#tripForm');

    //handles form submission
    $form.on('submit', function (e) {
        //prevent page refresh
        e.preventDefault();

        //gets values from input fields 
        const tripName = $('#tripName').val();
        const startMileage = Number($('#startMileage').val());
        const endMileage = Number($('#endMileage').val());
        const gallonsUsed = Number($('#gallonsUsed').val());

        //calculates total miles
        const totalMiles = endMileage - startMileage;

        //calculates fuel economy 
        const mpg = totalMiles / gallonsUsed;

        //create custom object 
        tripInfo = {
            name: tripName,
            milesTraveled: totalMiles,
            gasUsed: gallonsUsed,
            fuelEcon: mpg.toFixed(2)
        };

        //gets current date/time
        const dateTime = new Date().toLocaleString();

        //stores date/time in sessionStorage
        sessionStorage.setItem("tripDateTime", dateTime);

        //stores trip summary OBJECT in cookies
        const cookieInfo = JSON.stringify(tripInfo);
        document.cookie = "tripSummary=" + cookieInfo + "; max-age=3600";

        //opens new window for trip summary
        const summaryWindow = window.open("", "_blank");

        //displays trip summary in window
        summaryWindow.document.write("<h1>layjen6644, Trip Summary</h1>");
        summaryWindow.document.write("<p>Trip Name: " + tripInfo.name + "</p>");
        summaryWindow.document.write("<p>Total Miles Traveled: " + tripInfo.milesTraveled + "</p>");
        summaryWindow.document.write("<p>Gallons of Gas Consumed: " + tripInfo.gasUsed + "</p>");
        summaryWindow.document.write("<p>Fuel Economy (MPG) for Trip: " + tripInfo.fuelEcon + "</p>");
        summaryWindow.document.write("<p>Date and Time Generated: " + dateTime + "</p>");
    });
});

