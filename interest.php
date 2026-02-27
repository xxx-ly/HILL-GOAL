<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 引入 PHPMailer 類別
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';


$interest  = $_POST['interest'] ?? [];
$interestText = is_array($interest) ? implode(', ', $interest) : '';
$request  = $_POST['request_type'] ?? [];
$requestText = is_array($request) ? implode(', ', $request) : '';

$firstName = $_POST['firstName'] ?? '';
$lastName  = $_POST['lastName'] ?? '';
$email     = $_POST['email'] ?? '';
$phone     = $_POST['phone'] ?? '';
$contact   = $_POST['contact'] ?? '';
$country   = $_POST['country'] ?? '';
$company   = $_POST['company'] ?? '';
$jobTitle  = $_POST['jobTitle'] ?? '';
$message   = $_POST['message'] ?? '';



// 郵件內容
$body = '
<html>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#222;color:#ffffff;padding:20px;">
              <h2 style="margin:0;font-size:20px;">【感興趣的項目】</h2>
              <p style="margin:5px 0 0;font-size:13px;color:#cccccc;">
                hill5356.com
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333;">
                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Interest</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($interestText) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Request</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($requestText) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;width:150px;">First Name</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($firstName) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Last Name</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($lastName) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Email</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($email) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Phone</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($phone) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Contact</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($contact) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Country</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($country) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Company</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($company) . '</td>
                </tr>

                <tr>
                  <td style="padding:8px 0;font-weight:bold;">Job Title</td>
                  <td style="padding:8px 0;">' . htmlspecialchars($jobTitle) . '</td>
                </tr>
              </table>

              <!-- Message box -->
              <div style="margin-top:20px;">
                <p style="font-weight:bold;margin-bottom:8px;">Message</p>
                <div style="background:#f4f6f8;border-radius:6px;padding:15px;line-height:1.6;">
                  ' . nl2br(htmlspecialchars($message)) . '
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0f0f0;padding:15px;font-size:12px;color:#777;text-align:center;">
              This email was sent from hill5356.com contact form.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
';

// 目標信箱陣列
$recipients = [
    'iopiop0806@gmail.com'
];

// 郵件主題
$subject = '【感興趣的項目】';
$mail = new PHPMailer(true);


try {
    // 使用 PHP mail() 函式，不用 SMTP
    $mail->isMail();
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    // 設定寄件者（網域的信箱）
    $mail->setFrom('service@hill5356.com', 'hill5356.com');

     // 將陣列內每個收件人加入
    foreach ($recipients as $to) {
        $mail->addAddress($to);
    }

    $mail->addReplyTo($email);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $body;

    $mail->send();

    echo json_encode([
        'data' => [
            'status' => true,
            'received' => "Mailer OK"
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'data' => [
            'status' => false,
            'error' => "Mailer Error: {$mail->ErrorInfo}"
        ]
    ]);
}
