import { useLocalize } from '~/hooks';

export default function JobQuery() {
  const localize = useLocalize();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">
        {localize('com_system_job_query')}
      </h1>
    </div>
  );
}
