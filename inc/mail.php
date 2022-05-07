<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require __DIR__.'/config.php';
require '../vendor/autoload.php';

$_POST = json_decode(file_get_contents("php://input"), true) ?: [];
$phone=$_POST['phone'];
$name=trim($_POST['name']);
$carts=$_POST['carts'];
$total=$_POST['total'];
$email=trim($_POST['email']);

$html='<h1>Заявка с сайта</h1>';

$html.='
<p><strong>Имя:</strong> '.$name.'</p>
';

$html.='
<p><strong>Телефон:</strong> '.$phone.'</p>
';

$html.='
<p><strong>Email:</strong> '.$email.'</p>
';
$html.='
<p><strong>Адрес:</strong> '.$_POST['adress'].'</p>
';


$html.='<h3>Заказ</h3>
<ul>
';
foreach ($carts as $cart){
    $html.='
    <li>'.$cart['title'].' - '.$cart['count'].' шт.</li>
    ';
}
$html.='</ul>';
$html.='
<p><strong>Итог:</strong> '.$total.'</p>
';

$mail = new PHPMailer();

$mail->isSMTP();
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->SMTPAuth = true;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 465;
$mail->Username = 'aleksandrmajlo@gmail.com';
//$mail->Password = 'iortshrjbaurakch';
$mail->Password = 'otfzpmjilrzveavx';

$mail->setFrom($email, $name);
$mail->addAddress($mail_to, $mail_to_name);


$mail->Subject = $subject;
$mail->AltBody = 'text';
$mail->msgHTML($html);
$mail->CharSet = 'UTF-8';
if (!$mail->send()) {
//    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
//    echo 'Message sent!';
}

echo json_encode([
    'suc'=>1
]);

