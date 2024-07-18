import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.redirect('/login');
    return;
  }

  const username = session.user.email; // Assuming the OAuth provider returns a `name` field

  // Redirect to the onboarding page with the username
  res.redirect(`/onboarding?username=${encodeURIComponent(username)}`);
}

