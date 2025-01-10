import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CreateNotice = ({ className }: React.ComponentProps<"form">) => {
  const saveNoticeHandler = () => {};
  return (
    <form
      onSubmit={saveNoticeHandler}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid w-full gap-2">
        <Textarea name="notice" placeholder="Type your message here." />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
};
export default CreateNotice;
