import { useLocalize } from '~/hooks';

export default function SystemHome() {
  const localize = useLocalize();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">
        {localize('com_system_home')}
      </h1>
    </div>
  );
}
