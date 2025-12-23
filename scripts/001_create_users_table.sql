-- Create a public users table to store login credentials
CREATE TABLE IF NOT EXISTS public.logins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.logins ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for registration)
CREATE POLICY "logins_insert_public"
  ON public.logins FOR INSERT
  WITH CHECK (true);

-- Allow users to view all logins (for this school project)
CREATE POLICY "logins_select_public"
  ON public.logins FOR SELECT
  USING (true);
