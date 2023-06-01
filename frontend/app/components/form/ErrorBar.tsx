type ErrorBarProps = {
  errors: string[];
};

export default function ErrorBar({ errors }: ErrorBarProps) {
  return (
    <p
      className="bg-red-200 text-red-900 box-border p-2 rounded-md mb-4 w-full"
      data-cy="error-bar"
    >
      {errors.map((error) => (
        <span key={error}>{error}</span>
      ))}
    </p>
  );
}
