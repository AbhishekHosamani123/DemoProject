
"use client";

import { useEffect, useState } from "react";
import { Bot, Mic, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to InEra Software",
    },
  ]);
  const [input, setInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate assistant response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I'm still under development, but I'm learning fast!",
        },
      ]);
    }, 1000);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 px-4 sm:px-6 lg:px-8 w-full max-w-lg ml-auto">
      <div
        className={cn(
          "w-80 sm:w-96 rounded-lg bg-card border shadow-xl transition-all duration-300 ease-in-out ml-auto mb-2",
          isOpen
            ? "max-h-[80vh] sm:max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <Card className="h-full flex flex-col border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                AI Assistant
              </CardTitle>
              <CardDescription>Ask me anything</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-56 px-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-end gap-2",
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                     {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20">
                                <Bot className="h-5 w-5 text-primary" />
                            </AvatarFallback>
                        </Avatar>
                     )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="primary" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
            onClick={handleToggle}
            className={cn(
            "rounded-full w-14 h-14 shadow-lg transition-transform duration-300",
            isOpen && "scale-0"
            )}
            size="icon"
        >
            <Bot className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
