import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordProps {
  name: string;
  url: string;
}

export const ResetPassword = ({ name, url }: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={paragraph}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={paragraph}>
              We received a request to reset the password for your account
              associated with webdiegomassarini@gmail.com. If you made this
              request, click the button below to reset your password:
            </Text>

            <Button style={button} href={url}>
              Reset Password
            </Button>

            <Text style={footerText}>
              Or copy and paste this link into your browser:
            </Text>
            <Text style={link}>{url}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              If you didn’t request this reset password, you can safely ignore
              this email.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} - All rights reserved
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px 30px",
};

const paragraph = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 20px 0",
};

const button = {
  backgroundColor: "#667eea",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  margin: "15px 0",
};

const footerText = {
  color: "#999999",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "10px 0",
};

const link = {
  color: "#667eea",
  fontSize: "12px",
  wordBreak: "break-all" as const,
};

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e9ecef",
  borderRadius: "0 0 8px 8px",
};
