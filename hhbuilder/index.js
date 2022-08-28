(function(){

    var members = [];
    
    var addButton = document.getElementsByClassName("add")[0];
    var submitButton = document.getElementsByTagName("button")[1];
    var ageInput = document.getElementsByName("age")[0];
    var relSelect = document.getElementsByName("rel")[0];
    var smokerBox = document.getElementsByName("smoker")[0];
    var debug = document.getElementsByClassName("debug")[0];
    var display = document.getElementsByClassName("household")[0];
    
    

    function show(elem) {
        elem.style.display = "initial";
    }
    function hide(elem) {
        elem.style.display = "none";
    }
    
    
    function addErrorMessageTo(message, addTo) {
        var error = document.createElement("span");
        error.appendChild(document.createTextNode(message));
        error.style = "color:red; margin-left: 20px";
        hide(error);
        addTo.parentElement.appendChild(error);
        return error;
    }
    var ageError = addErrorMessageTo("Age is required and must be a positive number", ageInput);
    var relError = addErrorMessageTo("Relationship is required", relSelect);
    
    var successMessage = document.createElement("div");
    successMessage.appendChild(document.createTextNode("Your Household has been submitted. You may continue editing and submitting this household."));
    successMessage.style = "color: green";
    hide(successMessage);
    display.parentElement.insertBefore(successMessage, display);
    
    
    
    function getInputData() {
        return {
            age: parseInt(ageInput.value),
            rel: relSelect.value,
            smoker: smokerBox.checked
        };
    }
    
    function clearForm() {
        ageInput.value = null;
        relSelect.value = "";
        smokerBox.checked = false;
    }
    
    function clearErrors() {
        hide(ageError);
        hide(relError);
    }
    
    function validateData(data) {
        var valid = true;
        if(!data.age || data.age <= 0) {
            valid = false;
            show(ageError);
        }
        if(!data.rel || data.rel == "") {
            valid = false;
            show(relError);
        }
        return valid;
    }
    
    function updateMembersDisplay() {
        var listDisplay = "<ul>";
        for(var i = 0; i < members.length; i++) {
            var member = members[i];
            listDisplay += "<li> Age: " + member.age + ", Relationship: " + member.rel + ", smoker: " + (member.smoker ? "yes" : "no");
            listDisplay += "<br> <button onclick='householdBuilder.removeMember(" + i + ")'> Remove </button> </li>";
        }
        listDisplay += "</ul>";
        display.innerHTML = listDisplay;
    }
    
    window.householdBuilder = {};
    window.householdBuilder.removeMember = function(index) {
        members.splice(index, 1);
        updateMembersDisplay();
    };
    
    addButton.onclick = function(event) {
        clearErrors();
        var member = getInputData();
        if(validateData(member)) {
            members.push(member);
            updateMembersDisplay();
            clearForm();
        }
        event.preventDefault();
    };

    submitButton.onclick = function(event) {
        debug.innerHTML = JSON.stringify(members);
        show(debug);
        show(successMessage);
        event.preventDefault();
    };
    
    })();