// /Static/complainMail.js
export const complainMail = (complain, user) => {
    return `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background-color: #e6f4ea; color: #1b4332;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 128, 0, 0.1);">
            
            <div style="background-color: #2d6a4f; color: white; padding: 25px 20px; text-align: center;">
                <h1 style="margin: 0;">📬 New Complain Submitted via <span style="color: #b7e4c7;">Gunaso</span></h1>
                <p style="margin: 5px 0 0;">A citizen has submitted a concern that requires attention.</p>
            </div>

            <div style="padding: 30px;">
                <h2 style="color: #1b4332;">Submitted By: <strong>${user.fullName}</strong></h2>
                <div style="margin-top: 10px; background-color: #d8f3dc; padding: 20px; border-radius: 8px;">
                    <p><strong>📧 Email:</strong> ${user.email}</p>
                    <p><strong>🏠 Address:</strong> ${user.address}</p>
                    <p><strong>🆔 Citizen ID:</strong> ${user.citizenId}</p>
                </div>

                <h3 style="margin-top: 30px; color: #1b4332;">Complain Details:</h3>
                <div style="background-color: #f1faee; padding: 20px; border-left: 5px solid #2d6a4f; border-radius: 8px;">
                    <p><strong>📌 Complain For:</strong> ${complain.complainFor}</p>
                    <p><strong>🗂️ Category:</strong> ${complain.category}</p>
                    <p><strong>📝 Description:</strong> ${complain.description}</p>
                    <p><strong>📍 Location:</strong> ${complain.location}</p>
                    <p><strong>☎️ Contact Info:</strong> ${complain.contactInfo}</p>
                    <p><strong>📊 Current Status:</strong> ${complain.currentStatus || 'Pending'}</p>
                </div>

                <p style="margin-top: 30px; font-size: 16px;">
                    Please review this complain and take the necessary steps as per standard procedure.
                </p>
            </div>

            <div style="background-color: #b7e4c7; text-align: center; padding: 15px; font-size: 0.85em; color: #2d6a4f;">
                &copy; ${new Date().getFullYear()} Gunaso — Complaint Management System<br/>
                Citizen concerns, heard and handled with care. 💚
            </div>
        </div>
    </div>
    `;
};
