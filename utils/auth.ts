import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/auth-schema";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { EmailTemplate } from "@/components/email-template";

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
    async afterEmailVerification(user, request) {
      // Your custom logic here, e.g., grant access to premium features
      console.log(`${user.email} has been successfully verified!`);
    },
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

        console.log("Email sent successfully!");
      } catch (error) {
        console.error("Failed to send verification email:", error);
        throw error;
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
});
