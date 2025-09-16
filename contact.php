<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'tristanyayahan.cs@gmail.com'; 
        $mail->Password = 'zigw mnof wjjy yaxe'; // Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('tristanyayahan.cs@gmail.com', 'Tristan Portfolio');

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Portfolio Message: $subject";
        $mail->Body = "<b>Name:</b> $name <br>
                       <b>Email:</b> $email <br>
                       <b>Subject:</b> $subject <br>
                       <b>Message:</b><br>" . nl2br($message);

        $mail->send();

        $_SESSION['alert'] = "success";
    } catch (Exception $e) {
        $_SESSION['alert'] = "error";
    }

    header("Location: index.php");
    exit();
}
?>
