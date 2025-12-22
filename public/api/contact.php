<?php
/**
 * Form Handler for mygeodesy.by
 * Handles both contact form and review form submissions.
 * 
 * Deploy to: public_html/api/contact.php
 * 
 * Endpoints:
 * POST /api/contact.php?type=contact  - Contact form
 * POST /api/contact.php?type=review   - Review form
 */

// Error reporting (disable in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// CORS headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://mygeodesy.by');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не поддерживается'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Configuration
define('CONTACT_EMAIL', 'i@puzinmail.ru');
define('FROM_EMAIL', 'noreply@mygeodesy.by');
define('SITE_NAME', 'mygeodesy.by');

// Rate limiting configuration
define('RATE_LIMIT_WINDOW', 60); // seconds
define('RATE_LIMIT_MAX_REQUESTS', 3);
define('RATE_LIMIT_FILE', sys_get_temp_dir() . '/mygeodesy_rate_limit.json');

/**
 * Simple file-based rate limiting
 */
function checkRateLimit($clientIp, $formType) {
    $now = time();
    $rateData = [];
    $key = $clientIp . '_' . $formType;
    
    // Load existing rate limit data
    if (file_exists(RATE_LIMIT_FILE)) {
        $content = file_get_contents(RATE_LIMIT_FILE);
        $rateData = json_decode($content, true) ?: [];
    }
    
    // Clean old entries
    $rateData = array_filter($rateData, function($entry) use ($now) {
        return ($now - $entry['time']) < RATE_LIMIT_WINDOW;
    });
    
    // Count requests from this IP for this form type
    $clientRequests = array_filter($rateData, function($entry) use ($key) {
        return $entry['key'] === $key;
    });
    
    if (count($clientRequests) >= RATE_LIMIT_MAX_REQUESTS) {
        return false;
    }
    
    // Record this request
    $rateData[] = ['key' => $key, 'time' => $now];
    file_put_contents(RATE_LIMIT_FILE, json_encode($rateData));
    
    return true;
}

/**
 * Get client IP address
 */
function getClientIp() {
    $ipKeys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    
    foreach ($ipKeys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    
    return 'unknown';
}

/**
 * Sanitize input string
 */
function sanitizeInput($input) {
    if (!is_string($input)) {
        return '';
    }
    return trim(strip_tags($input));
}

/**
 * Generate star rating string
 */
function generateStarRating($rating) {
    $filled = str_repeat('★', $rating);
    $empty = str_repeat('☆', 5 - $rating);
    return $filled . $empty;
}

/**
 * Handle contact form
 */
function handleContactForm($data, $clientIp) {
    $errors = [];
    
    // Validation
    if (empty($data['name']) || mb_strlen($data['name']) < 2) {
        $errors[] = 'Имя должно содержать минимум 2 символа';
    } elseif (mb_strlen($data['name']) > 100) {
        $errors[] = 'Имя не должно превышать 100 символов';
    }
    
    $phonePattern = '/^\+?[0-9\s\-()]{10,20}$/';
    if (empty($data['phone']) || !preg_match($phonePattern, $data['phone'])) {
        $errors[] = 'Укажите корректный номер телефона';
    }
    
    if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Укажите корректный email адрес';
    }
    
    if (empty($data['message']) || mb_strlen($data['message']) < 10) {
        $errors[] = 'Сообщение должно содержать минимум 10 символов';
    } elseif (mb_strlen($data['message']) > 2000) {
        $errors[] = 'Сообщение не должно превышать 2000 символов';
    }
    
    if (!empty($errors)) {
        return ['success' => false, 'message' => 'Пожалуйста, исправьте ошибки в форме', 'errors' => $errors];
    }
    
    // Prepare data
    $name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($data['phone'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($data['email'] ?? 'Не указан', ENT_QUOTES, 'UTF-8');
    $message = nl2br(htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8'));
    $datetime = date('d.m.Y H:i:s');
    
    // Email
    $subject = '=?UTF-8?B?' . base64_encode('Новая заявка с сайта ' . SITE_NAME) . '?=';
    
    $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">📩 Новая заявка с сайта</h2>
        </div>
        <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Телефон:</strong> <a href="tel:{$phone}">{$phone}</a></p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Сообщение:</strong></p>
            <div style="padding: 12px 15px; background: white; border-left: 4px solid #3b82f6; border-radius: 4px;">{$message}</div>
            <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">Отправлено: {$datetime} | IP: {$clientIp}</p>
        </div>
    </div>
</body>
</html>
HTML;

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
        'Reply-To: ' . ($data['email'] ?: FROM_EMAIL),
    ]);
    
    $success = mail(CONTACT_EMAIL, $subject, $htmlBody, $headers);
    
    if ($success) {
        return ['success' => true, 'message' => 'Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.'];
    } else {
        return ['success' => false, 'message' => 'Не удалось отправить сообщение. Пожалуйста, позвоните нам по телефону.'];
    }
}

/**
 * Handle review form
 */
function handleReviewForm($data, $clientIp) {
    $errors = [];
    
    // Validation
    if (empty($data['name']) || mb_strlen($data['name']) < 2) {
        $errors[] = 'Имя должно содержать минимум 2 символа';
    } elseif (mb_strlen($data['name']) > 100) {
        $errors[] = 'Имя не должно превышать 100 символов';
    }
    
    if (!empty($data['location']) && (mb_strlen($data['location']) < 2 || mb_strlen($data['location']) > 100)) {
        $errors[] = 'Город/район должен содержать от 2 до 100 символов';
    }
    
    $rating = intval($data['rating'] ?? 0);
    if ($rating < 1 || $rating > 5) {
        $errors[] = 'Выберите оценку от 1 до 5 звёзд';
    }
    
    if (empty($data['text']) || mb_strlen($data['text']) < 20) {
        $errors[] = 'Отзыв должен содержать минимум 20 символов';
    } elseif (mb_strlen($data['text']) > 1000) {
        $errors[] = 'Отзыв не должен превышать 1000 символов';
    }
    
    if (!empty($errors)) {
        return ['success' => false, 'message' => 'Пожалуйста, исправьте ошибки в форме', 'errors' => $errors];
    }
    
    // Prepare data
    $name = htmlspecialchars($data['name'], ENT_QUOTES, 'UTF-8');
    $location = htmlspecialchars($data['location'] ?? 'Не указан', ENT_QUOTES, 'UTF-8');
    $text = nl2br(htmlspecialchars($data['text'], ENT_QUOTES, 'UTF-8'));
    $starRating = generateStarRating($rating);
    $datetime = date('d.m.Y H:i:s');
    
    // Email
    $subject = '=?UTF-8?B?' . base64_encode("Новый отзыв {$starRating} от {$data['name']}") . '?=';
    
    $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 25px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">⭐ Новый отзыв</h2>
            <p style="margin: 10px 0 0; font-size: 24px;">{$starRating}</p>
        </div>
        <div style="background: #fffbeb; padding: 25px; border: 1px solid #fcd34d; border-top: none; border-radius: 0 0 8px 8px;">
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Город/район:</strong> {$location}</p>
            <p><strong>Оценка:</strong> {$starRating} ({$rating}/5)</p>
            <p><strong>Текст отзыва:</strong></p>
            <div style="padding: 12px 15px; background: white; border-left: 4px solid #f59e0b; border-radius: 4px;">{$text}</div>
            <p style="margin-top: 20px; font-size: 12px; color: #92400e;">Отправлено: {$datetime} | IP: {$clientIp}</p>
            <p style="margin-top: 15px; padding: 10px; background: #fef3c7; border-radius: 4px; font-size: 13px;">
                ℹ️ Для публикации добавьте этот отзыв в Contentful
            </p>
        </div>
    </div>
</body>
</html>
HTML;

    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . SITE_NAME . ' <' . FROM_EMAIL . '>',
    ]);
    
    $success = mail(CONTACT_EMAIL, $subject, $htmlBody, $headers);
    
    if ($success) {
        return ['success' => true, 'message' => 'Спасибо за ваш отзыв! После модерации он будет опубликован на сайте.'];
    } else {
        return ['success' => false, 'message' => 'Не удалось отправить отзыв. Пожалуйста, попробуйте позже.'];
    }
}

// Main execution
try {
    $clientIp = getClientIp();
    $formType = $_GET['type'] ?? 'contact';
    
    // Check rate limit
    if (!checkRateLimit($clientIp, $formType)) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Слишком много запросов. Пожалуйста, подождите минуту и попробуйте снова.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Get and parse input
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Неверный формат данных'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // Sanitize input
    $data = array_map('sanitizeInput', $input);
    
    // Route to appropriate handler
    if ($formType === 'review') {
        $result = handleReviewForm($data, $clientIp);
    } else {
        $result = handleContactForm($data, $clientIp);
    }
    
    if (!$result['success']) {
        http_response_code(400);
    }
    
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    ], JSON_UNESCAPED_UNICODE);
    
    error_log('Form error: ' . $e->getMessage());
}
?>
