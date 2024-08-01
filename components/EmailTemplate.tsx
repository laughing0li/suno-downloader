import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = () => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Section style={box}>
                    {/* <Img
                        src="https://raw.githubusercontent.com/laughing0li/FIgureBed/master/resumego/Group%2012.png"
                        width="49"
                        height="49"
                        alt="resumego"
                    /> */}
                    <Hr style={hr} />
                    <Text style={paragraph}>
                        Welcome to AI Music Generator! We’re excited to have you on board.
                    </Text>
                    <Text style={paragraph}>
                        
                    </Text>
                    <Button style={button} href="https://sunodownloader.io/ai-music-generator">
                        Starting using AI Music Generator
                    </Button>
                    
                    <Text style={paragraph}>
                        If you have any questions, our support team is here to help at support@sunodownloader.io.
                        Thank you for choosing AI Music Generator
                    </Text>
                    <Hr style={hr} />
                </Section>
            </Container>
        </Body>
    </Html>
);

export default EmailTemplate;

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};

const box = {
    padding: "0 48px",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const paragraph = {
    color: "#525f7f",

    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
};

const anchor = {
    color: "#556cd6",
};

const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
};
