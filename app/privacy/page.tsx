import { getCompanyInfo } from '@/lib/contentful/api';
import { PRIVACY } from '@/lib/constants/text';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PRIVACY.PAGE_TITLE + ' | Геодезические услуги',
  description: PRIVACY.PAGE_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivacyPage() {
  const companyInfo = await getCompanyInfo();
  const companyName = companyInfo?.fields.name || 'Наша компания';
  const companyEmail = companyInfo?.fields.email || 'info@example.com';

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8'>{PRIVACY.PAGE_TITLE}</h1>

      <div className='prose prose-gray max-w-none space-y-6'>
        <p className='text-muted-foreground'>
          {PRIVACY.LAST_UPDATED}:{' '}
          {new Date().toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>1. {PRIVACY.SECTION_1.TITLE}</h2>
          <p>{PRIVACY.SECTION_1.INTRO(companyName)}</p>
          <p>
            <strong>Важно:</strong> {PRIVACY.SECTION_1.NO_STORAGE}
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>2. {PRIVACY.SECTION_2.TITLE}</h2>
          <p>{PRIVACY.SECTION_2.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Имя</strong> — {PRIVACY.SECTION_2.ITEMS.NAME}
            </li>
            <li>
              <strong>Номер телефона</strong> — {PRIVACY.SECTION_2.ITEMS.PHONE}
            </li>
            <li>
              <strong>Текст сообщения</strong> — {PRIVACY.SECTION_2.ITEMS.MESSAGE}
            </li>
          </ul>
          <p className='mt-4'>
            <strong>{PRIVACY.SECTION_2.NO_STORAGE}</strong> {PRIVACY.SECTION_2.EXPLANATION}
          </p>
          <p>{PRIVACY.SECTION_2.LIKE_EMAIL}</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>3. {PRIVACY.SECTION_3.TITLE}</h2>
          <p>{PRIVACY.SECTION_3.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            {PRIVACY.SECTION_3.ITEMS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className='mt-4'>
            Мы <strong>не используем</strong> ваши данные для:
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            {PRIVACY.SECTION_3.NOT_USED.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>4. {PRIVACY.SECTION_4.TITLE}</h2>
          <p>{PRIVACY.SECTION_4.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            {PRIVACY.SECTION_4.ITEMS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>5. {PRIVACY.SECTION_5.TITLE}</h2>
          <p>{PRIVACY.SECTION_5.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>{PRIVACY.SECTION_5.WEBSITE}</strong> {PRIVACY.SECTION_5.WEBSITE_TEXT}
            </li>
            <li>
              <strong>{PRIVACY.SECTION_5.MAILBOX}</strong> {PRIVACY.SECTION_5.MAILBOX_TEXT}
            </li>
          </ul>
          <p className='mt-4'>{PRIVACY.SECTION_5.DELETION_REQUEST}</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>6. {PRIVACY.SECTION_6.TITLE}</h2>
          <p>{PRIVACY.SECTION_6.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>SSL/TLS шифрование</strong> — {PRIVACY.SECTION_6.ITEMS.SSL.split('—')[1]}
            </li>
            <li>
              <strong>Защищенное SMTP-соединение</strong> — {PRIVACY.SECTION_6.ITEMS.SMTP.split('—')[1]}
            </li>
            <li>
              <strong>Без промежуточного хранения</strong> — {PRIVACY.SECTION_6.ITEMS.NO_STORAGE.split('—')[1]}
            </li>
            <li>
              <strong>Прямая доставка</strong> — {PRIVACY.SECTION_6.ITEMS.DIRECT.split('—')[1]}
            </li>
          </ul>
          <p className='mt-4'>{PRIVACY.SECTION_6.CONCLUSION}</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>7. {PRIVACY.SECTION_7.TITLE}</h2>
          <p>{PRIVACY.SECTION_7.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Resend (почтовый сервис)</strong> — {PRIVACY.SECTION_7.RESEND.split('—')[1]}
            </li>
            <li>
              <strong>Contentful (CMS)</strong> — {PRIVACY.SECTION_7.CONTENTFUL.split('—')[1]}
            </li>
          </ul>
          <p className='mt-4'>
            Мы <strong>не передаем</strong> {PRIVACY.SECTION_7.NO_THIRD_PARTY.split('не передаем')[1]}
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>8. {PRIVACY.SECTION_8.TITLE}</h2>
          <p>{PRIVACY.SECTION_8.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>
              <strong>Удаление данных</strong> — {PRIVACY.SECTION_8.DELETION.split('—')[1]}
            </li>
            <li>
              <strong>Не связываться</strong> — {PRIVACY.SECTION_8.NO_CONTACT.split('—')[1]}
            </li>
            <li>
              <strong>Отзыв согласия</strong> — {PRIVACY.SECTION_8.WITHDRAW.split('—')[1]}
            </li>
          </ul>
          <p className='mt-4'>
            {PRIVACY.SECTION_8.CONTACT}{' '}
            <a href={`mailto:${companyEmail}`} className='text-primary hover:underline'>
              {companyEmail}
            </a>
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>9. {PRIVACY.SECTION_9.TITLE}</h2>
          <p>{PRIVACY.SECTION_9.INTRO}</p>
          <ul className='list-disc pl-6 space-y-2 mt-4'>
            <li>
              <strong>Vercel Analytics</strong> — {PRIVACY.SECTION_9.VERCEL_ANALYTICS}
            </li>
            <li>
              <strong>Vercel Speed Insights</strong> — {PRIVACY.SECTION_9.VERCEL_SPEED}
            </li>
          </ul>
          <p className='mt-4'>
            <strong>Важно:</strong>
          </p>
          <ul className='list-disc pl-6 space-y-2'>
            <li>{PRIVACY.SECTION_9.NO_GA}</li>
            <li>{PRIVACY.SECTION_9.NO_COOKIES}</li>
          </ul>
          <p className='mt-4 text-sm text-muted-foreground'>{PRIVACY.SECTION_9.PRIVACY_LINKS}</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>10. {PRIVACY.SECTION_10.TITLE}</h2>
          <p>{PRIVACY.SECTION_10.TEXT}</p>
          <p>{PRIVACY.SECTION_10.DATE}</p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4 mt-8'>11. {PRIVACY.SECTION_11.TITLE}</h2>
          <p>{PRIVACY.SECTION_11.INTRO}</p>
          <div className='bg-muted p-4 rounded-lg mt-4'>
            <p>
              <strong>{PRIVACY.SECTION_11.COMPANY}:</strong> {companyName}
            </p>
            <p>
              <strong>{PRIVACY.SECTION_11.EMAIL}:</strong>{' '}
              <a href={`mailto:${companyEmail}`} className='text-primary hover:underline'>
                {companyEmail}
              </a>
            </p>
            {companyInfo?.fields.phone && (
              <p>
                <strong>{PRIVACY.SECTION_11.PHONE}:</strong>{' '}
                <a href={`tel:${companyInfo.fields.phone}`} className='text-primary hover:underline'>
                  {companyInfo.fields.phone}
                </a>
              </p>
            )}
          </div>
        </section>

        <section className='mt-12 pt-8 border-t'>
          <p className='text-sm text-muted-foreground'>{PRIVACY.FOOTER}</p>
        </section>
      </div>
    </div>
  );
}
