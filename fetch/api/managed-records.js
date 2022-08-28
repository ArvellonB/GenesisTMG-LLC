import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
var primaryColors = ["red", "blue", "yellow"];

function retrieve(options) {
    var options = options || {};
    var limit = 10;
    var page = options.page || 1;
    
    var uri = URI(window.path).addSearch("limit", limit+1).addSearch("offset", (page-1) * limit);
    if(options.colors && options.colors.length > 0) {
        uri.addSearch("color[]", options.colors);
    }
    return fetch(uri).then(
        function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("Records API failed with error code " + response.status)
            }
            
        }    
    ).then(
        function(records) {
            var isLastPage = records.length <= limit;
            if(!isLastPage) {
                records.splice(limit, 1);
            }
            
            records.forEach(item => item.isPrimary = primaryColors.indexOf(item.color) != -1);
            
            var transformed = {};
            transformed.ids = records.map(item => item.id);
            transformed.open = records.filter(item => item.disposition == "open");
            transformed.closedPrimaryCount = records.filter(item => item.disposition == "closed" && item.isPrimary === true).length;
            transformed.previousPage = page == 1 ? null : page - 1;
            transformed.nextPage = isLastPage ? null : page + 1;
            return transformed;
        }    
    ).catch(
        function(error) {
            console.log("ERROR: " + error);
        }    
    )
}

export default retrieve;