<?php
include "dbVars.php";
$resultArray = array();
$search = $_GET['q'];
$type = $_GET['type'];
$con = mysqli_connect($servername,$uid,$pwd,$database);
if (!$con) {
  die('Geen verbinding: ' . mysqli_error($con));
}
mysqli_select_db($con,"c3593world");
$sql = "SELECT * FROM country WHERE name LIKE '$search%' ";
if ($type == "list") {
  $result = mysqli_query($con,$sql);
  while ($row = mysqli_fetch_array($result)) {
    $resultArray[]=$row['Name'];
  }
  echo json_encode($resultArray);
}

if ($type == "answer") {
  $result = mysqli_query($con,$sql);
  while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $resultArray[]=$row;
  }
  echo json_encode($resultArray, JSON_UNESCAPED_UNICODE);
}

mysqli_close($con);
?>
