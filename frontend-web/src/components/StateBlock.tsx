import { Button } from "@/components/Button";

type StateBlockProps = {
  message?: string;
  onRetry?: () => void;
  title: string;
};

export function StateBlock({ message, onRetry, title }: StateBlockProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-subtle">
      <h3 className="text-xl font-bold text-ocean-900">{title}</h3>
      {message ? <p className="mx-auto mt-2 max-w-md text-base text-neutral-700">{message}</p> : null}
      {onRetry ? (
        <Button className="mt-5" onClick={onRetry} size="medium" variant="secondary">
          Try again
        </Button>
      ) : null}
    </div>
  );
}
