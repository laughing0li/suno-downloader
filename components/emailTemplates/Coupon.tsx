import React from "react"
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
    Link,
} from "@react-email/components"

export const Coupon = () => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Section style={box}>
                    <Img
                        src="https://raw.githubusercontent.com/laughing0li/FIgureBed/bb9c0f278059ef50cd4fa2856268c0318db0f5b0/suno-downloader/icon.png"
                        width={40}
                        height={40}
                        alt="AI Music Generator"
                        style={logo}
                    />
                    <Hr style={hr} />
                    <Text style={heading}>Exclusive Offer Inside!</Text>
                    <Text style={paragraph}>
                        Greetings from AI MUSIC GENERATOR! We’re thrilled to offer you an exclusive opportunity to explore the future of music creation.
                    </Text>
                    <Section style={couponBox}>
                        <Text style={couponText}>
                            Your Coupon Code: <span style={couponCode}>WELCOME15</span>
                        </Text>
                        <Text style={discountText}>
                            Enjoy 15% off your first purchase!
                        </Text>
                    </Section>
                    <Text style={paragraph}>
                        To redeem your discount:
                    </Text>
                    <Section style={instructionList}>
                        <Text style={listItem}>1. Visit our website at <Link style={anchor} href="https://sunodownloader.io/pricing">AI MUSIC GENERATOR</Link></Text>
                        <Text style={listItem}>2. Choose the service package that best fits your needs</Text>
                        <Text style={listItem}>3. Enter the coupon code <span style={couponCodeInline}>WELCOME15</span> at checkout</Text>
                    </Section>
                    <Button href="https://sunodownloader.io/pricing" style={button}>
                        Claim Your 15% Discount Now!
                    </Button>
                    <Text style={paragraph}>
                        If you have any questions, our support team is here to help at <Link href="mailto:support@sunodownloader.io" style={anchor}>support@sunodownloader.io</Link>.
                    </Text>
                    <Text style={paragraph}>
                        Thank you for choosing AI Music Generator - where innovation meets melody!
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        © 2024 AI Music Generator. All rights reserved.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

export default Coupon

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
    padding: "40px 0",
}

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 0",
    maxWidth: "600px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}

const box = {
    padding: "0 48px",
}

const logo = {
    margin: "0 auto 20px",
    display: "block",
}

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
}

const heading = {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 20px",
}

const paragraph = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
    margin: "0 0 20px",
}

const anchor = {
    color: "#556cd6",
    textDecoration: "none",
}

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
    padding: "12px 0",
    margin: "30px 0",
}

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    marginTop: "20px",
}

const couponBox = {
    backgroundColor: "#f0f4f8",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
    textAlign: "center" as const,
}

const couponText = {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px",
}

const couponCode = {
    backgroundColor: "#656ee8",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
}

const discountText = {
    fontSize: "16px",
    color: "#4a4a4a",
    margin: "0",
}

const instructionList = {
    margin: "0 0 20px",
}

const listItem = {
    marginBottom: "10px",
}

const couponCodeInline = {
    fontWeight: "bold",
    color: "#656ee8",
}