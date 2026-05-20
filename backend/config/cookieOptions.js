export const cookieOptions = {
  httpOnly: true,
  secure: true, // MUST for Render HTTPS
  sameSite: "none", // MUST for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
