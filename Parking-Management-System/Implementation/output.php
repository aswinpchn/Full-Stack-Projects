<?php
$url1=$_SERVER['REQUEST_URI'];
   header("Refresh: 2; URL=$url1","Content-Type: image/jpeg");
$conn = new mysqli( 'mysql1.000webhost.com', 'a5926846_aswin', 'Aswin@1182', 'a5926846_aswin' );
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT * FROM final";
$result = $conn->query($sql);
date_default_timezone_set('Asia/Kolkata');
$today = date("F j, Y, g:i a");

$font = 'arial.ttf';
echo $today;
echo '<br>';
$r1=150;$c1=100;$c=0;$flag=1;
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		//$s1=$row["status"];
		if($c==6)
		{
			if($flag==3)
			{
				
			echo ' ............................
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="er.png" width="75" height="75" alt="Logo of a company" />
Error condition.. sensor not available or data not received.

</html>
';
				
				$flag=4;
			}
			if($flag==2)
			{
				
			echo ' ............................
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="j.png" width="75" height="75" alt="Logo of a company" />
Parking Space is Available
</html>
';
				
				$flag=3;
			}
			if($flag==1)
			{
				
			echo ' ............................
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="r.png" width="75" height="75" alt="Logo of a company" />
Car already parked. Thus the parking is blocked
</html>
';
				
				$flag=2;
			}
			echo '<br>';
			$c=0;
		}
		if($c%2==1)
		{
		
			echo ' 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="path.png" width="75" height="75" alt="Logo of a company" />

</html>
';
		}	
		if ($row["status"]== "present") 
		{
			echo ' 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="r.png" width="75" height="75" alt="Logo of a company" />

</html>
';
		}
		else if($row["status"]=="not present")
		{
			echo ' 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="j.png" width="75" height="75" alt="Logo of a company" />

</html>
';
		}
		else if($row["status"]=="error")
		{
			echo ' 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<img src="er.png" width="75" height="75" alt="Logo of a company" />

</html>
';
		}
			
		$r1+=225;
		$c+=1;
		
	}
} else {
	
			
}

?>
