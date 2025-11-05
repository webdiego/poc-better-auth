import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/auth-schema";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { EmailTemplate } from "@/components/email/email-template";
import { ResetPassword } from "@/components/email/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,

    sendVerificationEmail: async ({ user, url }) => {
      const verifyUrl = url + "profile";
      try {
        const emailHtml = await render(
          EmailTemplate({ name: user.name, url: verifyUrl })
        );

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Verifica il tuo indirizzo email",
          html: emailHtml,
        });
      } catch (error) {
        throw error;
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const verifyUrl = url;
      try {
        const emailHtml = await render(
          ResetPassword({ name: user.name, url: verifyUrl })
        );

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Reset your password",
          html: emailHtml,
        });
      } catch (error) {
        throw error;
      }
    },
  },
});
