import { useLocalize } from '~/hooks';

export default function CoolingSystem() {
  const localize = useLocalize();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">
        {localize('com_system_cooling')}
      </h1>
    </div>
  );
}
