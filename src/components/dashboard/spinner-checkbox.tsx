import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";

type Props = {
  id: number;
  checked: boolean;
  onChange: (id: number, value: boolean) => Promise<boolean>;
};
function SpinnerCheckbox({ id, checked, onChange }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [isChecked, setChecked] = useState(checked);

  const onCheckedChange = (value: boolean) => {
    setLoading(true);

    onChange(id, value)
      .then((val) => {
        toast({
          variant: "default",
          title: `updated successfully`,
        });
        setChecked(val);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: `Couldn't update, error ${error}`,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isLoading ? (
        <Loader2 className='animate-spin' />
      ) : (
        <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} />
      )}
    </>
  );
}

export default SpinnerCheckbox;
