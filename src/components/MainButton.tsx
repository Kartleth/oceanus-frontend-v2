import { Button } from "@/components/ui/button";

interface MainButtonProps {
  readonly children: string;
}

export default function Personal({ children }: MainButtonProps) {
  return (
    <Button
      variant="default"
      className="bg-deepSea hover:bg-ocean hover:text-white mx-1"
    >
      {children}
    </Button>
  );
}
