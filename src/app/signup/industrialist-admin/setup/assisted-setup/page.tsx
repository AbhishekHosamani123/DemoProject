
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Bot, User, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useChat, type Message } from "@/hooks/use-chat";
import { getClassifyCompanyResponse } from "@/app/actions";

export default function AssistedSetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: async (messages) => {
        const result = await getClassifyCompanyResponse({ conversation: messages.map(m => ({role: m.role as 'user' | 'model', content: m.content})) });
        if ('error' in result || !result.response) {
            toast({
                variant: "destructive",
                title: "AI Error",
                description: result.error || "The AI assistant failed to respond."
            });
            return "Sorry, I'm having trouble connecting. Please try again in a moment.";
        }
        
        if (result.isComplete) {
            toast({
                title: "Classification Complete!",
                description: "Your company has been classified. Redirecting you now...",
            });
            setTimeout(() => {
                 router.push('/signup/industrialist-admin/setup?completed=existence-info');
            }, 2000);
        }

        return result.response;
    },
    initialMessages: [
        { id: '1', role: 'assistant', content: 'Hello! I can help you set up your company profile. To start, could you please briefly describe what your business does?' }
    ]
  });

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-screen bg-background">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10">
        <Button onClick={() => router.back()} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card className="w-full max-w-2xl h-[80vh] bg-card/60 backdrop-blur-sm border-primary/20 flex flex-col">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Assisted Setup</CardTitle>
          <CardDescription>
            Chat with our AI to classify your company.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-6">
            <div className="space-y-6 pb-4">
              {messages.map((m: Message) => (
                <div key={m.id} className={cn("flex items-start gap-3", m.role === 'user' && 'justify-end')}>
                  {m.role === 'assistant' && (
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div className={cn(
                      "p-3 rounded-lg max-w-[85%]",
                      m.role === 'user' ? 'bg-primary/80 text-primary-foreground' : 'bg-muted'
                  )}>
                    <p className="text-sm">{m.content}</p>
                  </div>
                   {m.role === 'user' && (
                    <div className="bg-muted text-muted-foreground rounded-full p-2">
                        <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 animate-pulse">
                        <Bot className="h-5 w-5" />
                    </div>
                     <div className="p-3 rounded-lg bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground"/>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Tell us about your business..."
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
