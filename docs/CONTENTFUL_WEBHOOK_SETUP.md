# Настройка Contentful Webhook для автоматического деплоя

Когда ты обновляешь контент в Contentful, сайт автоматически пересобирается и деплоится.

## Как это работает

```
┌─────────────┐     webhook      ┌─────────────┐     trigger     ┌─────────────┐
│ Contentful  │ ───────────────► │   GitHub    │ ──────────────► │   Actions   │
│ (публикация)│                  │  (API)      │                 │ (build+FTP) │
└─────────────┘                  └─────────────┘                 └─────────────┘
```

## Шаг 1: Создать GitHub Personal Access Token

1. Открой https://github.com/settings/tokens
2. Нажми **"Generate new token (classic)"**
3. Настройки:
   - **Note:** `Contentful Webhook`
   - **Expiration:** No expiration (или выбери срок)
   - **Scopes:** отметь только `repo` (Full control of private repositories)
4. Нажми **"Generate token"**
5. **Скопируй токен!** Он показывается только один раз.

Токен выглядит так: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Шаг 2: Создать Webhook в Contentful

1. Открой https://app.contentful.com
2. Перейди в **Settings → Webhooks**
3. Нажми **"Add Webhook"**

### Настройки вебхука:

**Name:**
```
GitHub Deploy Trigger
```

**URL:**
```
https://api.github.com/repos/PavelShpakovich/geodesy-site/dispatches
```

**Method:** POST

**Triggers:** Выбери события, при которых запускать сборку:
- ✅ Entry → Publish
- ✅ Entry → Unpublish
- ✅ Asset → Publish (если используешь картинки из Contentful)

**Headers:** Добавь два заголовка:

| Key | Value |
|-----|-------|
| `Authorization` | `Bearer ghp_xxxxxxxxxxxx` (твой токен) |
| `Accept` | `application/vnd.github.v3+json` |

**Payload:** Custom payload

```json
{
  "event_type": "contentful-update"
}
```

**Content type:** `application/json`

5. Нажми **"Save"**

## Шаг 3: Проверить

1. Опубликуй любое изменение в Contentful
2. Открой https://github.com/PavelShpakovich/geodesy-site/actions
3. Должен запуститься workflow "Build and Deploy to domain.by"

## Визуальная инструкция по настройке в Contentful

```
┌────────────────────────────────────────────────────────────────┐
│ Contentful → Settings → Webhooks → Add Webhook                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Name: [GitHub Deploy Trigger                              ]   │
│                                                                │
│  URL:                                                          │
│  [https://api.github.com/repos/PavelShpakovich/geodesy-site/d] │
│                                                                │
│  Triggers:                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [x] Entry    [x] Publish   [ ] Unpublish   [ ] Delete    │  │
│  │ [x] Asset    [x] Publish   [ ] Unpublish   [ ] Delete    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  Headers:                                                      │
│  ┌────────────────────┬─────────────────────────────────────┐  │
│  │ Authorization      │ Bearer ghp_xxxxxxxxxxxxx            │  │
│  │ Accept             │ application/vnd.github.v3+json      │  │
│  └────────────────────┴─────────────────────────────────────┘  │
│                                                                │
│  Payload: Custom                                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ {                                                        │  │
│  │   "event_type": "contentful-update"                      │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│                                          [Cancel]   [Save]     │
└────────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Webhook не срабатывает

1. Проверь логи вебхука в Contentful:
   - Settings → Webhooks → выбери вебхук → Activity log
   
2. Частые ошибки:
   - **401 Unauthorized** — неправильный токен или истёк срок
   - **404 Not Found** — неправильный URL репозитория
   - **422 Unprocessable Entity** — неправильный payload

### GitHub Actions не запускается

1. Проверь что в `deploy.yml` есть:
   ```yaml
   on:
     repository_dispatch:
       types: [contentful-update]
   ```

2. Убедись что `event_type` в payload совпадает с `types` в workflow

### Сборка падает

1. Проверь логи в GitHub Actions
2. Возможные причины:
   - Неправильные CONTENTFUL_* секреты
   - Ошибки в контенте (отсутствующие обязательные поля)

## Альтернатива: Ручной запуск

Если не хочешь настраивать вебхук, можешь запускать деплой вручную:

1. Открой https://github.com/PavelShpakovich/geodesy-site/actions
2. Выбери "Build and Deploy to domain.by"
3. Нажми "Run workflow" → "Run workflow"

## Безопасность

- **Не публикуй GitHub токен** — это даёт полный доступ к репозиториям
- **Используй минимальные права** — только `repo` scope
- **Ротируй токены** — создавай новый раз в год
- **Удаляй неиспользуемые токены** — Settings → Tokens → Delete

## Частота сборок

### Защита от множественных сборок

Workflow настроен с двумя механизмами защиты:

#### 1. Concurrency (отмена предыдущих)

```yaml
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true
```

Если ты публикуешь несколько записей быстро — каждая новая публикация **отменяет** предыдущую сборку:

```
10:00:00 — Publish запись 1 → Сборка #1 запустилась
10:00:15 — Publish запись 2 → Сборка #1 ОТМЕНЕНА, Сборка #2 запустилась
10:00:30 — Publish запись 3 → Сборка #2 ОТМЕНЕНА, Сборка #3 запустилась
10:01:30 — Сборка #3 завершена ✅
```

Результат: 1 успешная сборка вместо 3.

#### 2. Debounce задержка (60 секунд)

```yaml
- name: Wait for batch updates
  if: github.event_name == 'repository_dispatch'
  run: sleep 60
```

При Contentful webhook сборка ждёт 60 секунд перед началом. Это даёт время:
- Опубликовать несколько записей
- Отменить сборку если что-то пошло не так

#### Как это работает вместе

```
10:00:00 — Publish запись 1 → Сборка #1: ждёт 60 сек...
10:00:15 — Publish запись 2 → Сборка #1 ОТМЕНЕНА → Сборка #2: ждёт 60 сек...
10:00:30 — Publish запись 3 → Сборка #2 ОТМЕНЕНА → Сборка #3: ждёт 60 сек...
10:01:30 — Сборка #3: начинает build
10:03:30 — Сборка #3: deploy завершён ✅
```

Итого: 3 публикации = 1 сборка (с задержкой ~3.5 минуты от последней публикации).

### Лимиты GitHub Actions

GitHub Actions на бесплатном плане:
- 2,000 минут в месяц
- Сборка занимает ~2-3 минуты

Это значит ~600-700 деплоев в месяц — более чем достаточно!
