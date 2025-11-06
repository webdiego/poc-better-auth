"use client";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/utils/auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ButtonGithub from "@/components/ButtonGithub";
import ButtonGoogle from "@/components/ButtonGoogle";

type SignUpTypes = {
  name: string;
  email: string;
  password: string;
};
const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "The name must contain at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "The password must contain at least 8 characters.",
  }),
});

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const signInGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };
  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpTypes) => {
    const { error: signUpError } = await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setDisabled(true);
          setLoading(false);
          toast.success("Account created!", {
            description: "Please check your email to verify your account.",
          });
        },
        onError: (ctx) => {
          console.log(signUpError);
          setLoading(false);
          toast.error(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="bg-white rounded-2xl w-full max-w-md px-2 py-8">
        <CardHeader>
          <CardTitle className="text-lg">Create your account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <ButtonGithub
                  text="Sign up with GitHub"
                  onClick={signInGithub}
                />

                <ButtonGoogle
                  text="Sign in with Google"
                  onClick={signInGoogle}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="The password must contain at least 8 characters."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Field>
                <Button disabled={loading || disabled} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Sign up..." : "Sign up"}
                </Button>

                <FieldDescription className="text-center">
                  <span className="mr-2">Already have account?</span>
                  <Link href="/sign-in">Sign in</Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
