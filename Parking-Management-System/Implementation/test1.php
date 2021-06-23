<?php
$status1 = ($_GET["status1"]);
//$status2 = ($_GET["status2"]);
$time    = ($_GET["time"]);
$er="error";
$p="present";
$np="not present";
//file_put_contents('output.txt', $status1.$status2,$time);
if ( ! empty( $status1 ) ) {

  //file_put_contents('output.txt', "poda".$status1.$status2);
  // Connect to MySQL
  $mysqli = new mysqli( 'mysql1.000webhost.com', 'a5926846_aswin', 'Aswin@1182', 'a5926846_aswin' );
  
  // Check our connection
  if ( $mysqli->connect_error ) {
    die( 'Connect Error: ' . $mysqli->connect_errno . ': ' . $mysqli->connect_error );
  }
  
  // Insert our data
  $sql = "DELETE FROM `final`";
  $mysqli->query($sql);
  $sql1 = "INSERT INTO final ( id, status) VALUES ( '1', '$status1')";
  $sql2 = "INSERT INTO final ( id, status) VALUES ( '2', '$er')";
  $sql3 = "INSERT INTO final ( id, status) VALUES ( '3', '$er')";
  $sql4 = "INSERT INTO final ( id, status) VALUES ( '4', '$er')";
  $sql5 = "INSERT INTO final ( id, status) VALUES ( '5', '$er')";
  $sql6 = "INSERT INTO final ( id, status) VALUES ( '6', '$er')";
  $sql7 = "INSERT INTO final ( id, status) VALUES ( '7', '$er')";
  $sql8 = "INSERT INTO final ( id, status) VALUES ( '8', '$er')";
  $sql9 = "INSERT INTO final ( id, status) VALUES ( '9', '$er')";
  $sql10 = "INSERT INTO final ( id, status) VALUES ( '10', '$er')";
  $sql11 = "INSERT INTO final ( id, status) VALUES ( '11', '$er')";
  $sql12 = "INSERT INTO final ( id, status) VALUES ( '12', '$er')";
  $sql13 = "INSERT INTO final ( id, status) VALUES ( '13', '$er')";
  $sql14 = "INSERT INTO final ( id, status) VALUES ( '14', '$er')";
  $sql15 = "INSERT INTO final ( id, status) VALUES ( '15', '$er')";
  $sql16 = "INSERT INTO final ( id, status) VALUES ( '16', '$er')";
  $sql17 = "INSERT INTO final ( id, status) VALUES ( '17', '$er')";
  $sql18 = "INSERT INTO final ( id, status) VALUES ( '18', '$er')";
  $sql19 = "INSERT INTO final ( id, status) VALUES ( '19', '$er')";
  $sql20 = "INSERT INTO final ( id, status) VALUES ( '20', '$er')";
  $sql21 = "INSERT INTO final ( id, status) VALUES ( '21', '$er')";
  $sql22 = "INSERT INTO final ( id, status) VALUES ( '22', '$er')";
  $sql23 = "INSERT INTO final ( id, status) VALUES ( '23', '$er')";
  $sql24 = "INSERT INTO final ( id, status) VALUES ( '24', '$er')";
  $sql25 = "INSERT INTO final ( id, status) VALUES ( '25', '$er')";
  $sql26 = "INSERT INTO final ( id, status) VALUES ( '26', '$er')";
  $sql27 = "INSERT INTO final ( id, status) VALUES ( '27', '$er')";
  $sql28 = "INSERT INTO final ( id, status) VALUES ( '28', '$er')";
  $sql29 = "INSERT INTO final ( id, status) VALUES ( '29', '$er')";
  $sql30 = "INSERT INTO final ( id, status) VALUES ( '30', '$er')";
  $sql31 = "INSERT INTO final ( id, status) VALUES ( '31', '$er')";
  $sql32 = "INSERT INTO final ( id, status) VALUES ( '32', '$er')";
  $sql33 = "INSERT INTO final ( id, status) VALUES ( '33', '$er')";
  $sql34 = "INSERT INTO final ( id, status) VALUES ( '34', '$er')";
  $sql35 = "INSERT INTO final ( id, status) VALUES ( '35', '$er')";
  $sql36 = "INSERT INTO final ( id, status) VALUES ( '36', '$er')";
  $sql37 = "INSERT INTO final ( id, status) VALUES ( '37', '$er')";
  $sql38 = "INSERT INTO final ( id, status) VALUES ( '38', '$er')";
  $sql39 = "INSERT INTO final ( id, status) VALUES ( '39', '$er')";
  $sql40 = "INSERT INTO final ( id, status) VALUES ( '40', '$er')";
  $sql41 = "INSERT INTO final ( id, status) VALUES ( '41', '$er')";
  $sql42 = "INSERT INTO final ( id, status) VALUES ( '42', '$er')";


  $insert = $mysqli->query($sql1);
  $insert = $mysqli->query($sql2);
  $insert = $mysqli->query($sql3);
  $insert = $mysqli->query($sql4);
  $insert = $mysqli->query($sql5);
  $insert = $mysqli->query($sql6);
  $insert = $mysqli->query($sql7);
  $insert = $mysqli->query($sql8);
  $insert = $mysqli->query($sql9);
  $insert = $mysqli->query($sql10);
  $insert = $mysqli->query($sql11);
  $insert = $mysqli->query($sql12);
  $insert = $mysqli->query($sql13);
  $insert = $mysqli->query($sql14);
  $insert = $mysqli->query($sql15);
  $insert = $mysqli->query($sql16);
  $insert = $mysqli->query($sql17);
  $insert = $mysqli->query($sql18);
  $insert = $mysqli->query($sql19);
  $insert = $mysqli->query($sql20);
  $insert = $mysqli->query($sql21);
  $insert = $mysqli->query($sql22);
  $insert = $mysqli->query($sql23);
  $insert = $mysqli->query($sql24);
  $insert = $mysqli->query($sql25);
  $insert = $mysqli->query($sql26);
  $insert = $mysqli->query($sql27);
  $insert = $mysqli->query($sql28);
  $insert = $mysqli->query($sql29);
  $insert = $mysqli->query($sql30);
  $insert = $mysqli->query($sql31);
  $insert = $mysqli->query($sql32);
  $insert = $mysqli->query($sql33);
  $insert = $mysqli->query($sql34);
  $insert = $mysqli->query($sql35);
  $insert = $mysqli->query($sql36);
  $insert = $mysqli->query($sql37);
  $insert = $mysqli->query($sql38);
  $insert = $mysqli->query($sql39);
  $insert = $mysqli->query($sql40);
  $insert = $mysqli->query($sql41);
  $insert = $mysqli->query($sql42);



  
  // Print response from MySQL
  if ( $insert ) {
    echo "Success! Row ID: {$mysqli->insert_id}";
  } else {
    die("Error: {$mysqli->errno} : {$mysqli->error}");
  }
  
  // Close our connection
  $mysqli->close();
}
?>