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

function ListCustomers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
             
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
        var display = "<table><tr><th>City</th><th>Company Name</th><th>Customer ID</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllCustomersResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllCustomersResult[count].City + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].CustomerID + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("listcustomers").innerHTML = display;
        }
}
        
function CreateCustomer()
{
    var objajax = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    //customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    var objdisplay = document.getElementById("result");
    //Create parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
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
    //if (success == 1)
    //{
    //    displayObject.innerHTML = "The operation was successful!";
    //}
    //else
    //{
    //    displayObject.innerHTML = "The operation was not successful:<br>" + exception;
    //}
}

function DeleteCustomer()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
            url += document.getElementById("deleteid").value;
            var objdisplay = document.getElementById("deleteresult");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteCustomerResult.WasSuccessful
                    var error = output.DeleteCustomerResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        
function History()
            {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
            url += document.getElementById("historyid").value;
                        
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
            var display = "<table><tr><th>Product Name</th><th>Total</th></tr>";
            var count = 0;
            for(count = 0; count < result.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("custhist").innerHTML = display;
            }
        }
        
function Orders()
    {
        var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
            url += document.getElementById("orderid").value;
                        
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
            var display = "<table><tr><th>Order Date</th><th>Order ID</th><th>Ship Address</th><th>Ship City</th><th>Ship Name</th><th>Ship Post Code</th><th>Shipped Date</th></tr>";
            var count = 0;
            for(count = 0; count < result.GetOrdersForCustomerResult.length; count ++)
            {
                if (count%2 == 0)
                {
                    rowid = "evenrow";
                }
                else
                {
                    rowid = "oddrow";
                }
                display += "<tr id=" + rowid + "><td>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("orderlist").innerHTML = display;
            }
    }
    
function AddressUpdate()
    {
        var xmlhttp = new XMLHttpRequest();
        var objdisplay = document.getElementById("changeresult");
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    OperationResult(output, "", objdisplay);
                }
        }    
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
        var orderid = Number(document.getElementById("orderID").value);
        var shipname = document.getElementById("shipName").value;
        var shipaddress = document.getElementById("shipAddress").value;
        var shipcity = document.getElementById("shipCity").value;
        var shippostcode = document.getElementById("shipPostcode").value;
        
        var parameters = '{"OrderID":' + orderid + ',"ShipName":"' + shipname + '","ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipPostcode":"' + shippostcode + '"}';
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }