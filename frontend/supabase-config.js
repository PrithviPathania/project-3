// Supabase project-3 (org2) public client configuration.
// The publishable key is a public client key and is safe to ship in frontend code.
const SUPABASE_URL = "https://tfpianjeuhabbojuvhsl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sOXCNd5TQb3Zk8gwirlJwA_8Nbf9nxA";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Best available display name across Email/Password signups and GitHub/Google OAuth
function getUserDisplayName(user) {
    if (!user) return "User";
    return (
        user.user_metadata?.full_name ||
        user.user_metadata?.user_name ||
        user.user_metadata?.name ||
        user.email ||
        "User"
    );
}

// Returns true when the user has a verified 2FA factor but the current session
// has not completed the TOTP challenge yet (aal1 -> aal2 pending)
async function needsMfaChallenge() {
    const { data, error } = await supabaseClient.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) throw error;
    return data.nextLevel === "aal2" && data.currentLevel !== "aal2";
}
