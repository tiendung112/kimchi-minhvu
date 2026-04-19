
-- RSVP responses table for wedding invitation
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL CHECK (char_length(full_name) > 0 AND char_length(full_name) <= 100),
  phone TEXT NOT NULL CHECK (char_length(phone) > 0 AND char_length(phone) <= 20),
  guest_of TEXT NOT NULL CHECK (guest_of IN ('nha_trai', 'nha_gai')),
  attendee_count INTEGER NOT NULL CHECK (attendee_count > 0 AND attendee_count <= 20),
  wishes TEXT CHECK (wishes IS NULL OR char_length(wishes) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous guests) can submit an RSVP
CREATE POLICY "Anyone can submit RSVP"
  ON public.rsvp_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT policy: guests cannot read other people's submissions.
-- The couple can view responses via the Lovable Cloud database UI.
