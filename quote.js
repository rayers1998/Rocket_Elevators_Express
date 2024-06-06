"use strict";

let buildingType_select = document.getElementById("building-type");
let buildingType =
    buildingType_select.options[buildingType_select.selectedIndex].value;
let estimateNumElv_div = document.querySelector(".estimate-num-elv");
let numApt_input = document
    .getElementById("number-of-apartments")
    .querySelector("input");
let numFloors_input = document
    .getElementById("number-of-floors")
    .querySelector("input");
let numBasements_input = document
    .getElementById("number-of-basements")
    .querySelector("input");
let numElevators_input = document
    .getElementById("number-of-elevators")
    .querySelector("input");
let maxOcc_input = document
    .getElementById("maximum-occupancy")
    .querySelector("input");
let displayCalcElv_input = document
    .getElementById("elevator-amount")
    .querySelector("input");
  
let productLineSelection_div = document.querySelector(".product-line");
let radioBtns_div = document.querySelector(".radio-btns");
let warning_p = document.getElementById("warning");

let finalPricingDisplay_div = document.querySelector(".final-pricing-display");
let displayUnitPrice_input = document
    .getElementById("elevator-unit-price")
    .querySelector("input");
let displayElvTotalPrice_input = document
    .getElementById("elevator-total-price")
    .querySelector("input");
let displayInstallFee_input = document
    .getElementById("installation-fees")
    .querySelector("input");
let displayEstTotalCost_input = document
    .getElementById("final-price")
    .querySelector("input");

let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
const buildingTypeFields = {
    residential: [
        "number-of-apartments",
        "number-of-floors",
    ],
    commercial: [
        "number-of-floors",
        "maximum-occupancy",
    ],
    industrial: [
        "number-of-elevators",
    ]
};
const unitPrices = {
    standard: 8000,
    premium: 12000,
    excelium: 15000,
};
const installPercentFees = {
    standard: 10,
    premium: 15,
    excelium: 20,
};

// CALCULATIONS
function calcResidentialElev(numFloors, numApts) {
    const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
    console.log(elevatorsRequired)
    return elevatorsRequired;
}
function calcCommercialElev(numFloors, maxOccupancy) {
    const elevatorsRequired = Math.ceil((maxOccupancy * numFloors) / 200)*Math.ceil(numFloors / 10);
    const freighElevatorsRequired = Math.ceil(numFloors / 10);
    return freighElevatorsRequired + elevatorsRequired;
}

function calcInstallFee(totalPrice, installPercentFee) {
    return (installPercentFee / 100) * totalPrice;
}

// DISPLAY
function resetForm() {
    estimateNumElv_div.style.display = "none";
    estimateNumElv_div.querySelectorAll("div").forEach((el) => {
        el.querySelectorAll("input[type='number']").forEach((input) => {
            input.value = "";
        });
        el.querySelectorAll("div.col-4").forEach((div) => {
            div.classList.add("d-none");
        });
    });
    displayCalcElv_input.value = "";
    productLineSelection_div.style.display = "none";
    warning_p.style.display = "none";
    productLineSelection_div
        .querySelectorAll("input[type='radio']")
        .forEach((radioBtn) => {
            radioBtn.checked = false;
        });

    finalPricingDisplay_div.style.display = "none";
    finalPricingDisplay_div
        .querySelectorAll("input[type='text']")
        .forEach((input) => {
            input.setAttribute("value", "");
        });
}

function displayBuildingFields(buildingType) {
    estimateNumElv_div.style.display = "block";
    estimateNumElv_div.querySelector(".step-description").style.display =
        "block";
    estimateNumElv_div.querySelector(".card-block").style.display = "block";
    estimateNumElv_div.querySelectorAll(".row").forEach((row) => {
        row.classList.remove("d-none");
    });
    for (let fieldID of buildingTypeFields[buildingType]) {
        estimateNumElv_div
            .querySelector(`div[id='${fieldID}']`)
            .classList.remove("d-none");
    }
    productLineSelection_div.style.display = "block";
    finalPricingDisplay_div.style.display = "block";

 // Set the card header color based on the building type
 setCardHeaderColor(buildingType);
}

function displayElvCalcResult(buildingType) {
    let calculatedElv;
    if (buildingType == "commercial") {
        calculatedElv = calcCommercialElev(
            parseInt(numFloors_input.value),
            parseInt(maxOcc_input.value)
        );
        displayCalcElv_input.value = calculatedElv;
    } else if (buildingType == "residential") {
        calculatedElv = calcResidentialElev(
            parseInt(numFloors_input.value),
            parseInt(numApt_input.value)
        );
        displayCalcElv_input.value = calculatedElv;
    } else {
        calculatedElv = numElevators_input.value;
        displayCalcElv_input.value = calculatedElv;
    }
}

function displayPricing(productLine, numElv) {
    let unitPrice = unitPrices[productLine];
    let installPercentFee = installPercentFees[productLine];
    let subtotal = unitPrice * numElv;
    let totalInstallFee = calcInstallFee(subtotal, installPercentFee);
    let totalPrice = subtotal + totalInstallFee;
    displayUnitPrice_input.setAttribute("value", formatter.format(unitPrice));
    displayElvTotalPrice_input.setAttribute(
        "value",
        formatter.format(subtotal)
    );
    displayInstallFee_input.setAttribute(
        "value",
        formatter.format(totalInstallFee)
    );
    displayEstTotalCost_input.setAttribute(
        "value",
        formatter.format(totalPrice)
    );
}

function updatePricingDisplay() {
    if (!displayCalcElv_input.value) {
        warning_p.style.display = "block";
        this.checked = false;
    } else {
        let numElv = parseInt(displayCalcElv_input.value);
        warning_p.style.display = "none";
        try {
            let productLine = document.querySelector(
                "input[name='product-line']:checked"
            ).id;
            displayPricing(productLine, numElv);
        } catch {
        }
    }
}

function allBuildingFieldsCompleted(buildingType) {
    for (let fieldID of buildingTypeFields[buildingType]) {
        if (
            estimateNumElv_div.querySelector(`div[id='${fieldID}'] input`)
                .value == ""
        ) {
            return false;
        }
    }
    return true;
}

radioBtns_div.querySelectorAll("input[type='radio']").forEach((radioBtn) => {
    radioBtn.addEventListener("click", updatePricingDisplay);
});

buildingType_select.addEventListener("change", function () {
    resetForm();
    buildingType = this.value;
    if (buildingType == "---Select---") {
        resetForm();
    } else {
        displayBuildingFields(buildingType);
        estimateNumElv_div.addEventListener("change", function () {
            if (!allBuildingFieldsCompleted(buildingType)) {
                return;
            } else {
                displayElvCalcResult(buildingType);
                updatePricingDisplay();
            }
        });
    }
});

///////////////////////////////////// Request Quote Page - Change colors based on type building selected! /////////////////////////////////////


// Listen to the DOMContentLoaded event to ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Listen for changes on the building type selection item
    document.getElementById("building-type").addEventListener("change", function() {
        // Get selected value from building type selection item
        var selectedBuildingType = this.value;

        // Get the target element to change the background color
        var targetElement = document.getElementById("quote-form");
        
        // Check the selected building type and change the background color accordingly
        if (selectedBuildingType === "residential") {
            targetElement.style.backgroundColor = "#B8CDDB"; // Example color for residential
        } else if (selectedBuildingType === "commercial") {
            targetElement.style.backgroundColor = "#BA7C7C"; // Example color for commercial
        } else if (selectedBuildingType === "industrial") {
            targetElement.style.backgroundColor = "#818181"; // Example color for industrial
        } else {
            targetElement.style.backgroundColor = "transparent"; // Default or no selection
        }
    });
});

// Another event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function() {
    // Listen for changes on the building type selection item
    document.getElementById("building-type").addEventListener("change", function() {
        // Get selected value from building type selection item
        var selectedBuildingType = this.value;

        // Get all headers with the "card-heading" class
        var headers = document.querySelectorAll(".card-heading");

        // Set colors for each building type
        var colors = {
            residential: "#E9E8E8", // light Gray
            commercial: "#E9E8E8", // light Gray
            industrial: "#E9E8E8"  // light Gray
        };
        
        // Change the background color of each header based on the selected building type
        headers.forEach(function(header) {
            header.style.backgroundColor = colors[selectedBuildingType] || "transparent"; // Use the color or default to transparent
        });
    });
});


