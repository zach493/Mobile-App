<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Viewer</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Database Viewer</h1>
    <form method="post">
        <label for="table">Select a container to display: </label>
        <select id="table" name="table">
            <option value="bookings" <?= isset($_POST['table']) && $_POST['table'] === 'bookings' ? 'selected' : '' ?>>Bookings</option>
            <option value="flight_info" <?= isset($_POST['table']) && $_POST['table'] === 'flight_info' ? 'selected' : '' ?>>Flight Info</option>
            <option value="users" <?= isset($_POST['table']) && $_POST['table'] === 'users' ? 'selected' : '' ?>>Users</option>
            <option value="passengers" <?= isset($_POST['table']) && $_POST['table'] === 'passengers' ? 'selected' : '' ?>>Passengers</option>
        </select>
        <button type="submit">Display</button>
    </form>

    <?php
    $host = "flights.cdiagk8o8g4x.ap-southeast-1.rds.amazonaws.com";
    $user = "admin";
    $password = "xx6UM3oJEa72Hjo5TbmV";
    $dbname = "flights"; // Replace with your database name
    $port = 3306;

    $conn = new mysqli($host, $user, $password, $dbname, $port);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (isset($_POST['table'])) {
        $selectedTable = $_POST['table'];

        // Handle Add Record
        if (isset($_POST['add'])) {
            if ($selectedTable === "bookings") {
                $user = $_POST['user'];
                $info = $_POST['info'];
                $payment = $_POST['payment'];
                $dateBooked = $_POST['dateBooked'];
                $conn->query("INSERT INTO bookings (User, Info, Payment, DateBooked) VALUES ('$user', '$info', '$payment', '$dateBooked')");
            } elseif ($selectedTable === "flight_info") {
                $origin = $_POST['origin'];
                $date = $_POST['date'];
                $destination = $_POST['destination'];
                $id = $_POST['id'];
                $type = $_POST['type'];
                $passengers = $_POST['passengers'];
                $child = $_POST['child'];
                $conn->query("INSERT INTO flight_info (AirportOrigin, Date, AirportDest, ID, Type, Passengers, Child) VALUES ('$origin', '$date', '$destination', '$id', '$type', '$passengers', '$child')");
            } elseif ($selectedTable === "users") {
                $id = $_POST['id'];
                $name = $_POST['name'];
                $card = $_POST['card'];
                $conn->query("INSERT INTO users (ID, Name, Card) VALUES ('$id', '$name', '$card')");
            }
        }

        // Handle Delete Record
        if (isset($_POST['delete'])) {
            $id = $_POST['id'];
            $conn->query("DELETE FROM $selectedTable WHERE ID='$id'");
        }

        // Display the table
        $result = $conn->query("SELECT * FROM $selectedTable");
        if (!$result) {
            die("Query failed: " . $conn->error);
        }

        echo "<h2>$selectedTable Table</h2>";
        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<tr>";
            while ($fieldInfo = $result->fetch_field()) {
                echo "<th>{$fieldInfo->name}</th>";
            }
            echo "</tr>";
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                foreach ($row as $value) {
                    echo "<td>$value</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No data found.</p>";
        }

        // Form to add records
        if ($selectedTable === "bookings") {
            echo '
                <h3>Add Record to Bookings</h3>
                <form method="post">
                    <input type="hidden" name="table" value="bookings">
                    <input type="text" name="user" placeholder="User" required>
                    <input type="text" name="info" placeholder="Info" required>
                    <input type="text" name="payment" placeholder="Payment" required>
                    <input type="date" name="dateBooked" placeholder="Date Booked" required>
                    <button type="submit" name="add">Add</button>
                </form>';
        } elseif ($selectedTable === "flight_info") {
            echo '
                <h3>Add Record to Flight Info</h3>
                <form method="post">
                    <input type="hidden" name="table" value="flight_info">
                    <input type="text" name="origin" placeholder="Airport Origin" required>
                    <input type="date" name="date" placeholder="Date" required>
                    <input type="text" name="destination" placeholder="Airport Destination" required>
                    <input type="text" name="id" placeholder="ID" required>
                    <input type="text" name="type" placeholder="Type" required>
                    <input type="number" name="passengers" placeholder="Passengers" required>
                    <input type="number" name="child" placeholder="Child" required>
                    <button type="submit" name="add">Add</button>
                </form>';
        } elseif ($selectedTable === "users") {
            echo '
                <h3>Add Record to Users</h3>
                <form method="post">
                    <input type="hidden" name="table" value="users">
                    <input type="text" name="name" placeholder="Name" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <input type="text" name="card" placeholder="Card" required>
                    <button type="submit" name="add">Add</button>
                </form>';
        }

        // Delete form
        echo '
            <h3>Delete Record</h3>
            <form method="post">
                <input type="hidden" name="table" value="' . $selectedTable . '">
                <input type="text" name="id" placeholder="ID" required>
                <button type="submit" name="delete">Delete</button>
            </form>';
    }

    $conn->close();
    ?>
</body>
</html>
