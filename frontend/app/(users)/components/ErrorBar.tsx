type ErrorBarProps = {
  errors: string[];
};

export default function ErrorBar({ errors }: ErrorBarProps) {
  return (
    <div className="bg-red-200 text-red-900 p-2 rounded-md mb-4">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
