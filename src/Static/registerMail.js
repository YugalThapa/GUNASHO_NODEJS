
export const registerMail = ({
    fullName, email, address, citizenId
}) => {
    return `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background-color: #e6f4ea; color: #1b4332;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);">
            
            <div style="background-color: #2d6a4f; color: white; padding: 25px 20px; text-align: center;">
                <h1 style="margin: 0;">🌿 Welcome to <span style="color: #b7e4c7;">Gunaso</span></h1>
                <p style="margin: 5px 0 0;">Your voice matters. We're here to listen and act.</p>
            </div>

            <div style="padding: 30px;">
                <h2 style="color: #1b4332;">Hello, <strong>${fullName}</strong> 👋</h2>
                <p>We’re excited to welcome you to <strong>Gunaso</strong>, your trusted platform to raise and resolve complaints efficiently.</p>

                <div style="margin-top: 20px; background-color: #d8f3dc; padding: 20px; border-radius: 8px;">
                    <p><strong>📧 Email:</strong> ${email}</p>
                    <p><strong>🏠 Address:</strong> ${address}</p>
                    <p><strong>🆔 Citizen ID:</strong> ${citizenId}</p>
                </div>

                <p style="margin-top: 40px; font-size: 16px;">
                    Thank you for trusting <strong>Gunaso</strong>.<br/>
                    Together, let’s create a more responsive and accountable society. 🌱
                </p>
            </div>

            <div style="background-color: #b7e4c7; text-align: center; padding: 15px; font-size: 0.85em; color: #2d6a4f;">
                &copy; ${new Date().getFullYear()} Gunaso — A Complaint Management System<br/>
                Made with 💚 for responsible citizens.
            </div>
        </div>
    </div>
    `;
};
