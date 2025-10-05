
"use client";

import { useEffect, useState, useRef } from "react";
import { Bot, Send, X, Mic } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  role: "user" | "model";
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Welcome to InEra Software. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);


  useEffect(() => {
    setIsMounted(true);
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleMicClick = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    } else if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSendMessage = () => {
    const content = input.trim();
    if (content === "") return;

    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");

    // Simulate assistant response
    setTimeout(() => {
      const responseContent = "I'm still under development, but I'm learning fast!";
      setMessages([
        ...newMessages,
        {
          role: "model",
          content: responseContent,
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
          "w-80 sm:w-96 rounded-lg bg-card/90 backdrop-blur-md border shadow-xl transition-all duration-300 ease-in-out ml-auto mb-4",
          isOpen
            ? "max-h-[80vh] sm:max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <Card className="h-full flex flex-col border-0 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg text-primary">
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
            <ScrollArea className="h-72 px-6">
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
                     {message.role === 'model' && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="h-5 w-5" />
                            </AvatarFallback>
                        </Avatar>
                     )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-white"
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
                placeholder="Type your message..."
                className="flex-1"
              />
              {recognitionRef.current && (
                <Button onClick={handleMicClick} size="icon" variant={isListening ? "destructive" : "secondary"}>
                  <Mic className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={handleSendMessage} size="icon" variant="primary">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
            onClick={handleToggle}
            className={cn(
            "rounded-full w-16 h-16 shadow-lg transition-transform duration-300",
            isOpen ? "scale-0" : "scale-100"
            )}
            size="icon"
            variant="primary"
        >
            <Bot className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
