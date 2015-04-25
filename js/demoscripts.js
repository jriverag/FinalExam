function MenuSelect()
{
    document.getElementById("about").style.visibility = "hidden";
    document.getElementById("add").style.visibility = "hidden";
    document.getElementById("change").style.visibility = "hidden";
    document.getElementById("delete").style.visibility = "hidden";
    document.getElementById("list").style.visibility = "hidden";
    
    
    var selection = document.getElementById("menuitems").value;
    
    switch (selection)
    {
        case "Home":
            
            break;
        case "About":
            document.getElementById("about").style.visibility = "visible";
            break;
        case "Add a Category":
            document.getElementById("add").style.visibility = "visible";
            break;
        case "Change a Category":
            document.getElementById("change").style.visibility = "visible";
            break;
        case "Delete a Category":
            document.getElementById("delete").style.visibility = "visible";
            break;
        case "List Categories":
            document.getElementById("list").style.visibility = "visible";
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function ListCat()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
             
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText);
        GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
            
    function GenerateOutput(result)
    {
        var display = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
        var count = 0;
        var rowid = "oddrow";
       
        for(count = 0; count < result.GetAllCategoriesResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcat").innerHTML = display;
        }
}
        
function CreateCat()
{
    var objajax = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    //customer data from web page
    var cname = document.getElementById("catname").value;
    var cdescription = document.getElementById("catdesc").value;
    
    //Create parameter string
    var newcustomer = '{"CName":"' + cname + '","CDescription":"' + cdescription + '"}';
    var objdisplay = document.getElementById("result");
    
    //Checking for AJAX operation return
    objajax.onreadystatechange = function()
    {
        if (objajax.readyState == 4 && objajax.status == 200)
        {
            var result = JSON.parse(objajax.responseText);
            var outcome = result.WasSuccessful
            var error = result.Exception;
            OperationResult(outcome, error, objdisplay);
        }
    }
    //Start AJAX operation
    objajax.open("POST", url, true);
    objajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objajax.send(newcustomer);
}

function OperationResult(success, exception, displayObject)
{
    switch (success)
    {
        case 1:
            displayObject.innerHTML = "The operation was successful!";
            break;
        case 0:
            displayObject.innerHTML = "The operation was not successful:<br>" + exception;
            break;
        case -2:
            displayObject.innerHTML = "The operation was not successful because the data string supplied could not be deserialized into the service object.";
            break;
        case -3:
            displayObject.innerHTML = "The operation was not successful because a record with the supplied Order ID could not be found";
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}


function DeleteCategory()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
            url += document.getElementById("deleteid").value;
            var objdisplay = document.getElementById("deleteresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteCategoryResult.WasSuccessful
                    var error = output.DeleteCategoryResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        

    
function CatUpdate()
    {
        var xmlhttp = new XMLHttpRequest();
        var objdisplay = document.getElementById("changeresult");
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var result = JSON.parse(xmlhttp.responseText);
                    var outcome = result.WasSuccessful
                    var error = result.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
        }    
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
        var cid = Number(document.getElementById("catID").value);
        var cdescription = document.getElementById("catdescription").value;
                
        var parameters = '{"CID":' + cid + ',"CDescription":"' + cdescription + '"}';
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }