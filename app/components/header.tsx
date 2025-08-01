import AnimatedSignature from "@/app/components/signature";

export function Header({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-center mx-auto space-x-8">
      <div className="w-48">
        <AnimatedSignature className="w-full" />
      </div>
      {title && (
        <h1 className="uppercase text-lg font-medium font-mono tracking-wider text-neutral-500">
          {title}
        </h1>
      )}
    </div>
  );
}
