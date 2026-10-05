// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL =
    "https://bibfellzfeqauawzytgz.supabase.co";

// IMPORTANT:
// Put your Supabase PUBLISHABLE key here.
// Do NOT use a Secret / Service Role key.
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_xI14Uv9Mi6vElFQ3USZjZw_qyXd_4xW";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const joinForm =
    document.getElementById("joinForm");

const submitButton =
    document.getElementById("submitButton");

const formMessage =
    document.getElementById("formMessage");


// ==========================================
// FORM SUBMISSION
// ==========================================

joinForm.addEventListener("submit", async function(event) {

    // Stop normal form submission
    event.preventDefault();


    // ==========================================
    // GET FORM VALUES
    // ==========================================

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const age =
        document.getElementById("age").value;

    const gender =
        document.getElementById("gender").value;

    const membership =
        document.getElementById("membership").value;

    const address =
        document.getElementById("address").value.trim();


    // ==========================================
    // SHOW SUBMITTING
    // ==========================================

    submitButton.disabled = true;

    submitButton.textContent =
        "SUBMITTING...";

    formMessage.className =
        "form-message";

    formMessage.textContent = "";


    try {

        // ==========================================
        // SEND DATA TO SUPABASE
        // ==========================================

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/members`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    // Supabase Publishable key
                    "apikey": SUPABASE_PUBLISHABLE_KEY,

                    // Tell Supabase we don't need
                    // the inserted row returned
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify({

                    full_name: name,

                    phone: phone,

                    email: email,

                    age: Number(age),

                    gender: gender,

                    membership_plan: membership,

                    address: address
                })
            }
        );


        // ==========================================
        // CHECK SUPABASE RESPONSE
        // ==========================================

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "SUPABASE ERROR:",
                errorText
            );

            throw new Error(
                errorText
            );
        }


        // ==========================================
        // SUCCESS
        // ==========================================

        formMessage.className =
            "form-message success";

        formMessage.textContent =
            "✓ Registration successful! Fitzone will contact you shortly.";


        // Clear form
        joinForm.reset();


    } catch (error) {

        // ==========================================
        // ERROR
        // ==========================================

        console.error(
            "FORM SUBMISSION ERROR:",
            error
        );

        formMessage.className =
            "form-message error";

        formMessage.textContent =
            "Something went wrong. Please try again.";
    }


    // ==========================================
    // ENABLE BUTTON AGAIN
    // ==========================================

    submitButton.disabled = false;

    submitButton.textContent =
        "JOIN FITZONE →";

});