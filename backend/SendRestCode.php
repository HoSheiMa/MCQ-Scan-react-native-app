<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require_once 'vendor/autoload.php';

$code = $_GET['code'];
$email = $_GET['email'];
$key = $_GET['key'];

if ($key != "admin00029921421") {
    return;
}
// $code = "12344";
// $email = "qandilafa@gmail.com";


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->CharSet = 'UTF-8';
    $mail->SMTPDebug = 0;
    // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Port = 587;                                    // TCP port to connect to
    $mail->Username = '';
    $mail->Password = '';                       // STP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted

    //Recipients
    $mail->setFrom("mcq@mcq.com", "mcq");
    $mail->addAddress("$email");    // Name is optional
    $mail->setLanguage('en', '/optional/path/to/language/directory/');
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Rest mcq App password';
    $mail->Body =
        '
            <table border="0" cellpadding="0" cellspacing="0" width="100%">	
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    <img src="https://image.flaticon.com/icons/svg/1632/1632590.svg" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                                <b>the code is ' . $code . '</b>
                                            </td>
                                        </tr>
                                        <tr>
                                        
                                        </tr>
                                        <tr>	
                </tr>
            </table>
        ';

    $mail->send();
    echo 'true';
} catch (Exception $e) {
    echo 'false';
}
