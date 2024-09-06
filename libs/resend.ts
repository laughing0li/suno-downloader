/**
 * Sends an email using the provided parameters.
 *
 * @async
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content of the email.
 * @param {string} html - The HTML content of the email.
 * @param {string} replyTo - The email address to set as the "Reply-To" address.
 * @returns {Promise} A Promise that resolves when the email is sent.
 */
// export const resendEmail = async ({ to }: { to: string }): Promise<any> => {
//     await fetch("https://sunodownloader.io/api/send", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ to }),
//     });
// };

export const sendCoupon = async ({ to }: { to: string }): Promise<any> => {
    await fetch("https://sunodownloader.io/api/send/coupon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ to }),
    });
}