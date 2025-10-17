"use client"
import {
    Input
} from "@/components/ui/input"
import {
    Button
}from "@/components/ui/button"
import {
    ArrowUp
} from "lucide-react"
interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
}: ChatInputProps
) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ask me something about the phone..."
      />
      <Button>
        <ArrowUp/>
        <span className="sr-only">Submit</span>
      </Button>
    </form>
  );
}