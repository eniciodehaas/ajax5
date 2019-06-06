function showList(str, typeSearch) {
    console.log(typeSearch);
    if (str == "") {
      document.getElementById("txtHint").innerHTML = "";
      return;
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(typeSearch == "list"){
          let responseServer = this.responseText;//haal de string binnen
          let myArr = JSON.parse(responseServer);//string omzetten naar array

          printArray(myArr);//parse de array naar de functie
        }
        if(typeSearch == "answer"){
          searchCountry.value='';
          parseJson(xmlhttp.responseText);
          console.log(xmlhttp.responseText);
        }
      }
    };
    xmlhttp.open("GET", "ajax.php?q="+str+"&type="+typeSearch, true);
    xmlhttp.send();
  }
function printArray(placeholder) {
    console.log(placeholder);//// DEBUG
    //txtHint.innerHTML = placeholder[4] + "<br>" + placeholder[5];
    let tekstWeergave = "";//lege string
    for (var i = 0; i < placeholder.length; i++) {
  //  tekstWeergave  += "<a href='ajax.php?q="+ placeholder[i] +"&type=answer'>" + placeholder[i] + "<a>" + "<br>";
    tekstWeergave += '<span id="' + placeholder[i] + '" onClick="showList(this.id,\'answer\')">' + placeholder[i] + '</span><br>';
    //console.log(placeholder[i]);
    }
    txtHint.innerHTML = tekstWeergave; // schrijf naar de html
    //console.log(tekstWeergave);
}

function parseJson(result) {
  let answerArr = JSON.parse(result);
  console.log(answerArr);
//----------
  // let tekstWeergave = "";//lege string
  // for (const [key, value] of Object.entries(answerArr[0])) {
  // //  debug ? console.log(`${key}: ${value}`) : "";
  //   tekstWeergave += key + " : " + value + "<br>";
  //   txtHint.innerHTML = tekstWeergave;
  // }
//----------
 let selectie =
 "<h1>" + answerArr[0].Name + "<h1>" +
 "<h3>Continent: " + answerArr[0].Continent + "</h3>" +
 "<h3><br>Region: " + answerArr[0].Region + "</h3>" +
 "<h3><br>Head of state: " + answerArr[0].HeadOfState + "</h3>" +
 "<h3><br>Population: " + answerArr[0].Population + "</h3>" +
 "<h3><br>Code: " + answerArr[0].Code + "</h3>" +
 "<h3><br>Life expectancy: " + answerArr[0].LifeExpectancy + " years" + "</h3>" +
 "<h3><br>Surface area: " + parseInt(answerArr[0].SurfaceArea) + " km<sup>2</sup>" + "</h3>";
 txtHint.innerHTML = selectie;
}
