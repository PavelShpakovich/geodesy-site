import { PLACEHOLDERS } from '@/lib/constants/text';

export default function PrivacyPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>{PLACEHOLDERS.PRIVACY}</h1>
        <p className='text-muted-foreground'>{PLACEHOLDERS.PHASE_MESSAGE(8)}</p>
      </div>
    </div>
  );
}
