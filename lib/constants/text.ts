/**
 * Text constants for the application
 * Centralized location for all static text to improve maintainability
 * and prepare for future i18n implementation
 */

export const SITE = {
  LANG: 'ru',
} as const;

export const NAV = {
  HOME: 'Главная',
  SERVICES: 'Услуги',
  ABOUT: 'О компании',
  CONTACTS: 'Контакты',
} as const;

export const CTA = {
  ORDER_SERVICE: 'Заказать услугу',
  ORDER: 'Заказать',
  VIEW_SERVICES: 'Наши услуги',
  VIEW_ALL_SERVICES: 'Все услуги',
  CONTACT_US: 'Связаться с нами',
} as const;

export const SECTIONS = {
  ADVANTAGES: {
    TITLE: 'Почему выбирают нас',
    SUBTITLE: 'Профессиональный подход и качественный результат в каждом проекте',
  },
  REVIEWS: {
    TITLE: 'Отзывы клиентов',
    SUBTITLE: 'Что говорят о нас наши клиенты',
  },
  SERVICES: {
    TITLE: 'Наши услуги',
    SUBTITLE: 'Полный спектр геодезических работ',
  },
} as const;

export const PAGES = {
  HOME: {
    TITLE: 'Главная',
  },
  SERVICES: {
    TITLE: 'Наши услуги',
    SUBTITLE: 'Полный спектр профессиональных геодезических работ',
    CTA_TITLE: 'Готовы заказать услугу?',
    CTA_SUBTITLE: 'Свяжитесь с нами для консультации и расчёта стоимости работ',
  },
  ABOUT: {
    TITLE_ADVANTAGES: 'Наши преимущества',
    MESSENGERS_TITLE: 'Мессенджеры для связи',
    CTA_TITLE: 'Готовы начать сотрудничество?',
    CTA_SUBTITLE: 'Свяжитесь с нами для консультации и обсуждения вашего проекта',
    NO_INFO: 'Информация о компании пока не добавлена',
  },
  CONTACTS: {
    TITLE: 'Контакты',
    SUBTITLE: 'Свяжитесь с нами удобным для вас способом',
    INFO_TITLE: 'Контактная информация',
    FORM_TITLE: 'Форма обратной связи',
    MAP_TITLE: 'Где мы находимся',
    MAP_PLACEHOLDER: 'Ошибка отображения карты',
    MAP_PLACEHOLDER_HINT: '(Yandex Maps или Leaflet)',
    NO_INFO: 'Контактная информация пока не добавлена',
  },
} as const;

export const CONTACT_CTA = {
  TITLE: 'Готовы начать работу?',
  SUBTITLE: 'Свяжитесь с нами для консультации и расчёта стоимости услуг',
} as const;

export const COMPANY_INFO = {
  PHONE: 'Телефон',
  EMAIL: 'Email',
  ADDRESS: 'Адрес',
  WORK_HOURS: 'Режим работы',
  MESSENGERS: 'Мессенджеры',
} as const;

export const FORM = {
  LABELS: {
    NAME: 'Ваше имя',
    PHONE: 'Телефон',
    EMAIL: 'Email',
    MESSAGE: 'Сообщение',
  },
  PLACEHOLDERS: {
    NAME: 'Иван Иванов',
    PHONE: '+375 29 123 45 67',
    EMAIL: 'example@mail.com',
    MESSAGE: 'Расскажите о вашем проекте или задайте вопрос...',
  },
  REQUIRED: '*',
  MESSAGE_MAX: 'Максимум 2000 символов',
  SUBMIT: 'Отправить',
  SUBMITTING: 'Отправка...',
  VALIDATION: {
    NAME_LENGTH: 'Имя должно содержать от 2 до 100 символов',
    PHONE_INVALID: 'Укажите корректный номер телефона',
    EMAIL_INVALID: 'Укажите корректный email адрес',
    MESSAGE_LENGTH: 'Сообщение должно содержать от 10 до 2000 символов',
    FORM_ERRORS: 'Пожалуйста, исправьте ошибки в форме',
  },
  ERRORS: {
    RATE_LIMIT: 'Слишком много запросов. Пожалуйста, подождите минуту.',
    RATE_LIMIT_DETAIL: 'Превышен лимит запросов (максимум 3 в минуту)',
    SMTP_NOT_CONFIGURED: 'Ошибка отправки. Попробуйте позже или свяжитесь по телефону.',
    SMTP_ERROR: 'SMTP не настроен на сервере',
    SERVER_ERROR: 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
    INTERNAL_ERROR: 'Внутренняя ошибка сервера',
  },
  SUCCESS: {
    MESSAGE: 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
  },
  EMAIL: {
    SUBJECT: 'Новая заявка с сайта',
    HEADING: 'Новая заявка с формы обратной связи',
    EMAIL_HEADING: 'Новая заявка с сайта',
    NOT_PROVIDED: 'Не указан',
  },
} as const;

export const MESSENGERS = {
  TELEGRAM: 'Telegram',
  VIBER: 'Viber',
  WHATSAPP: 'WhatsApp',
} as const;

export const FOOTER = {
  NAVIGATION: 'Навигация',
  SERVICES: 'Услуги',
  CONTACTS: 'Контакты',
  COPYRIGHT: (year: number, companyName: string) => `© ${year} ${companyName}. Все права защищены.`,
  PRIVACY_POLICY: 'Политика конфиденциальности',
} as const;

export const PLACEHOLDERS = {
  HOME: 'Главная страница',
  SERVICES: 'Услуги',
  ABOUT: 'О компании',
  CONTACTS: 'Контакты',
  PRIVACY: 'Политика конфиденциальности',
  PHASE_MESSAGE: (phase: number) => `Placeholder — будет реализовано в Phase ${phase}`,
} as const;

export const ARIA = {
  STAR_RATING: (rating: number, max: number) => `${rating} из ${max} звёзд`,
} as const;

export const SEO = {
  DEFAULT_TITLE: 'Геодезические услуги',
  DEFAULT_DESCRIPTION: 'Профессиональные геодезические услуги в Бресте и Брестской области',
} as const;
