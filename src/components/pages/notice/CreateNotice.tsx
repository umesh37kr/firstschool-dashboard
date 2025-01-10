import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createNotice } from "@/http/api";
import { cn } from "@/lib/utils";
import { ErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

const CreateNotice = () => {
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  // Mutation for saving notice
  const saveNoticeMutation = useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
      setNotice("");
      toast({
        className: "bg-green-300",
        description: "Notice created sucessfully",
      });
    },
    onError: (Error: AxiosError<ErrorResponse>) => {
      console.log("error::", Error.response?.data.message);
      toast({
        variant: "destructive",
        description: `Error: ${Error.response?.data.message}`,
      });
    },
  });
  const saveNoticeHandler = (e: React.FormEvent) => {
    e.preventDefault();
    saveNoticeMutation.mutate({ notice });
  };
  return (
    <form onSubmit={saveNoticeHandler} className={cn("grid items-start gap-4")}>
      <div className="grid w-full gap-2">
        <Textarea
          name="notice"
          required
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          placeholder="Type your message here."
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
};
export default CreateNotice;
