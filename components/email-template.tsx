import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  url: string;
}

export const EmailTemplate = ({ name, url }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Welcome!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Hi <strong>{name}</strong>,
            </Text>
            <Text style={paragraph}>
              Thank you for signing up! To complete your registration and verify
              your email address, click the button below:
            </Text>

            <Button style={button} href={url}>
              Verify Email
            </Button>

            <Text style={footerText}>
              Or copy and paste this link into your browser:
            </Text>
            <Text style={link}>{url}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              If you didn’t request this registration, you can safely ignore
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

const header = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "40px 20px",
  textAlign: "center" as const,
  borderRadius: "8px 8px 0 0",
};

const heading = {
  color: "#ffffff",
  fontSize: "28px",
  margin: "0",
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
  padding: "14px 40px",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  margin: "20px 0",
};

const footerText = {
  color: "#999999",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "10px 0",
};

const link = {
  color: "#667eea",
  fontSize: "14px",
  wordBreak: "break-all" as const,
};

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e9ecef",
  borderRadius: "0 0 8px 8px",
};
