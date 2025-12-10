import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

export default function Login() {
  const [_, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F6FD] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8 md:p-12 flex flex-col items-center">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Logo size="lg" showText={false} />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">AFFILIATEWAY</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Please enter your email" 
                      className="h-14 bg-gray-50 border-gray-100 rounded-xl px-4 text-base focus-visible:ring-primary/20" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Please enter your password" 
                        className="h-14 bg-gray-50 border-gray-100 rounded-xl px-4 text-base pr-12 focus-visible:ring-primary/20" 
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
              <a href="#" className="underline decoration-gray-300 hover:text-primary transition-colors">
                Forgot password?
              </a>
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="rounded border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </FormControl>
                    <span className="font-normal cursor-pointer" onClick={() => field.onChange(!field.value)}>
                      Remember Password
                    </span>
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-medium rounded-xl bg-[#A5AAB5] hover:bg-primary transition-colors mt-8"
              // Note: The image shows a grey button initially, suggesting disabled or waiting state, 
              // but I'll make it interactive. I used a greyish color as base to match the "pre-filled" look 
              // but ideally it should be primary color when active. 
              // Let's stick to the primary color defined in CSS but maybe with opacity if invalid?
              // For now, I'll use the primary color style from the design system.
              style={{ backgroundColor: form.formState.isValid ? 'var(--color-primary)' : '#A5AAB5' }}
            >
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
